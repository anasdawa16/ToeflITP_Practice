import Link from "next/link";
import { grammarTopics, getTopicsByCategory } from "@/lib/data/grammarTopics";
import { listeningTopics } from "@/lib/data/listeningTopics";
import type { GrammarTopic } from "@/lib/data/grammarTopics";
import {
  HeadphonesIcon,
  MessagesIcon,
  BookOpenIcon,
  SparklesIcon,
  BookIcon,
  LayersIcon,
  GridIcon,
  PencilIcon,
  FileTextIcon,
  GraduationCapIcon,
  TargetIcon,
  ClipboardIcon,
  BrainIcon,
  ListIcon,
} from "@/components/ui/Icons";

const ICON_MAP: Record<string, React.ReactNode> = {
  messages: <MessagesIcon size={22} />,
  users: <HeadphonesIcon size={22} />,
  graduation: <GraduationCapIcon size={22} />,
  sparkles: <SparklesIcon size={22} />,
  book: <BookIcon size={22} />,
  layers: <LayersIcon size={22} />,
};

function TopicCard({ topic }: { topic: GrammarTopic }) {
  const categoryLabel: Record<string, string> = {
    listening: "Listening",
    structure: "Structure",
    written_expression: "Written Expression",
    reading: "Reading",
  };

  const iconNode = ICON_MAP[topic.icon] || (
    <span style={{ fontSize: "22px", lineHeight: 1 }}>{topic.icon}</span>
  );

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
        <span style={{ color: topic.color, display: "flex", alignItems: "center" }}>{iconNode}</span>
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
  const allTopics = [...listeningTopics, ...grammarTopics];
  const listening = listeningTopics;
  const structure = getTopicsByCategory("structure");
  const we = getTopicsByCategory("written_expression");
  const reading = getTopicsByCategory("reading");

  const groups = [
    { label: "Section 1 · Listening Comprehension", icon: <HeadphonesIcon size={20} />, topics: listening, color: "#8b5cf6" },
    { label: "Section 2 · Structure", icon: <GridIcon size={20} />, topics: structure, color: "#7c3aed" },
    { label: "Section 2 · Written Expression", icon: <PencilIcon size={20} />, topics: we, color: "#7c3aed" },
    { label: "Section 3 · Reading Comprehension", icon: <BookOpenIcon size={20} />, topics: reading, color: "#0891b2" },
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
          Master all three TOEFL ITP sections with strategy cards, worked examples, and mnemonics.
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
          { label: "Topics", value: allTopics.length, icon: <ClipboardIcon size={20} /> },
          { label: "Strategy Rules", value: allTopics.reduce((a, t) => a + t.rules.length, 0), icon: <ListIcon size={20} /> },
          { label: "Worked Examples", value: allTopics.reduce((a, t) => a + t.examples.length, 0), icon: <FileTextIcon size={20} /> },
          { label: "Mnemonics", value: allTopics.filter((t) => t.mnemonic).length, icon: <BrainIcon size={20} /> },
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
            <span style={{ color: "var(--color-primary-400)", display: "flex", alignItems: "center" }}>{s.icon}</span>
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
            <span style={{ color: group.color, display: "flex", alignItems: "center" }}>{group.icon}</span>
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
