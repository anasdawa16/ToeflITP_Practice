import { describe, it, expect } from "vitest";
import { calculateScores, scoreBand } from "@/lib/utils/scoreCalculator";

/**
 * Unit tests for lib/utils/scoreCalculator.ts
 *
 * The TOEFL ITP Level 1 scoring formula (per Implementation Plan §3.5):
 *   Section 1 & 2 scaled = 31 + (raw/total × 37)  → 31–68
 *   Section 3 scaled     = 31 + (raw/total × 36)   → 31–67
 *   Total                = (s1 + s2 + s3) × 10/3   → rounds to nearest 10
 */
describe("calculateScores", () => {

  // ── Perfect scores ──────────────────────────────────────────
  describe("perfect scores", () => {
    it("all sections 100% → maximum total ≈ 670", () => {
      const result = calculateScores(50, 50, 40, 40, 50, 50);
      // s1: 31+37=68, s2: 31+37=68, s3: 31+36=67
      expect(result.s1.scaled).toBe(68);
      expect(result.s2.scaled).toBe(68);
      expect(result.s3.scaled).toBe(67);
      // total: (68+68+67) * 10/3 = 203 * 10/3 ≈ 676.67 → rounds to 680
      expect(result.total).toBe(680);
    });

    it("all correct → 100% percentage each section", () => {
      const result = calculateScores(50, 50, 40, 40, 50, 50);
      expect(result.s1.percentage).toBe(100);
      expect(result.s2.percentage).toBe(100);
      expect(result.s3.percentage).toBe(100);
    });
  });

  // ── Zero scores ─────────────────────────────────────────────
  describe("zero scores", () => {
    it("all 0 correct → minimum scaled = 31 each section", () => {
      const result = calculateScores(0, 50, 0, 40, 0, 50);
      expect(result.s1.scaled).toBe(31);
      expect(result.s2.scaled).toBe(31);
      expect(result.s3.scaled).toBe(31);
    });

    it("all 0 → total ≈ 310", () => {
      const result = calculateScores(0, 50, 0, 40, 0, 50);
      // (31+31+31)*10/3 = 310
      expect(result.total).toBe(310);
    });

    it("handles zero total questions without division by zero", () => {
      const result = calculateScores(0, 0, 0, 0, 0, 0);
      expect(result.s1.scaled).toBe(31);
      expect(result.s2.scaled).toBe(31);
      expect(result.s3.scaled).toBe(31);
      expect(result.total).toBeGreaterThanOrEqual(300);
    });
  });

  // ── Mid-range scores ─────────────────────────────────────────
  describe("mid-range scores", () => {
    it("50% each section → realistic mid score", () => {
      const result = calculateScores(25, 50, 20, 40, 25, 50);
      // s1: 31 + 0.5*37 = 31 + 18.5 → 50 (rounded)
      expect(result.s1.scaled).toBeCloseTo(50, 0);
      // s2: 31 + 0.5*37 = 50
      expect(result.s2.scaled).toBeCloseTo(50, 0);
      // s3: 31 + 0.5*36 = 31+18=49
      expect(result.s3.scaled).toBeCloseTo(49, 0);
    });

    it("50% → total is in range 480–520", () => {
      const result = calculateScores(25, 50, 20, 40, 25, 50);
      expect(result.total).toBeGreaterThanOrEqual(480);
      expect(result.total).toBeLessThanOrEqual(520);
    });

    it("percentages are clamped at 100 even with raw > total", () => {
      // Edge case: raw should not exceed total, but guard anyway
      const result = calculateScores(60, 50, 40, 40, 55, 50);
      expect(result.s1.percentage).toBe(100);
    });
  });

  // ── Raw score passthrough ──────────────────────────────────
  describe("raw score passthrough", () => {
    it("preserves raw and total values", () => {
      const result = calculateScores(35, 50, 30, 40, 45, 50);
      expect(result.s1.raw).toBe(35);
      expect(result.s1.total).toBe(50);
      expect(result.s2.raw).toBe(30);
      expect(result.s2.total).toBe(40);
      expect(result.s3.raw).toBe(45);
      expect(result.s3.total).toBe(50);
    });
  });

  // ── Total rounding ─────────────────────────────────────────
  describe("total score rounding", () => {
    it("rounds to nearest 10 (ETS convention)", () => {
      const result = calculateScores(35, 50, 30, 40, 45, 50);
      expect(result.total % 10).toBe(0);
    });

    it("total is always a multiple of 10", () => {
      const cases: [number, number][] = [[10, 50], [20, 50], [40, 50], [48, 50]];
      for (const [raw, tot] of cases) {
        const result = calculateScores(raw, tot, raw, tot, raw, tot);
        expect(result.total % 10).toBe(0);
      }
    });
  });

  // ── Specific TOEFL ITP reference scores ──────────────────────
  describe("reference score verification", () => {
    it("student with strong listening (40/50, 35/40, 40/50) → score ≥ 560", () => {
      const result = calculateScores(40, 50, 35, 40, 40, 50);
      expect(result.total).toBeGreaterThanOrEqual(560);
    });

    it("minimum passing for many universities (533) achievable with ~70% accuracy", () => {
      // 70% each section
      const result = calculateScores(35, 50, 28, 40, 35, 50);
      // Should be in range 530-570
      expect(result.total).toBeGreaterThanOrEqual(520);
      expect(result.total).toBeLessThanOrEqual(580);
    });
  });
});

// ── scoreBand ───────────────────────────────────────────────────
describe("scoreBand", () => {
  it("≥ 600 → Excellent (green)", () => {
    const band = scoreBand(617);
    expect(band.label).toBe("Excellent");
    expect(band.color).toBe("#34d399");
  });

  it("530–599 → Advanced (blue)", () => {
    const band = scoreBand(550);
    expect(band.label).toBe("Advanced");
    expect(band.color).toBe("#60a5fa");
  });

  it("480–529 → Upper-Intermediate", () => {
    const band = scoreBand(500);
    expect(band.label).toBe("Upper-Intermediate");
  });

  it("420–479 → Intermediate", () => {
    const band = scoreBand(450);
    expect(band.label).toBe("Intermediate");
  });

  it("< 420 → Developing", () => {
    const band = scoreBand(380);
    expect(band.label).toBe("Developing");
  });

  it("exact boundary 600 → Excellent", () => {
    expect(scoreBand(600).label).toBe("Excellent");
  });

  it("exact boundary 530 → Advanced", () => {
    expect(scoreBand(530).label).toBe("Advanced");
  });

  it("returns description string for every band", () => {
    [310, 420, 480, 530, 600, 680].forEach((score) => {
      const band = scoreBand(score);
      expect(band.description.length).toBeGreaterThan(10);
    });
  });
});
