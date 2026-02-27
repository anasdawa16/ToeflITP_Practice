"use client";

import { useEffect, useState } from "react";
import { AIChat } from "@/components/ai/AIChat";
import type { UserContext } from "@/lib/gemini/prompts";

/**
 * AI Assistant page — fetches user context (score, accuracy)
 * then renders the full-height AIChat component.
 */
export default function AIAssistantPage() {
  const [context, setContext] = useState<UserContext>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then((d) => {
        const s2Acc = d.allTime?.s2?.attempted > 0
          ? Math.round((d.allTime.s2.correct / d.allTime.s2.attempted) * 100)
          : 0;
        const s3Acc = d.allTime?.s3?.attempted > 0
          ? Math.round((d.allTime.s3.correct / d.allTime.s3.attempted) * 100)
          : 0;
        setContext({
          latestScore: d.latestScore ?? null,
          targetScore: d.targetScore ?? 550,
          s2Accuracy: s2Acc,
          s3Accuracy: s3Acc,
        });
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
      {/* Page header */}
      <div style={{
        padding: "16px 24px 12px",
        borderBottom: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-surface)",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.4), rgba(167,139,250,0.2))",
            border: "1.5px solid rgba(96,165,250,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
            boxShadow: "0 0 16px rgba(96,165,250,0.2)",
          }}>
            🤖
          </div>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 700, color: "var(--color-text-primary)", margin: 0, lineHeight: 1 }}>
              ToeflMaster AI
            </h1>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)", margin: 0 }}>
              Gemini 1.5 Flash · TOEFL ITP Specialist
            </p>
          </div>
        </div>

        {/* Context pills */}
        {loaded && context.latestScore && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={{ padding: "3px 10px", backgroundColor: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)", borderRadius: "var(--radius-full)", fontFamily: "var(--font-ui)", fontSize: "10px", color: "#60a5fa" }}>
              Score: {context.latestScore}
            </span>
            <span style={{ padding: "3px 10px", backgroundColor: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "var(--radius-full)", fontFamily: "var(--font-ui)", fontSize: "10px", color: "#34d399" }}>
              S2: {context.s2Accuracy}% · S3: {context.s3Accuracy}%
            </span>
          </div>
        )}
      </div>

      {/* Chat area — flexes to fill remaining height */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        {loaded ? (
          <AIChat context={context} />
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px" }}>
            <div style={{ width: "28px", height: "28px", border: "2px solid rgba(255,255,255,0.08)", borderTop: "2px solid var(--color-primary-400)", borderRadius: "50%", animation: "spin 800ms linear infinite" }} />
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>Loading AI tutor…</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
      </div>
    </div>
  );
}
