/**
 * lib/utils/scoreCalculator.ts
 * TOEFL ITP Level 1 score calculation.
 *
 * Based on the formula in the implementation plan:
 *   S1 & S2: scaled = 31 + (percentage × 37)  → range 31–68
 *   S3:      scaled = 31 + (percentage × 36)   → range 31–67
 *   Total:   (s1 + s2 + s3) × 10/3             → range ~310–677
 */

export interface SectionScore {
  raw: number;
  total: number;
  scaled: number;
  percentage: number;
}

export interface TestScores {
  s1: SectionScore;
  s2: SectionScore;
  s3: SectionScore;
  total: number; // scaled total (rounded to nearest 10 per ETS convention)
}

function calcScaled(section: 1 | 2 | 3, raw: number, total: number): SectionScore {
  if (total === 0) return { raw: 0, total: 0, scaled: 31, percentage: 0 };
  const pct = Math.min(raw / total, 1.0);
  const range = section === 3 ? 36 : 37;
  const scaled = Math.round(31 + pct * range);
  return { raw, total, scaled, percentage: Math.round(pct * 100) };
}

export function calculateScores(
  s1Raw: number, s1Total: number,
  s2Raw: number, s2Total: number,
  s3Raw: number, s3Total: number,
): TestScores {
  const s1 = calcScaled(1, s1Raw, s1Total || 1);
  const s2 = calcScaled(2, s2Raw, s2Total || 1);
  const s3 = calcScaled(3, s3Raw, s3Total || 1);

  // ETS formula: sum × 10/3, rounded to nearest 10
  const rawTotal = (s1.scaled + s2.scaled + s3.scaled) * (10 / 3);
  const total = Math.round(rawTotal / 10) * 10;

  return { s1, s2, s3, total };
}

/** Estimate band / feedback text from total score */
export function scoreBand(total: number): { label: string; color: string; description: string } {
  if (total >= 600) return { label: "Excellent", color: "#34d399", description: "Near-native proficiency. Strong candidate for TOEFL ITP programs." };
  if (total >= 530) return { label: "Advanced", color: "#60a5fa", description: "Meets most university English requirements. Keep refining listening & reading speed." };
  if (total >= 480) return { label: "Upper-Intermediate", color: "#fbbf24", description: "Good foundation. Focus on grammar accuracy (Section 2) and reading speed (Section 3)." };
  if (total >= 420) return { label: "Intermediate", color: "#f97316", description: "Needs targeted practice. Drill grammar rules and expand academic vocabulary." };
  return { label: "Developing", color: "#f87171", description: "Start with systematic grammar study and short reading passages. Use the Learning Hub." };
}
