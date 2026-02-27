"use client";

import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip,
} from "recharts";

interface RadarPoint {
  subject: string;
  score: number;
  fullMark: number;
}

interface AccuracyRadarProps {
  topicAccuracy: {
    structure: number;
    written_expression: number;
    vocab: number;
    inference: number;
    main_idea: number;
  };
  /** S2 accuracy % from all-time attempts */
  s2Accuracy?: number;
  /** S3 accuracy % from all-time attempts */
  s3Accuracy?: number;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: RadarPoint }> }) => {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div style={{
      backgroundColor: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)", padding: "10px 14px",
      fontFamily: "var(--font-ui)", boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    }}>
      <p style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>{p.subject}</p>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-primary-300)", fontVariantNumeric: "tabular-nums" }}>
        {p.score}% accuracy
      </p>
    </div>
  );
};

export function AccuracyRadar({ topicAccuracy, s2Accuracy = 0, s3Accuracy = 0 }: AccuracyRadarProps) {
  // Combine into radar data points
  const data: RadarPoint[] = [
    { subject: "Structure", score: topicAccuracy.structure || s2Accuracy, fullMark: 100 },
    { subject: "Written Expr.", score: topicAccuracy.written_expression || s2Accuracy, fullMark: 100 },
    { subject: "Vocabulary", score: topicAccuracy.vocab || s3Accuracy, fullMark: 100 },
    { subject: "Inference", score: topicAccuracy.inference || s3Accuracy, fullMark: 100 },
    { subject: "Main Idea", score: topicAccuracy.main_idea || s3Accuracy, fullMark: 100 },
  ];

  const hasData = data.some((d) => d.score > 0);

  if (!hasData) {
    return (
      <div style={{ height: "240px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px", marginBottom: "8px" }}>🕸️</p>
          <p>Practice more to see your skill radar</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
        <PolarGrid stroke="rgba(255,255,255,0.08)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "var(--font-ui)" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Radar
          name="Accuracy"
          dataKey="score"
          stroke="#60a5fa"
          fill="#60a5fa"
          fillOpacity={0.18}
          strokeWidth={2}
          dot={{ fill: "#60a5fa", r: 4 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
