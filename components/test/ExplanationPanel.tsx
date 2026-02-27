"use client";

interface ExplanationPanelProps {
  explanation: string;
  isCorrect: boolean;
  correctAnswerText: string;
  onNext: () => void;
  isLast: boolean;
}

export function ExplanationPanel({
  explanation,
  isCorrect,
  correctAnswerText,
  onNext,
  isLast,
}: ExplanationPanelProps) {
  const accentColor = isCorrect ? "#34d399" : "#f87171";
  const bgColor = isCorrect ? "rgba(52,211,153,0.08)" : "rgba(248,113,113,0.08)";
  const borderColor = isCorrect ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)";

  return (
    <div
      style={{
        marginTop: "16px",
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${borderColor}`,
        backgroundColor: bgColor,
        overflow: "hidden",
        animation: "fadeInUp 250ms ease both",
      }}
    >
      {/* Result header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 20px",
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <span style={{ fontSize: "18px" }}>{isCorrect ? "✅" : "❌"}</span>
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm)",
            fontWeight: 700,
            color: accentColor,
          }}
        >
          {isCorrect ? "Correct!" : "Incorrect"}
        </span>
        {!isCorrect && (
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              marginLeft: "4px",
            }}
          >
            — Correct answer:{" "}
            <strong style={{ color: "#34d399" }}>{correctAnswerText}</strong>
          </span>
        )}
      </div>

      {/* Explanation body */}
      <div style={{ padding: "16px 20px 20px" }}>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-xs)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-text-muted)",
            marginBottom: "8px",
          }}
        >
          Explanation
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            margin: "0 0 20px",
          }}
        >
          {explanation}
        </p>

        {/* Next button */}
        <button
          type="button"
          onClick={onNext}
          style={{
            padding: "10px 28px",
            backgroundColor: "var(--color-primary-500)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 150ms ease",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-primary-400)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-primary-500)";
          }}
        >
          {isLast ? "See Results →" : "Next Question →"}
        </button>
      </div>
    </div>
  );
}
