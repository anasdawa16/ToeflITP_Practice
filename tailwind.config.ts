import type { Config } from "tailwindcss";

/**
 * ToeflMaster ITP — Tailwind Config
 *
 * NOTE: We use Tailwind v4 with CSS-first configuration via `@theme` in globals.css.
 * This file exists for IDE tooling support and any v4 plugin configurations.
 * The authoritative design tokens are defined in app/globals.css under @theme.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Design tokens mirrored here for IDE autocomplete.
      // Source of truth is globals.css @theme block.
      colors: {
        primary: {
          50:  "#f5f3ff",
          100: "#ede9fe",
          200: "#c4b5fd",
          300: "#a78bfa",
          400: "#8b5cf6",
          500: "#7c3aed",
          600: "#6d28d9",
          700: "#4c1d95",
          800: "#2d0f5e",
          900: "#1e0a3c",
        },
        accent: {
          100: "#f3e8ff",
          300: "#c084fc",
          400: "#a855f7",
          500: "#7c3aed",
        },
        success: "#10b981",
        error:   "#ef4444",
        warning: "#f59e0b",
        info:    "#3b82f6",
        "bg-primary":   "#0c0c0f",
        "bg-secondary": "#111117",
        "bg-tertiary":  "#18181f",
        "bg-card":      "#12121a",
        border:         "rgba(255,255,255,0.08)",
        "text-primary":   "#f8fafc",
        "text-secondary": "#94a3b8",
        "text-muted":     "#475569",
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
        ui:      ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
      maxWidth: {
        content: "900px",
      },
      width: {
        sidebar:           "240px",
        "sidebar-collapsed": "64px",
      },
      height: {
        topbar: "64px",
      },
      animation: {
        "pulse-warning": "pulse-warning 1.5s cubic-bezier(0.4,0,0.2,1) infinite",
        "count-up":      "count-up 300ms cubic-bezier(0.4,0,0.2,1) both",
        "slide-in":      "slide-in-right 300ms cubic-bezier(0.4,0,0.2,1) both",
        "fade-in":       "fade-in 200ms cubic-bezier(0.4,0,0.2,1) both",
      },
      keyframes: {
        "pulse-warning": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.6" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(12px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4,0,0.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;
