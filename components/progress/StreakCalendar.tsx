"use client";

import { useMemo } from "react";
import { FlameIcon } from "@/components/ui/Icons";

interface CalendarDay {
  date: string;   // YYYY-MM-DD
  count: number;  // questions attempted
  minutes: number;
}

interface StreakCalendarProps {
  data: CalendarDay[];
  streak: number;
}

function getColor(count: number): string {
  if (count === 0) return "rgba(255,255,255,0.06)";
  if (count < 10) return "rgba(96,165,250,0.25)";
  if (count < 25) return "rgba(96,165,250,0.50)";
  if (count < 50) return "rgba(96,165,250,0.75)";
  return "#60a5fa";
}

export function StreakCalendar({ data, streak }: StreakCalendarProps) {
  // Build a map of date → activity
  const activityMap = useMemo(() => {
    const map = new Map<string, CalendarDay>();
    data.forEach((d) => map.set(d.date, d));
    return map;
  }, [data]);

  // Build last 90 days grid
  const days = useMemo(() => {
    const result: Array<{ date: string; dayObj: Date }> = [];
    for (let i = 89; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      result.push({ date: dateStr, dayObj: d });
    }
    return result;
  }, []);

  // Group by week (columns) for grid display
  const weeks = useMemo(() => {
    const w: Array<typeof days> = [];
    let current: typeof days = [];
    // Pad start to Monday alignment
    const firstDay = days[0].dayObj.getDay(); // 0=Sun
    for (let p = 0; p < firstDay; p++) current.push({ date: "", dayObj: new Date(0) });
    for (const d of days) {
      current.push(d);
      if (current.length === 7) { w.push(current); current = []; }
    }
    if (current.length > 0) { while (current.length < 7) current.push({ date: "", dayObj: new Date(0) }); w.push(current); }
    return w;
  }, [days]);

  const monthLabels = useMemo(() => {
    const labels: Array<{ month: string; weekIdx: number }> = [];
    let lastMonth = -1;
    weeks.forEach((week, wIdx) => {
      const firstReal = week.find((d) => d.date !== "");
      if (!firstReal) return;
      const m = firstReal.dayObj.getMonth();
      if (m !== lastMonth) {
        labels.push({ month: firstReal.dayObj.toLocaleString("en-US", { month: "short" }), weekIdx: wIdx });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  const DAYS = ["", "M", "", "W", "", "F", ""];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Streak badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "8px 16px",
          backgroundColor: streak > 0 ? "rgba(251,191,36,0.1)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${streak > 0 ? "rgba(251,191,36,0.3)" : "var(--color-border)"}`,
          borderRadius: "var(--radius-full)",
        }}>
          <span style={{ display: "flex", alignItems: "center" }}>{streak > 0 ? <FlameIcon size={18} style={{ color: "#fbbf24" }} /> : <span style={{ fontSize: "11px", letterSpacing: "0.05em", opacity: 0.4, color: "var(--color-text-muted)" }}>zzz</span>}</span>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: 700, color: streak > 0 ? "#fbbf24" : "var(--color-text-muted)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{streak}</div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>day streak</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {[
            { label: "Low", color: "rgba(96,165,250,0.25)" },
            { label: "Med", color: "rgba(96,165,250,0.5)" },
            { label: "High", color: "#60a5fa" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: l.color }} />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "10px", color: "var(--color-text-muted)" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div style={{ overflowX: "auto" }}>
        <div style={{ position: "relative" }}>
          {/* Month labels */}
          <div style={{ display: "flex", gap: "3px", marginBottom: "4px", paddingLeft: "20px" }}>
            {weeks.map((_, wIdx) => {
              const label = monthLabels.find((l) => l.weekIdx === wIdx);
              return (
                <div key={wIdx} style={{ width: "12px", flexShrink: 0, fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
                  {label?.month ?? ""}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: "0" }}>
            {/* Day labels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px", paddingTop: "0", marginRight: "4px", width: "14px" }}>
              {DAYS.map((d, i) => (
                <div key={i} style={{ height: "12px", fontFamily: "var(--font-ui)", fontSize: "9px", color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center" }}>{d}</div>
              ))}
            </div>

            {/* Weeks */}
            <div style={{ display: "flex", gap: "3px" }}>
              {weeks.map((week, wIdx) => (
                <div key={wIdx} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  {week.map((day, dIdx) => {
                    if (!day.date) return <div key={dIdx} style={{ width: "12px", height: "12px" }} />;
                    const activity = activityMap.get(day.date);
                    const count = activity?.count ?? 0;
                    const mins = activity?.minutes ?? 0;
                    const isToday = day.date === new Date().toISOString().split("T")[0];
                    return (
                      <div
                        key={dIdx}
                        title={`${day.date}: ${count} questions${mins > 0 ? `, ${mins} min` : ""}`}
                        style={{
                          width: "12px", height: "12px",
                          borderRadius: "2px",
                          backgroundColor: getColor(count),
                          outline: isToday ? "1.5px solid #60a5fa" : "none",
                          cursor: count > 0 ? "pointer" : "default",
                          transition: "transform 80ms ease",
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
