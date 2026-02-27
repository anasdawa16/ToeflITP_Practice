import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * POST /api/mock-test/answer
 * Body: {
 *   session_id: string,
 *   question_id: string,
 *   selected_answer: "A"|"B"|"C"|"D",
 *   time_spent_seconds: number
 * }
 * Upserts a user_answers row. Returns is_correct.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body?.session_id || !body?.question_id || !body?.selected_answer) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { session_id, question_id, selected_answer, time_spent_seconds = 0 } = body;

  // Verify session belongs to user
  const { data: session } = await supabase
    .from("test_sessions")
    .select("id, status")
    .eq("id", session_id)
    .eq("user_id", user.id)
    .single();

  if (!session || session.status === "completed") {
    return NextResponse.json({ error: "Invalid or completed session" }, { status: 400 });
  }

  // Get correct answer from question
  const { data: question } = await supabase
    .from("questions")
    .select("correct_answer")
    .eq("id", question_id)
    .single();

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const is_correct = question.correct_answer === selected_answer;

  // Upsert answer (in case user changes their answer)
  const { error } = await supabase
    .from("user_answers")
    .upsert(
      {
        session_id,
        user_id: user.id,
        question_id,
        selected_answer,
        is_correct,
        time_spent_seconds,
        answered_at: new Date().toISOString(),
      },
      { onConflict: "session_id,question_id" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ is_correct, correct_answer: question.correct_answer });
}
