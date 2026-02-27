/**
 * types/test.ts
 * Client-facing types for practice & test session.
 */

export type AnswerLetter = "A" | "B" | "C" | "D";

export type QuestionSection = 1 | 2 | 3;
export type QuestionPart =
  | "A" | "B" | "C"            // Section 1 listening parts
  | "structure"                 // Section 2 structure
  | "written_expression"        // Section 2 written expression
  | "reading";                  // Section 3 reading

/** Flat question row as returned from Supabase */
export interface Question {
  id: string;
  section: QuestionSection;
  part: QuestionPart;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: AnswerLetter;
  explanation: string;
  difficulty: number;
  topic_tags: string[];
  audio_url: string | null;
  passage_id: string | null;
  conversation_group_id: string | null;
  question_order_in_group: number | null;
}

/** Reading passage row */
export interface Passage {
  id: string;
  title: string;
  content: string;
  topic: string;
  word_count: number;
  difficulty: number;
}

/** State for a single practice answer */
export interface PracticeAnswer {
  questionId: string;
  selected: AnswerLetter;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

/** Overall practice session state */
export interface PracticeSessionState {
  questions: Question[];
  passage: Passage | null;
  currentIndex: number;
  answers: Record<string, PracticeAnswer>; // questionId → answer
  startedAt: number; // Date.now()
  questionStartedAt: number;
  completed: boolean;
}

/** API query params for GET /api/questions */
export interface QuestionsQuery {
  section?: QuestionSection;
  part?: string;
  topic?: string;
  difficulty?: number;
  limit?: number;
  passage_id?: string;
}
