import { DrillSetup } from "@/components/test/DrillSetup";

export default function DrillPage() {
  return (
    <div style={{ padding: "32px 24px" }}>
      {/* Header */}
      <div style={{ maxWidth: "640px", margin: "0 auto 36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <span style={{ fontSize: "28px" }}>🎯</span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            Topic Drill
          </h1>
        </div>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
          }}
        >
          Target your weak areas. Filter by grammar topic, section, and difficulty — then drill.
        </p>
      </div>

      <DrillSetup />
    </div>
  );
}
