"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReadingInterface } from "@/components/test/ReadingInterface";
import type { Question, Passage } from "@/types/test";

interface Props {
  passage: Passage;
  questions: Question[];
}

/**
 * Client wrapper for reading practice — manages local answer state
 * and completion navigation.
 */
export function ReadingPracticeClient({ passage, questions }: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  function handleAnswer(qId: string, letter: "A" | "B" | "C" | "D") {
    setAnswers((prev) => ({ ...prev, [qId]: letter }));
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  }

  function handlePrev() {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }

  if (showResult) {
    // Count correct answers (we need the correct_answer field)
    const correct = questions.filter((q) => answers[q.id] === q.correct_answer).length;
    const pct = Math.round((correct / questions.length) * 100);

    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: "70vh", gap: "24px", padding: "32px 24px", maxWidth: "500px", margin: "0 auto",
      }}>
        <div style={{ fontSize: "64px" }}>{pct >= 70 ? "🎉" : pct >= 50 ? "👍" : "📚"}</div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "6px" }}>
            Reading Complete
          </h2>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", fontWeight: 700, color: "var(--color-primary-300)", marginBottom: "4px" }}>
            {correct} / {questions.length}
          </p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
            {pct}% accuracy on &ldquo;{passage.title}&rdquo;
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", width: "100%" }}>
          <button
            onClick={() => router.push("/practice/reading")}
            style={{ flex: 1, padding: "12px", backgroundColor: "rgba(30,74,155,0.15)", border: "1px solid rgba(30,74,155,0.3)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-primary-300)", cursor: "pointer" }}
          >
            New Passage
          </button>
          <button
            onClick={() => { setAnswers({}); setCurrentIndex(0); setShowResult(false); }}
            style={{ flex: 1, padding: "12px", backgroundColor: "var(--color-primary-500)", border: "none", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#fff", cursor: "pointer" }}
          >
            Retry This Passage
          </button>
        </div>
      </div>
    );
  }

  return (
    <ReadingInterface
      passage={passage}
      questions={questions}
      answers={answers}
      currentIndex={currentIndex}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrev={handlePrev}
      onGoTo={setCurrentIndex}
    />
  );
}
