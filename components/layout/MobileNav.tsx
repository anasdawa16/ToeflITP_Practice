"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* -----------------------------------------------------------------------
   ICONS (inline SVG — no external deps)
   ----------------------------------------------------------------------- */
function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function BookIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
function ClipboardIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" strokeWidth={active ? 2.25 : 1.75} />
      <rect x="9" y="3" width="6" height="4" rx="1" />
    </svg>
  );
}
function BarChartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.25 : 1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function BrainIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.25 : 1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.66A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.66A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

/* -----------------------------------------------------------------------
   NAV ITEMS
   ----------------------------------------------------------------------- */
const MOBILE_NAV_ITEMS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/learn", label: "Learn", Icon: BookIcon },
  { href: "/practice", label: "Practice", Icon: ClipboardIcon },
  { href: "/progress", label: "Progress", Icon: BarChartIcon },
  { href: "/ai-assistant", label: "AI", Icon: BrainIcon },
] as const;

/* -----------------------------------------------------------------------
   MOBILE BOTTOM NAVIGATION
   Visible only on mobile (< 768px) — hidden on desktop via CSS
   ----------------------------------------------------------------------- */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "64px",
        backgroundColor: "var(--color-bg-card)",
        borderTop: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 50,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Mobile navigation"
    >
      {MOBILE_NAV_ITEMS.map(({ href, label, Icon }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: "6px 12px",
              textDecoration: "none",
              color: isActive ? "var(--color-primary-300)" : "var(--color-text-muted)",
              transition: "color 150ms ease",
              minWidth: "52px",
              borderRadius: "var(--radius-md)",
            }}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Active indicator dot */}
            <span style={{ position: "relative" }}>
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-primary-400)",
                  }}
                />
              )}
              <Icon active={isActive} />
            </span>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-ui)",
                fontWeight: isActive ? 600 : 400,
                lineHeight: 1,
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
