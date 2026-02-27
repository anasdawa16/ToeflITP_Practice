import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini/client";
import { buildSystemPrompt, type UserContext } from "@/lib/gemini/prompts";

/**
 * Simple in-memory rate limiter: FREE TIER = 15 RPM per user
 * Resets per minute per user ID.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(userId: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + 60_000 });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= 10) { // Conservative: 10/min (free tier allows 15)
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, retryAfterMs: 0 };
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Rate limiting
  const rl = checkRateLimit(user.id);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Rate limit reached. Try again in ${Math.ceil(rl.retryAfterMs / 1000)}s` },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );
  }

  const body = await request.json() as {
    messages: ChatMessage[];
    context?: UserContext;
  };

  if (!body.messages?.length) {
    return NextResponse.json({ error: "messages required" }, { status: 400 });
  }

  // Fetch user progress for context enrichment
  let userCtx: UserContext = body.context ?? {};

  if (!userCtx.latestScore) {
    const { data: sessions } = await supabase
      .from("test_sessions")
      .select("total_scaled_score")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .order("completed_at", { ascending: false })
      .limit(1);
    userCtx.latestScore = sessions?.[0]?.total_scaled_score ?? null;
  }

  if (!userCtx.targetScore) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("target_score")
      .eq("id", user.id)
      .single();
    userCtx.targetScore = profile?.target_score ?? 550;
  }

  try {
    const model = getGeminiModel();
    const systemPrompt = buildSystemPrompt(userCtx);

    // Build history for multi-turn chat (all but last message)
    // Gemini expects alternating user/model turns
    const history = body.messages.slice(0, -1).map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    // Start chat with system prompt as first user message + empty model response
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I'm ToeflMaster AI, ready to help you prepare for TOEFL ITP Level 1. What would you like to know?" }] },
        ...history,
      ],
    });

    // Send the latest user message
    const lastMsg = body.messages[body.messages.length - 1];
    const result = await chat.sendMessage(lastMsg.content);
    const responseText = result.response.text();

    // Save to ai_conversations table — best effort, JSON round-trip satisfies Supabase Json type
    const allMessages = body.messages.concat([{ role: "model" as const, content: responseText }]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const messagesJson = JSON.parse(JSON.stringify(allMessages));
    void supabase.from("ai_conversations").upsert({
      user_id: user.id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      messages: messagesJson,
      updated_at: new Date().toISOString(),
    });


    return NextResponse.json({ message: responseText });
  } catch (err) {
    const message = err instanceof Error ? err.message : "AI request failed";
    console.error("Gemini error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
