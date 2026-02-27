"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

/* ------------------------------------------------------------------
   TYPES
   ------------------------------------------------------------------ */
type Level = "beginner" | "intermediate" | "advanced";
type Step = 1 | 2 | 3;

interface OnboardingData {
  level: Level | null;
  testDate: string | null;
  targetScore: number;
}

const SCORE_PRESETS = [500, 550, 600, 650] as const;

/* ------------------------------------------------------------------
   STEP INDICATOR
   ------------------------------------------------------------------ */
function StepIndicator({ current, total }: { current: Step; total: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginBottom: "40px" }}>
      {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
        <div key={step} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: step === current ? "32px" : "28px",
              height: step === current ? "32px" : "28px",
              borderRadius: "50%",
              backgroundColor: step < current
                ? "var(--color-success)"
                : step === current
                  ? "var(--color-primary-500)"
                  : "var(--color-bg-tertiary)",
              border: step === current
                ? "2px solid var(--color-primary-300)"
                : "2px solid transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: step <= current ? "#fff" : "var(--color-text-muted)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              fontFamily: "var(--font-ui)",
              transition: "all 300ms ease",
              flexShrink: 0,
            }}
          >
            {step < current ? "✓" : step}
          </div>
          {step < total && (
            <div style={{ width: "32px", height: "2px", backgroundColor: step < current ? "var(--color-success)" : "var(--color-border)", borderRadius: "1px", transition: "background-color 300ms ease" }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   STEP 1 — Current Level
   ------------------------------------------------------------------ */
function Step1({
  value,
  onChange,
}: {
  value: Level | null;
  onChange: (v: Level) => void;
}) {
  const options: Array<{ value: Level; label: string; description: string; icon: string }> = [
    { value: "beginner", label: "Beginner", description: "I'm just starting with TOEFL preparation", icon: "🌱" },
    { value: "intermediate", label: "Some Experience", description: "I've studied before or scored below 500", icon: "📖" },
    { value: "advanced", label: "Advanced", description: "I'm aiming for 550+ and need fine-tuning", icon: "🎯" },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
        What&apos;s your current level?
      </h2>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginBottom: "28px", fontFamily: "var(--font-ui)" }}>
        This helps us personalize your study plan.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px 20px",
              backgroundColor: value === opt.value ? "rgba(124,58,237,0.15)" : "var(--color-bg-secondary)",
              border: value === opt.value ? `2px solid var(--color-primary-400)` : "2px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 200ms ease",
              width: "100%",
            }}
            onMouseEnter={(e) => { if (value !== opt.value) e.currentTarget.style.borderColor = "var(--color-primary-600)"; }}
            onMouseLeave={(e) => { if (value !== opt.value) e.currentTarget.style.borderColor = "var(--color-border)"; }}
          >
            <span style={{ fontSize: "1.75rem" }}>{opt.icon}</span>
            <div>
              <p style={{ fontSize: "var(--text-base)", fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "var(--font-ui)", margin: 0 }}>
                {opt.label}
              </p>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)", margin: 0, marginTop: "2px" }}>
                {opt.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   STEP 2 — Test Date
   ------------------------------------------------------------------ */
function Step2({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const [notSure, setNotSure] = useState(value === "not_sure");

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
        When is your test date?
      </h2>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginBottom: "28px", fontFamily: "var(--font-ui)" }}>
        We&apos;ll create a study schedule to fit your timeline.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label htmlFor="test_date" style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "8px", fontFamily: "var(--font-ui)" }}>
            Select your test date
          </label>
          <input
            id="test_date"
            type="date"
            disabled={notSure}
            value={!notSure && value ? value : ""}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => onChange(e.target.value || null)}
            style={{
              width: "100%",
              padding: "10px 14px",
              backgroundColor: notSure ? "var(--color-bg-tertiary)" : "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              color: notSure ? "var(--color-text-muted)" : "var(--color-text-primary)",
              fontSize: "var(--text-base)",
              fontFamily: "var(--font-ui)",
              outline: "none",
              colorScheme: "dark",
              cursor: notSure ? "not-allowed" : "pointer",
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            const next = !notSure;
            setNotSure(next);
            onChange(next ? "not_sure" : null);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 16px",
            backgroundColor: notSure ? "rgba(124,58,237,0.12)" : "var(--color-bg-secondary)",
            border: notSure ? "2px solid var(--color-primary-400)" : "2px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-text-secondary)",
            fontSize: "var(--text-sm)",
            fontFamily: "var(--font-ui)",
            cursor: "pointer",
            transition: "all 200ms ease",
          }}
        >
          <span style={{ fontSize: "1.25rem" }}>🤔</span>
          I&apos;m not sure yet — I&apos;ll set it later
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   STEP 3 — Target Score
   ------------------------------------------------------------------ */
