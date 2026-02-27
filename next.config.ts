import type { NextConfig } from "next";

// next-pwa doesn't have proper ESM types for TS - use require
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // Cache strategy overrides
  runtimeCaching: [
    // ── API routes: network-first, 60s cache ─────────────────
    {
      urlPattern: /^\/api\/(progress|vocabulary|achievements)/,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        expiration: { maxEntries: 50, maxAgeSeconds: 60 },
        networkTimeoutSeconds: 5,
      },
    },
    // ── Static assets: cache-first, long TTL ─────────────────
    {
      urlPattern: /\.(?:woff2|woff|ttf|otf)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "font-cache",
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    // ── Audio files: cache-first (TOEFL audio clips) ─────────
    {
      urlPattern: /\.(?:mp3|ogg|wav)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "audio-cache",
        expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 7 },
      },
    },
    // ── Next.js pages: stale-while-revalidate ────────────────
    {
      urlPattern: /^https:\/\/.*\/_next\/static\/.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "next-static",
        expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  // ── Image optimization ──────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Supabase storage
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/**",
      },
      // Supabase avatars
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/auth/**",
      },
    ],
    // Optimize sizes for our common use cases
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [32, 48, 64, 96, 128],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ── Compiler options ────────────────────────────────────────
  compiler: {
    // Remove console.log in production (keep console.error/warn)
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  // ── Experimental ────────────────────────────────────────────
  experimental: {
    // optimizeCss removed — not stable in Next.js 16 with Turbopack
  },

  // ── Turbopack config (suppress workspace warning) ────────────
  turbopack: {
    // Fix: prevents Next.js picking up C:/Users/nassb/package-lock.json
    // as the workspace root instead of this project directory
    root: process.cwd(),
  },

  // ── Headers: cache static API responses ─────────────────────
  async headers() {
    return [
      {
        // Questions list — long cache (data rarely changes)
        source: "/api/questions",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        // Progress — short cache
        source: "/api/progress",
        headers: [
          { key: "Cache-Control", value: "private, s-maxage=60, stale-while-revalidate=300" },
        ],
      },
      {
        // Achievements — medium cache
        source: "/api/achievements",
        headers: [
          { key: "Cache-Control", value: "private, s-maxage=300, stale-while-revalidate=600" },
        ],
      },
      {
        // Vocabulary list — medium cache
        source: "/api/vocabulary",
        headers: [
          { key: "Cache-Control", value: "private, s-maxage=120, stale-while-revalidate=600" },
        ],
      },
      {
        // Static assets: max cache
        source: "/:path(.*\\.(?:svg|png|jpg|webp|avif|woff2|woff|ttf|otf|ico))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // ── Redirects ────────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

export default withPWA(nextConfig);
