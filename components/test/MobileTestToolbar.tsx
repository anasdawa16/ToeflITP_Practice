"use client";

import { useState } from "react";

interface MobileTestToolbarProps {
  currentQ: number;
  totalQ: number;
  answered: number;
  sectionLabel: string;
  onShowAnswerSheet: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  timeRemaining: number; // seconds
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Mobile-optimised bottom toolbar for the mock test full-screen interface.
 * Replaces the desktop sidebar-style question navigator on narrow screens.
 * Shown only on < 640px (CSS media query handles show/hide).
 */
export function MobileTestToolbar({
  currentQ,
  totalQ,
  answered,
  sectionLabel,
  onShowAnswerSheet,
  onPrev,
  onNext,
  onSubmit,
  timeRemaining,
}: MobileTestToolbarProps) {
  const [showSheet, setShowSheet] = useState(false);
  const isLast = currentQ >= totalQ;
  const almostOut = timeRemaining < 300; // < 5 min

  function handleSheet() {
    setShowSheet((s) => !s);
    onShowAnswerSheet();
  }

  return (
    <>
      {/* ── Fixed Bottom Toolbar ─────────────────────────── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "var(--color-bg-card)",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          gap: "0",
          paddingBottom: "calc(var(--safe-bottom) + 4px)",
        }}
      >
        {/* Timer chip */}
        <div style={{
          flex: "0 0 auto",
          padding: "10px 12px",
          borderRight: "1px solid var(--color-border)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "1px",
        }}>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "var(--text-sm)", fontVariantNumeric: "tabular-nums",
            color: almostOut ? "#f87171" : "#60a5fa",
          }}>
            {formatTime(timeRemaining)}
          </span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>time</span>
        </div>

        {/* Prev button */}
        <button
          type="button"
          onClick={onPrev}
          disabled={currentQ <= 1}
          aria-label="Previous question"
          style={{
            flex: "0 0 52px", height: "52px",
            backgroundColor: "transparent", border: "none",
            borderRight: "1px solid var(--color-border)",
            fontFamily: "var(--font-ui)", fontSize: "18px",
            color: currentQ <= 1 ? "var(--color-text-muted)" : "var(--color-text-secondary)",
            cursor: currentQ <= 1 ? "default" : "pointer",
            minHeight: "52px",
          }}
        >
          ‹
        </button>

        {/* Question progress + answer sheet toggle */}
        <button
          type="button"
          onClick={handleSheet}
          aria-label="Open answer sheet"
          style={{
            flex: 1, height: "52px",
            backgroundColor: "transparent", border: "none",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px",
            cursor: "pointer", minHeight: "52px",
          }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--color-text-primary)", fontVariantNumeric: "tabular-nums" }}>
            {currentQ}/{totalQ}
          </span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {answered}/{totalQ} answered · tap for sheet
          </span>
        </button>

        {/* Next button */}
        {!isLast ? (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next question"
            style={{
              flex: "0 0 52px", height: "52px",
              backgroundColor: "transparent", border: "none",
              borderLeft: "1px solid var(--color-border)",
              fontFamily: "var(--font-ui)", fontSize: "18px",
              color: "var(--color-text-secondary)",
              cursor: "pointer", minHeight: "52px",
            }}
          >
            ›
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            aria-label="Submit section"
            style={{
              flex: "0 0 64px", height: "52px",
              backgroundColor: "var(--color-primary-500)", border: "none",
              borderRadius: "0",
              fontFamily: "var(--font-ui)", fontSize: "10px", fontWeight: 800,
              color: "#fff", cursor: "pointer",
              textTransform: "uppercase", letterSpacing: "0.05em",
              minHeight: "52px",
            }}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
}
