/**
 * Badge Definitions — TOEFL ITP Achievement System
 * Every badge has: id, icon, name, description, category, trigger condition metadata.
 */

export type BadgeCategory = "streak" | "score" | "accuracy" | "practice" | "milestone";

export interface BadgeDefinition {
  id: string;
  icon: string;
  name: string;
  description: string;
  category: BadgeCategory;
  /** Color for badge ring / glow */
  color: string;
  /** Tier: bronze, silver, gold, platinum */
  tier: "bronze" | "silver" | "gold" | "platinum";
}

export const BADGES: BadgeDefinition[] = [
  // ── STREAK ──────────────────────────────────────────────────
  {
    id: "streak_3",
    icon: "🔥",
    name: "On Fire",
    description: "Study 3 days in a row",
    category: "streak",
    color: "#f97316",
    tier: "bronze",
  },
  {
    id: "streak_7",
    icon: "🔥",
    name: "Week Warrior",
    description: "Study 7 days in a row",
    category: "streak",
    color: "#f97316",
    tier: "silver",
  },
  {
    id: "streak_30",
    icon: "🔥",
    name: "Unstoppable",
    description: "Study 30 days in a row",
    category: "streak",
    color: "#fbbf24",
    tier: "gold",
  },
  {
    id: "streak_100",
    icon: "👑",
    name: "Centurion",
    description: "Study 100 days in a row",
    category: "streak",
    color: "#a78bfa",
    tier: "platinum",
  },

  // ── SCORE ───────────────────────────────────────────────────
  {
    id: "score_400",
    icon: "🎓",
    name: "First Step",
    description: "Score 400+ on a mock test",
    category: "score",
    color: "#60a5fa",
    tier: "bronze",
  },
  {
    id: "score_500",
    icon: "🥈",
    name: "Middle Ground",
    description: "Score 500+ on a mock test",
    category: "score",
    color: "#94a3b8",
    tier: "silver",
  },
  {
    id: "score_600",
    icon: "🏆",
    name: "High Scorer",
    description: "Score 600+ on a mock test",
    category: "score",
    color: "#fbbf24",
    tier: "gold",
  },
  {
    id: "score_640",
    icon: "💎",
    name: "TOEFL Elite",
    description: "Score 640+ — Superior band",
    category: "score",
    color: "#a78bfa",
    tier: "platinum",
  },

  // ── ACCURACY ────────────────────────────────────────────────
  {
    id: "accuracy_s2_80",
    icon: "🎯",
    name: "Grammar Ace",
    description: "80%+ accuracy on Section 2 (all time)",
    category: "accuracy",
    color: "#34d399",
    tier: "silver",
  },
  {
    id: "accuracy_s3_80",
    icon: "📖",
    name: "Reading Pro",
    description: "80%+ accuracy on Section 3 (all time)",
    category: "accuracy",
    color: "#34d399",
    tier: "silver",
  },
  {
    id: "accuracy_session_100",
    icon: "💯",
    name: "Bullseye",
    description: "100% accuracy on a practice session (10+ questions)",
    category: "accuracy",
    color: "#fbbf24",
    tier: "gold",
  },
  {
    id: "perfect_s2",
    icon: "💯",
    name: "Perfect Structure",
    description: "40/40 on Section 2 in a mock test",
    category: "accuracy",
    color: "#a78bfa",
    tier: "platinum",
  },

  // ── PRACTICE ────────────────────────────────────────────────
  {
    id: "questions_50",
    icon: "📝",
    name: "Getting Started",
    description: "Answer 50 questions total",
    category: "practice",
    color: "#60a5fa",
    tier: "bronze",
  },
  {
    id: "questions_200",
    icon: "📝",
    name: "Diligent Learner",
    description: "Answer 200 questions total",
    category: "practice",
    color: "#60a5fa",
    tier: "silver",
  },
  {
    id: "questions_500",
    icon: "📚",
    name: "Question Master",
    description: "Answer 500 questions total",
    category: "practice",
    color: "#fbbf24",
    tier: "gold",
  },
  {
    id: "passages_10",
    icon: "📚",
    name: "Bookworm",
    description: "Complete 10 reading passages",
    category: "practice",
    color: "#34d399",
    tier: "silver",
  },
  {
    id: "ai_chat_5",
    icon: "🤖",
    name: "AI Buddy",
    description: "Chat with the AI tutor 5 times",
    category: "practice",
    color: "#a78bfa",
    tier: "bronze",
  },

  // ── MILESTONE ───────────────────────────────────────────────
  {
    id: "first_test",
    icon: "🚀",
    name: "Test Taker",
    description: "Complete your first mock test",
    category: "milestone",
    color: "#60a5fa",
    tier: "bronze",
  },
  {
    id: "tests_5",
    icon: "🧪",
    name: "Repeat Challenger",
    description: "Complete 5 mock tests",
    category: "milestone",
    color: "#94a3b8",
    tier: "silver",
  },
  {
    id: "tests_10",
    icon: "🏅",
    name: "Mock Test Veteran",
    description: "Complete 10 mock tests",
    category: "milestone",
    color: "#fbbf24",
    tier: "gold",
  },
  {
    id: "beat_target",
    icon: "🎯",
    name: "Goal Crusher",
    description: "Score above your target score",
    category: "milestone",
    color: "#fbbf24",
    tier: "gold",
  },
];

export const BADGE_MAP = new Map<string, BadgeDefinition>(BADGES.map((b) => [b.id, b]));

export const TIER_ORDER = { bronze: 1, silver: 2, gold: 3, platinum: 4 };
