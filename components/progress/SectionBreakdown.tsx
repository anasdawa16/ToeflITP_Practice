"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface TopicBar {
  name: string;
  accuracy: number;
  section: string;
}

interface SectionBreakdownProps {
  topicAccuracy: {
    structure: number;
    written_expression: number;
    vocab: number;
    inference: number;
    main_idea: number;
  };
  s2Accuracy: number;
  s3Accuracy: number;
}

const CustomBar = (props: { x?: number; y?: number; width?: number; height?: number; value?: number }) => {
  const { x = 0, y = 0, width = 0, height = 0, value = 0 } = props;
  const color = value >= 80 ? "#34d399" : value >= 60 ? "#60a5fa" : value >= 40 ? "#fbbf24" : "#f87171";
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={color} rx={3} ry={3} />
      <text x={x + width + 6} y={y + height / 2 + 4} fill={color} fontSize={11} fontFamily="var(--font-ui)" fontWeight={700}>
        {value}%
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  const grade = v >= 80 ? "Strong" : v >= 60 ? "Good" : v >= 40 ? "Needs Work" : "Weak";
  return (
    <div style={{
      backgroundColor: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)", padding: "10px 14px",
      fontFamily: "var(--font-ui)", boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    }}>
      <p style={{ fontWeight: 700, color: "var(--color-text-primary)", fontSize: "var(--text-xs)", marginBottom: "4px" }}>{label}</p>
      <p style={{ fontSize: "var(--text-sm)", color: v >= 80 ? "#34d399" : v >= 60 ? "#60a5fa" : v >= 40 ? "#fbbf24" : "#f87171" }}>
        {v}% — {grade}
      </p>
    </div>
  );
};

export function SectionBreakdown({ topicAccuracy, s2Accuracy, s3Accuracy }: SectionBreakdownProps) {
  const bars: TopicBar[] = [
    { name: "Structure", accuracy: topicAccuracy.structure || s2Accuracy, section: "S2" },
    { name: "Written Expr.", accuracy: topicAccuracy.written_expression || s2Accuracy, section: "S2" },
    { name: "Vocabulary", accuracy: topicAccuracy.vocab || s3Accuracy, section: "S3" },
    { name: "Inference", accuracy: topicAccuracy.inference || s3Accuracy, section: "S3" },
    { name: "Main Idea", accuracy: topicAccuracy.main_idea || s3Accuracy, section: "S3" },
  ];

  const hasData = bars.some((b) => b.accuracy > 0);

  if (!hasData) {
    return (
      <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px", marginBottom: "8px" }}>📊</p>
          <p>Practice questions to see topic accuracy</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Legend */}
      <div style={{ display: "flex", gap: "16px" }}>
        {[
          { range: "80–100%", label: "Strong", color: "#34d399" },
          { range: "60–79%", label: "Good", color: "#60a5fa" },
          { range: "40–59%", label: "Needs Work", color: "#fbbf24" },
          { range: "<40%", label: "Weak", color: "#f87171" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: l.color }} />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>{l.label}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={190}>
        <BarChart data={bars} layout="vertical" margin={{ top: 0, right: 50, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category" dataKey="name" width={90}
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "var(--font-ui)" }}
            axisLine={false} tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} shape={<CustomBar />} barSize={18}>
            {bars.map((entry, idx) => {
              const c = entry.accuracy >= 80 ? "#34d399" : entry.accuracy >= 60 ? "#60a5fa" : entry.accuracy >= 40 ? "#fbbf24" : "#f87171";
              return <Cell key={idx} fill={c} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
