import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { QuestionsQuery } from "@/types/test";

export const runtime = "edge";

/**
 * GET /api/questions
 * Query params: section, part, topic, difficulty, limit, passage_id
 * Returns shuffled question set (no audio for S1 in this phase).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query: QuestionsQuery = {
    section: searchParams.get("section")
      ? (Number(searchParams.get("section")) as QuestionsQuery["section"])
      : undefined,
    part: searchParams.get("part") ?? undefined,
    topic: searchParams.get("topic") ?? undefined,
    difficulty: searchParams.get("difficulty")
      ? Number(searchParams.get("difficulty"))
      : undefined,
    limit: searchParams.get("limit")
      ? Math.min(Number(searchParams.get("limit")), 100)
      : 20,
    passage_id: searchParams.get("passage_id") ?? undefined,
  };

  const supabase = await createClient();

  let dbQuery = supabase
    .from("questions")
    .select("*")
    .eq("is_active", true);

  if (query.section) dbQuery = dbQuery.eq("section", query.section);
  if (query.part) dbQuery = dbQuery.eq("part", query.part);
  if (query.difficulty) dbQuery = dbQuery.eq("difficulty", query.difficulty);
  if (query.passage_id) dbQuery = dbQuery.eq("passage_id", query.passage_id);
  if (query.topic) dbQuery = dbQuery.contains("topic_tags", [query.topic]);

  // Shuffle by random ordering via limit
  dbQuery = dbQuery.limit(query.limit ?? 20);

  const { data, error } = await dbQuery;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fisher-Yates shuffle on the result set
  const shuffled = [...(data ?? [])];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return NextResponse.json({ questions: shuffled, total: shuffled.length });
}
