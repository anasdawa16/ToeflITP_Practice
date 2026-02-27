"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// All topic tags across S2 and S3 questions
const TOPIC_GROUPS: Record<string, { label: string; tags: string[] }> = {
  "S2 · Structure — Clauses": {
    label: "Clauses",
    tags: ["noun_clause", "relative_clause", "adverbial_clause", "reduced_clause"],
  },
  "S2 · Structure — Sentence Patterns": {
    label: "Sentence Patterns",
    tags: ["inverted_structure", "parallel_structure", "conditional", "correlatives", "appositives"],
  },
  "S2 · Structure — Verb & Comparison": {
    label: "Verb & Comparison",
    tags: ["comparison", "gerund_infinitive", "cleft_sentence"],
  },
  "S2 · Written Expression — Errors": {
    label: "Written Expression",
    tags: [
      "verb_agreement",
      "verb_tense",
      "word_form",
      "pronoun_reference",
      "parallel_structure",
      "preposition",
      "comparison",
    ],
  },
  "S3 · Reading — Question Types": {
    label: "Reading Skills",
    tags: ["main_idea", "detail", "vocabulary_in_context", "inference", "organization", "author_purpose"],
  },
};

const PARTS = [
  { value: "all", label: "All S2 Questions" },
  { value: "structure", label: "Section 2 · Structure" },
  { value: "written_expression", label: "Section 2 · Written Expression" },
  { value: "reading", label: "Section 3 · Reading" },
];

const DIFFICULTIES = [
  { value: "0", label: "Any Difficulty" },
  { value: "1", label: "⭐ Easy (1)" },
  { value: "2", label: "⭐⭐ Medium-Low (2)" },
  { value: "3", label: "⭐⭐⭐ Medium (3)" },
  { value: "4", label: "⭐⭐⭐⭐ Hard (4)" },
  { value: "5", label: "⭐⭐⭐⭐⭐ Expert (5)" },
];

const COUNTS = [
  { value: "10", label: "10 Questions" },
  { value: "20", label: "20 Questions" },
  { value: "40", label: "40 Questions" },
];

interface DrillForm {
  part: string;
  topic: string;
  difficulty: string;
  count: string;
}

// -------- sub-components --------

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-xs)",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--color-text-muted)",
        marginBottom: "10px",
      }}
    >
      {children}
    </p>
  );
}

function ChipGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value as T)}
            style={{
              padding: "7px 14px",
              borderRadius: "var(--radius-md)",
              border: active
                ? "1.5px solid var(--color-primary-500)"
                : "1.5px solid var(--color-border)",
              backgroundColor: active
                ? "rgba(124,58,237,0.2)"
                : "rgba(255,255,255,0.03)",
              color: active
                ? "var(--color-primary-300)"
                : "var(--color-text-secondary)",
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-sm)",
              fontWeight: active ? 600 : 400,
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// Topic picker: shows group headers + nestd tags
function TopicPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {/* "Any topic" option */}
      <button
        type="button"
        onClick={() => onChange("")}
        style={{
          padding: "8px 14px",
          borderRadius: "var(--radius-md)",
          border: value === "" ? "1.5px solid var(--color-primary-500)" : "1.5px solid var(--color-border)",
          backgroundColor: value === "" ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)",
          color: value === "" ? "var(--color-primary-300)" : "var(--color-text-secondary)",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-sm)",
          fontWeight: value === "" ? 600 : 400,
          cursor: "pointer",
          textAlign: "left",
          transition: "all 150ms ease",
        }}
      >
        🎲 Any Topic (Random)
      </button>

      {/* Grouped tags */}
      {Object.entries(TOPIC_GROUPS).map(([groupKey, group]) => (
        <div key={groupKey}>
          <button
            type="button"
            onClick={() => setOpenGroup(openGroup === groupKey ? null : groupKey)}
            style={{
              width: "100%",
              padding: "8px 14px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--color-border)",
              backgroundColor: "rgba(255,255,255,0.02)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-sm)",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 150ms ease",
            }}
          >
            <span>{groupKey}</span>
            <span style={{ fontSize: "10px" }}>{openGroup === groupKey ? "▲" : "▼"}</span>
          </button>

          {openGroup === groupKey && (
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", padding: "8px 4px" }}>
              {group.tags.map((tag) => {
                const active = value === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onChange(tag)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "var(--radius-full)",
                      border: active ? "1.5px solid var(--color-primary-400)" : "1.5px solid var(--color-border)",
                      backgroundColor: active ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.03)",
                      color: active ? "var(--color-primary-300)" : "var(--color-text-muted)",
                      fontFamily: "var(--font-ui)",
                      fontSize: "var(--text-xs)",
                      fontWeight: active ? 600 : 400,
                      cursor: "pointer",
                      textDecoration: "none",
                      transition: "all 150ms ease",
                    }}
                  >
                    {tag.replace(/_/g, " ")}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// -------- Main export --------

export function DrillSetup() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [form, setForm] = useState<DrillForm>({
    part: "structure",
    topic: "",
    difficulty: "0",
    count: "20",
  });

  function set<K extends keyof DrillForm>(key: K, val: DrillForm[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handleStart() {
    const params = new URLSearchParams();
    if (form.part !== "all") params.set("part", form.part);
    if (form.topic) params.set("topic", form.topic);
    if (form.difficulty !== "0") params.set("difficulty", form.difficulty);
    params.set("limit", form.count);
    startTransition(() => {
      router.push(`/practice/drill/session?${params.toString()}`);
    });
  }

  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      {/* Section / Part */}
      <div>
        <Label>1 · Choose Section / Part</Label>
        <ChipGroup<string>
          options={PARTS}
          value={form.part}
          onChange={(v) => set("part", v)}
        />
      </div>

      {/* Topic */}
      <div>
        <Label>2 · Choose Grammar Topic</Label>
        <TopicPicker value={form.topic} onChange={(v) => set("topic", v)} />
      </div>

      {/* Difficulty */}
      <div>
        <Label>3 · Difficulty Level</Label>
        <ChipGroup<string>
          options={DIFFICULTIES}
          value={form.difficulty}
          onChange={(v) => set("difficulty", v)}
        />
      </div>

      {/* Count */}
      <div>
        <Label>4 · Number of Questions</Label>
        <ChipGroup<string>
          options={COUNTS}
          value={form.count}
          onChange={(v) => set("count", v)}
        />
      </div>

      {/* Submit */}
      <div style={{ paddingTop: "8px" }}>
        {/* Config summary */}
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-muted)",
            marginBottom: "16px",
            fontStyle: "italic",
          }}
        >
          {form.count} questions ·{" "}
          {PARTS.find((p) => p.value === form.part)?.label ?? "All S2"} ·{" "}
          {form.topic ? form.topic.replace(/_/g, " ") : "any topic"} ·{" "}
          {form.difficulty === "0" ? "any difficulty" : `difficulty ${form.difficulty}`}
        </p>

        <button
          type="button"
          disabled={pending}
          onClick={handleStart}
          style={{
            padding: "13px 36px",
            backgroundColor: "var(--color-primary-500)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-base)",
            fontWeight: 700,
            cursor: pending ? "default" : "pointer",
            opacity: pending ? 0.7 : 1,
            transition: "all 180ms ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {pending ? (
            <>⏳ Loading…</>
          ) : (
            <>🎯 Start Drill</>
          )}
        </button>
      </div>
    </div>
  );
}
