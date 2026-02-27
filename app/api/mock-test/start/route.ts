import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { buildSection2Order, buildSection3Order, fisherYates } from "@/lib/utils/shuffler";
import type { Question, Passage } from "@/types/test";

/**
 * POST /api/mock-test/start
 * Body: { test_type: "full_mock" | "section_practice", sections?: number[] }
 *
 * 1. Fetch all active questions for requested sections
 * 2. Shuffle & order per TOEFL ITP spec
 * 3. Create test_session row in Supabase
 * 4. Return session + all question data to client
 */
export async function POST(request: Request) {
  const supabase = await createClient();

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const testType: "full_mock" | "section_practice" = body.test_type ?? "full_mock";

  // ── Fetch questions ──────────────────────────────────────────

  // S2 questions (Structure + Written Expression)
  const { data: s2Raw } = await supabase
    .from("questions")
    .select("*")
    .eq("section", 2)
    .eq("is_active", true);

  // S3 questions with passage data
  const { data: s3Raw } = await supabase
    .from("questions")
    .select("*")
    .eq("section", 3)
    .eq("is_active", true);

  // Passages for S3
  const s3Questions = (s3Raw ?? []) as Question[];
  const passageIds = [...new Set(s3Questions.map((q) => q.passage_id).filter(Boolean))] as string[];
  const { data: passagesRaw } = passageIds.length
    ? await supabase.from("passages").select("*").in("id", passageIds)
    : { data: [] };

  const passages: Record<string, Passage> = {};
  for (const p of passagesRaw ?? []) {
    passages[p.id] = p as Passage;
  }

  // ── Build ordered ID arrays ──────────────────────────────────

  const s2All = (s2Raw ?? []) as Question[];
  const structureIds = s2All.filter((q) => q.part === "structure").map((q) => q.id);
  const weIds = s2All.filter((q) => q.part === "written_expression").map((q) => q.id);

  const s2OrderedIds = buildSection2Order(structureIds, weIds);
  const s3OrderedIds = buildSection3Order(
    s3Questions.map((q) => ({
      id: q.id,
      passage_id: q.passage_id,
      question_order_in_group: q.question_order_in_group,
    }))
  );

  // S1 placeholder (audio not implemented yet — empty for now)
  const s1OrderedIds: string[] = [];

  // ── Create session row ───────────────────────────────────────

  const { data: session, error: sessionError } = await supabase
    .from("test_sessions")
    .insert({
      user_id: user.id,
      test_type: testType,
      status: "in_progress",
      current_section: 2,
      current_question_index: 0,
      s1_question_ids: s1OrderedIds,
      s2_question_ids: s2OrderedIds,
      s3_question_ids: s3OrderedIds,
      s1_time_remaining: 2100,
      s2_time_remaining: 1500,
      s3_time_remaining: 3300,
    })
    .select("id")
    .single();

  if (sessionError || !session) {
    return NextResponse.json({ error: sessionError?.message ?? "Failed to create session" }, { status: 500 });
  }

  // ── Build ordered question objects for client ─────────────────

  const s2Map = Object.fromEntries(s2All.map((q) => [q.id, q]));
  const s3Map = Object.fromEntries(s3Questions.map((q) => [q.id, q]));

  const s2Ordered = s2OrderedIds.map((id) => s2Map[id]).filter(Boolean) as Question[];
  const s3Ordered = s3OrderedIds.map((id) => s3Map[id]).filter(Boolean) as Question[];

  return NextResponse.json({
    sessionId: session.id,
    testType,
    s1Questions: [] as Question[],
    s2Questions: s2Ordered,
    s3Questions: s3Ordered,
    passages,
  });
}
