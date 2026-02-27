import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bookmarks" };

export default function BookmarksPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "12px" }}>
        Bookmarks
      </h1>
      <p style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)" }}>
        Saved questions and notes — available once practice is built in Step 2.
      </p>
    </div>
  );
}
