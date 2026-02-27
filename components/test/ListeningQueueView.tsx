"use client";

import { useState, useCallback } from "react";
import { AudioPlayer } from "@/components/test/AudioPlayer";

/** A single conversation/talk item from audio_conversations joined with its questions */
export interface AudioGroup {
  id: string;
  title: string;
  audioUrl: string;
  part: "A" | "B" | "C";
  questions: Array<{
    id: string;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
  }>;
}

interface ListeningQueueViewProps {
  /** All audio groups for Section 1 (Part A conversations, then Part B, then Part C) */
  groups: AudioGroup[];
  /** Called when user selects an answer for a question */
  onAnswer: (questionId: string, selected: "A" | "B" | "C" | "D") => void;
  /** Record of questionId → selected answer */
  answers: Record<string, "A" | "B" | "C" | "D">;
  /** Called when all groups are finished */
  onSectionComplete: () => void;
}

type Phase = "audio" | "questions";

const PART_LABELS: Record<string, string> = {
  A: "Part A — Short Conversations",
  B: "Part B — Longer Conversations",
  C: "Part C — Talks & Lectures",
};

export function ListeningQueueView({
  groups,
  onAnswer,
  answers,
  onSectionComplete,
}: ListeningQueueViewProps) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("audio");

  const currentGroup = groups[groupIndex];
  const isLastGroup = groupIndex === groups.length - 1;
  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = groups.reduce((sum, g) => sum + g.questions.length, 0);

  // When audio finishes → reveal questions
  const handleAudioEnded = useCallback(() => {
    setPhase("questions");
  }, []);

  // Move to next group or complete section
  const handleNextGroup = useCallback(() => {
    if (isLastGroup) {
      onSectionComplete();
    } else {
      setGroupIndex((i) => i + 1);
      setPhase("audio");      // reset to audio phase for next group
    }
  }, [isLastGroup, onSectionComplete]);

  // Check if all questions in current group are answered
  const allCurrentAnswered = currentGroup?.questions.every((q) => answers[q.id]) ?? false;

  if (!currentGroup) {
    return (
      <div style={{ textAlign: "center", padding: "60px", fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
        <p>No audio tracks available for Section 1.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "760px", margin: "0 auto", padding: "24px" }}>
      {/* Section progress strip */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px",
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
            Listening · {PART_LABELS[currentGroup.part]}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
            Group {groupIndex + 1} of {groups.length}
          </span>
          <span style={{
            padding: "2px 10px",
            backgroundColor: "rgba(30,74,155,0.2)",
            border: "1px solid rgba(30,74,155,0.3)",
            borderRadius: "var(--radius-full)",
            color: "var(--color-primary-300)",
            fontFamily: "var(--font-ui)", fontSize: "10px", fontWeight: 700,
          }}>
            {totalAnswered}/{totalQuestions} answered
          </span>
        </div>
      </div>

      {/* ── AUDIO PHASE ──────────────────────────────────────── */}
      <div>
        <AudioPlayer
          audioUrl={currentGroup.audioUrl}
          title={currentGroup.title}
          onEnded={handleAudioEnded}
          onPlay={() => {/* audio started */}}
        />

        {/* Listening instruction while audio hasn't played yet */}
        {phase === "audio" && (
          <div style={{
            marginTop: "16px",
            padding: "16px",
            backgroundColor: "rgba(251,191,36,0.06)",
            border: "1px solid rgba(251,191,36,0.2)",
            borderRadius: "var(--radius-lg)",
          }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "#fbbf24", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚠️</span>
              <span>
                Press <strong>Play</strong> to start the audio. Questions appear <em>after</em> the audio finishes.
                You may <strong>not</strong> replay the audio.
              </span>
            </p>
          </div>
        )}
      </div>

      {/* ── QUESTION PHASE (revealed after audio ends) ───────── */}
      {phase === "questions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", animation: "fadeInUp 300ms ease both" }}>
          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", whiteSpace: "nowrap", fontWeight: 600 }}>
              Answer the Questions Below
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
          </div>

          {currentGroup.questions.map((q, qi) => {
            const selectedAns = answers[q.id] ?? null;
            return (
              <div key={q.id} style={{
                padding: "20px",
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xl)",
              }}>
                {/* Q number + text */}
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600, marginBottom: "10px" }}>
                  Question {qi + 1}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text-primary)", lineHeight: 1.7, marginBottom: "16px" }}>
                  {q.questionText}
                </p>

                {/* Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {(["A", "B", "C", "D"] as const).map((letter) => {
                    const text = q[`option${letter}` as keyof typeof q] as string;
                    const isSelected = selectedAns === letter;
                    return (
                      <button
                        key={letter}
                        type="button"
                        onClick={() => onAnswer(q.id, letter)}
                        style={{
                          display: "flex", alignItems: "flex-start", gap: "10px",
                          padding: "12px 14px",
                          backgroundColor: isSelected ? "rgba(30,74,155,0.2)" : "rgba(255,255,255,0.02)",
                          border: `1.5px solid ${isSelected ? "var(--color-primary-400)" : "var(--color-border)"}`,
                          borderRadius: "var(--radius-md)",
                          cursor: "pointer", textAlign: "left",
                          transition: "all 130ms ease",
                        }}
                      >
                        <span style={{
                          flexShrink: 0, width: "22px", height: "22px", borderRadius: "50%",
                          backgroundColor: isSelected ? "var(--color-primary-500)" : "rgba(255,255,255,0.06)",
                          color: isSelected ? "#fff" : "var(--color-text-muted)",
                          fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-ui)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {letter}
                        </span>
                        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: isSelected ? "var(--color-text-primary)" : "var(--color-text-secondary)", lineHeight: 1.55 }}>
                          {text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Next group / complete button */}
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "8px" }}>
            <button
              type="button"
              onClick={handleNextGroup}
              disabled={!allCurrentAnswered}
              style={{
                padding: "11px 28px",
                backgroundColor: allCurrentAnswered ? "var(--color-primary-500)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${allCurrentAnswered ? "transparent" : "var(--color-border)"}`,
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700,
                color: allCurrentAnswered ? "#fff" : "var(--color-text-muted)",
                cursor: allCurrentAnswered ? "pointer" : "default",
                transition: "all 200ms ease",
              }}
            >
              {isLastGroup ? "Finish Listening →" : `Next Track (${groupIndex + 2}/${groups.length}) →`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
