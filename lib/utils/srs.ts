/**
 * Spaced Repetition System — Leitner Box Algorithm (simplified SM-2 variant)
 *
 * Boxes: 1 (new/hard) → 2 → 3 → 4 → 5 (mastered)
 * Review intervals (days): 1, 2, 4, 7, 14
 * Status mapping: box 1-2 = "new", 3-4 = "learning", 5 = "mastered"
 */

export const LEITNER_INTERVALS = [0, 1, 2, 4, 7, 14]; // index = box number

export type VocabStatus = "new" | "learning" | "mastered";

export interface SRSResult {
  nextReviewDate: string; // ISO date string
  newBox: number;
  status: VocabStatus;
}

/** Call when user answers correctly */
export function processCorrect(currentBox: number): SRSResult {
  const newBox = Math.min(currentBox + 1, 5);
  return buildResult(newBox);
}

/** Call when user answers incorrectly (resets to box 1) */
export function processIncorrect(): SRSResult {
  return buildResult(1);
}

function buildResult(box: number): SRSResult {
  const daysUntilNext = LEITNER_INTERVALS[box] ?? 1;
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysUntilNext);

  const status: VocabStatus =
    box <= 2 ? "new" : box <= 4 ? "learning" : "mastered";

  return {
    nextReviewDate: nextDate.toISOString().split("T")[0],
    newBox: box,
    status,
  };
}

/** Returns vocab due for review today */
export function isDue(nextReviewDate: string | null): boolean {
  if (!nextReviewDate) return true; // never reviewed
  const today = new Date().toISOString().split("T")[0];
  return nextReviewDate <= today;
}

export function statusColor(status: VocabStatus): string {
  return status === "mastered" ? "#34d399"
    : status === "learning" ? "#fbbf24"
    : "#60a5fa";
}

export function statusLabel(status: VocabStatus): string {
  return status === "mastered" ? "Mastered 🎓"
    : status === "learning" ? "Learning 📖"
    : "New ✨";
}
