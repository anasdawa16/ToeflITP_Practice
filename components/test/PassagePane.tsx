"use client";

import { useRef, useEffect, useCallback } from "react";

interface PassagePaneProps {
  title?: string | null;
  content: string;
  topic?: string | null;
  /** If set, the pane will scroll this line into view and highlight it */
  highlightLine?: number | null;
}

/**
 * Renders passage text split into numbered lines.
 * Supports:
 *  - Line-number gutter (left column)
 *  - Highlighted line (gold/amber tint) for question references
 *  - Smooth scroll to highlighted line
 *  - Sticky topic chip at top
 */
export function PassagePane({ title, content, topic, highlightLine }: PassagePaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Record<number, HTMLElement | null>>({});

  // Split content into "lines" — we treat each sentence as a logical line
  // for TOEFL reading. Wrap at ~70 chars per visual line with true line tracking.
  const paragraphs = content.split(/\n+/).filter(Boolean);

  // Build flat lines array with global line numbers
  type Line = { lineNum: number; text: string; isBlank: boolean };
  const lines: Line[] = [];
  let globalLine = 1;

  for (const para of paragraphs) {
    // Each paragraph becomes a block; lines within are wrapped at ~80 chars
    const words = para.split(" ");
    let currentLine = "";

    for (const word of words) {
      if (currentLine.length + word.length + 1 > 75 && currentLine.length > 0) {
        lines.push({ lineNum: globalLine++, text: currentLine, isBlank: false });
        currentLine = word;
      } else {
        currentLine = currentLine ? `${currentLine} ${word}` : word;
      }
    }
    if (currentLine) lines.push({ lineNum: globalLine++, text: currentLine, isBlank: false });

    // Paragraph separator (blank line visible for readability)
    lines.push({ lineNum: globalLine, text: "", isBlank: true });
    globalLine++;
  }

  // Smooth scroll to highlighted line
  useEffect(() => {
    if (!highlightLine) return;
    const el = lineRefs.current[highlightLine];
    if (el && containerRef.current) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightLine]);

  const setLineRef = useCallback((lineNum: number) => (el: HTMLElement | null) => {
    lineRefs.current[lineNum] = el;
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Passage header */}
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid var(--color-border)",
        flexShrink: 0,
        backgroundColor: "var(--color-bg-surface)",
      }}>
        {topic && (
          <span style={{
            display: "inline-block",
            padding: "2px 10px",
            backgroundColor: "rgba(8,145,178,0.15)",
            border: "1px solid rgba(8,145,178,0.3)",
            borderRadius: "var(--radius-full)",
            color: "#38bdf8",
            fontSize: "10px",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "6px",
          }}>
            {topic}
          </span>
        )}
        {title && (
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-base)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            margin: 0,
            lineHeight: 1.4,
          }}>
            {title}
          </h2>
        )}
      </div>

      {/* Scrollable line-numbered content */}
      <div
        role="article"
        aria-label={title ? `Passage: ${title}` : "Reading passage"}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 0",
          scrollbarGutter: "stable",
        }}
      >
        {lines.map((line) => {
          if (line.isBlank) {
            return (
              <div key={`blank-${line.lineNum}`} style={{ height: "12px" }} />
            );
          }

          const isHighlighted = highlightLine !== null && highlightLine !== undefined && line.lineNum === highlightLine;

          return (
            <div
              key={line.lineNum}
              ref={setLineRef(line.lineNum)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0",
                backgroundColor: isHighlighted ? "rgba(251,191,36,0.12)" : "transparent",
                borderLeft: isHighlighted ? "3px solid #fbbf24" : "3px solid transparent",
                transition: "background-color 250ms ease",
                minHeight: "22px",
              }}
            >
              {/* Line number gutter */}
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  width: "44px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingTop: "2px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: isHighlighted ? "#fbbf24" : "rgba(255,255,255,0.2)",
                  textAlign: "right",
                  userSelect: "none",
                  lineHeight: "1.7",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {line.lineNum}
              </span>

              {/* Line content */}
              <p
                style={{
                  margin: 0,
                  paddingLeft: "12px",
                  paddingRight: "16px",
                  paddingTop: "2px",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  color: isHighlighted ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  lineHeight: "1.7",
                  flex: 1,
                  fontWeight: isHighlighted ? 500 : 400,
                }}
              >
                {line.text}
              </p>
            </div>
          );
        })}

        {/* Bottom padding */}
        <div style={{ height: "40px" }} />
      </div>
    </div>
  );
}
