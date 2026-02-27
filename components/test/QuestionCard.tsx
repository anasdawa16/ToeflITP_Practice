"use client";

import type { Question, Passage } from "@/types/test";

interface QuestionCardProps {
  question: Question;
  passage?: Passage | null;
  questionNumber: number;
  /** children = AnswerOptions rendered by parent */
  children: React.ReactNode;
}

/**
 * Renders the question stem based on section/part type:
 * - Structure: blank fill sentence
 * - Written Expression: sentence with underlined segments
 * - Reading: plain question text (passage shown separately)
 */
function QuestionStem({ question }: { question: Question }) {
  const isWE = question.part === "written_expression";

  if (isWE) {
    // Highlight opt_a/b/c/d within the sentence
    const text = question.question_text;
    const opts = [
      { letter: "A", val: question.option_a },
      { letter: "B", val: question.option_b },
      { letter: "C", val: question.option_c },
      { letter: "D", val: question.option_d },
    ];

    // Build segments: split sentence around the 4 underlined portions
    // Strategy: sort opt positions by first occurrence in text, then render
    type Seg = { text: string; label?: string };
    const segments: Seg[] = [];
    let remaining = text;

    // Sort by first occurrence index
    const positioned = opts
      .map((o) => ({ ...o, idx: remaining.indexOf(o.val) }))
      .filter((o) => o.idx >= 0)
      .sort((a, b) => a.idx - b.idx);

    for (const opt of positioned) {
      const idx = remaining.indexOf(opt.val);
      if (idx < 0) continue;
      if (idx > 0) segments.push({ text: remaining.slice(0, idx) });
      segments.push({ text: opt.val, label: opt.letter });
      remaining = remaining.slice(idx + opt.val.length);
    }
    if (remaining) segments.push({ text: remaining });

    return (
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-base)",
          color: "var(--color-text-primary)",
          lineHeight: 1.8,
          margin: 0,
        }}
      >
        {segments.map((seg, i) =>
          seg.label ? (
            <span key={i} style={{ position: "relative", display: "inline" }}>
              <u
                style={{
                  textDecorationColor: "var(--color-text-secondary)",
                  textUnderlineOffset: "3px",
                }}
              >
                {seg.text}
              </u>
              <sup
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-ui)",
                  marginLeft: "1px",
                }}
              >
                ({seg.label})
              </sup>
            </span>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </p>
    );
  }

  // Structure or Reading — plain display (blanks shown as _______)
  return (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-base)",
        color: "var(--color-text-primary)",
        lineHeight: 1.8,
        margin: 0,
        whiteSpace: "pre-wrap",
      }}
    >
      {question.question_text}
    </p>
  );
}

/** Passage panel shown above reading questions */
function PassagePanel({ passage }: { passage: Passage }) {
  return (
    <div
      style={{
        marginBottom: "24px",
        padding: "20px 24px",
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        maxHeight: "320px",
        overflowY: "auto",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontWeight: 600,
          marginBottom: "8px",
        }}
      >
        Reading Passage
      </p>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-base)",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          marginBottom: "12px",
        }}
      >
        {passage.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.85,
          margin: 0,
          whiteSpace: "pre-wrap",
        }}
      >
        {passage.content}
      </p>
    </div>
  );
}

export function QuestionCard({
  question,
  passage,
  questionNumber,
  children,
}: QuestionCardProps) {
  const sectionLabel: Record<number, string> = {
    1: "Listening Comprehension",
    2: question.part === "structure" ? "Structure" : "Written Expression",
    3: "Reading Comprehension",
  };
  const partLabel = sectionLabel[question.section] ?? "Question";

  return (
    <div>
      {/* Show passage for reading questions */}
      {question.section === 3 && passage && (
        <PassagePanel passage={passage} />
      )}

      {/* Question card */}
      <div
        style={{
          padding: "28px",
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
        }}
      >
        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              padding: "3px 10px",
              backgroundColor: "rgba(30,74,155,0.15)",
              border: "1px solid rgba(30,74,155,0.3)",
              borderRadius: "var(--radius-full)",
              color: "var(--color-primary-300)",
              fontSize: "var(--text-xs)",
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            {partLabel}
          </span>

          {/* Difficulty dots */}
          <div style={{ display: "flex", gap: "3px", marginLeft: "auto" }}>
            {[1, 2, 3, 4, 5].map((d) => (
              <div
                key={d}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor:
                    d <= question.difficulty
                      ? "var(--color-accent-400)"
                      : "var(--color-border)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Written Expression instruction */}
        {question.part === "written_expression" && (
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              fontStyle: "italic",
              marginBottom: "12px",
            }}
          >
            Identify the underlined word or phrase (A), (B), (C), or (D) that must be changed.
          </p>
        )}

        {/* Question stem */}
        <div style={{ marginBottom: "24px" }}>
          {question.part !== "written_expression" && (
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
                marginBottom: "8px",
              }}
            >
              Question {questionNumber}
            </p>
          )}
          <QuestionStem question={question} />
        </div>

        {/* Answer options (passed as children) */}
        {children}
      </div>
    </div>
  );
}
