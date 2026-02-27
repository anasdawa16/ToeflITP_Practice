import Link from "next/link";
import { grammarTopics, getTopicsByCategory } from "@/lib/data/grammarTopics";
import type { GrammarTopic } from "@/lib/data/grammarTopics";

function TopicCard({ topic }: { topic: GrammarTopic }) {
  const categoryLabel: Record<string, string> = {
    structure: "Structure",
    written_expression: "Written Expression",
    reading: "Reading",
  };

  return (
    <Link
      href={`/learn/${topic.slug}`}
      style={{
        display: "block",
        padding: "20px",
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
      {/* Category accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          backgroundColor: topic.color,
        }}
      />

      {/* Icon + category label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <span style={{ fontSize: "24px" }}>{topic.icon}</span>
        <span
          style={{
            padding: "2px 10px",
            backgroundColor: `${topic.color}22`,
            border: `1px solid ${topic.color}44`,
            borderRadius: "var(--radius-full)",
            color: topic.color,
            fontSize: "10px",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          }}
        >
          {categoryLabel[topic.category]}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-base)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          marginBottom: "4px",
        }}
      >
        {topic.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-muted)",
          marginBottom: "16px",
          lineHeight: 1.5,
        }}
      >
        {topic.subtitle}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
          }}
        >
          {topic.rules.length} rules · {topic.examples.length} examples
        </span>
        <span
          style={{
            fontSize: "var(--text-xs)",
            color: topic.color,
            fontFamily: "var(--font-ui)",
            fontWeight: 600,
          }}
        >
          Study →
        </span>
      </div>
    </Link>
  );
}

export default function LearnPage() {
  const structure = getTopicsByCategory("structure");
  const we = getTopicsByCategory("written_expression");
  const reading = getTopicsByCategory("reading");

  const groups = [
    { label: "Section 2 · Structure", icon: "🧱", topics: structure, color: "#1e4a9b" },
    { label: "Section 2 · Written Expression", icon: "✍️", topics: we, color: "#7c3aed" },
    { label: "Section 3 · Reading Comprehension", icon: "📖", topics: reading, color: "#0891b2" },
  ];

  return (
    <div style={{ padding: "32px 24px", maxWidth: "1024px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-3xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "8px",
          }}
        >
          Learning Hub
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
          }}
        >
          Master TOEFL ITP grammar with rule cards, examples, and mnemonics — then drill the topic.
        </p>
      </div>

      {/* Stats strip */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {[
          { label: "Topics", value: grammarTopics.length, icon: "📚" },
          { label: "Grammar Rules", value: grammarTopics.reduce((a, t) => a + t.rules.length, 0), icon: "📋" },
          { label: "Worked Examples", value: grammarTopics.reduce((a, t) => a + t.examples.length, 0), icon: "✏️" },
          { label: "Mnemonics", value: grammarTopics.filter((t) => t.mnemonic).length, icon: "🧠" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              padding: "14px 20px",
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "20px" }}>{s.icon}</span>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xl)",
                  fontWeight: 700,
                  color: "var(--color-primary-300)",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  fontWeight: 600,
                }}
              >
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Topic groups */}
      {groups.map((group) => (
        <div key={group.label} style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
              paddingBottom: "12px",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <span style={{ fontSize: "20px" }}>{group.icon}</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-lg)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              {group.label}
            </h2>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
                marginLeft: "auto",
              }}
            >
              {group.topics.length} topics
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {group.topics.map((topic) => (
              <TopicCard key={topic.slug} topic={topic} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
