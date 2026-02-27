"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileNav } from "@/components/layout/MobileNav";
import { useProfile } from "@/lib/hooks/useProfile";

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
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg-primary)" }}>

      {/* ── Desktop & Tablet Sidebar (md: 768px+) ── */}
      <div className="hidden md:block">
        <Sidebar
          profile={profile}
          isLoading={isLoading}
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
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "56px",
          backgroundColor: "var(--color-bg-card)",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          zIndex: 30,
          // Safe area for notched phones
          paddingTop: "calc(var(--safe-top))",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-lg)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
          }}
        >
          TOEFL<span style={{ color: "var(--color-accent-400)" }}>Master</span>
        </span>

        {/* Mobile streak badge */}
        {!isLoading && (profile?.study_streak ?? 0) > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              backgroundColor: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: "var(--radius-full)",
              color: "var(--color-accent-300)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              fontFamily: "var(--font-ui)",
              minHeight: "unset", // override 44px rule from CSS
            }}
          >
            🔥 {profile?.study_streak}
          </div>
        )}
      </div>

      {/* ── Main Content Area ── */}
      <main
        style={{
          transition: "margin-left 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className="
          pt-14 md:pt-0
          ml-0 md:ml-[240px]
          md:pt-[64px]
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
