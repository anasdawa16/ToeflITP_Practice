"use client";

import { useState } from "react";
import { usePracticeSession } from "@/lib/hooks/usePracticeSession";
import { QuestionCard } from "@/components/test/QuestionCard";
import { AnswerOptions } from "@/components/test/AnswerOptions";
import { ExplanationPanel } from "@/components/test/ExplanationPanel";
import { TestProgress } from "@/components/test/TestProgress";
import type { Question, Passage, AnswerLetter } from "@/types/test";

interface PracticeClientProps {
  questions: Question[];
  passage?: Passage | null;
  sectionLabel: string;
}

function ResultsScreen({
  total,
  correct,
  onRetry,
}: {
  total: number;
  correct: number;
  onRetry: () => void;
}) {
  const pct = Math.round((correct / total) * 100);
  const grade =
    pct >= 85 ? { label: "Excellent", color: "#34d399" }
    : pct >= 70 ? { label: "Good", color: "var(--color-accent-300)" }
    : pct >= 50 ? { label: "Fair", color: "#fbbf24" }
    : { label: "Needs Work", color: "#f87171" };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          border: `4px solid ${grade.color}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.04)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: 700,
            color: grade.color,
            lineHeight: 1,
          }}
        >
          {pct}%
        </span>
      </div>

      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "8px",
          }}
        >
          {grade.label}!
        </h2>
        <p style={{ fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)", fontSize: "var(--text-base)" }}>
          You answered{" "}
          <strong style={{ color: "#34d399" }}>{correct}</strong> out of{" "}
          <strong>{total}</strong> questions correctly.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: "16px" }}>
        {[
          { label: "Correct", value: correct, color: "#34d399" },
          { label: "Incorrect", value: total - correct, color: "#f87171" },
          { label: "Accuracy", value: `${pct}%`, color: grade.color },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              padding: "16px 24px",
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              textAlign: "center",
              minWidth: "90px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-2xl)",
                fontWeight: 700,
                color: s.color,
                marginBottom: "4px",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                fontWeight: 600,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onRetry}
        style={{
          padding: "12px 32px",
          backgroundColor: "var(--color-primary-500)",
          color: "#fff",
          border: "none",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-base)",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Practice Again
      </button>
    </div>
  );
}

export function PracticeClient({ questions, passage, sectionLabel }: PracticeClientProps) {
  const {
    state,
    currentQuestion,
    currentAnswer,
    feedback,
    isAnswered,
    isLast,
    correctCount,
    submitAnswer,
    goNext,
  } = usePracticeSession({ questions, passage });

  if (!currentQuestion) return null;

  if (state.completed) {
    return (
      <ResultsScreen
        total={questions.length}
        correct={correctCount}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const optionMap: Record<AnswerLetter, string> = {
    A: currentQuestion.option_a,
    B: currentQuestion.option_b,
    C: currentQuestion.option_c,
    D: currentQuestion.option_d,
  };
  const correctText = `(${currentQuestion.correct_answer}) ${optionMap[currentQuestion.correct_answer]}`;

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <TestProgress
        current={state.currentIndex + 1}
        total={questions.length}
        correctCount={correctCount}
        sectionLabel={sectionLabel}
      />

      <QuestionCard
        question={currentQuestion}
        passage={state.passage}
        questionNumber={state.currentIndex + 1}
      >
        <AnswerOptions
          question={currentQuestion}
          selected={currentAnswer?.selected ?? null}
          feedback={feedback}
          onSelect={submitAnswer as (a: AnswerLetter) => void}
          disabled={isAnswered}
        />
      </QuestionCard>

      {isAnswered && (
        <ExplanationPanel
          explanation={currentQuestion.explanation}
          isCorrect={currentAnswer!.isCorrect}
          correctAnswerText={correctText}
          onNext={goNext}
          isLast={isLast}
        />
      )}
    </div>
  );
}
