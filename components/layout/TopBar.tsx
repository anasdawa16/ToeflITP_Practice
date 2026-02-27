"use client";

import Link from "next/link";
import { useTransition } from "react";
import { logoutAction } from "@/app/(auth)/actions";
import type { Profile } from "@/types/database";
import { BellIcon, FlameIcon, LogOutIcon, TargetIcon } from "@/components/ui/Icons";

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
      className="fixed top-0 right-0 z-30 h-[var(--topbar-height)] border-b border-[var(--color-border)] bg-[rgba(12,12,15,0.85)] backdrop-blur-md flex items-center justify-between gap-4 px-6 transition-[left] duration-200"
      style={{ left: sidebarWidth }}
    >
      {/* Left: Page breadcrumb / title area (slot for child pages to use) */}
      <div
        id="topbar-title"
        className="flex-1 min-w-0 font-[var(--font-ui)] text-[var(--text-base)] font-semibold text-[var(--color-text-primary)]"
      />

      {/* Right: Stats + Notifications + Avatar */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Streak pill */}
        {!isLoading && (profile?.study_streak ?? 0) > 0 && (
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] text-[var(--color-text-secondary)] text-[var(--text-sm)] font-semibold font-[var(--font-ui)]"
            title={`${profile?.study_streak} day study streak`}
          >
            <span className="text-[var(--color-accent-300)]"><FlameIcon /></span>
            <span>{profile?.study_streak}</span>
          </div>
        )}

        {/* Target score pill */}
        {!isLoading && profile?.target_score && (
          <div
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] text-[var(--color-text-secondary)] text-[var(--text-sm)] font-medium font-[var(--font-ui)]"
            title="Your target TOEFL ITP score"
          >
            <span className="text-[var(--color-primary-300)]"><TargetIcon /></span>
            <span>{profile.target_score}</span>
          </div>
        )}

        {/* Days until test */}
        {!isLoading && daysUntilTest !== null && daysUntilTest > 0 && (
          <div
            className={[
              "hidden xl:inline-flex px-3 py-1 rounded-full border text-[var(--text-xs)] font-[var(--font-ui)] font-medium whitespace-nowrap",
              daysUntilTest < 14
                ? "bg-[rgba(220,38,38,0.10)] border-[rgba(220,38,38,0.30)] text-[#fca5a5]"
                : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.10)] text-[var(--color-text-muted)]",
            ].join(" ")}
            title={`Your test date is ${daysUntilTest} days away`}
          >
            {daysUntilTest}d to test
          </div>
        )}

        {/* Divider */}
        <div className="w-px h-7 bg-[var(--color-border)] mx-1" />

        {/* Notification button */}
        <button
          type="button"
          className="w-9 h-9 rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)] flex items-center justify-center transition-colors hover:text-[var(--color-text-primary)] hover:border-[rgba(255,255,255,0.16)]"
          aria-label="Notifications"
        >
          <BellIcon />
        </button>

        {/* Avatar + dropdown trigger */}
        <div style={{ position: "relative" }}>
          <Link
            href="/settings/profile"
            className="block no-underline"
            title="View profile settings"
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "rgba(139, 92, 246, 0.15)",
                border: "1px solid rgba(139, 92, 246, 0.25)",
                color: "var(--color-text-primary)",
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
          className="w-9 h-9 rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)] flex items-center justify-center transition-colors hover:text-[#fca5a5] hover:border-[rgba(220,38,38,0.45)] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Sign out"
        >
          <LogOutIcon />
        </button>
      </div>
    </header>
  );
}
