"use client";

import { useTransition, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileNav } from "@/components/layout/MobileNav";
import { useProfile } from "@/lib/hooks/useProfile";
import { FlameIcon, LogOutIcon } from "@/components/ui/Icons";
import { logoutAction } from "@/app/(auth)/actions";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard Layout Wrapper
 * Breakpoints:
 *   mobile  < 768px  → TopBar mobile strip + bottom nav, no sidebar
 *   tablet  768-1023px → collapsed sidebar (72px icon-only) + TopBar
 *   desktop ≥ 1024px → full sidebar (240px) + TopBar
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { profile, isLoading } = useProfile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoggingOut, startLogoutTransition] = useTransition();

  // Sidebar widths: desktop expanded=240px, collapsed=72px
  const sidebarWidth = sidebarCollapsed ? "72px" : "240px";

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : profile?.email?.[0]?.toUpperCase() ?? "?";

  function handleLogout() {
    startLogoutTransition(async () => { await logoutAction(); });
  }

  return (
    <div
      className="min-h-screen bg-[var(--color-bg-primary)]"
      style={{ ["--sidebar-w" as never]: sidebarWidth }}
    >

      {/* ── Desktop & Tablet Sidebar (md: 768px+) ── */}
      <div className="hidden md:block">
        <Sidebar
          profile={profile}
          isLoading={isLoading}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
      </div>

      {/* ── Desktop TopBar (pushed right by sidebar) ── */}
      <div className="hidden md:block">
        <TopBar
          profile={profile}
          isLoading={isLoading}
          sidebarWidth={sidebarWidth}
        />
      </div>

      {/* ── Mobile TopBar (full width, fixed, safe-area aware) ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg-card)]"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="h-14 px-4 flex items-center gap-2">
          {/* Brand */}
          <span className="flex-1 min-w-0 font-[var(--font-display)] text-[var(--text-lg)] font-bold text-[var(--color-text-primary)] truncate">
            TOEFL<span className="text-[var(--color-accent-400)]">Master</span>
          </span>

          {/* Streak badge */}
          {!isLoading && (profile?.study_streak ?? 0) > 0 && (
            <div
              className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] text-[var(--text-xs)] font-semibold"
              style={{ minHeight: "unset" }}
              title={`${profile?.study_streak} day streak`}
            >
              <FlameIcon size={13} className="text-[var(--color-accent-300)]" />
              <span className="text-[var(--color-text-secondary)]">{profile?.study_streak}</span>
            </div>
          )}

          {/* Avatar */}
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-xs)] font-bold"
            style={{
              backgroundColor: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.25)",
              color: "var(--color-text-primary)",
              backgroundImage: profile?.avatar_url ? `url(${profile.avatar_url})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!profile?.avatar_url && (isLoading ? "…" : initials)}
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex-shrink-0 w-8 h-8 rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)] flex items-center justify-center transition-colors hover:text-[#fca5a5] hover:border-[rgba(220,38,38,0.45)] disabled:opacity-50"
            aria-label="Sign out"
          >
            <LogOutIcon size={15} />
          </button>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <main
        className="dashboard-main ml-0 md:ml-[var(--sidebar-w)] transition-[margin] duration-200"
      >
        {/* Inner container: responsive padding */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
          }}
          className="px-4 sm:px-5 md:px-6 lg:px-8 py-4 md:py-8"
        >
          {children}
        </div>
      </main>

      {/* ── Mobile Bottom Navigation ── */}
      <MobileNav />
    </div>
  );
}

export type { DashboardLayoutProps };
