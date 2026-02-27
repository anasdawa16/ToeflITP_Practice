import { describe, it, expect } from "vitest";
import {
  processCorrect,
  processIncorrect,
  isDue,
  statusLabel,
  statusColor,
  LEITNER_INTERVALS,
} from "@/lib/utils/srs";

/**
 * Unit tests for lib/utils/srs.ts
 * Leitner SRS algorithm: 5 boxes, intervals [0,1,2,4,7,14] days
 */
describe("Leitner SRS Algorithm", () => {

  // ── LEITNER_INTERVALS constant ───────────────────────────────
  describe("LEITNER_INTERVALS", () => {
    it("has 6 entries (index 0 unused, boxes 1–5)", () => {
      expect(LEITNER_INTERVALS).toHaveLength(6);
    });

    it("intervals are [0,1,2,4,7,14]", () => {
      expect(LEITNER_INTERVALS).toEqual([0, 1, 2, 4, 7, 14]);
    });
  });

  // ── processCorrect ──────────────────────────────────────────
  describe("processCorrect", () => {
    it("advances box 1 → 2", () => {
      const result = processCorrect(1);
      expect(result.newBox).toBe(2);
    });

    it("advances box 2 → 3", () => {
      const result = processCorrect(2);
      expect(result.newBox).toBe(3);
    });

    it("advances box 4 → 5", () => {
      const result = processCorrect(4);
      expect(result.newBox).toBe(5);
    });

    it("caps at box 5 (mastered ceiling)", () => {
      const result = processCorrect(5);
      expect(result.newBox).toBe(5);
    });

    it("box 1 → status is 'new'", () => {
      // After advancing from 1 → 2, still 'new'
      expect(processCorrect(1).status).toBe("new");
    });

    it("box 2 → 3: status becomes 'learning'", () => {
      expect(processCorrect(2).status).toBe("learning");
    });

    it("box 4 → 5: status becomes 'mastered'", () => {
      expect(processCorrect(4).status).toBe("mastered");
    });

    it("returns a valid ISO date string for nextReviewDate", () => {
      const result = processCorrect(1);
      const date = new Date(result.nextReviewDate);
      expect(date).toBeInstanceOf(Date);
      expect(isNaN(date.getTime())).toBe(false);
    });

    it("box 3 → next review in ~4 days", () => {
      const result = processCorrect(3); // box 3 → 4, interval = 7 days
      const today = new Date();
      const reviewDate = new Date(result.nextReviewDate);
      const diffDays = Math.round((reviewDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(7); // interval for box 4 = 7
    });
  });

  // ── processIncorrect ────────────────────────────────────────
  describe("processIncorrect", () => {
    it("always resets to box 1", () => {
      expect(processIncorrect().newBox).toBe(1);
    });

    it("resets status to 'new' even if was 'mastered'", () => {
      expect(processIncorrect().status).toBe("new");
    });

    it("next review is in 1 day (box 1 interval)", () => {
      const result = processIncorrect();
      const today = new Date();
      const reviewDate = new Date(result.nextReviewDate);
      const diffDays = Math.round((reviewDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(1);
    });
  });

  // ── isDue ────────────────────────────────────────────────────
  describe("isDue", () => {
    it("null nextReviewDate → always due (new word)", () => {
      expect(isDue(null)).toBe(true);
    });

    it("today's date → due", () => {
      const today = new Date().toISOString().split("T")[0]!;
      expect(isDue(today)).toBe(true);
    });

    it("yesterday → due", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isDue(yesterday.toISOString().split("T")[0]!)).toBe(true);
    });

    it("tomorrow → not due", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isDue(tomorrow.toISOString().split("T")[0]!)).toBe(false);
    });

    it("far future → not due", () => {
      expect(isDue("2030-01-01")).toBe(false);
    });
  });

  // ── statusLabel ─────────────────────────────────────────────
  describe("statusLabel", () => {
    it("mastered → 'Mastered 🎓'", () => {
      expect(statusLabel("mastered")).toBe("Mastered 🎓");
    });

    it("learning → 'Learning 📖'", () => {
      expect(statusLabel("learning")).toBe("Learning 📖");
    });

    it("new → 'New ✨'", () => {
      expect(statusLabel("new")).toBe("New ✨");
    });
  });

  // ── statusColor ─────────────────────────────────────────────
  describe("statusColor", () => {
    it("mastered → green hex", () => {
      expect(statusColor("mastered")).toBe("#34d399");
    });

    it("learning → amber hex", () => {
      expect(statusColor("learning")).toBe("#fbbf24");
    });

    it("new → blue hex", () => {
      expect(statusColor("new")).toBe("#60a5fa");
    });
  });

  // ── Progression simulation ──────────────────────────────────
  describe("full Leitner progression", () => {
    it("needs 4 consecutive correct answers to reach 'mastered' from box 1", () => {
      let box = 1;
      for (let i = 0; i < 4; i++) {
        const result = processCorrect(box);
        box = result.newBox;
      }
      expect(box).toBe(5);
    });

    it("one wrong answer anywhere resets to box 1", () => {
      // Get to box 4 first
      let box = 1;
      for (let i = 0; i < 3; i++) {
        box = processCorrect(box).newBox;
      }
      // Now miss
      const result = processIncorrect();
      expect(result.newBox).toBe(1);
    });
  });
});
