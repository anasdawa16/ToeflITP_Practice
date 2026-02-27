"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { scoreBand } from "@/lib/utils/scoreCalculator";

// ─── Types ────────────────────────────────────────────────────

interface SectionScore {
  raw: number;
  total: number;
  scaled: number;
  percentage: number;
}

interface ScoreData {
  s1: SectionScore;
  s2: SectionScore;
  s3: SectionScore;
  total: number;
}

interface AnswerRecord {
  question_id: string;
  selected_answer: string | null;
  is_correct: boolean | null;
}

interface QuestionRecord {
  id: string;
  section: number;
  part: string | null;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "A" | "B" | "C" | "D";
  explanation: string | null;
  passage_id: string | null;
}

interface ResultsData {
  session: {
    id: string;
    test_type: string;
    status: string;
    s2_raw_score: number;
    s3_raw_score: number;
    s2_scaled_score: number;
    s3_scaled_score: number;
    total_scaled_score: number;
    s2_question_ids: string[];
    s3_question_ids: string[];
    total_duration_seconds: number;
    completed_at: string;
  };
  answers: AnswerRecord[];
  questions: QuestionRecord[];
}

// ─── Animated counter ─────────────────────────────────────────

function useCountUp(target: number, duration = 1600, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number;
    let raf: number;
    const timeout = setTimeout(() => {
      function step(ts: number) {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [target, duration, delay]);
  return value;
}

// ─── Score gauge (SVG arc) ────────────────────────────────────

function ScoreGauge({ scaled, min = 31, max = 68, color }: { scaled: number; min?: number; max?: number; color: string }) {
  const pct = Math.max(0, Math.min((scaled - min) / (max - min), 1));
  const r = 36;
  // Half-circle (top): arc from 180° to 0°
  const angle = pct * 180; // degrees
  const rad = (angle * Math.PI) / 180;
  const cx = 50, cy = 50;
  const x = cx + r * Math.cos(Math.PI - rad);
  const y = cy - r * Math.sin(Math.PI - rad);
  const circumference = Math.PI * r; // half circle

  return (
    <svg viewBox="0 0 100 60" width="100%" style={{ maxWidth: "120px", display: "block", margin: "0 auto" }}>
      {/* Track */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" strokeLinecap="round"
      />
      {/* Progress */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${x} ${y}`}
        fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
        style={{ transition: "all 1.2s ease" }}
      />
      {/* Label */}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill={color}>
        {scaled}
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">
        31–68
      </text>
    </svg>
  );
}

// ─── Section bar ──────────────────────────────────────────────

function SectionBar({ label, raw, total, scaled, color }: { label: string; raw: number; total: number; scaled: number; color: string }) {
  const pct = total > 0 ? (raw / total) * 100 : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 600 }}>{label}</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{raw}/{total} correct · scaled {scaled}</span>
      </div>
      <div style={{ height: "8px", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`, borderRadius: "var(--radius-full)",
          backgroundColor: color, transition: "width 1s ease 0.4s",
        }} />
      </div>
    </div>
  );
}

// ─── Answer Review ────────────────────────────────────────────

function AnswerReview({ questions, answers, sectionIds }: {
  questions: QuestionRecord[];
  answers: AnswerRecord[];
  sectionIds: string[];
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const ansMap = new Map<string, AnswerRecord>(answers.map((a) => [a.question_id, a]));
  const sectionQs = questions.filter((q) => sectionIds.includes(q.id));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {sectionQs.map((q, idx) => {
        const ans = ansMap.get(q.id);
        const isCorrect = ans?.is_correct;
        const selected = ans?.selected_answer;
        const isExpanded = expandedId === q.id;

        return (
          <div key={q.id} style={{
            backgroundColor: "var(--color-bg-card)",
            border: `1px solid ${isCorrect === true ? "rgba(52,211,153,0.3)" : isCorrect === false ? "rgba(248,113,113,0.3)" : "var(--color-border)"}`,
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}>
            {/* Row */}
            <button
              type="button"
              onClick={() => setExpandedId(isExpanded ? null : q.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
              }}
            >
              <span style={{
                flexShrink: 0, width: "22px", height: "22px", borderRadius: "50%",
                backgroundColor: isCorrect === true ? "rgba(52,211,153,0.2)" : isCorrect === false ? "rgba(248,113,113,0.2)" : "rgba(255,255,255,0.07)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px",
              }}>
                {isCorrect === true ? "✓" : isCorrect === false ? "✗" : "–"}
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", flexShrink: 0, width: "24px" }}>
                Q{idx + 1}
              </span>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)", flex: 1,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {q.question_text}
              </span>
              <span style={{ flexShrink: 0, display: "flex", gap: "6px", alignItems: "center" }}>
                {selected && (
                  <span style={{
                    padding: "1px 8px", borderRadius: "var(--radius-full)",
                    backgroundColor: isCorrect ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)",
                    color: isCorrect ? "#34d399" : "#f87171",
                    fontFamily: "var(--font-ui)", fontSize: "11px", fontWeight: 700,
                  }}>
                    {selected}
                  </span>
                )}
                {!selected && (
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)" }}>skipped</span>
                )}
                <span style={{ color: "var(--color-text-muted)", fontSize: "12px", transform: isExpanded ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 200ms" }}>▾</span>
              </span>
            </button>

            {/* Expanded detail */}
            {isExpanded && (
              <div style={{ padding: "0 16px 16px 16px", borderTop: "1px solid var(--color-border)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text-primary)", lineHeight: 1.7, margin: "12px 0 10px" }}>
                  {q.question_text}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                  {(["A", "B", "C", "D"] as const).map((letter) => {
                    const text = q[`option_${letter.toLowerCase()}` as keyof QuestionRecord] as string;
                    const isAnswer = q.correct_answer === letter;
                    const isUser = selected === letter;
                    const bg = isAnswer ? "rgba(52,211,153,0.12)" : isUser && !isAnswer ? "rgba(248,113,113,0.1)" : "rgba(255,255,255,0.02)";
                    const border = isAnswer ? "1px solid rgba(52,211,153,0.4)" : isUser && !isAnswer ? "1px solid rgba(248,113,113,0.3)" : "1px solid var(--color-border)";
                    return (
                      <div key={letter} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "8px 12px", backgroundColor: bg, border, borderRadius: "var(--radius-md)" }}>
                        <span style={{ flexShrink: 0, fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-ui)", color: isAnswer ? "#34d399" : isUser ? "#f87171" : "var(--color-text-muted)" }}>
                          {letter}{isAnswer ? " ✓" : isUser && !isAnswer ? " ✗" : ""}
                        </span>
                        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{text}</span>
                      </div>
                    );
                  })}
                </div>
                {q.explanation && (
                  <div style={{ padding: "12px", backgroundColor: "rgba(30,74,155,0.1)", border: "1px solid rgba(30,74,155,0.25)", borderRadius: "var(--radius-md)" }}>
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-primary-300)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "4px" }}>Explanation</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0 }}>{q.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN RESULTS PAGE ────────────────────────────────────────

export default function ResultsPageClient({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [data, setData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "section2" | "section3">("overview");
  const [revealed, setRevealed] = useState(false);
  const revealTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch(`/api/mock-test/results?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setError(d.error); }
        else {
          setData(d as ResultsData);
          revealTimeout.current = setTimeout(() => setRevealed(true), 300);
        }
        setLoading(false);
      })
      .catch(() => { setError("Failed to load results"); setLoading(false); });
    return () => { if (revealTimeout.current) clearTimeout(revealTimeout.current); };
  }, [sessionId]);

  const total = data?.session.total_scaled_score ?? 0;
  const displayTotal = useCountUp(revealed ? total : 0, 1800, 200);
  const band = scoreBand(total);

  const s2 = {
    raw: data?.session.s2_raw_score ?? 0,
    total: (data?.session.s2_question_ids ?? []).length,
    scaled: data?.session.s2_scaled_score ?? 31,
  };
  const s3 = {
    raw: data?.session.s3_raw_score ?? 0,
    total: (data?.session.s3_question_ids ?? []).length,
    scaled: data?.session.s3_scaled_score ?? 31,
  };

  function formatDuration(secs: number) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "16px", fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid rgba(255,255,255,0.1)", borderTop: "3px solid var(--color-primary-400)", borderRadius: "50%", animation: "spin 800ms linear infinite" }} />
        <p>Calculating your score…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px", fontFamily: "var(--font-ui)" }}>
        <p style={{ color: "#f87171", marginBottom: "16px" }}>{error ?? "Results not found"}</p>
        <button onClick={() => router.push("/mock-test")} style={{ padding: "10px 24px", backgroundColor: "var(--color-primary-500)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-ui)" }}>
          Back to Mock Tests
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>

      {/* ── HERO SCORE REVEAL ──────────────────────────────────── */}
      <div style={{
        padding: "40px 24px",
        background: `radial-gradient(ellipse at 50% 0%, ${band.color}18 0%, transparent 70%)`,
        border: `1px solid ${band.color}30`,
        borderRadius: "var(--radius-xl)",
        textAlign: "center",
        marginBottom: "32px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 30%, ${band.color}10, transparent 70%)`, pointerEvents: "none" }} />

        <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-muted)", marginBottom: "8px" }}>
          TOEFL ITP Score
        </p>

        {/* Big animated score */}
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(64px, 12vw, 96px)", fontWeight: 900,
          color: band.color, lineHeight: 1, marginBottom: "6px",
          fontVariantNumeric: "tabular-nums",
          transition: "opacity 400ms ease",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(20px)",
        }}>
          {displayTotal}
        </div>

        <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "20px" }}>
          Score range: 310–677
        </p>

        {/* Band chip */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "8px 20px",
          backgroundColor: `${band.color}18`,
          border: `1px solid ${band.color}40`,
          borderRadius: "var(--radius-full)",
          marginBottom: "16px",
        }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: band.color }} />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700, color: band.color }}>
            {band.label}
          </span>
        </div>

        <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", maxWidth: "480px", margin: "0 auto" }}>
          {band.description}
        </p>
      </div>

      {/* ── SECTION SCORES ─────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
        {[
          { label: "Section 2", sublabel: "Structure & Written Expression", ...s2, color: "var(--color-primary-300)", min: 31, max: 68 },
          { label: "Section 3", sublabel: "Reading Comprehension", ...s3, color: "#a78bfa", min: 31, max: 67 },
        ].map((sec) => (
          <div key={sec.label} style={{
            padding: "20px", backgroundColor: "var(--color-bg-card)",
            border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)",
            textAlign: "center",
          }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
              {sec.label}
            </p>
            <ScoreGauge scaled={sec.scaled} min={sec.min} max={sec.max} color={sec.color} />
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginTop: "8px" }}>
              {sec.sublabel}
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginTop: "4px" }}>
              {sec.raw} / {sec.total} correct ({sec.total > 0 ? Math.round((sec.raw / sec.total) * 100) : 0}%)
            </p>
          </div>
        ))}
      </div>

      {/* ── ACCURACY BARS ──────────────────────────────────────── */}
      <div style={{ padding: "24px", backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", marginBottom: "32px", display: "flex", flexDirection: "column", gap: "14px" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>Section Accuracy</h3>
        <SectionBar label="Section 2 — Structure & Written Expression" raw={s2.raw} total={s2.total} scaled={s2.scaled} color="var(--color-primary-400)" />
        <SectionBar label="Section 3 — Reading Comprehension" raw={s3.raw} total={s3.total} scaled={s3.scaled} color="#a78bfa" />
      </div>

      {/* ── SESSION STATS ──────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px", marginBottom: "32px" }}>
        {[
          { label: "Duration", value: formatDuration(data.session.total_duration_seconds ?? 0), icon: "⏱" },
          { label: "Completed", value: new Date(data.session.completed_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }), icon: "📅" },
          { label: "Answered", value: `${data.answers.length} / ${s2.total + s3.total}`, icon: "✍️" },
          { label: "Correct", value: `${(s2.raw) + (s3.raw)}`, icon: "✅" },
        ].map((stat) => (
          <div key={stat.label} style={{ padding: "16px", backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
            <div style={{ fontSize: "24px", marginBottom: "6px" }}>{stat.icon}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "2px" }}>{stat.value}</div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── What This Score Means ──────────────────────────────── */}
      <div style={{ padding: "20px 24px", backgroundColor: "rgba(30,74,155,0.08)", border: "1px solid rgba(30,74,155,0.2)", borderRadius: "var(--radius-xl)", marginBottom: "32px" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "12px" }}>
          Score Band Reference
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            { range: "640–677", label: "Superior", color: "#34d399" },
            { range: "590–640", label: "Advanced", color: "#60a5fa" },
            { range: "540–590", label: "High Intermediate", color: "#818cf8" },
            { range: "480–540", label: "Intermediate", color: "#fbbf24" },
            { range: "400–480", label: "Elementary", color: "#f97316" },
            { range: "310–400", label: "Beginning", color: "#f87171" },
          ].map((b) => {
            const isMyBand = total >= parseInt(b.range.split("–")[0]) && total <= parseInt(b.range.split("–")[1]);
            return (
              <div key={b.label} style={{
                display: "flex", alignItems: "center", gap: "10px", padding: "6px 10px",
                backgroundColor: isMyBand ? `${b.color}10` : "transparent",
                border: isMyBand ? `1px solid ${b.color}30` : "1px solid transparent",
                borderRadius: "var(--radius-md)",
              }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: b.color, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: b.color, fontWeight: 600, width: "80px", flexShrink: 0 }}>{b.range}</span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: isMyBand ? "var(--color-text-primary)" : "var(--color-text-muted)", fontWeight: isMyBand ? 700 : 400 }}>
                  {b.label} {isMyBand ? "← Your Score" : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── ANSWER REVIEW ─────────────────────────────────────── */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", marginBottom: "16px" }}>
          {(["overview", "section2", "section3"] as const).map((tab) => {
            const labels: Record<string, string> = { overview: "Overview", section2: "Section 2 Review", section3: "Section 3 Review" };
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 16px", border: "none", background: "none",
                  borderBottom: `2px solid ${activeTab === tab ? "var(--color-primary-400)" : "transparent"}`,
                  fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: activeTab === tab ? 700 : 400,
                  color: activeTab === tab ? "var(--color-primary-300)" : "var(--color-text-muted)",
                  cursor: "pointer",
                }}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {activeTab === "overview" && (
          <div style={{ padding: "20px", backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "12px" }}>Recommended Next Steps</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {total < 480 && (
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", display: "flex", gap: "8px" }}>
                  <span>📚</span><span>Start with the <strong>Learning Hub</strong> — review fundamental grammar rules for Structure and Written Expression.</span>
                </p>
              )}
              {s2.total > 0 && s2.raw / s2.total < 0.7 && (
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", display: "flex", gap: "8px" }}>
                  <span>🎯</span><span>Your <strong>Section 2 accuracy is {Math.round((s2.raw / s2.total) * 100)}%</strong> — use Topic Drills to practice specific grammar rules.</span>
                </p>
              )}
              {s3.total > 0 && s3.raw / s3.total < 0.7 && (
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", display: "flex", gap: "8px" }}>
                  <span>📖</span><span>Your <strong>Section 3 accuracy is {Math.round((s3.raw / s3.total) * 100)}%</strong> — practice reading passages daily to build speed and inference skills.</span>
                </p>
              )}
              {total >= 540 && (
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", display: "flex", gap: "8px" }}>
                  <span>🏆</span><span>Great score! Focus on <strong>timed mock tests</strong> to push toward 600+. Review flagged and incorrect questions carefully.</span>
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "section2" && (
          <AnswerReview questions={data.questions} answers={data.answers} sectionIds={data.session.s2_question_ids ?? []} />
        )}
        {activeTab === "section3" && (
          <AnswerReview questions={data.questions} answers={data.answers} sectionIds={data.session.s3_question_ids ?? []} />
        )}
      </div>

      {/* ── CTA BUTTONS ────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          onClick={() => router.push("/mock-test/new?type=full_mock")}
          style={{ flex: "1 1 180px", padding: "13px", backgroundColor: "var(--color-primary-500)", border: "none", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#fff", cursor: "pointer" }}
        >
          Retake Test 🔄
        </button>
        <button
          onClick={() => router.push("/practice/drill")}
          style={{ flex: "1 1 180px", padding: "13px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text-secondary)", cursor: "pointer" }}
        >
          Topic Drill 🎯
        </button>
        <button
          onClick={() => router.push("/mock-test")}
          style={{ flex: "1 1 180px", padding: "13px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text-secondary)", cursor: "pointer" }}
        >
          Test History 📋
        </button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
