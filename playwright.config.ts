import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E configuration for ToeflMaster ITP
 *
 * Run: npx playwright test
 * UI mode: npx playwright test --ui
 * Single test: npx playwright test tests/e2e/mock-test-flow.spec.ts
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 90_000,           // generous timeout for full test flow
  retries: 1,                // retry once on CI
  workers: 2,
  reporter: [["html", { outputFolder: "playwright-report" }], ["list"]],

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    // Persist auth state between tests in same file
    storageState: "tests/e2e/.auth/user.json",
  },

  projects: [
    // ── Setup: authenticate once ─────────────────────────────
    {
      name: "setup",
      testMatch: "**/auth.setup.ts",
      use: { storageState: undefined },
    },
    // ── Desktop Chrome ────────────────────────────────────────
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },
    // ── Mobile Safari ─────────────────────────────────────────
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 13"] },
      dependencies: ["setup"],
    },
  ],

  // Start Next.js dev server before tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
