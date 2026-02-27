import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { BADGES } from "@/lib/achievements/badges";

/**
 * GET /api/achievements
 * Returns all badge definitions with unlocked status for the current user.
 * Uses `as any` cast because the `achievements` table is added via manual migration
 * and isn't in the auto-generated Supabase types yet.
 */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: unlocked } = await (supabase as any)
    .from("achievements")
    .select("badge_id, unlocked_at")
    .eq("user_id", user.id) as { data: Array<{ badge_id: string; unlocked_at: string }> | null };

  const unlockedMap = new Map<string, string>(
    (unlocked ?? []).map((r) => [r.badge_id, r.unlocked_at])
  );

  const result = BADGES.map((badge) => ({
    ...badge,
    unlocked: unlockedMap.has(badge.id),
    unlocked_at: unlockedMap.get(badge.id) ?? null,
  }));

  return NextResponse.json({ badges: result, totalUnlocked: unlockedMap.size });
}
