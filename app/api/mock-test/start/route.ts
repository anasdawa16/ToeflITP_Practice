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

  // S1 questions (Listening)
  const { data: s1Raw } = await supabase
    .from("questions")
    .select("*, audio_conversations(*)")
    .eq("section", 1)
    .eq("is_active", true);

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

  // s1OrderedIds computation is moved down since we shuffle S1 directly

  const { data: session, error: sessionError } = await supabase
    .from("test_sessions")
    .insert({
      user_id: user.id,
      test_type: testType,
      status: "in_progress",
      current_section: 1,
      current_question_index: 0,
      s1_question_ids: [], // We update this later after building S1 array
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

  // ── S1 Structure Building per ETS Rules ──────────────────────
  // Part A: 30 Qs (30 short convos, 1 Q each)
  // Part B: 8 Qs (2 long convos, 4 Q each)
  // Part C: 12 Qs (3 talks, 4 Q each)
  
  const allS1 = (s1Raw ?? []) as any[];
  
  // Group by Part A, B, C
  const partA = allS1.filter(q => q.part === 'A');
  const partB = allS1.filter(q => q.part === 'B');
  const partC = allS1.filter(q => q.part === 'C');
  
  // Shuffle Part A and pick 30
  const shuffledA = fisherYates([...partA]).slice(0, 30);
  
  // Group Part B by conversation_group_id
  const bGroups: Record<string, any[]> = {};
  partB.forEach(q => {
    const gid = q.conversation_group_id;
    if (!bGroups[gid]) bGroups[gid] = [];
    bGroups[gid].push(q);
  });
  
  // Pick 2 random B groups
  const selectedBGroups = fisherYates(Object.values(bGroups)).slice(0, 2);
  const selectedB = selectedBGroups.flatMap(group => 
    group.sort((a,b) => a.question_order_in_group - b.question_order_in_group)
  );

  // Group Part C by conversation_group_id
  const cGroups: Record<string, any[]> = {};
  partC.forEach(q => {
    const gid = q.conversation_group_id;
    if (!cGroups[gid]) cGroups[gid] = [];
    cGroups[gid].push(q);
  });
  
  // Pick 3 random C groups
  const selectedCGroups = fisherYates(Object.values(cGroups)).slice(0, 3);
  const selectedC = selectedCGroups.flatMap(group => 
    group.sort((a,b) => a.question_order_in_group - b.question_order_in_group)
  );

  // Final S1 array
  const s1SelectedQuestions = [...shuffledA, ...selectedB, ...selectedC];
  const s1OrderedIdsFinal = s1SelectedQuestions.map(q => q.id);
  
  // We must update the session with the correct S1 IDs
  await supabase.from("test_sessions").update({ s1_question_ids: s1OrderedIdsFinal } as any).eq("id", session.id);

  // Build audioGroups payload to send to client
  // Since we already joined `audio_conversations(*)`, we can construct it directly
  const audioGroupMap: Record<string, {
    id: string; title: string; transcript: string; part: "A" | "B" | "C";
    questions: any[];
  }> = {};

  for (const q of s1SelectedQuestions) {
    const conv = q.audio_conversations;
    if (!conv) continue;
    if (!audioGroupMap[conv.id]) {
      audioGroupMap[conv.id] = {
        id: conv.id,
        title: conv.title,
        transcript: conv.transcript,
        part: conv.section_part as "A" | "B" | "C",
        questions: [],
      };
    }
    audioGroupMap[conv.id].questions.push({
      id: String(q.id),
      questionText: String(q.question_text),
      option_a: String(q.option_a),
      option_b: String(q.option_b),
      option_c: String(q.option_c),
      option_d: String(q.option_d),
    });
  }

  // Preserve ordering: A -> B -> C
  const sortedAudioGroups = Object.values(audioGroupMap).sort((a,b) => {
    if (a.part !== b.part) return a.part.localeCompare(b.part);
    return 0; // The order within parts is already randomized via questions
  });

  return NextResponse.json({
    sessionId: session.id,
    testType,
    s1Questions: s1SelectedQuestions,
    audioGroups: sortedAudioGroups,
    s2Questions: s2Ordered,
    s3Questions: s3Ordered,
    passages,
  });
}
