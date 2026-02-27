import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "ToeflMaster ITP",
    template: "%s | ToeflMaster ITP",
  },
};

/**
 * Auth Group Layout — no sidebar, centered card layout
 * Route group: app/(auth)/
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      {/* Logo / Brand */}
      <div className="mb-8 text-center">
        <h1
          className="text-3xl font-bold tracking-tight mb-1"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-primary)",
          }}
        >
          ToeflMaster ITP
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm)" }}>
          TOEFL ITP Level 1 Preparation Platform
        </p>
      </div>

      {/* Auth Card */}
      <div
        className="w-full max-w-md rounded-xl p-8"
        style={{
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        {children}
      </div>

      {/* ETS Disclaimer */}
      <p
        className="mt-8 text-center max-w-sm"
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--color-text-muted)",
          lineHeight: "1.5",
        }}
      >
        This is an unofficial TOEFL ITP preparation platform. TOEFL® and TOEFL
        ITP® are registered trademarks of ETS. Not affiliated with or endorsed
        by ETS.
      </p>
    </div>
  );
}
