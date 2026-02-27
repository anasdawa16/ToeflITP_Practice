"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  useTestStore,
  selectCurrentQuestion,
  selectCurrentAnswer,
  selectSectionProgress,
  type TestSection,
} from "@/lib/stores/testStore";
import { SectionTimer } from "@/components/test/SectionTimer";
import { AnswerSheetGrid } from "@/components/test/AnswerSheetGrid";
import { ReadingInterface } from "@/components/test/ReadingInterface";
import type { Question, Passage } from "@/types/test";


// ─── Section Break Screen ─────────────────────────────────────

function SectionBreakScreen({
  from,
  to,
  onContinue,
}: {
  from: TestSection;
  to: TestSection;
  onContinue: () => void;
}) {
  const [countdown, setCountdown] = useState(30);
  useEffect(() => {
    if (countdown <= 0) { onContinue(); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, onContinue]);

  const labels: Record<number, string> = { 1: "Listening", 2: "Structure & Written Expression", 3: "Reading Comprehension" };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100vh", gap: "24px",
      backgroundColor: "var(--color-bg-base)", padding: "32px",
    }}>
      <div style={{
        width: "80px", height: "80px", borderRadius: "50%",
        backgroundColor: "rgba(52,211,153,0.12)",
        border: "2px solid rgba(52,211,153,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "36px",
      }}>
        ✅
      </div>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
          Section {from} Complete
        </h2>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-base)", color: "var(--color-text-secondary)" }}>
          Up next: <strong style={{ color: "var(--color-text-primary)" }}>Section {to} — {labels[to]}</strong>
        </p>
      </div>
      <div style={{
        padding: "20px 40px", backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)",
        textAlign: "center",
      }}>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
          Next section begins in
        </p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", fontWeight: 700, color: countdown <= 5 ? "#f87171" : "var(--color-primary-300)", fontVariantNumeric: "tabular-nums" }}>
          {countdown}
        </p>
      </div>
      <button
        type="button"
        onClick={onContinue}
        style={{
          padding: "12px 32px", backgroundColor: "var(--color-primary-500)", color: "#fff",
          border: "none", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)",
          fontSize: "var(--text-sm)", fontWeight: 700, cursor: "pointer",
        }}
      >
        Begin Section {to} Now →
      </button>
    </div>
  );
}

// ─── QuestionView — renders a single question with answer tiles ─

