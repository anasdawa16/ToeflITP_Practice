import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * GET /api/progress
 * Returns aggregated progress data for the authenticated user:
 * - Last 10 test sessions (for score history chart)
 * - user_progress rows (daily accuracy)
 * - Streak info
 */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Last 10 completed mock tests — for line chart
  const { data: sessions } = await supabase
    .from("test_sessions")
    .select("id, completed_at, total_scaled_score, s2_scaled_score, s3_scaled_score, s2_raw_score, s3_raw_score, s2_question_ids, s3_question_ids")
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("completed_at", { ascending: false })
    .limit(10);

  // Daily progress — last 90 days for streak calendar
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const { data: dailyProgress } = await supabase
    .from("user_progress")
    .select("date, questions_attempted, questions_correct, study_minutes, s2_attempted, s2_correct, s3_attempted, s3_correct, structure_score, written_expression_score, reading_vocabulary_score, reading_inference_score, reading_main_idea_score")
    .eq("user_id", user.id)
    .gte("date", ninetyDaysAgo.toISOString().split("T")[0])
    .order("date", { ascending: true });

  // Profile for streak
  const { data: profile } = await supabase
    .from("profiles")
    .select("study_streak, target_score")
    .eq("id", user.id)
    .single();

  // Aggregate topic accuracy from daily progress
  const progressRows = dailyProgress ?? [];

  function avg(vals: (number | null | undefined)[]): number {
    const valid = vals.filter((v): v is number => v !== null && v !== undefined && !isNaN(v));
    if (valid.length === 0) return 0;
    return Math.round(valid.reduce((a, b) => a + b, 0) / valid.length);
  }

  const topicAccuracy = {
    structure: avg(progressRows.map((r) => r.structure_score)),
    written_expression: avg(progressRows.map((r) => r.written_expression_score)),
    vocab: avg(progressRows.map((r) => r.reading_vocabulary_score)),
    inference: avg(progressRows.map((r) => r.reading_inference_score)),
    main_idea: avg(progressRows.map((r) => r.reading_main_idea_score)),
  };

  // Section accuracy from all-time practice rows
  const allTimeS2Attempted = progressRows.reduce((s, r) => s + (r.s2_attempted ?? 0), 0);
  const allTimeS2Correct = progressRows.reduce((s, r) => s + (r.s2_correct ?? 0), 0);
  const allTimeS3Attempted = progressRows.reduce((s, r) => s + (r.s3_attempted ?? 0), 0);
  const allTimeS3Correct = progressRows.reduce((s, r) => s + (r.s3_correct ?? 0), 0);

  // Score chart (ascending chronological for the chart)
  const scoreHistory = [...(sessions ?? [])].reverse().map((s) => ({
    date: s.completed_at ? new Date(s.completed_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "–",
    total: s.total_scaled_score ?? 0,
    s2: s.s2_scaled_score ?? 0,
    s3: s.s3_scaled_score ?? 0,
  }));

  // Streak calendar — map to { date, count }
  const calendarData = progressRows.map((r) => ({
    date: r.date,
    count: r.questions_attempted ?? 0,
    minutes: r.study_minutes ?? 0,
  }));

  return NextResponse.json({
    scoreHistory,
    calendarData,
    topicAccuracy,
    streak: profile?.study_streak ?? 0,
    targetScore: profile?.target_score ?? 550,
    allTime: {
      s2: { attempted: allTimeS2Attempted, correct: allTimeS2Correct },
      s3: { attempted: allTimeS3Attempted, correct: allTimeS3Correct },
    },
    totalTestsTaken: (sessions ?? []).length,
    bestScore: Math.max(0, ...(sessions ?? []).map((s) => s.total_scaled_score ?? 0)),
    latestScore: sessions?.[0]?.total_scaled_score ?? null,
  });
}
