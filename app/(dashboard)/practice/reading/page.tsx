import { createClient } from "@/lib/supabase/server";
import { ReadingPracticeClient } from "@/components/test/ReadingPracticeClient";
import type { Question, Passage } from "@/types/test";

interface Props {
  searchParams: Promise<{ passage_id?: string }>;
}

export default async function ReadingPracticePage({ searchParams }: Props) {
  const supabase = await createClient();
  const sp = await searchParams;

  // Pick a passage (specific or random)
  let passageData: Passage | null = null;

  if (sp.passage_id) {
    const { data } = await supabase
      .from("passages")
      .select("*")
      .eq("id", sp.passage_id)
      .single();
    passageData = data as Passage | null;
  }

  if (!passageData) {
    // Pick a random passage
    const { data: all } = await supabase
      .from("passages")
      .select("id")
      .eq("is_active", true);
    if (all && all.length > 0) {
      const randomId = all[Math.floor(Math.random() * all.length)].id;
      const { data } = await supabase
        .from("passages")
        .select("*")
        .eq("id", randomId)
        .single();
      passageData = data as Passage | null;
    }
  }

  if (!passageData) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px", fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>📖</p>
        <p style={{ fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "8px" }}>No reading passages available</p>
        <p>Reading passages will be available after migrations are applied.</p>
      </div>
    );
  }

  // Fetch questions for this passage
  const { data: questionsRaw } = await supabase
    .from("questions")
    .select("*")
    .eq("section", 3)
    .eq("passage_id", passageData.id)
    .eq("is_active", true)
    .order("question_order_in_group", { ascending: true });

  const questions = (questionsRaw ?? []) as Question[];

  return (
    <ReadingPracticeClient
      passage={passageData}
      questions={questions}
    />
  );
}
