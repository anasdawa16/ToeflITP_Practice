"use client";

import { BadgeGrid } from "@/components/progress/BadgeGrid";
import { useRouter } from "next/navigation";

export default function AchievementsPage() {
  const router = useRouter();

  return (
    <div style={{ padding: "28px 24px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "4px" }}>
            🏆 Achievements
          </h1>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
            Collect badges as you reach TOEFL ITP milestones
          </p>
        </div>
        <button
          onClick={() => router.push("/progress")}
          style={{
            padding: "8px 16px",
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: 600,
            color: "var(--color-text-secondary)", cursor: "pointer",
          }}
        >
          ← Back to Progress
        </button>
      </div>

      {/* Tier legend */}
      <div style={{
        display: "flex", gap: "16px", flexWrap: "wrap", padding: "12px 16px",
        backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)", marginBottom: "24px",
      }}>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginRight: "4px" }}>Tiers:</p>
        {[
          { label: "Bronze", color: "#cd7f32" },
          { label: "Silver", color: "#94a3b8" },
          { label: "Gold", color: "#fbbf24" },
          { label: "Platinum", color: "#a78bfa" },
        ].map((t) => (
          <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: t.color }} />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>{t.label}</span>
          </div>
        ))}
      </div>

      <BadgeGrid autoFetch={true} />
    </div>
  );
}
