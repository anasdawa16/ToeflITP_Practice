import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vitest configuration for ToeflMaster ITP
 * Runs unit + integration tests (non-browser).
 * E2E tests are handled by Playwright separately.
 */
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // resolves @/ path aliases from tsconfig
  ],
  test: {
    environment: "node",        // API / pure logic tests
    globals: true,              // describe, it, expect without import
    include: [
      "tests/unit/**/*.test.ts",
      "tests/unit/**/*.test.tsx",
      "tests/integration/**/*.test.ts",
    ],
    exclude: ["tests/e2e/**", "node_modules"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "lib/utils/scoreCalculator.ts",
        "lib/utils/srs.ts",
        "lib/achievements/**",
      ],
      thresholds: {
        statements: 80,
        branches:   80,
        functions:  80,
        lines:      80,
      },
    },
    // Report timing for slow tests
    reporters: ["verbose"],
  },
});
