"use client";

/**
 * ScrollReveal — wraps children with IntersectionObserver-driven entrance animation.
 *
 * Usage:
 *   <ScrollReveal animation="up" delay={100}>
 *     <YourContent />
 *   </ScrollReveal>
 *
 * The wrapper div gains data-reveal="<animation>" once visible, which triggers
 * the @keyframes defined in globals.css.
 */

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type Animation = "up" | "left" | "right" | "scale" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: Animation;
  /** Delay in ms before the animation starts (uses css animation-delay) */
  delay?: number;
  /** Threshold 0-1 for how much of element must be in viewport */
  threshold?: number;
  /** Extra className on the wrapper div */
  className?: string;
  style?: CSSProperties;
}

export function ScrollReveal({
  children,
  animation = "up",
  delay = 0,
  threshold = 0.12,
  className,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-reveal", animation);
          if (delay) el.style.animationDelay = `${delay}ms`;
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, threshold]);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

/**
 * ScrollRevealGroup — reveals each direct child with staggered delay.
 * Renders a single wrapper, each child gets its own ScrollReveal.
 */
interface ScrollRevealGroupProps {
  children: ReactNode[];
  animation?: Animation;
  staggerMs?: number;
  initialDelay?: number;
  className?: string;
  style?: CSSProperties;
}

export function ScrollRevealGroup({
  children,
  animation = "up",
  staggerMs = 100,
  initialDelay = 0,
  className,
  style,
}: ScrollRevealGroupProps) {
  return (
    <div className={className} style={style}>
      {children.map((child, i) => (
        <ScrollReveal
          key={i}
          animation={animation}
          delay={initialDelay + i * staggerMs}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
