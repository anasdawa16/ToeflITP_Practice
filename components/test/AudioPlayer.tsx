"use client";

import { useEffect } from "react";
import { useAudioPlayer, type AudioState } from "@/lib/hooks/useAudioPlayer";
import {
  PlayIcon,
  Volume2Icon,
  VolumeXIcon,
  HeadphonesIcon,
  CheckIcon,
  AlertTriangleIcon,
  LoaderIcon,
} from "@/components/ui/Icons";

interface AudioPlayerProps {
  /** Dialogue transcript for TTS — each line is spoken by alternating voices */
  transcript: string;
  title?: string;
  /** If true, the play button is auto-pressed on mount (per ETS — audio starts immediately) */
  autoPlay?: boolean;
  onEnded?: () => void;
  onPlay?: () => void;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

const STATE_LABELS: Record<AudioState, string> = {
  idle: "Click Play to begin",
  loading: "Preparing audio…",
  playing: "Now playing",
  ended: "Audio complete — questions will appear below",
  error: "Audio unavailable — your browser may not support text-to-speech",
};

export function AudioPlayer({ transcript, title, autoPlay = false, onEnded, onPlay }: AudioPlayerProps) {
  const { state, currentTime, duration, progress, play, stop } = useAudioPlayer({
    transcript,
    onEnded,
    onPlay,
  });

  // Auto-play on mount if requested — must be in useEffect to avoid render-phase side-effects
  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(() => play(), 150);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPlaying = state === "playing";
  const isEnded = state === "ended";
  const isError = state === "error";
  const isLoading = state === "loading";
  const canPlay = state === "idle";

  /* ── ETS Disclaimer ─────────────────────────────────────── */
  const etsDot = isEnded ? (
    <span style={{ color: "#34d399", fontSize: "12px" }}>✓</span>
  ) : (
    <span style={{
      display: "inline-block",
      width: "8px", height: "8px",
      borderRadius: "50%",
      backgroundColor: isPlaying ? "#f87171" : isLoading ? "#fbbf24" : "rgba(255,255,255,0.2)",
      animation: isPlaying ? "pulse 1.2s ease-in-out infinite" : "none",
      flexShrink: 0,
    }} />
  );

  return (
    <div
      role="region"
      aria-label="Audio player"
      style={{
        padding: "24px",
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Title + ETS badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "36px", height: "36px", borderRadius: "50%",
            backgroundColor: "rgba(124,58,237,0.12)",
            color: isEnded ? "#34d399" : isPlaying ? "#f87171" : "var(--color-primary-400)",
            flexShrink: 0,
          }}>
            {isEnded ? <VolumeXIcon size={18} /> : isPlaying ? <Volume2Icon size={18} /> : <HeadphonesIcon size={18} />}
          </span>
          <div>
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)", textTransform: "uppercase",
              letterSpacing: "0.08em", fontWeight: 600, marginBottom: "2px",
            }}>
              Section 1 — Listening
            </p>
            {title && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text-primary)", margin: 0 }}>
                {title}
              </p>
            )}
          </div>
        </div>

        {/* ETS one-play chip */}
        <div style={{
          display: "flex", alignItems: "center", gap: "5px",
          padding: "4px 10px",
          backgroundColor: isEnded ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.1)",
          border: `1px solid ${isEnded ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}`,
          borderRadius: "var(--radius-full)",
        }}>
          {etsDot}
          <span style={{
            fontFamily: "var(--font-ui)", fontSize: "10px", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.07em",
            color: isEnded ? "#34d399" : "#f87171",
          }}>
            {isEnded ? "Played" : "1 Play Only"}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div style={{
          height: "6px",
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: "var(--radius-full)",
          overflow: "hidden",
          marginBottom: "6px",
        }}>
          <div style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: isEnded
              ? "linear-gradient(90deg, #34d399, #10b981)"
              : isError
              ? "#f87171"
              : "linear-gradient(90deg, var(--color-primary-500), var(--color-primary-300))",
            borderRadius: "var(--radius-full)",
            transition: "width 300ms linear",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "var(--color-text-muted)", fontVariantNumeric: "tabular-nums" }}>
            {formatTime(currentTime)}
          </span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "11px", color: "var(--color-text-muted)", fontVariantNumeric: "tabular-nums" }}>
            {duration > 0 ? `~${formatTime(duration)}` : "--:--"}
          </span>
        </div>
      </div>

      {/* Play button / status */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <button
          type="button"
          onClick={play}
          disabled={!canPlay}
          aria-label="Play audio (one time only)"
          style={{
            width: "48px", height: "48px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: canPlay
              ? "var(--color-primary-500)"
              : isError
              ? "rgba(248,113,113,0.2)"
              : "rgba(255,255,255,0.06)",
            color: canPlay ? "#fff" : "var(--color-text-muted)",
            fontSize: "20px",
            cursor: canPlay ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transition: "all 200ms ease",
          }}
        >
          {isLoading ? (
            <LoaderIcon size={18} />
          ) : isPlaying ? (
            <PlayIcon size={18} />
          ) : isEnded ? (
            <CheckIcon size={18} />
          ) : isError ? (
            <AlertTriangleIcon size={18} />
          ) : (
            <PlayIcon size={18} />
          )}
        </button>

        <div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 600, color: isError ? "#f87171" : "var(--color-text-primary)", marginBottom: "2px" }}>
            {STATE_LABELS[state]}
          </p>
          {canPlay && (
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              <AlertTriangleIcon size={12} style={{ flexShrink: 0 }} />
              This audio can only be played <strong>once</strong> per ETS regulations.
            </p>
          )}
          {isEnded && (
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "#34d399", display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckIcon size={12} style={{ flexShrink: 0 }} />
              Answer the questions below.
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
