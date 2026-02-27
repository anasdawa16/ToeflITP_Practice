"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Audio playback states per ETS TOEFL ITP Section 1 rules:
 * - idle     : audio not yet started
 * - loading  : preparing TTS utterances
 * - playing  : currently speaking
 * - ended    : played through once, CANNOT replay (ETS rule)
 * - error    : TTS not available
 */
export type AudioState = "idle" | "loading" | "playing" | "ended" | "error";

export interface UseAudioPlayerOptions {
  /** Dialogue transcript — each line is spoken by alternating voices */
  transcript: string;
  /** Called when playback finishes */
  onEnded?: () => void;
  /** Called when audio starts playing (useful for revealing questions) */
  onPlay?: () => void;
}

export interface AudioPlayerControls {
  state: AudioState;
  currentTime: number;   // seconds (estimated)
  duration: number;      // seconds (estimated)
  progress: number;      // 0.0 – 1.0
  /** Play — only works from "idle" state (one-play restriction) */
  play: () => void;
  /** Stop (emergency only — does not reset to idle so replay is blocked) */
  stop: () => void;
}

/**
 * Estimate speaking duration: ~150 words per minute for TTS.
 * Returns duration in seconds.
 */
function estimateDuration(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(3, (words / 150) * 60 + 2); // +2s for pauses between lines
}

/**
 * Parse transcript into dialogue lines.
 * Format: "Speaker: text" per line, or just plain lines.
 */
function parseTranscript(transcript: string): Array<{ speaker: string; text: string }> {
  return transcript
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const colonIdx = line.indexOf(":");
      if (colonIdx > 0 && colonIdx < 30) {
        return { speaker: line.slice(0, colonIdx).trim(), text: line.slice(colonIdx + 1).trim() };
      }
      return { speaker: "", text: line };
    });
}

export function useAudioPlayer({
  transcript,
  onEnded,
  onPlay,
}: UseAudioPlayerOptions): AudioPlayerControls {
  const [state, setState] = useState<AudioState>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playedRef = useRef(false);           // one-play lock
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);

  // Estimate duration and reset state when transcript changes
  useEffect(() => {
    if (transcript) {
      setDuration(estimateDuration(transcript));
      setState("idle");
      setCurrentTime(0);
      playedRef.current = false;
      utterancesRef.current = [];
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [transcript]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setCurrentTime(elapsed);
    }, 250);
  }, []);

  const play = useCallback(() => {
    // Enforce one-play restriction
    if (playedRef.current) return;
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setState("error");
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel(); // Clear any previous

    const lines = parseTranscript(transcript);
    if (lines.length === 0) {
      setState("error");
      return;
    }

    const buildAndPlay = () => {
      // Get all voices
      const voices = synth.getVoices();
      
      // Filter English voices
      const enVoices = voices.filter((v) => v.lang.startsWith("en"));
      
      // Helper text matching for gender
      const maleNames = /male|david|mark|guy|christopher|eric|steffan|brian|james|daniel|alex|fred|andrew|george/i;
      const femaleNames = /female|zira|hazel|catherine|aria|jenny|michelle|sonia|samantha|karen|victoria|tessa|siri/i;

      // Prioritize neural/natural voices if available, else plain ones
      let maleVoice = enVoices.find((v) => maleNames.test(v.name) && /neural|natural|online/i.test(v.name))
        || enVoices.find((v) => maleNames.test(v.name));

      let femaleVoice = enVoices.find((v) => femaleNames.test(v.name) && /neural|natural|online/i.test(v.name))
        || enVoices.find((v) => femaleNames.test(v.name));

      // If we couldn't clearly identify one or the other, strictly pick two different voices
      if (!maleVoice && !femaleVoice) {
        maleVoice = enVoices[0] || voices[0];
        femaleVoice = enVoices.find((v) => v !== maleVoice) || voices.find((v) => v !== maleVoice) || maleVoice;
      } else if (!maleVoice && femaleVoice) {
        maleVoice = enVoices.find((v) => v !== femaleVoice) || voices.find((v) => v !== femaleVoice) || femaleVoice;
      } else if (!femaleVoice && maleVoice) {
        femaleVoice = enVoices.find((v) => v !== maleVoice) || voices.find((v) => v !== maleVoice) || maleVoice;
      }
      const utterances: SpeechSynthesisUtterance[] = [];

      lines.forEach((line, i) => {
        const utt = new SpeechSynthesisUtterance(line.text);
        utt.rate = 0.92;  // Slightly slower for learners
        utt.pitch = 1;
        utt.lang = "en-US";

        // Alternate voices for dialogue (odd/even lines)
        const speakerLower = line.speaker.toLowerCase();
        const isMaleTurn = speakerLower.includes("man")
          || speakerLower.includes("male")
          || speakerLower.includes("narrator")
          || (line.speaker === "" && i % 2 === 0);

        const isFemaleTurn = speakerLower.includes("woman")
          || speakerLower.includes("female")
          || speakerLower.includes("professor")
          || (line.speaker === "" && i % 2 !== 0);

        // Assign voice
        if (isMaleTurn && maleVoice) {
          utt.voice = maleVoice;
        } else if (isFemaleTurn && femaleVoice) {
          utt.voice = femaleVoice;
        } else {
          // Fallback: alternate based on index if no clear speaker
          utt.voice = (i % 2 === 0) ? (maleVoice || femaleVoice || voices[0]) : (femaleVoice || maleVoice || voices[0]);
        }
        
        // Safety check if voice assignment is null
        if (!utt.voice && voices.length > 0) {
           utt.voice = voices[0];
        }

        // First utterance: mark as playing
        if (i === 0) {
          utt.onstart = () => {
            setState("playing");
            onPlay?.();
            startTimer();
          };
        }

        // Last utterance: mark as ended
        if (i === lines.length - 1) {
          utt.onend = () => {
            setState("ended");
            stopTimer();
            setCurrentTime(duration);
            onEnded?.();
          };
        }

        utt.onerror = (e) => {
          // Don't treat 'interrupted' or 'canceled' as real errors
          if (e.error === "interrupted" || e.error === "canceled") return;
          console.error("[TTS] Error:", e.error);
          setState("error");
          stopTimer();
        };

        utterances.push(utt);
      });

      utterancesRef.current = utterances;
      playedRef.current = true; // Lock it

      utterances.forEach((u) => synth.speak(u));
    };

    // Edge/Chrome bug: getVoices() is empty initially until voiceschanged fires
    const voices = synth.getVoices();
    if (voices.length > 0) {
      buildAndPlay();
    } else {
      // Wait for voices to load
      const onVoicesChanged = () => {
        synth.removeEventListener("voiceschanged", onVoicesChanged);
        buildAndPlay();
      };
      synth.addEventListener("voiceschanged", onVoicesChanged);
      
      // Fallback if event doesn't fire
      setTimeout(() => {
        if (!playedRef.current) {
          synth.removeEventListener("voiceschanged", onVoicesChanged);
          buildAndPlay();
        }
      }, 1500);
    }
  }, [transcript, duration, onEnded, onPlay, startTimer, stopTimer]);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    stopTimer();
    setState("ended"); // mark ended so it cannot be replayed
  }, [stopTimer]);

  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  return { state, currentTime, duration, progress, play, stop };
}
