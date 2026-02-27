"use client";

import { useState, useCallback, useRef } from "react";
import type { Question, Passage, AnswerLetter, PracticeAnswer, PracticeSessionState } from "@/types/test";

interface UsePracticeSessionOptions {
  questions: Question[];
  passage?: Passage | null;
}

export function usePracticeSession({ questions, passage = null }: UsePracticeSessionOptions) {
  const startTime = useRef(Date.now());
  const questionStartTime = useRef(Date.now());

  const [state, setState] = useState<PracticeSessionState>({
    questions,
    passage,
    currentIndex: 0,
    answers: {},
    startedAt: startTime.current,
    questionStartedAt: startTime.current,
    completed: false,
  });

  const currentQuestion: Question | null = state.questions[state.currentIndex] ?? null;
  const currentAnswer: PracticeAnswer | null =
    currentQuestion ? (state.answers[currentQuestion.id] ?? null) : null;

  const isAnswered = currentAnswer !== null;
  const feedback: "none" | "correct" | "incorrect" = !isAnswered
    ? "none"
    : currentAnswer.isCorrect
    ? "correct"
    : "incorrect";

  const submitAnswer = useCallback(
    (selected: AnswerLetter) => {
      if (!currentQuestion || isAnswered) return;
      const now = Date.now();
      const timeSpent = Math.round((now - questionStartTime.current) / 1000);

      const isCorrect = selected === currentQuestion.correct_answer;
      const answer: PracticeAnswer = {
        questionId: currentQuestion.id,
        selected,
        isCorrect,
        timeSpentSeconds: timeSpent,
      };

      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [currentQuestion.id]: answer },
      }));
    },
    [currentQuestion, isAnswered]
  );

  const goNext = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;
      const completed = nextIndex >= prev.questions.length;
      questionStartTime.current = Date.now();
      return { ...prev, currentIndex: nextIndex, completed };
    });
  }, []);

  // Computed statistics
  const answeredCount = Object.keys(state.answers).length;
  const correctCount = Object.values(state.answers).filter((a) => a.isCorrect).length;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : null;
  const isLast = state.currentIndex === state.questions.length - 1;

  return {
    state,
    currentQuestion,
    currentAnswer,
    feedback,
    isAnswered,
    isLast,
    answeredCount,
    correctCount,
    accuracy,
    submitAnswer,
    goNext,
  };
}
