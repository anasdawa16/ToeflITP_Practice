"use client";

import { useState, useMemo } from "react";
import { PassagePane } from "@/components/test/PassagePane";
import type { Question, Passage } from "@/types/test";

export type ReadingAnswer = "A" | "B" | "C" | "D";

interface ReadingInterfaceProps {
  passage: Passage;
  questions: Question[];
  answers: Record<string, ReadingAnswer>;
  currentIndex: number;
  onAnswer: (questionId: string, letter: ReadingAnswer) => void;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  /** Optional: highlight a specific line number in the passage */
  highlightLine?: number | null;
}

type MobileTab = "passage" | "questions";

/** Extract a referenced line number from question text, e.g. "…in line 12…" → 12 */
function extractLineRef(text: string): number | null {
  const match = text.match(/\blines?\s+(\d+)(?:\s*[-–]\s*\d+)?/i);
  if (match) return parseInt(match[1], 10);
  return null;
}

// ─── Single question card ─────────────────────────────────────

function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selected,
  onAnswer,
}: {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selected: ReadingAnswer | null;
  onAnswer: (l: ReadingAnswer) => void;
}) {
  return (
    <div style={{
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}>
      {/* Q counter */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          padding: "3px 12px",
          backgroundColor: "rgba(30,74,155,0.15)",
          border: "1px solid rgba(30,74,155,0.3)",
          borderRadius: "var(--radius-full)",
          color: "var(--color-primary-300)",
          fontSize: "var(--text-xs)",
          fontFamily: "var(--font-ui)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
        }}>
          Reading Comprehension
        </span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
          {questionNumber} / {totalQuestions}
        </span>
      </div>

      {/* Question text */}
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-base)",
        color: "var(--color-text-primary)",
        lineHeight: 1.75,
        margin: 0,
      }}>
        {question.question_text}
      </p>

      {/* Answer options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {(["A", "B", "C", "D"] as const).map((letter) => {
          const optKey = `option_${letter.toLowerCase()}` as keyof Question;
          const text = question[optKey] as string;
          const isSelected = selected === letter;

          return (
            <button
              key={letter}
              type="button"
              onClick={() => onAnswer(letter)}
              aria-pressed={isSelected}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "13px 14px",
                backgroundColor: isSelected ? "rgba(30,74,155,0.2)" : "var(--color-bg-card)",
                border: `1.5px solid ${isSelected ? "var(--color-primary-400)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-lg)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 120ms ease",
              }}
            >
              <span style={{
                flexShrink: 0, width: "24px", height: "24px", borderRadius: "50%",
                backgroundColor: isSelected ? "var(--color-primary-500)" : "rgba(255,255,255,0.06)",
                color: isSelected ? "#fff" : "var(--color-text-muted)",
                fontSize: "var(--text-xs)", fontWeight: 700, fontFamily: "var(--font-ui)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {letter}
              </span>
              <span style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-sm)",
                color: isSelected ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                lineHeight: 1.55,
              }}>
                {text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Progress dots ────────────────────────────────────────────

function ProgressDots({
  questions,
  answers,
  currentIndex,
  onGoTo,
}: {
  questions: Question[];
  answers: Record<string, ReadingAnswer>;
  currentIndex: number;
  onGoTo: (i: number) => void;
}) {
  return (
    <div style={{
      display: "flex",
      gap: "4px",
      padding: "10px 16px",
      borderTop: "1px solid var(--color-border)",
      backgroundColor: "var(--color-bg-surface)",
      overflowX: "auto",
    }}>
      {questions.map((q, idx) => {
        const answered = !!answers[q.id];
        const isCurrent = idx === currentIndex;
        return (
          <button
            key={q.id}
            type="button"
            onClick={() => onGoTo(idx)}
            title={`Q ${idx + 1}${answered ? " ✓" : ""}`}
            style={{
              width: isCurrent ? "24px" : "10px",
              height: "10px",
              borderRadius: isCurrent ? "5px" : "50%",
              border: "none",
              backgroundColor: isCurrent
                ? "var(--color-primary-400)"
                : answered
                ? "#34d399"
                : "rgba(255,255,255,0.12)",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 180ms ease",
              padding: 0,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── MAIN SPLIT-PANE READING INTERFACE ───────────────────────

export function ReadingInterface({
  passage,
  questions,
  answers,
  currentIndex,
  onAnswer,
  onNext,
  onPrev,
  onGoTo,
}: ReadingInterfaceProps) {
  const [mobileTab, setMobileTab] = useState<MobileTab>("passage");

  const currentQ = questions[currentIndex] ?? null;
  const selected = currentQ ? (answers[currentQ.id] ?? null) : null;

  // Auto-detect line reference from current question
  const hlLine = useMemo(
    () => (currentQ ? extractLineRef(currentQ.question_text) : null),
    [currentQ]
  );

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  // ── Navigation bar (shared desktop + mobile) ──────────────
  const NavBar = (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 16px",
      borderTop: "1px solid var(--color-border)",
      backgroundColor: "var(--color-bg-surface)",
      gap: "10px",
    }}>
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        style={{
          padding: "8px 16px",
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-secondary)",
          cursor: isFirst ? "default" : "pointer",
          opacity: isFirst ? 0.35 : 1,
        }}
      >
        ← Prev
      </button>

      {/* Q jump select — compact */}
      <select
        value={currentIndex}
        onChange={(e) => onGoTo(Number(e.target.value))}
        style={{
          padding: "6px 8px",
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-secondary)",
          cursor: "pointer",
          maxWidth: "140px",
        }}
      >
        {questions.map((q, i) => (
          <option key={q.id} value={i}>
            Q{i + 1}{answers[q.id] ? " ✓" : ""}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onNext}
        style={{
          padding: "8px 18px",
          backgroundColor: "var(--color-primary-500)",
          border: "none",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-xs)",
          fontWeight: 700,
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {isLast ? "Done ✓" : "Next →"}
      </button>
    </div>
  );

  // ── DESKTOP: side-by-side split ───────────────────────────
  return (
    <>
      {/* ——— DESKTOP LAYOUT ——————————————————————————————————— */}
      <div
        className="reading-desktop"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "calc(100vh - 64px)",
          overflow: "hidden",
        }}
      >
        {/* LEFT: Passage */}
        <div style={{
          borderRight: "1px solid var(--color-border)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          <PassagePane
            title={passage.title}
            content={passage.content}
            topic={passage.topic}
            highlightLine={hlLine}
          />
        </div>

        {/* RIGHT: Questions */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "var(--color-bg-base)",
        }}>
          {/* Scrollable question area */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {currentQ && (
              <QuestionCard
                question={currentQ}
                questionNumber={currentIndex + 1}
                totalQuestions={questions.length}
                selected={selected}
                onAnswer={(l) => onAnswer(currentQ.id, l)}
              />
            )}
          </div>

          {/* Progress dots */}
          <ProgressDots
            questions={questions}
            answers={answers}
            currentIndex={currentIndex}
            onGoTo={onGoTo}
          />

          {/* Nav bar */}
          {NavBar}
        </div>
      </div>

      {/* ——— MOBILE LAYOUT ——————————————————————————————————— */}
      <div
        className="reading-mobile"
        style={{
          display: "none",
          flexDirection: "column",
          height: "calc(100vh - 64px)",
        }}
      >
        {/* Tab switcher */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg-surface)",
        }}>
          {(["passage", "questions"] as MobileTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMobileTab(tab)}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderBottom: `2px solid ${mobileTab === tab ? "var(--color-primary-400)" : "transparent"}`,
                backgroundColor: "transparent",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-sm)",
                fontWeight: mobileTab === tab ? 700 : 400,
                color: mobileTab === tab ? "var(--color-primary-300)" : "var(--color-text-muted)",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {tab === "passage" ? "📖 Passage" : "❓ Questions"}
              {tab === "questions" && (
                <span style={{ marginLeft: "6px", fontSize: "11px" }}>
                  ({Object.keys(answers).length}/{questions.length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile tab content */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {mobileTab === "passage" ? (
            <PassagePane
              title={passage.title}
              content={passage.content}
              topic={passage.topic}
              highlightLine={hlLine}
            />
          ) : (
            <div style={{ flex: 1, overflowY: "auto" }}>
              {currentQ && (
                <QuestionCard
                  question={currentQ}
                  questionNumber={currentIndex + 1}
                  totalQuestions={questions.length}
                  selected={selected}
                  onAnswer={(l) => {
                    onAnswer(currentQ.id, l);
                    // Auto-switch to questions after answering if on passage tab
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Mobile nav always visible */}
        <ProgressDots
          questions={questions}
          answers={answers}
          currentIndex={currentIndex}
          onGoTo={onGoTo}
        />
        {NavBar}
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .reading-desktop { display: none !important; }
          .reading-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
