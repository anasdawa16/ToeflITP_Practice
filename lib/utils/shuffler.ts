/**
 * lib/utils/shuffler.ts
 * Fisher-Yates shuffle + TOEFL ITP question ordering algorithm.
 *
 * TOEFL ITP Section 2 spec:
 *   - Questions 1-15: Structure (fill-in-blank)
 *   - Questions 16-40: Written Expression (error identification)
 *
 * Section 3 spec:
 *   - 5 passages, 8-10 questions each
 *   - Questions per passage must stay together (grouped)
 */

/** Seeded Fisher-Yates using a simple LCG so the order is reproducible from sessionId */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function seedFromId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = Math.imul(31, h) + id.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}

/** Shuffle array using an LCG seeded from the session ID. */
export function seededShuffle<T>(arr: T[], sessionId: string): T[] {
  const rand = seededRandom(seedFromId(sessionId));
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Equivalent function for true random (used when creating new sessions) */
export function fisherYates<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build the ordered question ID list for Section 2:
 *   Positions 0-14 → structure questions (shuffled within that block)
 *   Positions 15-39 → written_expression questions (shuffled within that block)
 */
export function buildSection2Order(
  structureIds: string[],
  weIds: string[]
): string[] {
  const s = fisherYates(structureIds).slice(0, 15);
  const w = fisherYates(weIds).slice(0, 25);
  return [...s, ...w];
}

/**
 * Build Section 3 question ID list:
 *   Groups questions by passage, shuffles the passage order,
 *   but keeps questions within a passage in their original order.
 */
export function buildSection3Order(
  questions: Array<{ id: string; passage_id: string | null; question_order_in_group: number | null }>
): string[] {
  // Group by passage
  const byPassage: Record<string, typeof questions> = {};
  for (const q of questions) {
    const pid = q.passage_id ?? "no_passage";
    byPassage[pid] = byPassage[pid] ?? [];
    byPassage[pid].push(q);
  }

  // Sort within passage by question_order_in_group
  for (const pid of Object.keys(byPassage)) {
    byPassage[pid].sort(
      (a, b) => (a.question_order_in_group ?? 0) - (b.question_order_in_group ?? 0)
    );
  }

  // Shuffle passage order
  const passageIds = fisherYates(Object.keys(byPassage).filter((k) => k !== "no_passage"));

  const ordered: string[] = [];
  for (const pid of passageIds) {
    for (const q of byPassage[pid]) {
      ordered.push(q.id);
    }
  }
  return ordered;
}
