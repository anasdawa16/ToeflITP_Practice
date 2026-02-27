"use client";

import type { AnswerLetter, Question } from "@/types/test";

/** Maps answer letters to labels */
const LETTERS: AnswerLetter[] = ["A", "B", "C", "D"];

interface AnswerOptionsProps {
  question: Question;
  selected: AnswerLetter | null;
  feedback: "none" | "correct" | "incorrect";
  onSelect: (answer: AnswerLetter) => void;
  disabled: boolean;
}

export function AnswerOptions({
  question,
  selected,
  feedback,
  onSelect,
  disabled,
}: AnswerOptionsProps) {
  const options: Record<AnswerLetter, string> = {
    A: question.option_a,
    B: question.option_b,
    C: question.option_c,
    D: question.option_d,
  };

  const isWrittenExpression = question.part === "written_expression";

  return (
    <div
      role="radiogroup"
      aria-label="Answer choices"
      style={{
        display: "flex",
        flexDirection: isWrittenExpression ? "row" : "column",
        gap: isWrittenExpression ? "10px" : "10px",
        flexWrap: "wrap",
      }}
    >
      {LETTERS.map((letter) => {
        const isSelected = selected === letter;
        const isCorrect = question.correct_answer === letter;
        const showCorrect = feedback !== "none" && isCorrect;
        const showWrong = feedback !== "none" && isSelected && !isCorrect;

        // Determine tile colours
        let borderColor = "var(--color-border)";
        let backgroundColor = "var(--color-bg-card)";
        let textColor = "var(--color-text-primary)";
        let letterBg = "rgba(255,255,255,0.06)";
        let letterColor = "var(--color-text-muted)";

        if (isSelected && feedback === "none") {
          borderColor = "var(--color-primary-400)";
          backgroundColor = "rgba(30,74,155,0.15)";
          letterBg = "var(--color-primary-600)";
          letterColor = "var(--color-primary-100)";
        }
        if (showCorrect) {
          borderColor = "#34d399";
          backgroundColor = "rgba(52,211,153,0.12)";
          letterBg = "#34d399";
          letterColor = "#022c22";
          textColor = "#a7f3d0";
        }
        if (showWrong) {
          borderColor = "#f87171";
          backgroundColor = "rgba(248,113,113,0.12)";
          letterBg = "#f87171";
          letterColor = "#450a0a";
          textColor = "#fca5a5";
        }

        return (
          <button
            key={letter}
            role="radio"
            aria-checked={isSelected}
            type="button"
            disabled={disabled && !showCorrect && !showWrong}
            onClick={() => !disabled && onSelect(letter)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: isWrittenExpression ? "10px 16px" : "14px 16px",
              backgroundColor,
              border: `1.5px solid ${borderColor}`,
              borderRadius: "var(--radius-lg)",
              cursor: disabled ? "default" : "pointer",
              textAlign: "left",
              transition: "all 150ms ease",
              flex: isWrittenExpression ? "1 1 130px" : "1",
              minWidth: isWrittenExpression ? "120px" : "auto",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              if (!disabled && !isSelected) {
                e.currentTarget.style.borderColor = "var(--color-primary-500)";
                e.currentTarget.style.backgroundColor = "rgba(30,74,155,0.08)";
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled && !isSelected) {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.backgroundColor = "var(--color-bg-card)";
              }
            }}
          >
            {/* Letter badge */}
            <span
              style={{
                flexShrink: 0,
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: letterBg,
                color: letterColor,
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                fontFamily: "var(--font-ui)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1px",
              }}
            >
              {letter}
            </span>

            {/* Option text */}
            <span
              style={{
                fontSize: "var(--text-sm)",
                fontFamily: isWrittenExpression
                  ? "var(--font-body)"
                  : "var(--font-ui)",
                color: textColor,
                lineHeight: 1.55,
                flex: 1,
                fontStyle: isWrittenExpression ? "italic" : "normal",
                textDecoration: isWrittenExpression ? "underline" : "none",
                textUnderlineOffset: "3px",
              }}
            >
              {options[letter]}
            </span>

            {/* Check / X icon */}
            {showCorrect && (
              <span
                style={{
                  fontSize: "14px",
                  color: "#34d399",
                  flexShrink: 0,
                  marginLeft: "auto",
                }}
              >
                ✓
              </span>
            )}
            {showWrong && (
              <span
                style={{
                  fontSize: "14px",
                  color: "#f87171",
                  flexShrink: 0,
                  marginLeft: "auto",
                }}
              >
                ✗
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
