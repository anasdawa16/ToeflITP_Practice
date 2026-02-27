import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  HeadphonesIcon,
  ClipboardIcon,
  BookOpenIcon,
  SparklesIcon,
  BarChartIcon,
  BookmarkIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "ToeflMaster ITP — TOEFL ITP Level 1 Preparation Platform",
  description:
    "AI-powered TOEFL ITP Level 1 preparation. 500+ questions, real mock tests, adaptive practice, and instant AI explanations. Achieve your target score.",
};

/* ================================================================
   LANDING PAGE — SaaS style, dark academic aesthetic
   ================================================================ */
export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg-primary)", minHeight: "100vh", color: "var(--color-text-primary)", fontFamily: "var(--font-ui)" }}>

      {/* ── NAV ───────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backgroundColor: "rgba(12,12,15,0.85)",
        backdropFilter: "blur(16px)",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "#fff",
              boxShadow: "0 0 20px rgba(139,92,246,0.4)",
            }}>T</div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--color-text-primary)" }}>
              ToeflMaster <span style={{ color: "var(--color-primary-400)" }}>ITP</span>
            </span>
          </div>
          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#features" style={{ fontSize: 14, color: "var(--color-text-secondary)", textDecoration: "none" }}>Features</a>
            <a href="#how-it-works" style={{ fontSize: 14, color: "var(--color-text-secondary)", textDecoration: "none" }}>How it works</a>
            <a href="#scores" style={{ fontSize: 14, color: "var(--color-text-secondary)", textDecoration: "none" }}>Score guide</a>
            <Link href="/login" style={{
              fontSize: 14, color: "var(--color-text-secondary)", textDecoration: "none",
            }}>
              Sign in
            </Link>
            <Link href="/register" style={{
              fontSize: 14, fontWeight: 600,
              padding: "8px 18px", borderRadius: 8,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#fff", textDecoration: "none",
            boxShadow: "0 0 16px rgba(139,92,246,0.3)",
            }}>
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section style={{ textAlign: "center", padding: "96px 24px 80px", position: "relative", overflow: "hidden" }}>
        {/* Glow background */}
        <div style={{
          position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
          width: 800, height: 600, borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 100,
          border: "1px solid rgba(139,92,246,0.3)",
          backgroundColor: "rgba(139,92,246,0.08)",
          fontSize: 13, fontWeight: 500, color: "var(--color-primary-300)",
          marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e" }} />
          Based on ETS Official TOEFL ITP Handbook 2025
        </div>

        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 800, lineHeight: 1.1,
          letterSpacing: "-0.03em",
          maxWidth: 800, margin: "0 auto 24px",
          color: "var(--color-text-primary)",
        }}>
          Ace the{" "}
          <span style={{
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            TOEFL ITP
          </span>{" "}
          with AI‑powered practice
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "var(--color-text-secondary)",
          maxWidth: 560, margin: "0 auto 40px",
          lineHeight: 1.7,
        }}>
          500+ ETS-standard questions across all 3 sections. Full mock tests with real timing.
          Instant AI explanations. Track your score from 310 to 677.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          <Link href="/register" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 28px", borderRadius: 10,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#fff", textDecoration: "none",
            fontSize: 16, fontWeight: 700,
            boxShadow: "0 4px 30px rgba(139,92,246,0.35)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}>
            Start free — no credit card
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </Link>
          <Link href="/login" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 28px", borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "var(--color-text-primary)", textDecoration: "none",
            fontSize: 16, fontWeight: 600,
          }}>
            Sign in to dashboard
          </Link>
        </div>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { num: "500+", label: "ETS-standard questions" },
            { num: "140", label: "Questions per mock test" },
            { num: "310–677", label: "Score range tracked" },
          ].map((stat) => (
            <div key={stat.num} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--color-primary-300)" }}>{stat.num}</div>
              <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCORE BANNER ──────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(90deg, rgba(124,58,237,0.12), rgba(168,85,247,0.08), rgba(124,58,237,0.12))",
        borderTop: "1px solid rgba(139,92,246,0.12)",
        borderBottom: "1px solid rgba(139,92,246,0.12)",
        padding: "20px 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          {[
            { section: "Section 1", name: "Listening Comprehension", q: "50 questions", time: "35 min", scale: "31–68" },
            { section: "Section 2", name: "Structure & Written Expression", q: "40 questions", time: "25 min", scale: "31–68" },
            { section: "Section 3", name: "Reading Comprehension", q: "50 questions", time: "55 min", scale: "31–67" },
          ].map((s) => (
            <div key={s.section} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                background: "linear-gradient(135deg, rgba(124,58,237,0.45), rgba(168,85,247,0.25))",
                border: "1px solid rgba(139,92,246,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: "var(--color-primary-300)",
              }}>{s.section.split(" ")[1]}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{s.q} · {s.time} · Scale {s.scale}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section id="features" style={{ padding: "96px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-primary-400)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>FEATURES</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
            Everything you need to score higher
          </h2>
          <p style={{ fontSize: 18, color: "var(--color-text-secondary)", maxWidth: 480, margin: "0 auto" }}>
            Built to mirror the real TOEFL ITP experience, with AI that explains every answer.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {([
            { icon: <HeadphonesIcon size={24} />, title: "Listening Comprehension", desc: "Part A short dialogues, Part B conversations, Part C academic lectures — with audio TTS and one-play restriction like the real test.", badge: "50 questions" },
            { icon: <ClipboardIcon size={24} />, title: "Structure & Written Expression", desc: "Sentence completion and error identification. Covers verb forms, clauses, parallel structure, pronouns — all 40 grammar rules tested by ETS.", badge: "40 questions" },
            { icon: <BookOpenIcon size={24} />, title: "Reading Comprehension", desc: "Academic passages 200-350 words. Main idea, vocabulary in context, inference, detail — with side-by-side passage and question layout.", badge: "50 questions" },
            { icon: <SparklesIcon size={24} />, title: "AI Tutor (Gemini)", desc: "Get instant, contextual explanations for every wrong answer. Ask follow-up questions about grammar rules, vocabulary, or test strategy.", badge: "Unlimited" },
            { icon: <BarChartIcon size={24} />, title: "Score Tracking", desc: "Exact ETS score formula (310–677 scale). Section breakdown charts, accuracy by topic, study streak calendar, and progress over time.", badge: "Real-time" },
            { icon: <BookmarkIcon size={24} />, title: "Vocabulary SRS", desc: "Spaced repetition flashcards with 500+ TOEFL academic words. SM-2 algorithm schedules reviews at optimal intervals for long-term retention.", badge: "500+ words" },
          ] as { icon: ReactNode; title: string; desc: string; badge: string }[]).map((f, i) => (
            <div
              key={f.title}
              data-reveal=""
              data-reveal-anim="up"
              data-delay={String(i * 80)}
              style={{
                padding: "28px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
              }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 48, height: 48, borderRadius: 12,
                  background: "rgba(124,58,237,0.12)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  color: "var(--color-primary-400)",
                  flexShrink: 0,
                }}>{f.icon}</div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)", color: "var(--color-primary-300)" }}>{f.badge}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 10, color: "var(--color-text-primary)" }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-text-secondary)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="how-it-works" style={{
        padding: "96px 24px",
        background: "linear-gradient(180deg, rgba(124,58,237,0.05) 0%, transparent 100%)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-primary-400)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>HOW IT WORKS</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 56 }}>
            From signup to target score in 4 steps
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, position: "relative" }}>
            {[
              { step: "01", title: "Set your target", desc: "Tell us your target score and test date. We calibrate difficulty to match." },
              { step: "02", title: "Practice by section", desc: "Do timed drills on Listening, Grammar, or Reading — or all three in sequence." },
              { step: "03", title: "Take mock tests", desc: "Full 140-question, 115-minute simulated exam with exact ETS timing." },
              { step: "04", title: "Review with AI", desc: "Every wrong answer gets an AI explanation. Ask follow-up questions instantly." },
            ].map((s, i) => (
              <div key={s.step} data-reveal="" data-reveal-anim="up" data-delay={String(i * 100)} style={{ position: "relative" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16, margin: "0 auto 20px",
                  background: i === 0
                    ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                    : "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800,
                  color: i === 0 ? "#fff" : "var(--color-text-muted)",
                  boxShadow: i === 0 ? "0 0 24px rgba(139,92,246,0.4)" : "none",
                }}>{s.step}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCORE GUIDE ───────────────────────────────────────── */}
      <section id="scores" style={{ padding: "96px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-primary-400)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>SCORE GUIDE</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginBottom: 16 }}>
            What does your TOEFL ITP score mean?
          </h2>
          <p style={{ color: "var(--color-text-secondary)", maxWidth: 480, margin: "0 auto" }}>
            Total score range: 310–677. Three sections averaged and scaled per ETS formula.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { range: "310 – 423", label: "Beginner", desc: "Basic English communication. Most universities require higher.", color: "#ef4444" },
            { range: "424 – 499", label: "Elementary", desc: "Some foundation. Conditional admission to some programs.", color: "#f59e0b" },
            { range: "500 – 542", label: "Intermediate", desc: "Meets many university English requirements globally.", color: "#7c3aed" },
            { range: "543 – 677", label: "Advanced", desc: "Meets requirements at most universities and scholarships.", color: "#22c55e" },
          ].map((level, i) => (
            <div key={level.range} data-reveal="" data-reveal-anim="scale" data-delay={String(i * 80)} style={{
              padding: "24px",
              borderRadius: 12,
              border: `1px solid ${level.color}33`,
              background: `${level.color}0d`,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)", color: level.color }}>{level.range}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "3px 10px",
                  borderRadius: 100, backgroundColor: `${level.color}25`, color: level.color,
                }}>{level.label}</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{level.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section style={{
        padding: "96px 24px 80px",
        textAlign: "center",
        background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.1))",
        borderTop: "1px solid rgba(139,92,246,0.1)",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px,5vw,56px)",
            fontWeight: 800, lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Ready to hit your
            <br />
            <span style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              target score?
            </span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--color-text-secondary)", marginBottom: 40, lineHeight: 1.7 }}>
            Join hundreds of Indonesian students preparing for TOEFL ITP. Free to start, no credit card required.
          </p>
          <Link href="/register" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "16px 36px", borderRadius: 12,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#fff", textDecoration: "none",
            fontSize: 18, fontWeight: 700,
            boxShadow: "0 4px 40px rgba(139,92,246,0.45)",
          }}>
            Create free account
          </Link>
          <div style={{ marginTop: 24, fontSize: 13, color: "var(--color-text-muted)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--color-primary-300)", textDecoration: "none", fontWeight: 600 }}>
              Sign in →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 24px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 12, color: "var(--color-text-muted)", lineHeight: 1.7 }}>
            This is an unofficial TOEFL ITP preparation platform. TOEFL® and TOEFL ITP® are registered trademarks of ETS.
            This platform is not affiliated with, authorized, or endorsed by ETS.
          </p>
          <div style={{ marginTop: 16, display: "flex", gap: 24, justifyContent: "center" }}>
            <Link href="/login" style={{ fontSize: 13, color: "var(--color-text-muted)", textDecoration: "none" }}>Sign in</Link>
            <Link href="/register" style={{ fontSize: 13, color: "var(--color-text-muted)", textDecoration: "none" }}>Create account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
