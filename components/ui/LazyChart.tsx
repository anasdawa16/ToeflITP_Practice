"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * LazyChart — Intersection Observer gated dynamic import wrapper.
 *
 * Usage:
 *   <LazyChart component={() => import("@/components/progress/ScoreChart")} componentName="ScoreChart" props={...} />
 *
 * Benefits:
 *  - The chart bundle (recharts ~200KB) is only downloaded when the
 *    component scrolls into the viewport.
 *  - Prevents Recharts from blocking initial page paint.
 */

interface LazyChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: () => Promise<{ default: React.ComponentType<any> }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
  height?: number;
  label?: string;
}

export function LazyChart({ component, props = {}, height = 220, label = "Loading chart…" }: LazyChartProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer: only load chart when near viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: "200px" } // pre-load 200px before entering viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Dynamic component — only created after entering view
  const DynamicComponent = inView
    ? dynamic(component, {
        loading: () => <ChartSkeleton height={height} label={label} />,
        ssr: false,
      })
    : null;

  return (
    <div ref={ref} style={{ minHeight: `${height}px` }}>
      {inView && DynamicComponent ? (
        <DynamicComponent {...props} />
      ) : (
        <ChartSkeleton height={height} label={label} />
      )}
    </div>
  );
}

function ChartSkeleton({ height, label }: { height: number; label: string }) {
  return (
    <div
      style={{
        height: `${height}px`,
        borderRadius: "var(--radius-lg)",
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: "8px",
      }}
    >
      {/* Shimmer bar */}
      <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: "60px" }}>
        {[0.6, 0.9, 0.5, 0.8, 0.7, 0.95, 0.65].map((h, i) => (
          <div
            key={i}
            style={{
              width: "12px",
              height: `${h * 60}px`,
              borderRadius: "3px",
              backgroundColor: "rgba(96,165,250,0.12)",
              animation: `shimmer 1.5s ease-in-out ${i * 0.1}s infinite alternate`,
            }}
          />
        ))}
      </div>
      <p style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>{label}</p>
      <style>{`
        @keyframes shimmer {
          from { opacity: 0.4; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
