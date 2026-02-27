"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Question, Passage } from "@/types/test";

// ─── Types ────────────────────────────────────────────────────

export type TestSection = 1 | 2 | 3;

export interface SectionAnswers {
  [questionId: string]: {
    selected: "A" | "B" | "C" | "D";
    flagged: boolean;
    answeredAt: number;
  };
}

export interface TestStore {
  // Session meta
  sessionId: string | null;
  testType: "full_mock" | "section_practice";
  status: "idle" | "loading" | "in_progress" | "submitting" | "completed";

  // Section data (all 3 sections, even if only some are active)
  s1Questions: Question[];
  s2Questions: Question[];
  s3Questions: Question[];
  passages: Record<string, Passage>; // passageId → Passage

  // Active navigation
  currentSection: TestSection;
  currentQuestionIndex: number;

  // Answers  — one map per section
  s1Answers: SectionAnswers;
  s2Answers: SectionAnswers;
  s3Answers: SectionAnswers;

  // Timer state (seconds remaining per section)
  s1TimeRemaining: number;
  s2TimeRemaining: number;
  s3TimeRemaining: number;

  // Results (filled after completion)
  s1RawScore: number;
  s2RawScore: number;
  s3RawScore: number;
  s1ScaledScore: number | null;
  s2ScaledScore: number | null;
  s3ScaledScore: number | null;
  totalScaledScore: number | null;

  // ── Actions ──────────────────────────────────────────────────

  /** Called after /api/mock-test/start returns */
  initSession: (payload: {
    sessionId: string;
    testType: "full_mock" | "section_practice";
    s1Questions: Question[];
    s2Questions: Question[];
    s3Questions: Question[];
    passages: Record<string, Passage>;
  }) => void;

  /** Navigate to a section + optional question index */
  setSection: (section: TestSection, questionIndex?: number) => void;

  /** Move to next question (auto-advance to next section if at end) */
  nextQuestion: () => void;

  /** Navigate directly to a question within current section */
  goToQuestion: (index: number) => void;

  /** Record an answer for the current question */
  answerQuestion: (questionId: string, selected: "A" | "B" | "C" | "D") => void;

  /** Toggle bookmark/flag on a question */
  toggleFlag: (questionId: string) => void;

  /** Tick time (called every second from timer hook) */
  tick: () => void;

  /** Reset to idle (for new test) */
  reset: () => void;

  /** Mark as completed with scores */
  completeSession: (scores: {
    s1Raw: number; s2Raw: number; s3Raw: number;
    s1Scaled: number; s2Scaled: number; s3Scaled: number;
    total: number;
  }) => void;
}

// ─── Initial state ────────────────────────────────────────────

const INITIAL: Omit<TestStore, keyof Pick<TestStore,
  "initSession" | "setSection" | "nextQuestion" | "goToQuestion" |
  "answerQuestion" | "toggleFlag" | "tick" | "reset" | "completeSession"
>> = {
  sessionId: null,
  testType: "full_mock",
  status: "idle",
  s1Questions: [],
  s2Questions: [],
  s3Questions: [],
  passages: {},
  currentSection: 2, // default to S2 since S1 needs audio
  currentQuestionIndex: 0,
  s1Answers: {},
  s2Answers: {},
  s3Answers: {},
  s1TimeRemaining: 2100,
  s2TimeRemaining: 1500,
  s3TimeRemaining: 3300,
  s1RawScore: 0,
  s2RawScore: 0,
  s3RawScore: 0,
  s1ScaledScore: null,
  s2ScaledScore: null,
  s3ScaledScore: null,
  totalScaledScore: null,
};

// ─── Helper: pick the correct answers map for a section ───────

function answersKey(section: TestSection): "s1Answers" | "s2Answers" | "s3Answers" {
  return `s${section}Answers` as "s1Answers" | "s2Answers" | "s3Answers";
}

function questionsKey(section: TestSection): "s1Questions" | "s2Questions" | "s3Questions" {
  return `s${section}Questions` as "s1Questions" | "s2Questions" | "s3Questions";
}

function timerKey(section: TestSection): "s1TimeRemaining" | "s2TimeRemaining" | "s3TimeRemaining" {
  return `s${section}TimeRemaining` as "s1TimeRemaining" | "s2TimeRemaining" | "s3TimeRemaining";
}

// ─── Store ────────────────────────────────────────────────────

