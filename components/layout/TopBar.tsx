"use client";

import Link from "next/link";
import { useTransition } from "react";
import { logoutAction } from "@/app/(auth)/actions";
import type { Profile } from "@/types/database";

/* -----------------------------------------------------------------------
   ICONS
   ----------------------------------------------------------------------- */
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function FlameIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function LogOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

/* -----------------------------------------------------------------------
   TOPBAR
   ----------------------------------------------------------------------- */
interface TopBarProps {
  profile: Profile | null;
  isLoading: boolean;
  sidebarWidth?: string;
}

export function TopBar({ profile, isLoading, sidebarWidth = "240px" }: TopBarProps) {
  const [isLoggingOut, startLogoutTransition] = useTransition();

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : profile?.email?.[0]?.toUpperCase() ?? "?";

  // Test date countdown
  let daysUntilTest: number | null = null;
  if (profile?.test_date) {
    const d = new Date(profile.test_date);
    daysUntilTest = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  }

  function handleLogout() {
    startLogoutTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: sidebarWidth,
        right: 0,
        height: "var(--topbar-height, 64px)",
        backgroundColor: "var(--color-bg-card)",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        zIndex: 30,
        transition: "left 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        gap: "16px",
      }}
    >
      {/* Left: Page breadcrumb / title area (slot for child pages to use) */}
      <div
        id="topbar-title"
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-base)",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          flex: 1,
          minWidth: 0,
        }}
      />

      {/* Right: Stats + Notifications + Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        {/* Streak pill */}
        {!isLoading && (profile?.study_streak ?? 0) > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 12px",
              backgroundColor: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: "var(--radius-full)",
              color: "var(--color-accent-300)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              fontFamily: "var(--font-ui)",
            }}
            title={`${profile?.study_streak} day study streak`}
          >
            <FlameIcon />
            {profile?.study_streak}
          </div>
        )}

        {/* Target score pill */}
        {!isLoading && profile?.target_score && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 12px",
              backgroundColor: "rgba(30,74,155,0.12)",
              border: "1px solid rgba(30,74,155,0.25)",
              borderRadius: "var(--radius-full)",
              color: "var(--color-primary-300)",
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              fontFamily: "var(--font-ui)",
            }}
            title="Your target TOEFL ITP score"
          >
            <TargetIcon />
            {profile.target_score}
          </div>
        )}

        {/* Days until test */}
        {!isLoading && daysUntilTest !== null && daysUntilTest > 0 && (
          <div
            style={{
              padding: "5px 12px",
              backgroundColor: daysUntilTest < 14
                ? "rgba(220,38,38,0.1)"
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${daysUntilTest < 14 ? "rgba(220,38,38,0.3)" : "var(--color-border)"}`,
              borderRadius: "var(--radius-full)",
              color: daysUntilTest < 14 ? "#fca5a5" : "var(--color-text-muted)",
              fontSize: "var(--text-xs)",
              fontFamily: "var(--font-ui)",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
            title={`Your test date is ${daysUntilTest} days away`}
          >
            {daysUntilTest}d to test
          </div>
        )}

        {/* Divider */}
        <div style={{ width: "1px", height: "28px", backgroundColor: "var(--color-border)", margin: "0 4px" }} />

        {/* Notification button */}
        <button
          type="button"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "transparent",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 150ms ease",
          }}
          aria-label="Notifications"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-primary-400)";
            e.currentTarget.style.color = "var(--color-primary-300)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.color = "var(--color-text-muted)";
          }}
        >
          <BellIcon />
        </button>

        {/* Avatar + dropdown trigger */}
        <div style={{ position: "relative" }}>
          <Link
            href="/settings/profile"
            style={{ display: "block", textDecoration: "none" }}
            title="View profile settings"
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--color-primary-600)",
                border: "2px solid var(--color-primary-400)",
                color: "var(--color-primary-100)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                fontFamily: "var(--font-ui)",
                cursor: "pointer",
                transition: "border-color 150ms ease",
                backgroundImage: profile?.avatar_url ? `url(${profile.avatar_url})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!profile?.avatar_url && (isLoading ? "…" : initials)}
            </div>
          </Link>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "transparent",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 150ms ease",
          }}
          aria-label="Sign out"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(220,38,38,0.5)";
            e.currentTarget.style.color = "#fca5a5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.color = "var(--color-text-muted)";
          }}
        >
          <LogOutIcon />
        </button>
      </div>
    </header>
  );
}
