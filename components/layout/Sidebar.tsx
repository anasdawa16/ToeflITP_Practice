"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/app/(auth)/actions";
import type { Profile } from "@/types/database";
import {
  BarChartIcon,
  BookmarkIcon,
  BookOpenIcon,
  BrainIcon,
  ChevronLeftIcon,
  ClipboardIcon,
  FlameIcon,
  HomeIcon,
  LogOutIcon,
} from "@/components/ui/Icons";

/* -----------------------------------------------------------------------
   NAV ITEM CONFIG
   ----------------------------------------------------------------------- */
interface NavItem {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; active?: boolean; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", Icon: HomeIcon },
  { href: "/learn", label: "Learn", Icon: BookOpenIcon },
  { href: "/practice", label: "Practice", Icon: ClipboardIcon },
  { href: "/mock-test", label: "Mock Test", Icon: ClipboardIcon },
  { href: "/progress", label: "Progress", Icon: BarChartIcon },
  { href: "/ai-assistant", label: "AI Assistant", Icon: BrainIcon },
  { href: "/bookmarks", label: "Bookmarks", Icon: BookmarkIcon },
];

/* -----------------------------------------------------------------------
   SIDEBAR COMPONENT
   ----------------------------------------------------------------------- */
interface SidebarProps {
  profile: Profile | null;
  isLoading: boolean;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function Sidebar({ profile, isLoading, collapsed, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const sidebarWidth = collapsed ? "72px" : "240px";

  async function handleLogout() {
    setIsLoggingOut(true);
    await logoutAction();
  }

  // Avatar initials
  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : profile?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-40 overflow-hidden border-r border-[var(--color-border)] bg-[var(--color-bg-card)] flex flex-col transition-[width] duration-200"
      style={{ width: sidebarWidth }}
      aria-label="Main navigation"
    >
      {/* Logo + Collapse Toggle */}
      <div
        className="h-[var(--topbar-height)] flex items-center flex-shrink-0 border-b border-[var(--color-border)]"
        style={{
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "0 16px" : "0 20px",
        }}
      >
        {!collapsed && (
          <Link
            href="/"
            className="font-[var(--font-display)] text-[var(--text-lg)] font-bold text-[var(--color-text-primary)] no-underline whitespace-nowrap"
          >
            TOEFL<span style={{ color: "var(--color-accent-400)" }}>Master</span>
          </Link>
        )}
        <button
          type="button"
          onClick={() => onCollapsedChange(!collapsed)}
          className="w-8 h-8 rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)] cursor-pointer flex items-center justify-center flex-shrink-0 transition-colors hover:text-[var(--color-text-primary)] hover:border-[rgba(255,255,255,0.16)]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0)", transition: "transform 250ms ease" }}>
            <ChevronLeftIcon />
          </span>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={[
                "flex items-center gap-3 px-3 py-2 rounded-md no-underline",
                "font-[var(--font-ui)] text-[var(--text-sm)] transition-colors overflow-hidden whitespace-nowrap",
                isActive
                  ? "text-[var(--color-text-primary)] bg-[rgba(139,92,246,0.12)] border-l-2 border-[var(--color-primary-400)] shadow-[0_0_12px_rgba(139,92,246,0.08)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(139,92,246,0.06)] border-l-2 border-transparent",
                collapsed ? "justify-center" : "",
              ].join(" ")}
            >
              <span style={{ flexShrink: 0, lineHeight: 0 }}>
                <item.Icon size={20} active={isActive} />
              </span>
              {!collapsed && (
                <span style={{ opacity: collapsed ? 0 : 1, transition: "opacity 200ms ease" }}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Streak + Profile + Logout */}
      <div
        className="p-3 border-t border-[var(--color-border)] flex-shrink-0"
      >
        {/* Streak Badge */}
        {!collapsed && !isLoading && (
          <div
            className="flex items-center gap-2 px-3 py-2 mb-2 rounded-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]"
          >
            <FlameIcon />
            <span
              className="text-[var(--text-sm)] text-[var(--color-text-secondary)] font-semibold font-[var(--font-ui)]"
            >
              {profile?.study_streak ?? 0} day streak
            </span>
          </div>
        )}

        {/* User info row */}
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-md overflow-hidden"
        >
          {/* Avatar */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "rgba(139, 92, 246, 0.15)",
              color: "var(--color-text-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--text-xs)",
              fontWeight: 700,
              fontFamily: "var(--font-ui)",
              flexShrink: 0,
              backgroundImage: profile?.avatar_url ? `url(${profile.avatar_url})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          >
            {!profile?.avatar_url && initials}
          </div>

          {!collapsed && (
            <div style={{ overflow: "hidden", flex: 1 }}>
              <p
                className="m-0 overflow-hidden text-ellipsis whitespace-nowrap font-[var(--font-ui)] text-[var(--text-sm)] font-semibold text-[var(--color-text-primary)]"
              >
                {isLoading ? "Loading…" : (profile?.full_name ?? profile?.username ?? "User")}
              </p>
              <p
                className="m-0 overflow-hidden text-ellipsis whitespace-nowrap font-[var(--font-ui)] text-[var(--text-xs)] text-[var(--color-text-muted)]"
              >
                Target: {profile?.target_score ?? "—"} pts
              </p>
            </div>
          )}

          {!collapsed && (
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-7 h-7 rounded bg-transparent text-[var(--color-text-muted)] flex items-center justify-center flex-shrink-0 transition-colors hover:text-[#fca5a5] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Sign out"
            >
              <LogOutIcon />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