function QuestionView({
  question,
  questionNumber,
  selectedAnswer,
  isFlagged,
  onAnswer,
  onFlag,
}: {
  question: Question;
  questionNumber: number;
  selectedAnswer: "A" | "B" | "C" | "D" | null;
  isFlagged: boolean;
  onAnswer: (letter: "A" | "B" | "C" | "D") => void;
  onFlag: () => void;
}) {
  const partLabel = question.part === "structure"
    ? "Structure — Choose the Best Answer"
    : question.part === "written_expression"
    ? "Written Expression — Identify the Error"
    : "Reading Comprehension";

  const isWE = question.part === "written_expression";

  // For WE: build inline-underlined sentence
  function renderWEStem() {
    const text = question.question_text;
    const opts: { letter: string; val: string }[] = [
      { letter: "A", val: question.option_a },
      { letter: "B", val: question.option_b },
      { letter: "C", val: question.option_c },
      { letter: "D", val: question.option_d },
    ];
    const positioned = opts
      .map((o) => ({ ...o, idx: text.indexOf(o.val) }))
      .filter((o) => o.idx >= 0)
      .sort((a, b) => a.idx - b.idx);

    type Seg = { text: string; label?: string };
    const segments: Seg[] = [];
    let remaining = text;
    for (const opt of positioned) {
      const idx = remaining.indexOf(opt.val);
      if (idx < 0) continue;
      if (idx > 0) segments.push({ text: remaining.slice(0, idx) });
      segments.push({ text: opt.val, label: opt.letter });
      remaining = remaining.slice(idx + opt.val.length);
    }
    if (remaining) segments.push({ text: remaining });

    return (
      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", color: "var(--color-text-primary)", lineHeight: 1.9, margin: 0 }}>
        {segments.map((seg, i) =>
          seg.label ? (
            <span key={i}>
              <u style={{ textDecorationColor: "var(--color-text-secondary)", textUnderlineOffset: "3px" }}>{seg.text}</u>
              <sup style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-text-muted)", fontFamily: "var(--font-ui)", marginLeft: "1px" }}>({seg.label})</sup>
            </span>
          ) : (<span key={i}>{seg.text}</span>)
        )}
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Part label + flag */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            padding: "3px 12px",
            backgroundColor: "rgba(30,74,155,0.15)",
            border: "1px solid rgba(30,74,155,0.3)",
            borderRadius: "var(--radius-full)",
            color: "var(--color-primary-300)",
            fontSize: "var(--text-xs)",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          }}>
            {partLabel}
          </span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
            #{questionNumber}
          </span>
        </div>
        <button
          type="button"
          onClick={onFlag}
          aria-label={isFlagged ? "Remove flag" : "Flag for review"}
          style={{
            padding: "5px 12px",
            backgroundColor: isFlagged ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${isFlagged ? "rgba(251,191,36,0.4)" : "var(--color-border)"}`,
            borderRadius: "var(--radius-md)",
            color: isFlagged ? "#fbbf24" : "var(--color-text-muted)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-xs)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {isFlagged ? "🚩 Flagged" : "🏳 Flag"}
        </button>
      </div>

      {/* WE instruction */}
      {isWE && (
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontStyle: "italic", color: "var(--color-text-muted)", margin: 0 }}>
          Identify the underlined word or phrase (A), (B), (C), or (D) that must be changed for the sentence to be correct.
        </p>
      )}

      {/* Question stem */}
      <div style={{
        padding: "24px",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
      }}>
        {isWE ? renderWEStem() : (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", color: "var(--color-text-primary)", lineHeight: 1.85, margin: 0 }}>
            {question.question_text}
          </p>
        )}
      </div>

      {/* Answer tiles */}
      <div style={{ display: "flex", flexDirection: isWE ? "row" : "column", gap: "10px", flexWrap: isWE ? "wrap" : undefined }}>
        {(["A", "B", "C", "D"] as const).map((letter) => {
          const text = question[`option_${letter.toLowerCase()}` as keyof Question] as string;
          const isSelected = selectedAnswer === letter;

          return (
            <button
              key={letter}
              type="button"
              onClick={() => onAnswer(letter)}
              aria-pressed={isSelected}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "14px 16px",
                backgroundColor: isSelected ? "rgba(30,74,155,0.2)" : "var(--color-bg-card)",
                border: `1.5px solid ${isSelected ? "var(--color-primary-400)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-lg)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 130ms ease",
                flex: isWE ? "1 1 200px" : "1",
              }}
            >
              <span style={{
                flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%",
                backgroundColor: isSelected ? "var(--color-primary-500)" : "rgba(255,255,255,0.06)",
                color: isSelected ? "#fff" : "var(--color-text-muted)",
                fontSize: "var(--text-xs)", fontWeight: 700, fontFamily: "var(--font-ui)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {letter}
              </span>
              <span style={{
                fontFamily: isWE ? "var(--font-body)" : "var(--font-ui)",
                fontSize: "var(--text-base)",
                color: isSelected ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                lineHeight: 1.6,
                fontStyle: isWE ? "italic" : "normal",
                textDecoration: isWE ? "underline" : "none",
                textUnderlineOffset: "3px",
              }}>
                {text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Right sidebar drawer — Answer Sheet ─────────────────────

function AnswerSheetDrawer({
  open,
  onClose,
  section,
  questions,
  answers,
  currentIndex,
  onGoTo,
}: {
  open: boolean;
  onClose: () => void;
  section: TestSection;
  questions: Question[];
  answers: ReturnType<typeof useTestStore.getState>["s2Answers"];
  currentIndex: number;
  onGoTo: (i: number) => void;
}) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 99,
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "320px",
        backgroundColor: "var(--color-bg-surface)",
        borderLeft: "1px solid var(--color-border)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 280ms cubic-bezier(0.4,0,0.2,1)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Drawer header */}
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>
            Answer Sheet — Section {section}
          </h3>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", color: "var(--color-text-muted)", fontSize: "18px", cursor: "pointer", lineHeight: 1, padding: "4px" }}>
            ✕
          </button>
        </div>

        {/* Grid */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <AnswerSheetGrid
            section={section}
            questions={questions}
            answers={answers}
            currentIndex={currentIndex}
            onGoTo={(i) => { onGoTo(i); onClose(); }}
          />
        </div>
      </div>
    </>
  );
}

// ─── Confirm Submit Modal ─────────────────────────────────────

function ConfirmSubmitModal({
  unansweredS2,
  unansweredS3,
  flaggedS2,
  flaggedS3,
  onConfirm,
  onCancel,
  submitting,
}: {
  unansweredS2: number;
  unansweredS3: number;
  flaggedS2: number;
  flaggedS3: number;
  onConfirm: () => void;
  onCancel: () => void;
  submitting: boolean;
}) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      backgroundColor: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
    }}>
      <div style={{
        width: "100%", maxWidth: "460px",
        backgroundColor: "var(--color-bg-surface)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        animation: "fadeInUp 200ms ease both",
      }}>
        <div style={{ padding: "28px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
            Submit Test?
          </h2>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginBottom: "20px" }}>
            Once submitted, you cannot change your answers.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
            {[
              { label: "Section 2 — Unanswered", count: unansweredS2, warn: unansweredS2 > 0 },
              { label: "Section 3 — Unanswered", count: unansweredS3, warn: unansweredS3 > 0 },
              { label: "Flagged for review (S2)", count: flaggedS2, warn: false },
              { label: "Flagged for review (S3)", count: flaggedS3, warn: false },
            ].map((row) => (
              <div key={row.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 12px",
                backgroundColor: row.warn ? "rgba(248,113,113,0.08)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${row.warn ? "rgba(248,113,113,0.25)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-md)",
              }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: row.warn ? "#f87171" : "var(--color-text-secondary)" }}>
                  {row.label}
                </span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700, color: row.warn ? "#f87171" : "var(--color-text-muted)" }}>
                  {row.count}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1, padding: "11px", backgroundColor: "transparent",
                border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 600,
                color: "var(--color-text-secondary)", cursor: "pointer",
              }}
            >
              Continue Test
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={submitting}
              style={{
                flex: 1, padding: "11px",
                backgroundColor: submitting ? "rgba(248,113,113,0.3)" : "#dc2626",
                border: "none", borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700,
                color: "#fff", cursor: submitting ? "default" : "pointer",
              }}
            >
              {submitting ? "Submitting…" : "Submit Test →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN FULLSCREEN TEST UI ──────────────────────────────────

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default function MockTestSessionPage({ params: _params }: Props) {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showBreak, setShowBreak] = useState<{ from: TestSection; to: TestSection } | null>(null);
  const submitOngoing = useRef(false);

  const store = useTestStore();
  const currentQ = useTestStore(selectCurrentQuestion);
  const currentAns = useTestStore(selectCurrentAnswer);
  const s2Progress = useTestStore(selectSectionProgress(2));
  const s3Progress = useTestStore(selectSectionProgress(3));

  const questions = store.currentSection === 2 ? store.s2Questions : store.s3Questions;
  const answers = store.currentSection === 2 ? store.s2Answers : store.s3Answers;
  const currentTime = store.currentSection === 2 ? store.s2TimeRemaining : store.s3TimeRemaining;

  // Timer tick — 1s interval
  useEffect(() => {
    if (store.status !== "in_progress") return;
    if (sheetOpen || showBreak) return; // Pause tick while break screen showing
    const id = setInterval(() => store.tick(), 1000);
    return () => clearInterval(id);
  }, [store.status, store.tick, sheetOpen, showBreak]);

  // Auto-submit when status becomes "submitting"
  useEffect(() => {
    if (store.status === "submitting" && !submitOngoing.current) {
      void doSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.status]);

  const doSubmit = useCallback(async () => {
    if (submitOngoing.current || !store.sessionId) return;
    submitOngoing.current = true;
    useTestStore.setState({ status: "submitting" });
    try {
      const res = await fetch("/api/mock-test/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: store.sessionId,
          s1_time_remaining: store.s1TimeRemaining,
          s2_time_remaining: store.s2TimeRemaining,
          s3_time_remaining: store.s3TimeRemaining,
        }),
      });
      const data = await res.json();
      if (data.scores) {
        store.completeSession({
          s1Raw: data.scores.s1.raw, s2Raw: data.scores.s2.raw, s3Raw: data.scores.s3.raw,
          s1Scaled: data.scores.s1.scaled, s2Scaled: data.scores.s2.scaled, s3Scaled: data.scores.s3.scaled,
          total: data.scores.total,
        });
        router.push(`/mock-test/${store.sessionId}/results`);
      }
    } catch (e) {
      console.error(e);
      submitOngoing.current = false;
      useTestStore.setState({ status: "in_progress" });
    }
  }, [store, router]);

  // Handle section timer expiry
  const handleSectionExpire = useCallback(() => {
    if (store.currentSection < 3) {
      setShowBreak({ from: store.currentSection, to: (store.currentSection + 1) as TestSection });
    } else {
      void doSubmit();
    }
  }, [store.currentSection, doSubmit]);

  // Handle section break "continue"
  const handleBreakContinue = useCallback(() => {
    if (!showBreak) return;
    store.setSection(showBreak.to, 0);
    setShowBreak(null);
  }, [showBreak, store]);

  // Idle/no session guard
  if (store.status === "idle" || !store.sessionId) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", flexDirection: "column", gap: "20px", fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
        <p style={{ fontSize: "48px" }}>😕</p>
        <p style={{ fontSize: "var(--text-lg)" }}>No active test session.</p>
        <button onClick={() => router.push("/mock-test")} style={{ padding: "10px 24px", backgroundColor: "var(--color-primary-500)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
          Start a New Test
        </button>
      </div>
    );
  }

  // Section break overlay
  if (showBreak) {
    return <SectionBreakScreen from={showBreak.from} to={showBreak.to} onContinue={handleBreakContinue} />;
  }

  const unansweredS2 = store.s2Questions.length - s2Progress.answered;
  const unansweredS3 = store.s3Questions.length - s3Progress.answered;
  const flaggedS2 = s2Progress.flagged;
  const flaggedS3 = s3Progress.flagged;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "var(--color-bg-base)" }}>
      {/* ── STICKY TOP BAR ─────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: "var(--color-bg-surface)",
        borderBottom: "1px solid var(--color-border)",
        paddingInline: "20px", paddingBlock: "10px",
        display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap",
      }}>
        {/* Section tabs */}
        <div style={{ display: "flex", gap: "6px" }}>
          {([2, 3] as TestSection[]).map((sec) => {
            const prog = sec === 2 ? s2Progress : s3Progress;
            const isCurrent = store.currentSection === sec;
            return (
              <button
                key={sec}
                type="button"
                onClick={() => store.setSection(sec)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-md)",
                  border: `1.5px solid ${isCurrent ? "var(--color-primary-500)" : "var(--color-border)"}`,
                  backgroundColor: isCurrent ? "rgba(30,74,155,0.2)" : "transparent",
                  color: isCurrent ? "var(--color-primary-300)" : "var(--color-text-muted)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "var(--text-xs)",
                  fontWeight: isCurrent ? 700 : 400,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "6px",
                }}
              >
                <span>Section {sec}</span>
                <span style={{
                  padding: "1px 7px",
                  backgroundColor: prog.answered === prog.total
                    ? "rgba(52,211,153,0.2)"
                    : "rgba(255,255,255,0.07)",
                  color: prog.answered === prog.total ? "#34d399" : "var(--color-text-muted)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "10px",
                  fontWeight: 600,
                }}>
                  {prog.answered}/{prog.total}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1 }} />

        {/* Q position */}
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", flexShrink: 0 }}>
          Q {store.currentQuestionIndex + 1} of {questions.length}
        </span>

        {/* Timer */}
        <SectionTimer
          seconds={currentTime}
          sectionLabel={`Section ${store.currentSection}`}
          onExpire={handleSectionExpire}
        />

        {/* Answer sheet toggle */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          style={{
            padding: "6px 14px",
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-secondary)",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: "5px",
          }}
        >
          📋 Answer Sheet
        </button>

        {/* Submit */}
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={store.status === "submitting"}
          style={{
            padding: "6px 14px",
            backgroundColor: "rgba(220,38,38,0.15)",
            border: "1px solid rgba(220,38,38,0.4)",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-xs)",
            fontWeight: 600,
            color: "#f87171",
            cursor: "pointer",
          }}
        >
          {store.status === "submitting" ? "Submitting…" : "Submit Test"}
        </button>
      </header>

      {/* ── QUESTION / READING AREA ──────────────────────────── */}
      {store.currentSection === 3 ? (
        /* S3: full split-pane reading interface */
        (() => {
          const s3Q = store.s3Questions;
          const s3Ans = store.s3Answers;
          // Derive the current passage from the first question in a passage group
          const currentPassageId = s3Q[store.currentQuestionIndex]?.passage_id ?? null;
          const currentPassage = currentPassageId
            ? (store.passages[currentPassageId] as Passage | undefined) ?? null
            : null;

          // Find first index of this passage (so ReadingInterface sees local passage questions)
          const passageQuestions = currentPassageId
            ? s3Q.filter((q) => q.passage_id === currentPassageId)
            : s3Q;
          const passageQIdx = currentPassageId
            ? s3Q.slice(0, store.currentQuestionIndex).filter((q) => q.passage_id === currentPassageId).length
            : store.currentQuestionIndex;

          const passageAnswers: Record<string, "A" | "B" | "C" | "D"> = {};
          for (const q of passageQuestions) {
            if (s3Ans[q.id]?.selected) passageAnswers[q.id] = s3Ans[q.id].selected as "A" | "B" | "C" | "D";
          }

          if (!currentPassage) {
            return (
              <div style={{ textAlign: "center", padding: "60px", fontFamily: "var(--font-ui)", color: "var(--color-text-secondary)" }}>
                <p>Loading passage…</p>
              </div>
            );
          }

          // Find global index of this Q in full s3 list
          function localToGlobal(localIdx: number): number {
            const localQ = passageQuestions[localIdx];
            return localQ ? s3Q.findIndex((q) => q.id === localQ.id) : 0;
          }

          return (
            <ReadingInterface
              passage={currentPassage}
              questions={passageQuestions}
              answers={passageAnswers}
              currentIndex={passageQIdx}
              onAnswer={(qId, letter) => store.answerQuestion(qId, letter)}
              onNext={() => {
                const nextGlobal = localToGlobal(passageQIdx + 1);
                if (passageQIdx < passageQuestions.length - 1) {
                  store.goToQuestion(nextGlobal);
                } else {
                  // Move to next passage group or show confirm
                  const nextGlobalAfter = store.currentQuestionIndex + 1;
                  if (nextGlobalAfter < s3Q.length) {
                    store.goToQuestion(nextGlobalAfter);
                  } else {
                    setShowConfirm(true);
                  }
                }
              }}
              onPrev={() => {
                const prevGlobal = localToGlobal(passageQIdx - 1);
                if (passageQIdx > 0) {
                  store.goToQuestion(prevGlobal);
                } else if (store.currentQuestionIndex > 0) {
                  store.goToQuestion(store.currentQuestionIndex - 1);
                }
              }}
              onGoTo={(localIdx) => store.goToQuestion(localToGlobal(localIdx))}
            />
          );
        })()
      ) : (
        /* S2: standard scrollable question view */
        <main style={{ flex: 1, padding: "36px 24px", maxWidth: "820px", margin: "0 auto", width: "100%" }}>
          {currentQ ? (
            <QuestionView
              question={currentQ}
              questionNumber={store.currentQuestionIndex + 1}
              selectedAnswer={currentAns?.selected ?? null}
              isFlagged={currentAns?.flagged ?? false}
              onAnswer={(letter) => store.answerQuestion(currentQ.id, letter)}
              onFlag={() => store.toggleFlag(currentQ.id)}
            />
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0", fontFamily: "var(--font-ui)" }}>
              <p style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</p>
              <p style={{ fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
                All done with Section {store.currentSection}!
              </p>
              <p style={{ color: "var(--color-text-secondary)", marginBottom: "24px" }}>Review answers via the Answer Sheet or submit the test.</p>
              <button onClick={() => setShowConfirm(true)} style={{ padding: "12px 32px", backgroundColor: "var(--color-primary-500)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "var(--text-base)", cursor: "pointer" }}>
                Submit Test →
              </button>
            </div>
          )}
        </main>
      )}


      {/* ── BOTTOM NAV ─────────────────────────────────────────── */}
      {currentQ && (
        <footer style={{
          position: "sticky", bottom: 0,
          backgroundColor: "var(--color-bg-surface)",
          borderTop: "1px solid var(--color-border)",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}>
          <button
            type="button"
            onClick={() => store.goToQuestion(Math.max(0, store.currentQuestionIndex - 1))}
            disabled={store.currentQuestionIndex === 0}
            style={{
              padding: "9px 20px",
              backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)", cursor: store.currentQuestionIndex === 0 ? "default" : "pointer",
              opacity: store.currentQuestionIndex === 0 ? 0.4 : 1,
            }}
          >
            ← Previous
          </button>

          {/* Mini dot trail — compact */}
          <div style={{ display: "flex", gap: "4px", overflow: "hidden", maxWidth: "400px", flexWrap: "nowrap" }}>
            {questions.slice(
              Math.max(0, store.currentQuestionIndex - 5),
              Math.min(questions.length, store.currentQuestionIndex + 6)
            ).map((q, idx) => {
              const realIdx = Math.max(0, store.currentQuestionIndex - 5) + idx;
              const ans = answers[q.id];
              const isCurr = realIdx === store.currentQuestionIndex;
              const dotColor = isCurr ? "var(--color-primary-400)"
                : ans?.flagged ? "#fbbf24"
                : ans?.selected ? "#34d399"
                : "rgba(255,255,255,0.12)";
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => store.goToQuestion(realIdx)}
                  style={{
                    width: isCurr ? "28px" : "10px", height: "10px",
                    borderRadius: isCurr ? "5px" : "50%",
                    backgroundColor: dotColor,
                    border: "none", cursor: "pointer",
                    transition: "all 200ms ease",
                    flexShrink: 0,
                  }}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              if (store.currentQuestionIndex < questions.length - 1) {
                store.goToQuestion(store.currentQuestionIndex + 1);
              } else if (store.currentSection === 2) {
                setShowBreak({ from: 2, to: 3 });
              } else {
                setShowConfirm(true);
              }
            }}
            style={{
              padding: "9px 24px",
              backgroundColor: "var(--color-primary-500)", border: "none",
              borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)",
              fontWeight: 700, color: "#fff", cursor: "pointer",
            }}
          >
            {store.currentQuestionIndex < questions.length - 1
              ? "Next →"
              : store.currentSection === 2
              ? "Go to Section 3 →"
              : "Finish →"}
          </button>
        </footer>
      )}

      {/* ── ANSWER SHEET DRAWER ────────────────────────────────── */}
      <AnswerSheetDrawer
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        section={store.currentSection}
        questions={questions}
        answers={answers}
        currentIndex={store.currentQuestionIndex}
        onGoTo={store.goToQuestion}
      />

      {/* ── CONFIRM SUBMIT MODAL ───────────────────────────────── */}
      {showConfirm && (
        <ConfirmSubmitModal
          unansweredS2={unansweredS2}
          unansweredS3={unansweredS3}
          flaggedS2={flaggedS2}
          flaggedS3={flaggedS3}
          onConfirm={() => { setShowConfirm(false); void doSubmit(); }}
          onCancel={() => setShowConfirm(false)}
          submitting={store.status === "submitting"}
        />
      )}
    </div>
  );
}
