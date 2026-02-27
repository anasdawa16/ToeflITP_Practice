import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { calculateScores } from "@/lib/utils/scoreCalculator";
import { checkAfterTest } from "@/lib/achievements/triggers";

/**
 * POST /api/mock-test/complete
 * Body: {
 *   session_id: string,
 *   s1_time_remaining: number,
 *   s2_time_remaining: number,
 *   s3_time_remaining: number,
 * }
 *
 * 1. Fetch all user_answers for this session
 * 2. Count raw scores per section
 * 3. Calculate scaled scores using ETS formula
 * 4. Update test_session row (status=completed, scores, completed_at)
 * 5. Return full score report
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body?.session_id) return NextResponse.json({ error: "session_id required" }, { status: 400 });

  const { session_id, s1_time_remaining = 0, s2_time_remaining = 0, s3_time_remaining = 0 } = body;

  // Fetch session (ownership check)
  const { data: session } = await supabase
    .from("test_sessions")
    .select("*, s1_question_ids, s2_question_ids, s3_question_ids")
    .eq("id", session_id)
    .eq("user_id", user.id)
    .single();

  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });
  if (session.status === "completed") {
    return NextResponse.json({ error: "Session already completed" }, { status: 400 });
  }

  // Fetch all answers for session
  const { data: answers } = await supabase
    .from("user_answers")
    .select("question_id, is_correct")
    .eq("session_id", session_id)
    .eq("user_id", user.id);

  const answersMap = new Map<string, boolean>(
    (answers ?? [])
      .filter((a) => a.is_correct !== null)
      .map((a) => [a.question_id, a.is_correct as boolean])
  );

  // Count raw scores per section
  const s1Ids = (session.s1_question_ids ?? []) as string[];
  const s2Ids = (session.s2_question_ids ?? []) as string[];
  const s3Ids = (session.s3_question_ids ?? []) as string[];

  const s1Raw = s1Ids.filter((id) => answersMap.get(id) === true).length;
  const s2Raw = s2Ids.filter((id) => answersMap.get(id) === true).length;
  const s3Raw = s3Ids.filter((id) => answersMap.get(id) === true).length;

  // Calculate scaled scores
  const scores = calculateScores(
    s1Raw, Math.max(s1Ids.length, 1),
    s2Raw, Math.max(s2Ids.length, 1),
    s3Raw, Math.max(s3Ids.length, 1),
  );

  // Duration
  const startedAt = new Date(session.started_at).getTime();
  const durationSeconds = Math.round((Date.now() - startedAt) / 1000);

  // Update session
  const { error: updateError } = await supabase
    .from("test_sessions")
    .update({
      status: "completed",
      s1_raw_score: s1Raw,
      s2_raw_score: s2Raw,
      s3_raw_score: s3Raw,
      s1_scaled_score: scores.s1.scaled,
      s2_scaled_score: scores.s2.scaled,
      s3_scaled_score: scores.s3.scaled,
      total_scaled_score: scores.total,
      s1_time_remaining,
      s2_time_remaining,
      s3_time_remaining,
      completed_at: new Date().toISOString(),
      total_duration_seconds: durationSeconds,
    })
    .eq("id", session_id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Update daily user_progress (upsert)
  await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: user.id,
        date: new Date().toISOString().split("T")[0],
        questions_attempted: s1Ids.length + s2Ids.length + s3Ids.length,
        questions_correct: s1Raw + s2Raw + s3Raw,
        s2_attempted: s2Ids.length,
        s2_correct: s2Raw,
        s3_attempted: s3Ids.length,
        s3_correct: s3Raw,
        study_minutes: Math.round(durationSeconds / 60),
      },
      { onConflict: "user_id,date" }
    );

  // ── Achievement triggers ───────────────────────────────────
  const { data: allSessions } = await supabase
    .from("test_sessions")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "completed");

  const { data: profile } = await supabase
    .from("profiles")
    .select("target_score")
    .eq("id", user.id)
    .single();

  const newBadges = await checkAfterTest(supabase, user.id, {
    totalScore: scores.total,
    targetScore: profile?.target_score ?? 550,
    totalTests: (allSessions ?? []).length,
    s2Raw,
    s2Total: s2Ids.length,
  });

  return NextResponse.json({
    session_id,
    scores,
    duration_seconds: durationSeconds,
    new_badges: newBadges,
  });
}
