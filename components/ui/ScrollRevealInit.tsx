"use client";

/**
 * ScrollRevealInit — drops into the root layout once.
 * Scans the document for elements with data-reveal="" (empty, meaning
 * "not yet triggered") and observes them. When they enter the viewport,
 * it sets their data-reveal attribute to the animation name stored in
 * data-reveal-anim (default "up"), triggering the CSS @keyframes from
 * globals.css.
 *
 * Usage in any component (server or client):
 *   <div data-reveal="" data-reveal-anim="up" data-delay="100">…</div>
 *
 * In layout.tsx:
 *   <ScrollRevealInit />
 */

import { useEffect } from "react";

export function ScrollRevealInit() {
  useEffect(() => {
    const init = () => {
      const pending = document.querySelectorAll<HTMLElement>("[data-reveal='']");

      if (pending.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const anim = el.dataset.revealAnim ?? "up";
            const delay = el.dataset.delay;
            if (delay) el.style.animationDelay = `${delay}ms`;
            el.setAttribute("data-reveal", anim);
            observer.unobserve(el);
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      pending.forEach((el) => observer.observe(el));
    };

    // Run after first paint
    const raf = requestAnimationFrame(init);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
