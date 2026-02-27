"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/app/(auth)/actions";
import type { Profile } from "@/types/database";

/* -----------------------------------------------------------------------
   NAV ITEM CONFIG
   ----------------------------------------------------------------------- */
interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function HomeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function BookOpenIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
function ClipboardIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  );
}
function BarChartIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function BrainIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.66A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.66A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}
function BookmarkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function ChevronLeftIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function LogOutIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function FlameIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
    </svg>
  );
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: <HomeIcon /> },
  { href: "/learn", label: "Learn", icon: <BookOpenIcon /> },
  { href: "/practice", label: "Practice", icon: <ClipboardIcon /> },
  { href: "/mock-test", label: "Mock Test", icon: <ClipboardIcon /> },
  { href: "/progress", label: "Progress", icon: <BarChartIcon /> },
  { href: "/ai-assistant", label: "AI Assistant", icon: <BrainIcon /> },
  { href: "/bookmarks", label: "Bookmarks", icon: <BookmarkIcon /> },
];

/* -----------------------------------------------------------------------
   SIDEBAR COMPONENT
   ----------------------------------------------------------------------- */
interface SidebarProps {
  profile: Profile | null;
  isLoading: boolean;
}

export function Sidebar({ profile, isLoading }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
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
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: sidebarWidth,
        backgroundColor: "var(--color-bg-card)",
        borderRight: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        transition: "width 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 40,
        overflow: "hidden",
      }}
      aria-label="Main navigation"
    >
      {/* Logo + Collapse Toggle */}
      <div
        style={{
          height: "var(--topbar-height, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "0 16px" : "0 20px",
          borderBottom: "1px solid var(--color-border)",
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-lg)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            TOEFL<span style={{ color: "var(--color-accent-400)" }}>Master</span>
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "transparent",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 150ms ease",
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-primary-400)";
            e.currentTarget.style.color = "var(--color-primary-300)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.color = "var(--color-text-muted)";
          }}
        >
          <span style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0)", transition: "transform 250ms ease" }}>
            <ChevronLeftIcon />
          </span>
        </button>
      </div>

      {/* Navigation Items */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "9px 12px",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                color: isActive ? "var(--color-primary-200)" : "var(--color-text-secondary)",
                backgroundColor: isActive ? "rgba(30,74,155,0.18)" : "transparent",
                borderLeft: isActive ? "3px solid var(--color-primary-400)" : "3px solid transparent",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-sm)",
                fontWeight: isActive ? 600 : 400,
                transition: "all 150ms ease",
                whiteSpace: "nowrap",
                overflow: "hidden",
                marginBottom: "2px",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }
              }}
            >
              <span style={{ flexShrink: 0, lineHeight: 0 }}>{item.icon}</span>
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
        style={{
          padding: "12px 8px",
          borderTop: "1px solid var(--color-border)",
          flexShrink: 0,
        }}
      >
        {/* Streak Badge */}
        {!collapsed && !isLoading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              marginBottom: "8px",
              backgroundColor: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <FlameIcon />
            <span
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-accent-300)",
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
              }}
            >
              {profile?.study_streak ?? 0} day streak
            </span>
          </div>
        )}

        {/* User info row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 12px",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "var(--color-primary-600)",
              color: "var(--color-primary-100)",
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
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-ui)",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {isLoading ? "Loading…" : (profile?.full_name ?? profile?.username ?? "User")}
              </p>
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-ui)",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
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
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "transparent",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 150ms ease",
                flexShrink: 0,
              }}
              aria-label="Sign out"
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fca5a5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-muted)"; }}
            >
              <LogOutIcon />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
