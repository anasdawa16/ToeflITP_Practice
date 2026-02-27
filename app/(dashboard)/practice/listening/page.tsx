"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ListeningQueueView, type AudioGroup } from "@/components/test/ListeningQueueView";
import { SectionTimer } from "@/components/test/SectionTimer";

/**
 * Standalone Section 1 practice page — loads audio groups and runs
 * the listening queue with a 35-min timer. No Zustand needed here
 * (practice mode, not full mock test).
 */
export default function ListeningPracticePage() {
  const router = useRouter();
  const [groups, setGroups] = useState<AudioGroup[]>([]);
  const [answers, setAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(2100); // 35 min
  const [started, setStarted] = useState(false);

  useEffect(() => {
    fetch("/api/audio-groups")
      .then((r) => r.json())
      .then((d) => {
        setGroups(d.groups ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load audio content. Please try again.");
        setLoading(false);
      });
  }, []);

  // Timer
  useEffect(() => {
    if (!started || timeRemaining <= 0) return;
    const t = setInterval(() => setTimeRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [started, timeRemaining]);

  function handleAnswer(qId: string, letter: "A" | "B" | "C" | "D") {
    setAnswers((prev) => ({ ...prev, [qId]: letter }));
  }

  function handleComplete() {
    router.push("/practice");
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "16px", fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
        <div style={{ width: "36px", height: "36px", border: "3px solid rgba(255,255,255,0.1)", borderTop: "3px solid var(--color-primary-400)", borderRadius: "50%", animation: "spin 800ms linear infinite" }} />
        <p>Loading listening audio…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px", fontFamily: "var(--font-ui)" }}>
        <p style={{ color: "#f87171", marginBottom: "16px" }}>{error}</p>
        <button onClick={() => router.push("/practice")} style={{ padding: "10px 24px", backgroundColor: "var(--color-primary-500)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-ui)" }}>
          Back to Practice
        </button>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px", fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>🎧</p>
        <p style={{ fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "8px" }}>No audio tracks available yet</p>
        <p style={{ marginBottom: "24px" }}>Section 1 audio content will be added soon. Practice Sections 2 & 3 in the meantime.</p>
        <button onClick={() => router.push("/practice")} style={{ padding: "10px 24px", backgroundColor: "var(--color-primary-500)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
          ← Back to Practice Hub
        </button>
      </div>
    );
  }

  // Pre-start screen
  if (!started) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: "24px", padding: "32px 24px", maxWidth: "560px", margin: "0 auto" }}>
        <div style={{ fontSize: "64px" }}>🎧</div>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
            Section 1 — Listening
          </h1>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
            You will hear <strong>{groups.length} conversations/talks</strong> across Parts A, B, and C.
            Each audio track plays <strong>once only</strong> per ETS regulations.
            Questions appear after each audio finishes.
          </p>
        </div>

        <div style={{ alignSelf: "stretch", padding: "16px 20px", backgroundColor: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "#f87171", display: "flex", gap: "8px", alignItems: "flex-start", margin: 0 }}>
            <span style={{ flexShrink: 0 }}>⚠️</span>
            <span>Make sure your <strong>speakers or headphones</strong> are working before you begin. You cannot replay audio once started.</span>
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignSelf: "stretch" }}>
          {[
            { label: "Audio Tracks", value: String(groups.length) },
            { label: "Total Questions", value: String(groups.reduce((sum, g) => sum + g.questions.length, 0)) },
            { label: "Time Allowed", value: "35 minutes" },
            { label: "Replay", value: "Not allowed (ETS rule)" },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)" }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>{row.label}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text-primary)" }}>{row.value}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setStarted(true)}
          style={{ width: "100%", padding: "14px", backgroundColor: "var(--color-primary-500)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-base)", fontWeight: 700, cursor: "pointer" }}
        >
          Begin Listening Practice →
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg-base)" }}>
      {/* Sticky timer bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 40,
        backgroundColor: "var(--color-bg-surface)",
        borderBottom: "1px solid var(--color-border)",
        padding: "10px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", fontWeight: 600 }}>
          🎧 Listening — Section 1
        </span>
        <SectionTimer
          seconds={timeRemaining}
          sectionLabel="Section 1"
          onExpire={handleComplete}
        />
      </div>

      <ListeningQueueView
        groups={groups}
        answers={answers}
        onAnswer={handleAnswer}
        onSectionComplete={handleComplete}
      />
    </div>
  );
}