function Step3({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  function getScoreBand(score: number): string {
    if (score < 400) return "Beginning";
    if (score < 480) return "Elementary";
    if (score < 540) return "Intermediate";
    if (score < 590) return "High Intermediate";
    if (score < 640) return "Advanced";
    return "Superior";
  }

  function getBandColor(score: number): string {
    if (score < 400) return "#94a3b8";
    if (score < 480) return "#60a5fa";
    if (score < 540) return "#34d399";
    if (score < 590) return "#a78bfa";
    if (score < 640) return "var(--color-accent-300)";
    return "#f472b6";
  }

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
        What&apos;s your target score?
      </h2>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginBottom: "28px", fontFamily: "var(--font-ui)" }}>
        TOEFL ITP scores range from 310 to 677.
      </p>

      {/* Score display */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-5xl)", fontWeight: 700, color: getBandColor(value), transition: "color 200ms ease", lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: "var(--text-sm)", color: getBandColor(value), fontFamily: "var(--font-ui)", fontWeight: 600, marginTop: "8px", transition: "color 200ms ease" }}>
          {getScoreBand(value)} Level
        </div>
      </div>

      {/* Slider */}
      <div style={{ marginBottom: "24px" }}>
        <input
          type="range"
          min={310}
          max={677}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ width: "100%", cursor: "pointer", accentColor: "var(--color-primary-400)" }}
          aria-label="Target TOEFL ITP score"
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontFamily: "var(--font-ui)", marginTop: "4px" }}>
          <span>310</span>
          <span>677</span>
        </div>
      </div>

      {/* Quick presets */}
      <div>
        <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontFamily: "var(--font-ui)", marginBottom: "10px", fontWeight: 500 }}>
          QUICK SELECT
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {SCORE_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              style={{
                padding: "8px 18px",
                backgroundColor: value === preset ? "var(--color-primary-500)" : "var(--color-bg-secondary)",
                border: `1px solid ${value === preset ? "var(--color-primary-400)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-full)",
                color: value === preset ? "#fff" : "var(--color-text-secondary)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                fontFamily: "var(--font-ui)",
                cursor: "pointer",
                transition: "all 200ms ease",
              }}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   MAIN ONBOARDING PAGE
   ------------------------------------------------------------------ */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<OnboardingData>({
    level: null,
    testDate: null,
    targetScore: 550,
  });

  function canProceed(): boolean {
    if (step === 1) return data.level !== null;
    if (step === 2) return data.testDate !== null;
    return true;
  }

  function handleNext() {
    if (step < 3) setStep((s) => (s + 1) as Step);
  }

  function handleBack() {
    if (step > 1) setStep((s) => (s - 1) as Step);
  }

  function handleComplete() {
    setError(null);
    startTransition(async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const testDate =
          data.testDate && data.testDate !== "not_sure" ? data.testDate : null;

        // data.level is guaranteed non-null here (Step 1 required; canProceed validates)
        const level = data.level as "beginner" | "intermediate" | "advanced";

        type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
        const updatePayload: ProfileUpdate = {
          current_level: level,
          test_date: testDate,
          target_score: data.targetScore,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        };

        const { error: updateError } = await supabase
          .from("profiles")
          .update(updatePayload)
          .eq("id", user.id);

        if (updateError) throw updateError;

        router.push("/");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "520px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
            Let&apos;s personalize your experience
          </h1>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)" }}>
            3 quick questions to build your study plan
          </p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "36px", boxShadow: "var(--shadow-xl)" }}>
          <StepIndicator current={step} total={3} />

          {/* Step Content */}
          <div className="animate-fade-in">
            {step === 1 && (
              <Step1
                value={data.level}
                onChange={(v) => setData((d) => ({ ...d, level: v }))}
              />
            )}
            {step === 2 && (
              <Step2
                value={data.testDate}
                onChange={(v) => setData((d) => ({ ...d, testDate: v }))}
              />
            )}
            {step === 3 && (
              <Step3
                value={data.targetScore}
                onChange={(v) => setData((d) => ({ ...d, targetScore: v }))}
              />
            )}
          </div>

          {/* Error */}
          {error && (
            <div role="alert" style={{ marginTop: "20px", padding: "12px 16px", backgroundColor: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.35)", borderRadius: "var(--radius-md)", color: "#fca5a5", fontSize: "var(--text-sm)", fontFamily: "var(--font-ui)" }}>
              {error}
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "36px" }}>
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              style={{
                padding: "10px 20px",
                backgroundColor: "transparent",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                color: step === 1 ? "var(--color-text-muted)" : "var(--color-text-secondary)",
                fontSize: "var(--text-sm)",
                fontFamily: "var(--font-ui)",
                cursor: step === 1 ? "not-allowed" : "pointer",
                transition: "all 200ms ease",
                fontWeight: 500,
              }}
            >
              ← Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                style={{
                  padding: "10px 28px",
                  backgroundColor: canProceed() ? "var(--color-primary-500)" : "var(--color-bg-tertiary)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  color: canProceed() ? "#fff" : "var(--color-text-muted)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  fontFamily: "var(--font-ui)",
                  cursor: canProceed() ? "pointer" : "not-allowed",
                  transition: "all 200ms ease",
                }}
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                disabled={isPending}
                style={{
                  padding: "10px 28px",
                  backgroundColor: isPending ? "var(--color-primary-600)" : "var(--color-primary-500)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  color: "#fff",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  fontFamily: "var(--font-ui)",
                  cursor: isPending ? "not-allowed" : "pointer",
                  transition: "all 200ms ease",
                }}
                onMouseEnter={(e) => { if (!isPending) e.currentTarget.style.backgroundColor = "var(--color-primary-400)"; }}
                onMouseLeave={(e) => { if (!isPending) e.currentTarget.style.backgroundColor = "var(--color-primary-500)"; }}
              >
                {isPending ? "Saving…" : "🚀 Start studying"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
