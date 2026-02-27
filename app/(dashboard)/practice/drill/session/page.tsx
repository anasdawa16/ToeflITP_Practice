import { createClient } from "@/lib/supabase/server";
import { PracticeClient } from "@/components/test/PracticeClient";
import Link from "next/link";
import type { Question, Passage } from "@/types/test";

interface Props {
  searchParams: Promise<{
    part?: string;
    topic?: string;
    difficulty?: string;
    limit?: string;
    passage_id?: string;
  }>;
}

function buildLabel(part?: string, topic?: string, difficulty?: string): string {
  const sectionMap: Record<string, string> = {
    structure: "Section 2 · Structure",
    written_expression: "Section 2 · Written Expression",
    reading: "Section 3 · Reading",
  };
  const parts = [
    sectionMap[part ?? ""] ?? "All S2",
    topic ? topic.replace(/_/g, " ") : null,
    difficulty && difficulty !== "0" ? `Difficulty ${difficulty}` : null,
  ].filter(Boolean);
  return parts.join(" · ");
}

export default async function DrillSessionPage({ searchParams }: Props) {
  const params = await searchParams;
  const limit = Math.min(Number(params.limit ?? "20"), 100);
  const supabase = await createClient();

  let questions: Question[] = [];
  let passage: Passage | null = null;

  const isReading = params.part === "reading";

  if (isReading) {
    // Pick a random passage (or specified)
    let passageId = params.passage_id;
    if (!passageId) {
      const { data: allPassages } = await supabase
        .from("passages")
        .select("id, difficulty")
        .eq("is_active", true);

      let pool = allPassages ?? [];
      if (params.difficulty && params.difficulty !== "0") {
        const d = Number(params.difficulty);
        pool = pool.filter((p) => p.difficulty === d);
      }
      if (pool.length > 0) {
        passageId = pool[Math.floor(Math.random() * pool.length)].id;
      }
    }

    if (passageId) {
      const [pr, qr] = await Promise.all([
        supabase.from("passages").select("*").eq("id", passageId).single(),
        supabase
          .from("questions")
          .select("*")
          .eq("passage_id", passageId)
          .eq("is_active", true),
      ]);
      passage = pr.data as Passage | null;
      questions = (qr.data ?? []) as Question[];
    }
  } else {
    // Section 2 questions
    let q = supabase
      .from("questions")
      .select("*")
      .eq("section", 2)
      .eq("is_active", true);

    if (params.part && params.part !== "all") q = q.eq("part", params.part);
    if (params.difficulty && params.difficulty !== "0") q = q.eq("difficulty", Number(params.difficulty));
    if (params.topic) q = q.contains("topic_tags", [params.topic]);

    q = q.limit(limit * 3); // fetch more for shuffle
    const { data } = await q;
    questions = (data ?? []) as Question[];
  }

  // Shuffle then cap
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  questions = questions.slice(0, limit);

  if (questions.length === 0) {
    return (
      <div style={{ padding: "40px 24px", maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>😕</p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            color: "var(--color-text-primary)",
            marginBottom: "8px",
          }}
        >
          No questions found
        </h2>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
            marginBottom: "24px",
          }}
        >
          No questions match your selected filters. Try adjusting the topic, difficulty, or section.
        </p>
        <Link
          href="/practice/drill"
          style={{
            padding: "10px 24px",
            backgroundColor: "var(--color-primary-500)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ← Change Filters
        </Link>
      </div>
    );
  }

  const sessionLabel = buildLabel(params.part, params.topic, params.difficulty);

  return (
    <div style={{ padding: "32px 24px" }}>
      {/* Back to drill config */}
      <div style={{ maxWidth: "760px", margin: "0 auto 20px" }}>
        <Link
          href="/practice/drill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-muted)",
            textDecoration: "none",
            marginBottom: "16px",
          }}
        >
          ← Change Filters
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "4px",
          }}
        >
          🎯 Topic Drill
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
          }}
        >
          {sessionLabel} · {questions.length} question{questions.length !== 1 ? "s" : ""}
          {passage ? ` — ${passage.title}` : ""}
        </p>
      </div>

      <PracticeClient
        questions={questions}
        passage={passage}
        sectionLabel={sessionLabel}
      />
    </div>
  );
}
