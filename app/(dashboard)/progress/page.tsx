"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScoreChart } from "@/components/progress/ScoreChart";
import { AccuracyRadar } from "@/components/progress/AccuracyRadar";
import { StreakCalendar } from "@/components/progress/StreakCalendar";
import { SectionBreakdown } from "@/components/progress/SectionBreakdown";

interface ProgressData {
  scoreHistory: Array<{ date: string; total: number; s2: number; s3: number }>;
  calendarData: Array<{ date: string; count: number; minutes: number }>;
  topicAccuracy: { structure: number; written_expression: number; vocab: number; inference: number; main_idea: number };
  streak: number;
  targetScore: number;
  allTime: {
    s2: { attempted: number; correct: number };
    s3: { attempted: number; correct: number };
  };
  totalTestsTaken: number;
  bestScore: number;
  latestScore: number | null;
}

function StatCard({ icon, label, value, sub, color = "var(--color-text-primary)" }: {
  icon: string; label: string; value: string | number; sub?: string; color?: string;
}) {
  return (
    <div style={{
      padding: "20px",
      backgroundColor: "var(--color-bg-card)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-xl)",
      display: "flex", flexDirection: "column", gap: "4px",
    }}>
      <div style={{ fontSize: "22px", marginBottom: "4px" }}>{icon}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 800, color, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </div>
      <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text-primary)" }}>{label}</div>
      {sub && <div style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)" }}>{sub}</div>}
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: "24px",
      backgroundColor: "var(--color-bg-card)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-xl)",
    }}>
      <div style={{ marginBottom: "16px" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>{title}</h3>
        {subtitle && <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginTop: "2px" }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export default function ProgressPage() {
  const router = useRouter();
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const s2Acc = data
    ? data.allTime.s2.attempted > 0
      ? Math.round((data.allTime.s2.correct / data.allTime.s2.attempted) * 100)
      : 0
    : 0;
  const s3Acc = data
    ? data.allTime.s3.attempted > 0
      ? Math.round((data.allTime.s3.correct / data.allTime.s3.attempted) * 100)
      : 0
    : 0;

  const latestBandColor = (score: number | null) => {
    if (!score) return "var(--color-text-muted)";
    if (score >= 640) return "#34d399";
    if (score >= 590) return "#60a5fa";
    if (score >= 540) return "#818cf8";
    if (score >= 480) return "#fbbf24";
    if (score >= 400) return "#f97316";
    return "#f87171";
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "16px", flexDirection: "column", fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
        <div style={{ width: "36px", height: "36px", border: "3px solid rgba(255,255,255,0.08)", borderTop: "3px solid var(--color-primary-400)", borderRadius: "50%", animation: "spin 800ms linear infinite" }} />
        <p>Loading your progress…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 24px", maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "4px" }}>
            📊 Your Progress
          </h1>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
            Track your TOEFL ITP preparation journey
          </p>
        </div>
        <button
          onClick={() => router.push("/mock-test/new?type=full_mock")}
          style={{
            padding: "10px 20px",
            backgroundColor: "var(--color-primary-500)",
            border: "none", borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#fff", cursor: "pointer",
          }}
        >
          + Take Mock Test
        </button>
      </div>

      {/* ── STATS ROW ──────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
        <StatCard
          icon="🔥" label="Study Streak" value={data?.streak ?? 0}
          sub="days in a row" color={data?.streak ? "#fbbf24" : "var(--color-text-muted)"}
        />
        <StatCard
          icon="🏆" label="Best Score" value={data?.bestScore ?? "–"}
          sub="all-time mock test" color={latestBandColor(data?.bestScore ?? null)}
        />
        <StatCard
          icon="📋" label="Latest Score" value={data?.latestScore ?? "–"}
          sub="most recent test" color={latestBandColor(data?.latestScore ?? null)}
        />
        <StatCard
          icon="🎯" label="Target Score" value={data?.targetScore ?? 550}
          sub="your goal" color="var(--color-primary-300)"
        />
        <StatCard
          icon="📝" label="Tests Taken" value={data?.totalTestsTaken ?? 0}
          sub="mock tests" color="var(--color-text-primary)"
        />
        <StatCard
          icon="✅" label="Total Correct" value={
            ((data?.allTime.s2.correct ?? 0) + (data?.allTime.s3.correct ?? 0))
          }
          sub={`of ${(data?.allTime.s2.attempted ?? 0) + (data?.allTime.s3.attempted ?? 0)} answered`}
          color="#34d399"
        />
      </div>

      {/* ── SCORE HISTORY CHART ─────────────────────────────────── */}
      <ChartCard title="Score History" subtitle="Total + section scaled scores across last 10 tests">
        <ScoreChart data={data?.scoreHistory ?? []} targetScore={data?.targetScore ?? 550} />
      </ChartCard>

      {/* ── RADAR + ACCURACY BARS ──────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <ChartCard title="Skill Radar" subtitle="Accuracy across question types">
          <AccuracyRadar
            topicAccuracy={data?.topicAccuracy ?? { structure: 0, written_expression: 0, vocab: 0, inference: 0, main_idea: 0 }}
            s2Accuracy={s2Acc}
            s3Accuracy={s3Acc}
          />
        </ChartCard>
        <ChartCard title="Accuracy by Topic" subtitle="Color: green ≥80% · blue ≥60% · yellow ≥40% · red <40%">
          <SectionBreakdown
            topicAccuracy={data?.topicAccuracy ?? { structure: 0, written_expression: 0, vocab: 0, inference: 0, main_idea: 0 }}
            s2Accuracy={s2Acc}
            s3Accuracy={s3Acc}
          />
        </ChartCard>
      </div>

      {/* ── STREAK CALENDAR ─────────────────────────────────────── */}
      <ChartCard title="Study Activity" subtitle="Last 90 days — hover for details">
        <StreakCalendar data={data?.calendarData ?? []} streak={data?.streak ?? 0} />
      </ChartCard>

      {/* ── SECTION ACCURACY SUMMARY ────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[
          { label: "Section 2 — Structure & Written Expression", total: data?.allTime.s2.attempted ?? 0, correct: data?.allTime.s2.correct ?? 0, color: "var(--color-primary-400)" },
          { label: "Section 3 — Reading Comprehension", total: data?.allTime.s3.attempted ?? 0, correct: data?.allTime.s3.correct ?? 0, color: "#a78bfa" },
        ].map((sec) => {
          const pct = sec.total > 0 ? Math.round((sec.correct / sec.total) * 100) : 0;
          return (
            <div key={sec.label} style={{ padding: "20px", backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)" }}>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "8px" }}>{sec.label}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "8px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 800, color: sec.color, fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>accuracy</span>
              </div>
              <div style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", backgroundColor: sec.color, borderRadius: "var(--radius-full)", transition: "width 1s ease" }} />
              </div>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)", marginTop: "6px" }}>
                {sec.correct} / {sec.total} questions correct
              </p>
            </div>
          );
        })}
      </div>

      <style>{`@media (max-width: 640px) {
        .progress-grid-2 { grid-template-columns: 1fr !important; }
      }`}</style>
    </div>
  );
}
