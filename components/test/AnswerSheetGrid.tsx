"use client";

import type { TestSection } from "@/lib/stores/testStore";
import type { SectionAnswers } from "@/lib/stores/testStore";
import type { Question } from "@/types/test";

interface AnswerSheetProps {
  section: TestSection;
  questions: Question[];
  answers: SectionAnswers;
  currentIndex: number;
  onGoTo: (index: number) => void;
}

/** Color coding for each cell state */
function cellStyle(state: "current" | "answered" | "flagged" | "unanswered"): React.CSSProperties {
  switch (state) {
    case "current":
      return {
        backgroundColor: "var(--color-primary-500)",
        color: "#fff",
        border: "2px solid var(--color-primary-300)",
        fontWeight: 700,
      };
    case "answered":
      return {
        backgroundColor: "rgba(52,211,153,0.15)",
        color: "#34d399",
        border: "1px solid rgba(52,211,153,0.4)",
        fontWeight: 600,
      };
    case "flagged":
      return {
        backgroundColor: "rgba(251,191,36,0.14)",
        color: "#fbbf24",
        border: "1px solid rgba(251,191,36,0.4)",
        fontWeight: 600,
      };
    case "unanswered":
    default:
      return {
        backgroundColor: "rgba(255,255,255,0.04)",
        color: "var(--color-text-muted)",
        border: "1px solid var(--color-border)",
        fontWeight: 400,
      };
  }
}

export function AnswerSheetGrid({
  section,
  questions,
  answers,
  currentIndex,
  onGoTo,
}: AnswerSheetProps) {
  const answered = Object.keys(answers).length;
  const flagged = Object.values(answers).filter((a) => a.flagged).length;
  const unanswered = questions.length - answered;

  // Group into WE vs Structure for S2
  const structureEnd = section === 2
    ? questions.findIndex((q) => q.part === "written_expression")
    : -1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Legend */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {[
          { color: "#34d399", label: `${answered} Answered` },
          { color: "#fbbf24", label: `${flagged} Flagged` },
          { color: "var(--color-text-muted)", label: `${unanswered} Remaining` },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: l.color, flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "var(--color-text-muted)" }}>
              {l.label}
            </span>
          </div>
        ))}
      </div>

      {/* S2 group divider label */}
      {section === 2 && structureEnd > 0 && (
        <div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", marginBottom: "8px" }}>
            Structure (1–{structureEnd})
          </p>
        </div>
      )}

      {/* Question grid */}
      <div
        role="grid"
        aria-label="Answer sheet"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))",
          gap: "5px",
        }}
      >
        {questions.map((q, idx) => {
          const ans = answers[q.id];
          const isCurrent = idx === currentIndex;
          const isFlagged = ans?.flagged;
          const isAnswered = !!ans?.selected;

          const state = isCurrent ? "current"
            : isFlagged ? "flagged"
            : isAnswered ? "answered"
            : "unanswered";

          // Insert WE section label
          const isWEStart = section === 2 && structureEnd > 0 && idx === structureEnd;

          return (
            <div key={q.id}>
              {isWEStart && (
                <div style={{
                  gridColumn: "1 / -1",
                  fontFamily: "var(--font-ui)",
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-text-muted)",
                  paddingTop: "4px",
                  paddingBottom: "6px",
                }}>
                  Written Expression ({structureEnd + 1}–{questions.length})
                </div>
              )}
              <button
                type="button"
                role="gridcell"
                aria-label={`Question ${idx + 1}${isCurrent ? " (current)" : ""}${isFlagged ? " — flagged" : ""}${isAnswered ? ` — answered ${ans.selected}` : " — unanswered"}`}
                onClick={() => onGoTo(idx)}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 100ms ease",
                  fontSize: "11px",
                  fontFamily: "var(--font-ui)",
                  gap: "1px",
                  ...cellStyle(state),
                }}
              >
                <span>{idx + 1}</span>
                {isAnswered && !isCurrent && (
                  <span style={{ fontSize: "9px", opacity: 0.8, lineHeight: 1 }}>
                    {ans.selected}
                  </span>
                )}
                {isFlagged && !isCurrent && (
                  <span style={{ fontSize: "8px", lineHeight: 1 }}>🚩</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
