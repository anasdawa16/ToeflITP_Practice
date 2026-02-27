"use client";

interface TestProgressProps {
  current: number;  // 1-based
  total: number;
  correctCount: number;
  sectionLabel?: string;
}

export function TestProgress({ current, total, correctCount, sectionLabel }: TestProgressProps) {
  const pct = Math.round(((current - 1) / total) * 100);
  const accuracy = current > 1 ? Math.round((correctCount / (current - 1)) * 100) : null;

  return (
    <div style={{ marginBottom: "24px" }}>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {sectionLabel && (
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              {sectionLabel}
            </span>
          )}
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              fontWeight: 500,
            }}
          >
            Question <strong style={{ color: "var(--color-text-primary)" }}>{current}</strong> of {total}
          </span>
        </div>

        {/* Accuracy pill */}
        {accuracy !== null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "3px 10px",
              backgroundColor:
                accuracy >= 70
                  ? "rgba(52,211,153,0.1)"
                  : accuracy >= 50
                  ? "rgba(245,158,11,0.1)"
                  : "rgba(248,113,113,0.1)",
              border: `1px solid ${
                accuracy >= 70
                  ? "rgba(52,211,153,0.25)"
                  : accuracy >= 50
                  ? "rgba(245,158,11,0.25)"
                  : "rgba(248,113,113,0.25)"
              }`,
              borderRadius: "var(--radius-full)",
              color:
                accuracy >= 70 ? "#34d399" : accuracy >= 50 ? "var(--color-accent-300)" : "#f87171",
              fontSize: "var(--text-xs)",
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
            }}
          >
            ✓ {accuracy}% accuracy
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${current} of ${total} questions`}
        style={{
          height: "6px",
          backgroundColor: "rgba(255,255,255,0.06)",
          borderRadius: "var(--radius-full)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, var(--color-primary-500), var(--color-primary-300))",
            borderRadius: "var(--radius-full)",
            transition: "width 350ms ease",
          }}
        />
      </div>

      {/* Question dots (show up to 20) */}
      {total <= 20 && (
        <div style={{ display: "flex", gap: "4px", marginTop: "8px", flexWrap: "wrap" }}>
          {Array.from({ length: total }, (_, i) => {
            const qNum = i + 1;
            const isDone = qNum < current;
            const isCurrent = qNum === current;
            return (
              <div
                key={i}
                title={`Q${qNum}${isDone ? " — answered" : ""}`}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: isCurrent
                    ? "var(--color-primary-400)"
                    : isDone
                    ? "rgba(52,211,153,0.5)"
                    : "rgba(255,255,255,0.08)",
                  transition: "background-color 200ms ease",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
