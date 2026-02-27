"use client";

import { useEffect, useState } from "react";
import { TIER_ORDER, type BadgeDefinition } from "@/lib/achievements/badges";

interface BadgeWithStatus extends BadgeDefinition {
  unlocked: boolean;
  unlocked_at: string | null;
}

interface BadgeGridProps {
  /** If true, fetches from API automatically */
  autoFetch?: boolean;
  /** Pass badges directly (for embedding in other pages) */
  badges?: BadgeWithStatus[];
}

function BadgeCard({ badge }: { badge: BadgeWithStatus }) {
  const [hovered, setHovered] = useState(false);

  const tierColors = {
    bronze: "#cd7f32",
    silver: "#94a3b8",
    gold: "#fbbf24",
    platinum: "#a78bfa",
  };
  const tierColor = tierColors[badge.tier];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "16px 12px",
        backgroundColor: badge.unlocked ? "var(--color-bg-card)" : "rgba(255,255,255,0.02)",
        border: badge.unlocked
          ? `1px solid ${badge.color}40`
          : "1px solid rgba(255,255,255,0.06)",
        borderRadius: "var(--radius-xl)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        textAlign: "center",
        transition: "transform 150ms ease, box-shadow 150ms ease",
        transform: hovered && badge.unlocked ? "translateY(-2px)" : "none",
        boxShadow: hovered && badge.unlocked ? `0 8px 24px ${badge.color}20` : "none",
        cursor: badge.unlocked ? "default" : "default",
        filter: badge.unlocked ? "none" : "grayscale(1) opacity(0.35)",
      }}
    >
      {/* Tier indicator dot */}
      <div style={{
        position: "absolute", top: "8px", right: "8px",
        width: "6px", height: "6px", borderRadius: "50%",
        backgroundColor: badge.unlocked ? tierColor : "rgba(255,255,255,0.1)",
      }} />

      {/* Icon with ring */}
      <div style={{
        width: "48px", height: "48px", borderRadius: "50%",
        backgroundColor: badge.unlocked ? `${badge.color}15` : "rgba(255,255,255,0.04)",
        border: badge.unlocked ? `2px solid ${badge.color}50` : "2px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px",
        boxShadow: badge.unlocked ? `0 0 12px ${badge.color}25` : "none",
        transition: "box-shadow 200ms ease",
      }}>
        {badge.unlocked ? badge.icon : "🔒"}
      </div>

      {/* Name */}
      <div style={{
        fontFamily: "var(--font-display)", fontSize: "var(--text-xs)", fontWeight: 700,
        color: badge.unlocked ? "var(--color-text-primary)" : "var(--color-text-muted)",
        lineHeight: 1.2,
      }}>
        {badge.name}
      </div>

      {/* Description */}
      <div style={{
        fontFamily: "var(--font-ui)", fontSize: "10px",
        color: "var(--color-text-muted)", lineHeight: 1.4,
      }}>
        {badge.description}
      </div>

      {/* Unlocked date */}
      {badge.unlocked && badge.unlocked_at && (
        <div style={{
          fontFamily: "var(--font-ui)", fontSize: "9px",
          color: badge.color, marginTop: "2px",
          textTransform: "uppercase", letterSpacing: "0.06em",
        }}>
          ✓ {new Date(badge.unlocked_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" })}
        </div>
      )}

      {/* Locked label */}
      {!badge.unlocked && (
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(255,255,255,0.15)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Locked
        </div>
      )}
    </div>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  streak: "🔥 Streak",
  score: "🏆 Score",
  accuracy: "🎯 Accuracy",
  practice: "📝 Practice",
  milestone: "🚀 Milestone",
};

export function BadgeGrid({ autoFetch = true, badges: propBadges }: BadgeGridProps) {
  const [badges, setBadges] = useState<BadgeWithStatus[]>(propBadges ?? []);
  const [loading, setLoading] = useState(autoFetch);
  const [totalUnlocked, setTotalUnlocked] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    if (!autoFetch) return;
    fetch("/api/achievements")
      .then((r) => r.json())
      .then((d) => {
        setBadges((d as { badges: BadgeWithStatus[]; totalUnlocked: number }).badges ?? []);
        setTotalUnlocked((d as { badges: BadgeWithStatus[]; totalUnlocked: number }).totalUnlocked ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [autoFetch]);

  useEffect(() => {
    if (propBadges) {
      setBadges(propBadges);
      setTotalUnlocked(propBadges.filter((b) => b.unlocked).length);
    }
  }, [propBadges]);

  // Sort: unlocked first (by date desc), then locked sorted by tier desc
  const sorted = [...badges].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    if (a.unlocked && b.unlocked) {
      return new Date(b.unlocked_at ?? 0).getTime() - new Date(a.unlocked_at ?? 0).getTime();
    }
    return TIER_ORDER[b.tier] - TIER_ORDER[a.tier];
  });

  const categories = ["all", ...Array.from(new Set(badges.map((b) => b.category)))];
  const filtered = activeTab === "all" ? sorted : sorted.filter((b) => b.category === activeTab);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "200px", gap: "12px", flexDirection: "column" }}>
        <div style={{ width: "28px", height: "28px", border: "2px solid rgba(255,255,255,0.08)", borderTop: "2px solid var(--color-primary-400)", borderRadius: "50%", animation: "spin 800ms linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header summary */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          padding: "10px 16px",
          backgroundColor: "rgba(251,191,36,0.08)",
          border: "1px solid rgba(251,191,36,0.25)",
          borderRadius: "var(--radius-full)",
        }}>
          <span style={{ fontSize: "18px" }}>🏅</span>
          <div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: 800, color: "#fbbf24", fontVariantNumeric: "tabular-nums" }}>
              {totalUnlocked}
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
              {" "}/ {badges.length} badges unlocked
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ flex: 1, minWidth: "120px" }}>
          <div style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${badges.length > 0 ? (totalUnlocked / badges.length) * 100 : 0}%`,
              backgroundColor: "#fbbf24",
              borderRadius: "var(--radius-full)",
              transition: "width 1s ease",
              boxShadow: "0 0 8px rgba(251,191,36,0.4)",
            }} />
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", gap: "0", overflowX: "auto" }}>
        {categories.map((cat) => {
          const label = cat === "all" ? "🏅 All" : (CATEGORY_LABELS[cat] ?? cat);
          const catCount = cat === "all"
            ? totalUnlocked
            : badges.filter((b) => b.category === cat && b.unlocked).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              style={{
                padding: "8px 14px", border: "none", background: "none",
                borderBottom: `2px solid ${activeTab === cat ? "var(--color-primary-400)" : "transparent"}`,
                fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: activeTab === cat ? 700 : 400,
                color: activeTab === cat ? "var(--color-primary-300)" : "var(--color-text-muted)",
                cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              {label}
              {catCount > 0 && (
                <span style={{ marginLeft: "4px", padding: "1px 5px", backgroundColor: "rgba(96,165,250,0.15)", borderRadius: "var(--radius-full)", fontSize: "9px", color: "#60a5fa" }}>
                  {catCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Badge grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "12px" }}>
        {filtered.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}
