import { notFound } from "next/navigation";
import Link from "next/link";
import { getTopicBySlug } from "@/lib/data/grammarTopics";

interface Props {
  params: Promise<{ topic: string }>;
}

// Rule card
function RuleCard({ rule, index }: { rule: string; index: number }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
        alignItems: "flex-start",
        padding: "14px 16px",
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "var(--color-primary-600)",
          color: "var(--color-primary-200)",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-xs)",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {index + 1}
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {rule}
      </p>
    </div>
  );
}

// Tip box
function TipBox({ tip }: { tip: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
        padding: "12px 14px",
        backgroundColor: "rgba(245,158,11,0.08)",
        border: "1px solid rgba(245,158,11,0.25)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <span style={{ fontSize: "14px", flexShrink: 0 }}>💡</span>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {tip}
      </p>
    </div>
  );
}

// Mnemonic box
function MnemonicBox({ mnemonic }: { mnemonic: string }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        backgroundColor: "rgba(30,74,155,0.12)",
        border: "1px solid rgba(30,74,155,0.3)",
        borderRadius: "var(--radius-lg)",
        borderLeft: "4px solid var(--color-primary-500)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-xs)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--color-primary-300)",
          marginBottom: "6px",
        }}
      >
        🧠 Memory Trick
      </p>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          lineHeight: 1.6,
          margin: 0,
          fontStyle: "italic",
        }}
      >
        {mnemonic}
      </p>
    </div>
  );
}

// Example card
function ExampleCard({
  ex,
  index,
}: {
  ex: { sentence: string; correctAnswer: string; wrongAnswer?: string; explanation: string };
  index: number;
}) {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 600,
          marginBottom: "12px",
        }}
      >
        Example {index + 1}
      </p>

      {/* Sentence */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-base)",
          color: "var(--color-text-primary)",
          lineHeight: 1.75,
          marginBottom: "16px",
          fontStyle: "italic",
        }}
      >
        &ldquo;{ex.sentence}&rdquo;
      </p>

      {/* Correct / Wrong row */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
        <div
          style={{
            padding: "6px 14px",
            backgroundColor: "rgba(52,211,153,0.12)",
            border: "1px solid rgba(52,211,153,0.3)",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm)",
            color: "#34d399",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>✓</span>
          <strong>{ex.correctAnswer}</strong>
        </div>
        {ex.wrongAnswer && (
          <div
            style={{
              padding: "6px 14px",
              backgroundColor: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.25)",
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-sm)",
              color: "#f87171",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>✗</span>
            <s>{ex.wrongAnswer}</s>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div
        style={{
          padding: "12px 14px",
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-xs)",
            color: "var(--color-primary-300)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            marginBottom: "4px",
          }}
        >
          Why
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {ex.explanation}
        </p>
      </div>
    </div>
  );
}

const SECTION_HEADING = `&mdash;`;

export default async function TopicDetailPage({ params }: Props) {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  return (
    <div style={{ padding: "32px 24px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Back */}
      <Link
        href="/learn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text-muted)",
          textDecoration: "none",
          marginBottom: "24px",
        }}
      >
        ← Back to Learning Hub
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px" }}>
          <span style={{ fontSize: "36px" }}>{topic.icon}</span>
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-3xl)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                marginBottom: "4px",
              }}
            >
              {topic.title}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
              }}
            >
              {topic.subtitle}
            </p>
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.75,
            borderLeft: `4px solid ${topic.color}`,
            paddingLeft: "16px",
            margin: 0,
          }}
        >
          {topic.description}
        </p>
      </div>

      {/* Rules section */}
      <section style={{ marginBottom: "36px" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "16px",
          }}
        >
          📋 Key Rules
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {topic.rules.map((rule, i) => (
            <RuleCard key={i} rule={rule} index={i} />
          ))}
        </div>
      </section>

      {/* Memory trick */}
      {topic.mnemonic && (
        <div style={{ marginBottom: "36px" }}>
          <MnemonicBox mnemonic={topic.mnemonic} />
        </div>
      )}

      {/* Examples section */}
      <section style={{ marginBottom: "36px" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "16px",
          }}
        >
          ✏️ Worked Examples
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {topic.examples.map((ex, i) => (
            <ExampleCard key={i} ex={ex} index={i} />
          ))}
        </div>
      </section>

      {/* Tips section */}
      <section style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "16px",
          }}
        >
          💡 Quick Tips
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {topic.tips.map((tip, i) => (
            <TipBox key={i} tip={tip} />
          ))}
        </div>
      </section>

      {/* CTA — drill this topic */}
      <div
        style={{
          padding: "24px",
          background: `linear-gradient(135deg, ${topic.color}22 0%, ${topic.color}11 100%)`,
          border: `1px solid ${topic.color}44`,
          borderRadius: "var(--radius-xl)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
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
            Ready to practice?
          </h3>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            Drill questions on{" "}
            <em>{topic.title.toLowerCase()}</em> with real TOEFL ITP-style questions.
          </p>
        </div>
        <Link
          href={`/practice/drill/session?part=${topic.category === "reading" ? "reading" : topic.category === "written_expression" ? "written_expression" : "structure"}&topic=${topic.drillTag}&limit=20`}
          style={{
            padding: "10px 22px",
            backgroundColor: topic.color,
            color: "#fff",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          🎯 Drill This Topic
        </Link>
      </div>
    </div>
  );
}

// Generate static paths for all topics
export async function generateStaticParams() {
  const { grammarTopics } = await import("@/lib/data/grammarTopics");
  return grammarTopics.map((t) => ({ topic: t.slug }));
}
