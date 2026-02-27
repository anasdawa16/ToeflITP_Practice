"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileNav } from "@/components/layout/MobileNav";
import { useProfile } from "@/lib/hooks/useProfile";
import { FlameIcon } from "@/components/ui/Icons";

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

  // Sidebar widths: desktop expanded=240px, collapsed=72px
  const sidebarWidth = sidebarCollapsed ? "72px" : "240px";

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

      {/* ── Mobile TopBar (full width, 56px, fixed) ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <div className="h-[56px] pt-[var(--safe-top)] px-4 flex items-center justify-between">
          <span className="font-[var(--font-display)] text-[var(--text-lg)] font-bold text-[var(--color-text-primary)]">
            TOEFL<span className="text-[var(--color-accent-400)]">Master</span>
          </span>

          {/* Mobile streak badge */}
          {!isLoading && (profile?.study_streak ?? 0) > 0 && (
            <div
              className="
                inline-flex items-center gap-1.5
                px-2.5 py-1
                rounded-full
                border border-[rgba(255,255,255,0.10)]
                bg-[rgba(255,255,255,0.04)]
                text-[var(--color-text-primary)]
                text-[var(--text-sm)] font-semibold
              "
              style={{ minHeight: "unset" }} // override 44px rule from globals
              title={`${profile?.study_streak} day study streak`}
            >
              <FlameIcon size={15} className="text-[var(--color-accent-300)]" />
              <span className="text-[var(--color-text-secondary)]">{profile?.study_streak}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <main
        className="
          pt-[calc(56px+var(--safe-top))] md:pt-[var(--topbar-height)]
          ml-0 md:ml-[var(--sidebar-w)]
          transition-[margin] duration-200
        "
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
