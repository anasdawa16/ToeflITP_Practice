import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Source_Serif_4,
  DM_Sans,
  JetBrains_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

/* ------------------------------------------------------------------
   FONTS — per implementation plan Section 9.3
   - Playfair Display : display headings (academic gravitas)
   - Source Serif 4   : body text in passages/questions
   - DM Sans          : UI elements, navigation, labels
   - JetBrains Mono   : code/monospace elements
   ------------------------------------------------------------------ */

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

/* ------------------------------------------------------------------
   METADATA
   ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: {
    default: "ToeflMaster ITP — TOEFL ITP Level 1 Preparation",
    template: "%s | ToeflMaster ITP",
  },
  description:
    "Prepare for TOEFL ITP Level 1 with AI-powered practice, mock tests, and score tracking. Covers Listening, Structure & Written Expression, and Reading.",
  keywords: [
    "TOEFL ITP",
    "TOEFL preparation",
    "English test",
    "mock test",
    "ETS",
    "listening comprehension",
    "structure written expression",
    "reading comprehension",
  ],
  authors: [{ name: "ToeflMaster ITP" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  // ── PWA manifest & icons ──────────────────────────────────
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ToeflMaster",
  },
  // ── OpenGraph ────────────────────────────────────────────
  openGraph: {
    type: "website",
    siteName: "ToeflMaster ITP",
    title: "ToeflMaster ITP — TOEFL ITP Level 1 Preparation",
    description:
      "AI-powered TOEFL ITP practice platform with 1000+ questions, mock tests, and score tracking.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,          // allow user zoom (accessibility)
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0a0f1e" },
    { media: "(prefers-color-scheme: light)", color: "#1e4a9b" },
  ],
};

/* ------------------------------------------------------------------
   ROOT LAYOUT
   ------------------------------------------------------------------ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`
          ${playfairDisplay.variable}
          ${sourceSerif.variable}
          ${dmSans.variable}
          ${jetbrainsMono.variable}
          antialiased
        `}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
