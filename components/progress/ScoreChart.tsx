"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";

interface ScorePoint {
  date: string;
  total: number;
  s2: number;
  s3: number;
}

interface ScoreChartProps {
  data: ScorePoint[];
  targetScore?: number;
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; color: string; name: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      backgroundColor: "var(--color-bg-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-lg)",
      padding: "12px 16px",
      fontFamily: "var(--font-ui)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    }}>
      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</p>
      {payload.map((p) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: p.color }} />
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", minWidth: "70px" }}>{p.name}</span>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--color-text-primary)", fontVariantNumeric: "tabular-nums" }}>
            {p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export function ScoreChart({ data, targetScore = 550 }: ScoreChartProps) {
  if (!data || data.length === 0) {
    return (
      <div style={{ height: "220px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px", marginBottom: "8px" }}>📈</p>
          <p>Complete a mock test to see your score history</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "var(--font-ui)" }}
          axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
          tickLine={false}
        />
        <YAxis
          domain={[310, 680]}
          tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "var(--font-ui)" }}
          axisLine={false}
          tickLine={false}
          tickCount={5}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }} />
        <Legend
          wrapperStyle={{ fontSize: "11px", fontFamily: "var(--font-ui)", color: "rgba(255,255,255,0.4)", paddingTop: "8px" }}
        />

        {/* Target score reference line */}
        <ReferenceLine
          y={targetScore} stroke="rgba(251,191,36,0.5)" strokeDasharray="6 3"
          label={{ value: `Target ${targetScore}`, position: "right", fill: "#fbbf24", fontSize: 10, fontFamily: "var(--font-ui)" }}
        />

        {/* Total score — primary */}
        <Line
          type="monotone" dataKey="total" name="Total Score"
          stroke="#60a5fa" strokeWidth={2.5} dot={{ fill: "#60a5fa", r: 4, strokeWidth: 0 }}
          activeDot={{ r: 6, strokeWidth: 2, stroke: "var(--color-bg-surface)" }}
        />
        {/* S2 */}
        <Line
          type="monotone" dataKey="s2" name="Section 2"
          stroke="#34d399" strokeWidth={1.5} dot={false} strokeDasharray="4 2"
        />
        {/* S3 */}
        <Line
          type="monotone" dataKey="s3" name="Section 3"
          stroke="#a78bfa" strokeWidth={1.5} dot={false} strokeDasharray="4 2"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
