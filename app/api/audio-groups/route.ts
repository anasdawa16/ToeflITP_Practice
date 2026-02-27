import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * GET /api/audio-groups
 * Returns audio_conversations joined with their questions for Section 1.
 * Groups are returned ordered by: Part A → B → C.
 */
export async function GET() {
  const supabase = await createClient();

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Fetch audio conversations
  const { data: conversations, error } = await supabase
    .from("audio_conversations")
    .select("*")
    .eq("is_active", true)
    .order("section_part", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (!conversations || conversations.length === 0) {
    return NextResponse.json({ groups: [] });
  }

  // Fetch S1 questions that belong to these conversations
  const convIds = conversations.map((c) => c.id);
  const { data: questions } = await supabase
    .from("questions")
    .select("*")
    .eq("section", 1)
    .eq("is_active", true)
    .in("conversation_group_id", convIds)
    .order("question_order_in_group", { ascending: true });

  // Cast to any[] — conversation_group_id exists in DB but may not be in generated types
  const allQuestions = (questions ?? []) as Array<Record<string, unknown>>;

  const questionsByConv: Record<string, typeof allQuestions> = {};
  for (const q of allQuestions) {
    const cid = q.conversation_group_id as string;
    questionsByConv[cid] = questionsByConv[cid] ?? [];
    questionsByConv[cid].push(q);
  }

  const groups = conversations.map((conv) => ({
    id: conv.id,
    title: conv.title ?? "Conversation",
    transcript: conv.transcript ?? "",
    part: conv.section_part as "A" | "B" | "C",
    questions: (questionsByConv[conv.id] ?? []).map((q) => ({
      id: String(q.id),
      questionText: String(q.question_text),
      option_a: String(q.option_a),
      option_b: String(q.option_b),
      option_c: String(q.option_c),
      option_d: String(q.option_d),
    })),
  }));

  return NextResponse.json({ groups });
}