export const useTestStore = create<TestStore>()(
  persist(
    (set, get) => ({
      ...INITIAL,

      initSession({ sessionId, testType, s1Questions, s2Questions, s3Questions, passages }) {
        set({
          ...INITIAL,
          sessionId,
          testType,
          status: "in_progress",
          s1Questions,
          s2Questions,
          s3Questions,
          passages,
          currentSection: 2, // Start at S2 (no audio dependency for initial dev)
          currentQuestionIndex: 0,
        });
      },

      setSection(section, questionIndex = 0) {
        set({ currentSection: section, currentQuestionIndex: questionIndex });
      },

      nextQuestion() {
        const { currentSection, currentQuestionIndex } = get();
        const qCount = get()[questionsKey(currentSection)].length;
        if (currentQuestionIndex < qCount - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 });
        } else if (currentSection < 3) {
          // Auto-advance to next section
          set({
            currentSection: (currentSection + 1) as TestSection,
            currentQuestionIndex: 0,
          });
        }
        // At end of S3 — do nothing (submit button handles completion)
      },

      goToQuestion(index) {
        set({ currentQuestionIndex: index });
      },

      answerQuestion(questionId, selected) {
        const { currentSection } = get();
        const key = answersKey(currentSection);
        set((state) => ({
          [key]: {
            ...state[key],
            [questionId]: {
              selected,
              flagged: state[key][questionId]?.flagged ?? false,
              answeredAt: Date.now(),
            },
          },
        }));
      },

      toggleFlag(questionId) {
        const { currentSection } = get();
        const key = answersKey(currentSection);
        set((state) => ({
          [key]: {
            ...state[key],
            [questionId]: {
              ...state[key][questionId],
              flagged: !(state[key][questionId]?.flagged),
            },
          },
        }));
      },

      tick() {
        const { currentSection, status } = get();
        if (status !== "in_progress") return;
        const key = timerKey(currentSection);
        const remaining = get()[key];
        if (remaining > 0) {
          set({ [key]: remaining - 1 });
        } else {
          // Time's up for this section — auto-advance
          const nextSection = currentSection < 3 ? (currentSection + 1) as TestSection : null;
          if (nextSection) {
            set({ currentSection: nextSection, currentQuestionIndex: 0 });
          } else {
            set({ status: "submitting" });
          }
        }
      },

      completeSession({ s1Raw, s2Raw, s3Raw, s1Scaled, s2Scaled, s3Scaled, total }) {
        set({
          status: "completed",
          s1RawScore: s1Raw,
          s2RawScore: s2Raw,
          s3RawScore: s3Raw,
          s1ScaledScore: s1Scaled,
          s2ScaledScore: s2Scaled,
          s3ScaledScore: s3Scaled,
          totalScaledScore: total,
        });
      },

      reset() {
        set(INITIAL);
      },
    }),
    {
      name: "toefl-test-session",
      storage: createJSONStorage(() => sessionStorage), // sessionStorage: cleared on tab close
      partialize: (state) => ({
        // Only persist the data needed to resume if page refreshes mid-test
        sessionId: state.sessionId,
        testType: state.testType,
        status: state.status,
        s1Questions: state.s1Questions,
        s2Questions: state.s2Questions,
        s3Questions: state.s3Questions,
        passages: state.passages,
        currentSection: state.currentSection,
        currentQuestionIndex: state.currentQuestionIndex,
        s1Answers: state.s1Answers,
        s2Answers: state.s2Answers,
        s3Answers: state.s3Answers,
        s1TimeRemaining: state.s1TimeRemaining,
        s2TimeRemaining: state.s2TimeRemaining,
        s3TimeRemaining: state.s3TimeRemaining,
      }),
    }
  )
);

// ─── Selectors (memoised outside render) ─────────────────────

export const selectCurrentQuestion = (state: TestStore): Question | null => {
  const questions = state[questionsKey(state.currentSection)];
  return questions[state.currentQuestionIndex] ?? null;
};

export const selectCurrentAnswer = (state: TestStore) => {
  const q = selectCurrentQuestion(state);
  if (!q) return null;
  return state[answersKey(state.currentSection)][q.id] ?? null;
};

export const selectSectionProgress = (section: TestSection) => (state: TestStore) => {
  const questions = state[questionsKey(section)];
  const answers = state[answersKey(section)];
  return {
    total: questions.length,
    answered: Object.keys(answers).length,
    flagged: Object.values(answers).filter((a) => a.flagged).length,
  };
};
