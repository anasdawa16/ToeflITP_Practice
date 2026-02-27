import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { processCorrect, processIncorrect } from "@/lib/utils/srs";

interface UserVocabRow {
  vocab_id: string;
  status: "new" | "learning" | "mastered";
  review_count: number;
  next_review_date: string | null;
}

/**
 * GET /api/vocabulary
 * Query params:
 *   ?filter=due|all, ?category=..., ?limit=20
 */
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") ?? "all";
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  // Fetch vocab words (cast category to avoid strict union type issue)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let vocabQuery = (supabase as any)
    .from("vocabulary")
    .select("id, word, definition, example_sentence, part_of_speech, difficulty, category, synonyms, collocations")
    .order("difficulty", { ascending: true })
    .limit(200);

  if (category && category !== "all") {
    vocabQuery = vocabQuery.eq("category", category);
  }

  const { data: allWords } = await vocabQuery as { data: Array<{
    id: string; word: string; definition: string; example_sentence: string;
    part_of_speech: string; difficulty: number; category: string;
    synonyms: string[]; collocations: string[];
  }> | null };

  // Fetch user SRS state
  const { data: userVocab } = await supabase
    .from("user_vocabulary")
    .select("vocab_id, status, review_count, next_review_date")
    .eq("user_id", user.id);

  const vocabMap = new Map<string, UserVocabRow>(
    (userVocab ?? []).map((uv) => [
      uv.vocab_id,
      {
        vocab_id: uv.vocab_id,
        status: (uv.status ?? "new") as "new" | "learning" | "mastered",
        review_count: (uv.review_count as number | null) ?? 0,
        next_review_date: uv.next_review_date as string | null,
      }
    ])
  );

  const today = new Date().toISOString().split("T")[0];

  const words = (allWords ?? []).map((w) => {
    const uv = vocabMap.get(w.id);
    const isDue = !uv?.next_review_date || uv.next_review_date <= today;
    return {
      ...w,
      status: uv?.status ?? "new",
      review_count: uv?.review_count ?? 0,
      next_review_date: uv?.next_review_date ?? null,
      is_due: isDue,
    };
  });

  const filtered = filter === "due"
    ? words.filter((w) => w.is_due).slice(0, limit)
    : words.slice(0, limit);

  const stats = {
    total: words.length,
    due: words.filter((w) => w.is_due).length,
    mastered: words.filter((w) => w.status === "mastered").length,
    learning: words.filter((w) => w.status === "learning").length,
    new_count: words.filter((w) => w.status === "new").length,
  };

  return NextResponse.json({ words: filtered, stats });
}

/**
 * POST /api/vocabulary
 * Body: { vocab_id, result: "correct"|"incorrect", current_box? }
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as { vocab_id: string; result: "correct" | "incorrect"; current_box?: number };
  if (!body.vocab_id || !body.result) return NextResponse.json({ error: "vocab_id and result required" }, { status: 400 });

  const currentBox = body.current_box ?? 1;
  const srsResult = body.result === "correct"
    ? processCorrect(currentBox)
    : processIncorrect();

  await supabase.from("user_vocabulary").upsert({
    user_id: user.id,
    vocab_id: body.vocab_id,
    status: srsResult.status,
    review_count: currentBox,
    next_review_date: srsResult.nextReviewDate,
  }, { onConflict: "user_id,vocab_id" });

  return NextResponse.json({ srsResult });
}
