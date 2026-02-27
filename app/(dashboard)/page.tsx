import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your ToeflMaster ITP study dashboard",
};

/**
 * Dashboard Home Page (Server Component)
 * Redirects to onboarding if not completed.
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Check onboarding
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed, full_name, target_score, study_streak, current_level")
    .eq("id", user.id)
    .single<{
      onboarding_completed: boolean;
      full_name: string | null;
      target_score: number;
      study_streak: number;
      current_level: "beginner" | "intermediate" | "advanced";
    }>();

  if (profile && !profile.onboarding_completed) {
    redirect("/onboarding");
  }

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <div>
      {/* Welcome header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-3xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "8px",
          }}
        >
          Welcome back, {firstName} 👋
        </h1>
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-ui)",
          }}
        >
          Ready to raise your TOEFL ITP score? Let&apos;s continue where you left off.
        </p>
      </div>

      {/* Quick action cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {[
          {
            title: "Full Mock Test",
            description: "115-minute complete TOEFL ITP simulation",
            href: "/mock-test",
            accent: "var(--color-primary-400)",
            emoji: "📝",
          },
          {
            title: "Quick Practice",
            description: "10 questions in 10 minutes for daily warmup",
            href: "/practice",
            accent: "var(--color-accent-400)",
            emoji: "⚡",
          },
          {
            title: "Learn Concepts",
            description: "Study grammar rules and listening strategies",
            href: "/learn",
            accent: "#34d399",
            emoji: "📖",
          },
          {
            title: "AI Assistant",
            description: "Ask Claude to explain any question or concept",
            href: "/ai-assistant",
            accent: "#a78bfa",
            emoji: "🧠",
          },
        ].map((card) => (
          <a
            key={card.href}
            href={card.href}
            style={{
              display: "block",
              textDecoration: "none",
              padding: "24px",
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              transition: "all 200ms ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = card.accent;
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.3)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{card.emoji}</div>
            <h2
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-base)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                marginBottom: "6px",
              }}
            >
              {card.title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.5,
              }}
            >
              {card.description}
            </p>
          </a>
        ))}
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {[
          { label: "Study Streak", value: `${profile?.study_streak ?? 0} days`, icon: "🔥" },
          { label: "Target Score", value: String(profile?.target_score ?? "—"), icon: "🎯" },
          { label: "Level", value: profile?.current_level ?? "beginner", icon: "📊" },
          { label: "Mock Tests", value: "0", icon: "📝" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: "20px",
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{stat.icon}</div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-2xl)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                marginBottom: "4px",
                textTransform: "capitalize",
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
