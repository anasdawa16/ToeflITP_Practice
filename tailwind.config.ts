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
          50:  "#edf2ff",
          100: "#d0dcf4",
          200: "#93b0e4",
          300: "#5a83d0",
          400: "#2d5ebc",
          500: "#1e4a9b",
          600: "#1a3c7e",
          700: "#152f61",
          800: "#0f2244",
          900: "#0a1628",
        },
        accent: {
          100: "#fef3c7",
          300: "#fbbf24",
          400: "#f59e0b",
          500: "#d97706",
        },
        success: "#059669",
        error:   "#dc2626",
        warning: "#d97706",
        info:    "#0284c7",
        "bg-primary":   "#0a0f1e",
        "bg-secondary": "#111827",
        "bg-tertiary":  "#1f2937",
        "bg-card":      "#162033",
        border:         "#1e3a5f",
        "text-primary":   "#f1f5f9",
        "text-secondary": "#94a3b8",
        "text-muted":     "#475569",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-source-serif)", "Georgia", "serif"],
        ui:      ["var(--font-dm-sans)", "system-ui", "sans-serif"],
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
