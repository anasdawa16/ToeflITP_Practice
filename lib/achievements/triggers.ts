import { type SupabaseClient } from "@supabase/supabase-js";

/**
 * All supabase.from("achievements") calls use `as any` because the `achievements`
 * table is added via a manual migration and isn't in the auto-generated types yet.
 * Once types are regenerated (npx supabase gen types), remove the casts.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function achievementsTable(supabase: SupabaseClient): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (supabase as any).from("achievements");
}

async function unlock(
  supabase: SupabaseClient,
  userId: string,
  badgeId: string
): Promise<boolean> {
  const { error } = await achievementsTable(supabase).insert({ user_id: userId, badge_id: badgeId });
  // error.code "23505" = duplicate → already unlocked
  return !error;
}

async function alreadyHas(
  supabase: SupabaseClient,
  userId: string,
  badgeId: string
): Promise<boolean> {
  const { data } = await achievementsTable(supabase)
    .select("id")
    .eq("user_id", userId)
    .eq("badge_id", badgeId)
    .maybeSingle();
  return !!data;
}

// ── After completing a mock test ─────────────────────────────

export async function checkAfterTest(
  supabase: SupabaseClient,
  userId: string,
  opts: {
    totalScore: number;
    targetScore: number;
    totalTests: number;
    s2Raw: number;
    s2Total: number;
  }
): Promise<string[]> {
  const newlyUnlocked: string[] = [];

  if (opts.totalTests === 1) {
    if (await unlock(supabase, userId, "first_test")) newlyUnlocked.push("first_test");
  }
  if (opts.totalTests >= 5 && !(await alreadyHas(supabase, userId, "tests_5"))) {
    if (await unlock(supabase, userId, "tests_5")) newlyUnlocked.push("tests_5");
  }
  if (opts.totalTests >= 10 && !(await alreadyHas(supabase, userId, "tests_10"))) {
    if (await unlock(supabase, userId, "tests_10")) newlyUnlocked.push("tests_10");
  }

  const scoreBadges: Array<[number, string]> = [
    [400, "score_400"], [500, "score_500"], [600, "score_600"], [640, "score_640"],
  ];
  for (const [threshold, bid] of scoreBadges) {
    if (opts.totalScore >= threshold && !(await alreadyHas(supabase, userId, bid))) {
      if (await unlock(supabase, userId, bid)) newlyUnlocked.push(bid);
    }
  }

  if (opts.totalScore >= opts.targetScore && !(await alreadyHas(supabase, userId, "beat_target"))) {
    if (await unlock(supabase, userId, "beat_target")) newlyUnlocked.push("beat_target");
  }

  if (opts.s2Total === 40 && opts.s2Raw === 40 && !(await alreadyHas(supabase, userId, "perfect_s2"))) {
    if (await unlock(supabase, userId, "perfect_s2")) newlyUnlocked.push("perfect_s2");
  }

  return newlyUnlocked;
}

// ── After practice / drill session ───────────────────────────

export async function checkAfterPractice(
  supabase: SupabaseClient,
  userId: string,
  opts: {
    totalQuestionsAttempted: number;
    sessionCorrect: number;
    sessionTotal: number;
    passagesCompleted?: number;
    aiChats?: number;
    allTimeS2Correct: number;
    allTimeS2Attempted: number;
    allTimeS3Correct: number;
    allTimeS3Attempted: number;
  }
): Promise<string[]> {
  const newlyUnlocked: string[] = [];

  const qMilestones: Array<[number, string]> = [
    [50, "questions_50"], [200, "questions_200"], [500, "questions_500"],
  ];
  for (const [threshold, bid] of qMilestones) {
    if (opts.totalQuestionsAttempted >= threshold && !(await alreadyHas(supabase, userId, bid))) {
      if (await unlock(supabase, userId, bid)) newlyUnlocked.push(bid);
    }
  }

  if (opts.sessionTotal >= 10 && opts.sessionCorrect === opts.sessionTotal
      && !(await alreadyHas(supabase, userId, "accuracy_session_100"))) {
    if (await unlock(supabase, userId, "accuracy_session_100")) newlyUnlocked.push("accuracy_session_100");
  }

  if (opts.allTimeS2Attempted >= 40) {
    const acc = Math.round((opts.allTimeS2Correct / opts.allTimeS2Attempted) * 100);
    if (acc >= 80 && !(await alreadyHas(supabase, userId, "accuracy_s2_80"))) {
      if (await unlock(supabase, userId, "accuracy_s2_80")) newlyUnlocked.push("accuracy_s2_80");
    }
  }

  if (opts.allTimeS3Attempted >= 40) {
    const acc = Math.round((opts.allTimeS3Correct / opts.allTimeS3Attempted) * 100);
    if (acc >= 80 && !(await alreadyHas(supabase, userId, "accuracy_s3_80"))) {
      if (await unlock(supabase, userId, "accuracy_s3_80")) newlyUnlocked.push("accuracy_s3_80");
    }
  }

  if ((opts.passagesCompleted ?? 0) >= 10 && !(await alreadyHas(supabase, userId, "passages_10"))) {
    if (await unlock(supabase, userId, "passages_10")) newlyUnlocked.push("passages_10");
  }

  if ((opts.aiChats ?? 0) >= 5 && !(await alreadyHas(supabase, userId, "ai_chat_5"))) {
    if (await unlock(supabase, userId, "ai_chat_5")) newlyUnlocked.push("ai_chat_5");
  }

  return newlyUnlocked;
}

// ── After streak update ────────────────────────────────────

export async function checkAfterStreak(
  supabase: SupabaseClient,
  userId: string,
  currentStreak: number
): Promise<string[]> {
  const newlyUnlocked: string[] = [];
  const streakBadges: Array<[number, string]> = [
    [3, "streak_3"], [7, "streak_7"], [30, "streak_30"], [100, "streak_100"],
  ];
  for (const [threshold, bid] of streakBadges) {
    if (currentStreak >= threshold && !(await alreadyHas(supabase, userId, bid))) {
      if (await unlock(supabase, userId, bid)) newlyUnlocked.push(bid);
    }
  }
  return newlyUnlocked;
}
