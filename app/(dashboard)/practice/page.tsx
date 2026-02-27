import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { GridIcon, PencilIcon, BookOpenIcon, TargetIcon, HeadphonesIcon } from "@/components/ui/Icons";

interface SectionCard {
  href: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  color: string;
  total: number;
}

async function getQuestionCounts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("questions")
    .select("section, part")
    .eq("is_active", true);

  const s1Listening = data?.filter((q) => q.section === 1).length ?? 0;
  const s2Structure = data?.filter((q) => q.section === 2 && q.part === "structure").length ?? 0;
  const s2WE = data?.filter((q) => q.section === 2 && q.part === "written_expression").length ?? 0;
  const s3Reading = data?.filter((q) => q.section === 3).length ?? 0;

  return { s1Listening, s2Structure, s2WE, s3Reading };
}

export default async function PracticePage() {
  const counts = await getQuestionCounts();

  const sections: SectionCard[] = [
    {
      href: "/practice/listening",
      title: "Listening Comprehension",
      subtitle: "Section 1",
      icon: <HeadphonesIcon size={28} />,
      color: "#8b5cf6",
      total: counts.s1Listening,
    },
    {
      href: "/practice/structure",
      title: "Structure",
      subtitle: "Section 2 Part A",
      icon: <GridIcon size={28} />,
      color: "var(--color-primary-500)",
      total: counts.s2Structure,
    },
    {
      href: "/practice/written-expression",
      title: "Written Expression",
      subtitle: "Section 2 Part B",
      icon: <PencilIcon size={28} />,
      color: "#7c3aed",
      total: counts.s2WE,
    },
    {
      href: "/practice/reading",
      title: "Reading Comprehension",
      subtitle: "Section 3",
      icon: <BookOpenIcon size={28} />,
      color: "#0891b2",
      total: counts.s3Reading,
    },
  ];

  return (
    <div style={{ padding: "32px 24px", maxWidth: "960px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-3xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "8px",
          }}
        >
          Practice
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
          }}
        >
          Choose a section to drill. Each session randomly selects questions from the bank.
        </p>
      </div>

      {/* Section cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{
              display: "block",
              padding: "28px",
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              textDecoration: "none",
              transition: "border-color 200ms, transform 200ms",
              position: "relative",
              overflow: "hidden",
            }}
            className="practice-card"
          >
            {/* Accent bar top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                backgroundColor: s.color,
                borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
              }}
            />

            <div style={{ marginBottom: "16px", color: s.color }}>{s.icon}</div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                marginBottom: "4px",
              }}
            >
              {s.title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
                marginBottom: "20px",
              }}
            >
              {s.subtitle}
            </p>

            {/* Question count */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {s.total} questions
              </span>
              <span
                style={{
                  padding: "6px 14px",
                  backgroundColor: s.color,
                  color: "#fff",
                  borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                }}
              >
                Practice →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Topic Drill highlight card */}
      <div
        style={{
          marginTop: "24px",
          padding: "24px 28px",
          background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(168,85,247,0.1) 100%)",
          border: "1px solid rgba(124,58,237,0.3)",
          borderRadius: "var(--radius-xl)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ color: "var(--color-primary-400)" }}><TargetIcon size={32} /></span>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-lg)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                marginBottom: "4px",
              }}
            >
              Topic Drill
            </h3>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                margin: 0,
              }}
            >
              Filter by grammar topic, section, and difficulty. Target your weak areas.
            </p>
          </div>
        </div>
        <Link
          href="/practice/drill"
          style={{
            padding: "10px 22px",
            backgroundColor: "var(--color-primary-500)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Configure Drill →
        </Link>
      </div>

      <div style={{ marginTop: "48px" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: "16px",
          }}
        >
          Quick Sessions
        </h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { label: "Listening Practice", href: "/practice/listening" },
            { label: "10 Structure Q's", href: "/practice/structure?limit=10" },
            { label: "10 Written Expression Q's", href: "/practice/written-expression?limit=10" },
            { label: "1 Reading Passage", href: "/practice/reading?limit=1" },
            { label: "Custom Drill", href: "/practice/drill" },
          ].map((q) => (
            <Link
              key={q.href}
              href={q.href}
              style={{
                padding: "8px 18px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                textDecoration: "none",
                transition: "border-color 150ms, color 150ms",
              }}
            >
              {q.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
