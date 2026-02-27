"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Audio playback states per ETS TOEFL ITP Section 1 rules:
 * - idle     : audio not yet started
 * - loading  : Howl loading/buffering
 * - playing  : currently playing
 * - ended    : played through once, CANNOT replay (ETS rule)
 * - error    : load / decode error
 */
export type AudioState = "idle" | "loading" | "playing" | "ended" | "error";

export interface UseAudioPlayerOptions {
  /** Audio URL from Supabase storage or CDN */
  audioUrl: string;
  /** Called when playback finishes */
  onEnded?: () => void;
  /** Called when audio starts playing (useful for revealing questions) */
  onPlay?: () => void;
}

export interface AudioPlayerControls {
  state: AudioState;
  currentTime: number;   // seconds
  duration: number;      // seconds
  progress: number;      // 0.0 – 1.0
  /** Play — only works from "idle" state (one-play restriction) */
  play: () => void;
  /** Stop (emergency only — does not reset to idle so replay is blocked) */
  stop: () => void;
}

export function useAudioPlayer({
  audioUrl,
  onEnded,
  onPlay,
}: UseAudioPlayerOptions): AudioPlayerControls {
  const [state, setState] = useState<AudioState>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const howlRef = useRef<Howl | null>(null);
  const playedRef = useRef(false);           // one-play lock
  const rafRef = useRef<number | null>(null); // requestAnimationFrame id

  // Build Howl lazily on mount
  useEffect(() => {
    if (!audioUrl) return;

    let destroyed = false;

    // Dynamic import so Howler never runs on server
    import("howler").then(({ Howl }) => {
      if (destroyed) return;

      const howl = new Howl({
        src: [audioUrl],
        html5: true,   // streaming — required for large audio files
        preload: true,
        onload() {
          if (!destroyed) setDuration(howl.duration());
        },
        onloaderror(_id: number, err: unknown) {
          console.error("[AudioPlayer] Load error:", err);
          if (!destroyed) setState("error");
        },
        onplay() {
          if (!destroyed) {
            setState("playing");
            onPlay?.();
            startRAF(howl);
          }
        },
        onend() {
          if (!destroyed) {
            setState("ended");
            stopRAF();
            setCurrentTime(howl.duration());
            onEnded?.();
          }
        },
        onstop() {
          if (!destroyed) stopRAF();
        },
      });

      howlRef.current = howl;
    });

    return () => {
      destroyed = true;
      stopRAF();
      if (howlRef.current) {
        howlRef.current.unload();
        howlRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  function startRAF(howl: Howl) {
    function tick() {
      const t = (howl.seek() as number) ?? 0;
      setCurrentTime(t);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  function stopRAF() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  const play = useCallback(() => {
    // Enforce one-play restriction
    if (playedRef.current) return;
    const howl = howlRef.current;
    if (!howl) return;
    playedRef.current = true;
    setState("loading");
    howl.play();
  }, []);

  const stop = useCallback(() => {
    howlRef.current?.stop();
    setState("ended"); // mark ended so it cannot be replayed
  }, []);

  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  return { state, currentTime, duration, progress, play, stop };
}
