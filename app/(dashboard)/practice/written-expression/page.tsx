import { createClient } from "@/lib/supabase/server";
import { PracticeClient } from "@/components/test/PracticeClient";
import type { Question } from "@/types/test";

interface Props {
  searchParams: Promise<{ limit?: string }>;
}

export default async function WrittenExpressionPracticePage({ searchParams }: Props) {
  const params = await searchParams;
  const limit = Math.min(Number(params.limit ?? "20"), 50);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("section", 2)
    .eq("part", "written_expression")
    .eq("is_active", true)
    .limit(limit);

  if (error || !data) {
    return (
      <div style={{ padding: "32px", color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)" }}>
        Failed to load questions. Please try again.
      </div>
    );
  }

  const shuffled = [...data] as Question[];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return (
    <div style={{ padding: "32px 24px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", marginBottom: "28px" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "4px",
          }}
        >
          Written Expression Practice
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
          }}
        >
          Section 2 Part B · {shuffled.length} questions · Identify the underlined error in each sentence.
        </p>
      </div>

      <PracticeClient
        questions={shuffled}
        sectionLabel="Section 2 · Written Expression"
      />
    </div>
  );
}
