"use client";

import { useState } from "react";
import { statusColor, statusLabel, type VocabStatus } from "@/lib/utils/srs";

export interface VocabWord {
  id: string;
  word: string;
  definition: string;
  example_sentence: string;
  part_of_speech: string;
  difficulty: number;
  category: string;
  synonyms: string[];
  collocations: string[];
  status: VocabStatus;
  review_count: number;
  next_review_date: string | null;
}

interface FlashCardProps {
  word: VocabWord;
  onResult: (result: "correct" | "incorrect") => void;
  cardNumber: number;
  total: number;
}

const DIFF_LABEL = ["", "⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
const PART_COLORS: Record<string, string> = {
  noun: "#60a5fa", verb: "#34d399", adjective: "#fbbf24",
  adverb: "#a78bfa", "adjective/noun": "#fbbf24", "adjective/verb": "#34d399",
  "verb/noun": "#60a5fa", "noun/verb": "#60a5fa",
};

export function FlashCard({ word, onResult, cardNumber, total }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState<"correct" | "incorrect" | null>(null);

  function handleAnswer(result: "correct" | "incorrect") {
    if (answered) return;
    setAnswered(result);
    setTimeout(() => {
      setFlipped(false);
      setAnswered(null);
      onResult(result);
    }, 500);
  }

  const partColor = PART_COLORS[word.part_of_speech] ?? "#94a3b8";
  const statColor = statusColor(word.status);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", width: "100%", maxWidth: "560px", margin: "0 auto" }}>

      {/* Progress header */}
      <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ flex: 1, height: "4px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((cardNumber - 1) / total) * 100}%`, backgroundColor: "var(--color-primary-400)", borderRadius: "var(--radius-full)", transition: "width 300ms ease" }} />
        </div>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", flexShrink: 0 }}>
          {cardNumber} / {total}
        </span>
      </div>

      {/* Card */}
      <div
        onClick={() => !answered && setFlipped((f) => !f)}
        style={{
          width: "100%",
          minHeight: "280px",
          backgroundColor: "var(--color-bg-card)",
          border: `1px solid ${answered === "correct" ? "rgba(52,211,153,0.5)" : answered === "incorrect" ? "rgba(248,113,113,0.4)" : "var(--color-border)"}`,
          borderRadius: "var(--radius-xl)",
          cursor: answered ? "default" : "pointer",
          padding: "32px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "16px",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 300ms ease, box-shadow 200ms ease",
          boxShadow: answered === "correct" ? "0 0 24px rgba(52,211,153,0.15)" : answered === "incorrect" ? "0 0 24px rgba(248,113,113,0.12)" : "none",
        }}
      >
        {/* Background glow when answered */}
        {answered && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundColor: answered === "correct" ? "rgba(52,211,153,0.05)" : "rgba(248,113,113,0.04)",
            pointerEvents: "none",
          }} />
        )}

        {/* Category + status row */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ padding: "2px 8px", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "var(--radius-full)", fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {word.category.replace("_", " ")}
          </span>
          <span style={{ padding: "2px 8px", backgroundColor: `${partColor}15`, borderRadius: "var(--radius-full)", fontFamily: "var(--font-ui)", fontSize: "10px", color: partColor }}>
            {word.part_of_speech}
          </span>
          <span style={{ marginLeft: "auto", fontFamily: "var(--font-ui)", fontSize: "10px", color: statColor }}>
            {statusLabel(word.status)}
          </span>
        </div>

        {/* FRONT: word + difficulty stars */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 6vw, 40px)", fontWeight: 900, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
            {word.word}
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>
            {DIFF_LABEL[word.difficulty]}
          </div>
        </div>

        {/* BACK: definition + example + synonyms */}
        {flipped ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", animation: "fadeInUp 200ms ease" }}>
            <div style={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: "var(--radius-md)", padding: "12px 14px" }}>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--color-text-primary)", margin: 0, lineHeight: 1.5 }}>
                {word.definition}
              </p>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>
              "{word.example_sentence}"
            </p>
            {word.synonyms.length > 0 && (
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)", alignSelf: "center" }}>Synonyms:</span>
                {word.synonyms.slice(0, 3).map((s) => (
                  <span key={s} style={{ padding: "2px 8px", backgroundColor: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: "var(--radius-full)", fontFamily: "var(--font-ui)", fontSize: "10px", color: "#a78bfa" }}>
                    {s}
                  </span>
                ))}
              </div>
            )}
            {word.collocations.length > 0 && (
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)", alignSelf: "center" }}>Use:</span>
                {word.collocations.slice(0, 2).map((c) => (
                  <span key={c} style={{ padding: "2px 8px", backgroundColor: "rgba(96,165,250,0.08)", borderRadius: "var(--radius-full)", fontFamily: "var(--font-ui)", fontSize: "10px", color: "#60a5fa" }}>
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p style={{ textAlign: "center", fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.2)", marginTop: "8px" }}>
            Tap to reveal definition
          </p>
        )}
      </div>

      {/* Answer buttons (only visible after flip) */}
      {flipped && !answered && (
        <div style={{ display: "flex", gap: "12px", width: "100%", animation: "fadeInUp 200ms ease" }}>
          <button
            type="button"
            onClick={() => handleAnswer("incorrect")}
            style={{
              flex: 1, padding: "14px",
              backgroundColor: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.35)",
              borderRadius: "var(--radius-lg)",
              fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700,
              color: "#f87171", cursor: "pointer",
              transition: "all 120ms ease",
            }}
          >
            ✗ Didn't Know
          </button>
          <button
            type="button"
            onClick={() => handleAnswer("correct")}
            style={{
              flex: 1, padding: "14px",
              backgroundColor: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.35)",
              borderRadius: "var(--radius-lg)",
              fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700,
              color: "#34d399", cursor: "pointer",
              transition: "all 120ms ease",
            }}
          >
            ✓ Got It!
          </button>
        </div>
      )}

      {/* Hint when not flipped */}
      {!flipped && !answered && (
        <div style={{ display: "flex", gap: "12px", width: "100%", opacity: 0.4 }}>
          <div style={{ flex: 1, padding: "12px", border: "1px dashed rgba(248,113,113,0.3)", borderRadius: "var(--radius-lg)", textAlign: "center", fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "#f87171" }}>
            ✗ Don't Know
          </div>
          <div style={{ flex: 1, padding: "12px", border: "1px dashed rgba(52,211,153,0.3)", borderRadius: "var(--radius-lg)", textAlign: "center", fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "#34d399" }}>
            ✓ Know It
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
