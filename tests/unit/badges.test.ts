import { describe, it, expect } from "vitest";
import { BADGES, BADGE_MAP, TIER_ORDER } from "@/lib/achievements/badges";

/**
 * Unit tests for lib/achievements/badges.ts
 */
describe("Badge Definitions", () => {

  // ── BADGES array ────────────────────────────────────────────
  describe("BADGES array", () => {
    it("has at least 20 badges", () => {
      expect(BADGES.length).toBeGreaterThanOrEqual(20);
    });

    it("every badge has required fields", () => {
      for (const badge of BADGES) {
        expect(badge.id, `${badge.id} missing id`).toBeTruthy();
        expect(badge.name, `${badge.id} missing name`).toBeTruthy();
        expect(badge.description, `${badge.id} missing description`).toBeTruthy();
        expect(badge.icon, `${badge.id} missing icon`).toBeTruthy();
        expect(badge.color, `${badge.id} missing color`).toBeTruthy();
        expect(badge.category, `${badge.id} missing category`).toBeTruthy();
        expect(badge.tier, `${badge.id} missing tier`).toBeTruthy();
      }
    });

    it("all badge IDs are unique", () => {
      const ids = BADGES.map((b) => b.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });

    it("all badge names are unique", () => {
      const names = BADGES.map((b) => b.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });

    it("colors are valid hex format", () => {
      const hexRegex = /^#[0-9a-fA-F]{6}$/;
      for (const badge of BADGES) {
        expect(hexRegex.test(badge.color), `${badge.id} color invalid: ${badge.color}`).toBe(true);
      }
    });

    it("tiers are only: bronze, silver, gold, platinum", () => {
      const validTiers = new Set(["bronze", "silver", "gold", "platinum"]);
      for (const badge of BADGES) {
        expect(validTiers.has(badge.tier), `${badge.id} invalid tier: ${badge.tier}`).toBe(true);
      }
    });

    it("categories are valid", () => {
      const validCats = new Set(["streak", "score", "accuracy", "practice", "milestone"]);
      for (const badge of BADGES) {
        expect(validCats.has(badge.category), `${badge.id} invalid category: ${badge.category}`).toBe(true);
      }
    });

    it("covers all 5 categories", () => {
      const cats = new Set(BADGES.map((b) => b.category));
      expect(cats.has("streak")).toBe(true);
      expect(cats.has("score")).toBe(true);
      expect(cats.has("accuracy")).toBe(true);
      expect(cats.has("practice")).toBe(true);
      expect(cats.has("milestone")).toBe(true);
    });
  });

  // ── BADGE_MAP ────────────────────────────────────────────────
  describe("BADGE_MAP", () => {
    it("has same count as BADGES array", () => {
      expect(BADGE_MAP.size).toBe(BADGES.length);
    });

    it("every badge is accessible by its ID", () => {
      for (const badge of BADGES) {
        expect(BADGE_MAP.get(badge.id)).toBeDefined();
        expect(BADGE_MAP.get(badge.id)?.name).toBe(badge.name);
      }
    });

    it("returns undefined for non-existent ID", () => {
      expect(BADGE_MAP.get("does_not_exist")).toBeUndefined();
    });
  });

  // ── TIER_ORDER ───────────────────────────────────────────────
  describe("TIER_ORDER", () => {
    it("platinum > gold > silver > bronze", () => {
      expect(TIER_ORDER.platinum).toBeGreaterThan(TIER_ORDER.gold);
      expect(TIER_ORDER.gold).toBeGreaterThan(TIER_ORDER.silver);
      expect(TIER_ORDER.silver).toBeGreaterThan(TIER_ORDER.bronze);
    });

    it("has entries for all 4 tiers", () => {
      expect(TIER_ORDER.bronze).toBeDefined();
      expect(TIER_ORDER.silver).toBeDefined();
      expect(TIER_ORDER.gold).toBeDefined();
      expect(TIER_ORDER.platinum).toBeDefined();
    });
  });

  // ── Specific badges by ID ────────────────────────────────────
  describe("specific badge lookup", () => {
    it("first_test badge exists and is bronze milestone", () => {
      const badge = BADGE_MAP.get("first_test");
      expect(badge).toBeDefined();
      expect(badge?.tier).toBe("bronze");
      expect(badge?.category).toBe("milestone");
    });

    it("streak_100 badge exists and is high tier", () => {
      const badge = BADGE_MAP.get("streak_100");
      expect(badge).toBeDefined();
      expect(["gold", "platinum"]).toContain(badge?.tier);
    });

    it("score_640 badge represents TOEFL ITP elite score", () => {
      const badge = BADGE_MAP.get("score_640");
      expect(badge).toBeDefined();
      expect(badge?.tier).not.toBe("bronze");
    });
  });
});
