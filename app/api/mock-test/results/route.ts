import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * GET /api/mock-test/results?session_id=xxxx
 * Fetches the full session record + per-question user_answers for review mode.
 */
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId) return NextResponse.json({ error: "session_id required" }, { status: 400 });

  // Fetch session
  const { data: session, error: sErr } = await supabase
    .from("test_sessions")
    .select("*")
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .single();

  if (sErr || !session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  // Fetch all user_answers for this session
  const { data: answers } = await supabase
    .from("user_answers")
    .select("question_id, selected_answer, is_correct")
    .eq("session_id", sessionId)
    .eq("user_id", user.id);

  // Fetch all questions touched in this session
  const allQIds = [
    ...(session.s2_question_ids ?? []),
    ...(session.s3_question_ids ?? []),
  ] as string[];

  const { data: questions } = await supabase
    .from("questions")
    .select("id, section, part, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, passage_id")
    .in("id", allQIds.length > 0 ? allQIds : ["__none__"]);

  return NextResponse.json({
    session,
    answers: answers ?? [],
    questions: questions ?? [],
  });
}
