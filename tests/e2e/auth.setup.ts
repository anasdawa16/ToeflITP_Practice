import { test as setup } from "@playwright/test";
import path from "path";

/**
 * Authentication setup for Playwright E2E tests.
 * Runs once before all test projects (configured in playwright.config.ts).
 *
 * Logs in with TEST credentials from environment variables:
 *   E2E_EMAIL    — test account email
 *   E2E_PASSWORD — test account password
 *
 * Stores auth cookies/storage to be reused across all test files.
 */

const authFile = path.join(__dirname, ".auth/user.json");

setup("authenticate", async ({ page }) => {
  const email = process.env.E2E_EMAIL ?? "test@example.com";
  const password = process.env.E2E_PASSWORD ?? "testpassword123";

  // Navigate to login page
  await page.goto("/login");

  // Fill login form
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole("button", { name: /sign in|log in|login/i }).click();

  // Wait for redirect to dashboard (confirms login succeeded)
  await page.waitForURL(/\/(dashboard|home)/, { timeout: 15_000 });

  // Save the authenticated state
  await page.context().storageState({ path: authFile });
});
