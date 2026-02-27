"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChartIcon, BookOpenIcon, BrainIcon, ClipboardIcon, HomeIcon } from "@/components/ui/Icons";

/* -----------------------------------------------------------------------
   NAV ITEMS
   ----------------------------------------------------------------------- */
const MOBILE_NAV_ITEMS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/learn", label: "Learn", Icon: BookOpenIcon },
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
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Mobile navigation"
    >
      <div className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t border-[var(--color-border)] bg-[var(--color-bg-card)] flex items-center justify-around">
        {MOBILE_NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={[
                "flex flex-col items-center gap-1 px-3 py-1.5 min-w-[56px] rounded-md no-underline transition-colors",
                isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]",
              ].join(" ")}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active indicator dot */}
              <span className="relative">
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-primary-400)]" />
                )}
                <Icon active={isActive} size={22} />
              </span>
              <span
                className={[
                  "text-[10px] leading-none font-[var(--font-ui)]",
                  isActive ? "font-semibold text-[var(--color-text-secondary)]" : "font-normal text-[var(--color-text-muted)]",
                ].join(" ")}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
