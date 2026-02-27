import type { Metadata } from "next";

export const metadata: Metadata = { title: "Profile Settings" };

export default function ProfileSettingsPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "12px" }}>
        Profile Settings
      </h1>
      <p style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)" }}>
        Update your name, target score, and avatar — coming soon.
      </p>
    </div>
  );
}
