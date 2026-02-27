"use client";

import { useEffect, useRef, useState } from "react";

interface SectionTimerProps {
  seconds: number;
  sectionLabel: string;
  onExpire?: () => void;
  /** If true, timer is paused */
  paused?: boolean;
}

const WARN_THRESHOLD = 300; // 5 min
const CRITICAL_THRESHOLD = 60; // 1 min

function formatTime(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function SectionTimer({ seconds, sectionLabel, onExpire, paused }: SectionTimerProps) {
  const prevSeconds = useRef(seconds);
  const [flash, setFlash] = useState(false);

  const isCritical = seconds <= CRITICAL_THRESHOLD;
  const isWarn = seconds <= WARN_THRESHOLD && !isCritical;

  // Flash last 10 seconds
  useEffect(() => {
    if (seconds <= 10 && seconds > 0) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 400);
      return () => clearTimeout(t);
    }
  }, [seconds]);

  // Fire onExpire exactly once
  useEffect(() => {
    if (seconds === 0 && prevSeconds.current > 0) {
      onExpire?.();
    }
    prevSeconds.current = seconds;
  }, [seconds, onExpire]);

  const color = isCritical ? "#f87171" : isWarn ? "#fbbf24" : "var(--color-text-primary)";
  const borderColor = isCritical
    ? "rgba(248,113,113,0.5)"
    : isWarn
    ? "rgba(251,191,36,0.4)"
    : "var(--color-border)";
  const bgColor = isCritical
    ? "rgba(248,113,113,0.1)"
    : isWarn
    ? "rgba(251,191,36,0.08)"
    : "rgba(255,255,255,0.04)";

  // Circular progress arc
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  // We need the max time for the current section — derive from common TOEFL times
  const maxTime = seconds >= 3300 ? 3300 : seconds >= 1500 ? 1500 : 2100;
  const progress = Math.max(0, Math.min(1, seconds / maxTime));
  const strokeDash = circumference * progress;

  return (
    <div
      role="timer"
      aria-label={`${sectionLabel} — ${formatTime(seconds)} remaining`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 16px 8px 10px",
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-lg)",
        transition: "all 300ms ease",
        opacity: flash ? 0.5 : 1,
      }}
    >
      {/* Circular countdown */}
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
        {/* Track */}
        <circle
          cx="22" cy="22" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3"
        />
        {/* Progress */}
        <circle
          cx="22" cy="22" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circumference}`}
          strokeDashoffset="0"
          transform="rotate(-90 22 22)"
          style={{ transition: "stroke-dasharray 1s linear, stroke 300ms ease" }}
        />
        {/* Icon inside */}
        <text x="22" y="26" textAnchor="middle" fontSize="12" fill={color}>
          {isCritical ? "⚡" : "⏱"}
        </text>
      </svg>

      <div>
        <p style={{
          fontFamily: "var(--font-ui)",
          fontSize: "10px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--color-text-muted)",
          marginBottom: "2px",
        }}>
          {sectionLabel}
        </p>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "var(--text-lg)",
          fontWeight: 700,
          color,
          lineHeight: 1,
          letterSpacing: "0.04em",
          fontVariantNumeric: "tabular-nums",
        }}>
          {formatTime(seconds)}
        </p>
      </div>
    </div>
  );
}
