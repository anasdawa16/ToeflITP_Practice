import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { TargetIcon, ClipboardIcon } from "@/components/ui/Icons";

interface PastSession {
  id: string;
  test_type: string;
  status: string;
  total_scaled_score: number | null;
  s2_scaled_score: number | null;
  s3_scaled_score: number | null;
  started_at: string;
  completed_at: string | null;
}

async function getPastSessions(): Promise<PastSession[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase
    .from("test_sessions")
    .select("id, test_type, status, total_scaled_score, s2_scaled_score, s3_scaled_score, started_at, completed_at")
    .eq("user_id", user.id)
    .order("started_at", { ascending: false })
    .limit(5);
  return (data ?? []) as PastSession[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function MockTestPage() {
  const sessions = await getPastSessions();

  return (
    <div style={{ padding: "32px 24px", maxWidth: "960px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
          Mock Test
        </h1>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-base)", color: "var(--color-text-secondary)" }}>
          Full TOEFL ITP simulation. Section 2 (40 min) + Section 3 (55 min). Scaled score 310–677.
        </p>
      </div>

      {/* Start cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginBottom: "48px" }}>
        {/* Full mock */}
        <div style={{ padding: "28px", backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, var(--color-primary-500), var(--color-primary-300))" }} />
          <div style={{ marginBottom: "16px", color: "var(--color-primary-400)" }}><ClipboardIcon size={36} /></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
            Full Mock Test
          </h2>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginBottom: "8px", lineHeight: 1.6 }}>
            Section 2 (40 questions, 25 min) + Section 3 (reading passages, 55 min).
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
            {["40 S2 questions", "Reading passages", "Scaled score"].map((tag) => (
              <span key={tag} style={{ padding: "2px 10px", backgroundColor: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: "var(--radius-full)", color: "var(--color-primary-300)", fontSize: "var(--text-xs)", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
                {tag}
              </span>
            ))}
          </div>
          <Link href="/mock-test/new?type=full_mock" style={{ display: "block", textAlign: "center", padding: "11px", backgroundColor: "var(--color-primary-500)", color: "#fff", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700, textDecoration: "none" }}>
            Start Full Mock →
          </Link>
        </div>

        {/* Section practice */}
        <div style={{ padding: "28px", backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", backgroundColor: "#7c3aed" }} />
          <div style={{ marginBottom: "16px", color: "#8b5cf6" }}><TargetIcon size={36} /></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>
            Section Practice
          </h2>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginBottom: "8px", lineHeight: 1.6 }}>
            Timed practice for a single section only. Great for targeted improvement.
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
            {["Timed", "Single section", "Score feedback"].map((tag) => (
              <span key={tag} style={{ padding: "2px 10px", backgroundColor: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "var(--radius-full)", color: "#a78bfa", fontSize: "var(--text-xs)", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
                {tag}
              </span>
            ))}
          </div>
          <Link href="/mock-test/new?type=section_practice" style={{ display: "block", textAlign: "center", padding: "11px", backgroundColor: "#7c3aed", color: "#fff", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 700, textDecoration: "none" }}>
            Start Section Practice →
          </Link>
        </div>
      </div>

      {/* Recent tests */}
      {sessions.length > 0 && (
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "16px" }}>
            Recent Tests
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {sessions.map((s) => (
              <Link key={s.id} href={`/mock-test/${s.id}/results`} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", textDecoration: "none", transition: "border-color 150ms" }} className="practice-card">
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "2px" }}>
                    {s.test_type === "full_mock" ? "Full Mock Test" : "Section Practice"}
                  </p>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                    {formatDate(s.started_at)} · {s.status}
                  </p>
                </div>
                {s.total_scaled_score && (
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--color-primary-300)" }}>
                      {s.total_scaled_score}
                    </div>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>Total Score</div>
                  </div>
                )}
              </Link>
            ))}
          </div>
          <Link href="/mock-test/history" style={{ display: "inline-block", marginTop: "12px", fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", color: "var(--color-text-muted)", textDecoration: "none" }}>
            View all history →
          </Link>
        </div>
      )}
    </div>
  );
}
