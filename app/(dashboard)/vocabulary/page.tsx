"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FlashCard, type VocabWord } from "@/components/vocabulary/FlashCard";
import { statusColor, statusLabel } from "@/lib/utils/srs";
import { BarChartIcon } from "@/components/ui/Icons";

type PageMode = "menu" | "review" | "browse";

interface VocabStats {
  total: number;
  due: number;
  mastered: number;
  learning: number;
  new_count: number;
}

/* ── Stat pill ─────────────────────────────────────── */
function StatPill({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div style={{ textAlign: "center", padding: "14px 20px", backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", flex: 1 }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 800, color, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <div style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: "2px" }}>{label}</div>
    </div>
  );
}

/* ── Session complete screen ──────────────────────── */
function SessionComplete({ correct, total, onContinue }: { correct: number; total: number; onContinue: () => void }) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", textAlign: "center", padding: "40px 24px" }}>
      <div style={{ fontSize: "56px" }}>{pct >= 80 ? "🎉" : pct >= 60 ? "📚" : "💪"}</div>
      <div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "8px" }}>Session Complete!</h2>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
          {correct} / {total} correct · {pct}% accuracy
        </p>
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <button type="button" onClick={onContinue} style={{ padding: "12px 24px", backgroundColor: "var(--color-primary-500)", border: "none", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#fff", cursor: "pointer" }}>
          Review More
        </button>
      </div>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────── */
export default function VocabularyPage() {
  const router = useRouter();
  const [mode, setMode] = useState<PageMode>("menu");
  const [words, setWords] = useState<VocabWord[]>([]);
  const [stats, setStats] = useState<VocabStats>({ total: 0, due: 0, mastered: 0, learning: 0, new_count: 0 });
  const [cardIndex, setCardIndex] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchWords = useCallback(async (filter: string, cat: string) => {
    setLoading(true);
    const params = new URLSearchParams({ filter, limit: "20" });
    if (cat !== "all") params.set("category", cat);
    const res = await fetch(`/api/vocabulary?${params.toString()}`);
    const data = await res.json() as { words: VocabWord[]; stats: VocabStats };
    setWords(data.words ?? []);
    setStats(data.stats ?? { total: 0, due: 0, mastered: 0, learning: 0, new_count: 0 });
    setLoading(false);
  }, []);

  useEffect(() => { void fetchWords("all", "all"); }, [fetchWords]);

  function startReview() {
    void fetchWords("due", selectedCategory);
    setCardIndex(0);
    setSessionCorrect(0);
    setSessionDone(false);
    setMode("review");
  }

  async function handleResult(result: "correct" | "incorrect") {
    const current = words[cardIndex];
    if (!current) return;
    if (result === "correct") setSessionCorrect((c) => c + 1);

    // Update SRS in background
    void fetch("/api/vocabulary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vocab_id: current.id, result, current_box: current.review_count || 1 }),
    });

    const next = cardIndex + 1;
    if (next >= words.length) {
      setSessionDone(true);
    } else {
      setCardIndex(next);
    }
  }

  const categories = ["all", "academic", "science", "social_science", "arts", "business"];

  /* ── MENU MODE ──────────────────────────────────── */
  if (mode === "menu") {
    return (
      <div style={{ padding: "28px 24px", maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "4px" }}>
              📚 Vocabulary
            </h1>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>TOEFL ITP academic word list · Leitner SRS</p>
          </div>
          <button onClick={() => router.push("/progress")} style={{ padding: "8px 16px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text-secondary)", cursor: "pointer" }}>← Progress</button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <StatPill value={stats.due} label="Due Today" color="var(--color-primary-300)" />
          <StatPill value={stats.new_count} label="New" color="#60a5fa" />
          <StatPill value={stats.learning} label="Learning" color="#fbbf24" />
          <StatPill value={stats.mastered} label="Mastered" color="#34d399" />
          <StatPill value={stats.total} label="Total" color="var(--color-text-muted)" />
        </div>

        {/* Category filter */}
        <div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>Category</p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} style={{ padding: "6px 14px", backgroundColor: selectedCategory === cat ? "var(--color-primary-500)" : "rgba(255,255,255,0.05)", border: "1px solid", borderColor: selectedCategory === cat ? "transparent" : "var(--color-border)", borderRadius: "var(--radius-full)", fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: selectedCategory === cat ? 700 : 400, color: selectedCategory === cat ? "#fff" : "var(--color-text-secondary)", cursor: "pointer" }}>
                {cat.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button type="button" onClick={startReview} style={{ flex: 1, minWidth: "180px", padding: "16px", backgroundColor: "var(--color-primary-500)", border: "none", borderRadius: "var(--radius-xl)", fontFamily: "var(--font-ui)", fontSize: "var(--text-base)", fontWeight: 800, color: "#fff", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <span>🎴 Start Review</span>
            <span style={{ fontSize: "11px", fontWeight: 400, opacity: 0.75 }}>{stats.due} cards due today</span>
          </button>
          <button type="button" onClick={() => setMode("browse")} style={{ flex: 1, minWidth: "180px", padding: "16px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", fontFamily: "var(--font-ui)", fontSize: "var(--text-base)", fontWeight: 700, color: "var(--color-text-primary)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <span>📖 Browse All</span>
            <span style={{ fontSize: "11px", fontWeight: 400, opacity: 0.6 }}>{stats.total} words</span>
          </button>
        </div>

        {/* SRS explanation */}
        <div style={{ padding: "16px", backgroundColor: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: "var(--radius-xl)" }}>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", fontWeight: 700, color: "#60a5fa", marginBottom: "6px", display: "flex", alignItems: "center", gap: "5px" }}><BarChartIcon size={12} /> How SRS Works</p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
            Words you know advance to the next box (longer review interval). Words you miss reset. Boxes 1→2→3→4→5 = review in 1→2→4→7→14 days. Master all 5 boxes to graduate a word.
          </p>
        </div>
      </div>
    );
  }

  /* ── REVIEW MODE ─────────────────────────────────── */
  if (mode === "review") {
    if (loading) {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", flexDirection: "column", gap: "12px" }}>
          <div style={{ width: "28px", height: "28px", border: "2px solid rgba(255,255,255,0.08)", borderTop: "2px solid var(--color-primary-400)", borderRadius: "50%", animation: "spin 800ms linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      );
    }

    if (words.length === 0) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "16px", textAlign: "center", padding: "24px" }}>
          <span style={{ fontSize: "48px" }}>🎉</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--color-text-primary)" }}>All caught up!</h2>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>No words due for review right now. Come back tomorrow!</p>
          <button type="button" onClick={() => setMode("menu")} style={{ padding: "10px 20px", backgroundColor: "var(--color-primary-500)", border: "none", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#fff", cursor: "pointer" }}>← Back</button>
        </div>
      );
    }

    if (sessionDone) {
      return <SessionComplete correct={sessionCorrect} total={words.length} onContinue={() => { setMode("menu"); void fetchWords("all", "all"); }} />;
    }

    return (
      <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: "560px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button type="button" onClick={() => setMode("menu")} style={{ padding: "6px 12px", backgroundColor: "transparent", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", cursor: "pointer" }}>✕ Stop</button>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>✓ {sessionCorrect} correct</span>
        </div>
        <FlashCard word={words[cardIndex]!} onResult={handleResult} cardNumber={cardIndex + 1} total={words.length} />
      </div>
    );
  }

  /* ── BROWSE MODE ────────────────────────────────── */
  return (
    <div style={{ padding: "28px 24px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <button type="button" onClick={() => setMode("menu")} style={{ padding: "6px 12px", backgroundColor: "transparent", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", cursor: "pointer" }}>← Back</button>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--color-text-primary)" }}>Word List</h2>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>({words.length} words shown)</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
        {words.map((w) => (
          <div key={w.id} style={{ padding: "16px", backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: 700, color: "var(--color-text-primary)" }}>{w.word}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: statusColor(w.status) }}>{statusLabel(w.status)}</span>
            </div>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", lineHeight: 1.5, margin: 0 }}>{w.definition}</p>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)", display: "block", marginTop: "6px" }}>{w.part_of_speech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
