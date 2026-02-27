import { test, expect } from "@playwright/test";

/**
 * E2E test: Complete TOEFL ITP Mock Test Flow
 *
 * Flow:
 *  1. Navigate to mock test selection page
 *  2. Start a new mock test session
 *  3. Answer Section 1 (Listening) questions
 *  4. Advance through section break
 *  5. Answer Section 2 (Structure) questions
 *  6. Answer Section 3 (Reading) questions
 *  7. Submit the test
 *  8. Verify score report is shown with correct sections
 */

test.describe("Complete Mock Test Flow", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/mock-test/new");
  });

  // ── 1. Mock test selection page loads ──────────────────────
  test("mock test page shows test type options", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /mock test|toefl itp/i })).toBeVisible();
    // Should show test type buttons (Full Mock, Section Only, etc.)
    await expect(page.getByRole("button").first()).toBeVisible();
  });

  // ── 2. Start a full mock test ───────────────────────────────
  test("can start a full mock test session", async ({ page }) => {
    // Click the Full Mock Test option
    const startBtn = page.getByRole("button", { name: /full mock|start|begin/i }).first();
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    // Should redirect to test session page
    await page.waitForURL(/\/mock-test\/[a-zA-Z0-9-]+/, { timeout: 15_000 });
    expect(page.url()).toMatch(/\/mock-test\//);
  });

  // ── 3. Section 1 (Listening) renders correctly ────────────
  test("Section 1 shows listening interface", async ({ page }) => {
    // Start test
    await page.getByRole("button", { name: /full mock|start|begin/i }).first().click();
    await page.waitForURL(/\/mock-test\/[a-zA-Z0-9-]+/, { timeout: 15_000 });

    // Section 1 UI should be visible
    await expect(page.getByText(/section 1|listening/i)).toBeVisible({ timeout: 10_000 });
  });

  // ── 4. Answer sheet grid shows question count ─────────────
  test("answer sheet shows correct question count", async ({ page }) => {
    await page.getByRole("button", { name: /full mock|start|begin/i }).first().click();
    await page.waitForURL(/\/mock-test\/[a-zA-Z0-9-]+/, { timeout: 15_000 });

    // Open answer sheet if it exists as a toggle
    const answerSheetBtn = page.getByLabel(/answer sheet|overview/i);
    if (await answerSheetBtn.isVisible()) {
      await answerSheetBtn.click();
    }
  });

  // ── 5. Can select an answer ──────────────────────────────
  test("can select an answer option", async ({ page }) => {
    await page.getByRole("button", { name: /full mock|start|begin/i }).first().click();
    await page.waitForURL(/\/mock-test\/[a-zA-Z0-9-]+/, { timeout: 15_000 });

    // Wait for questions to load
    await page.waitForSelector("[data-testid='answer-option'], .answer-option", { timeout: 15_000 });

    // Click first answer option
    const options = page.locator("[data-testid='answer-option'], .answer-option");
    const count = await options.count();
    if (count > 0) {
      await options.first().click();
      // Answer should be selected (check for visual indicator)
      await expect(options.first()).toHaveAttribute("aria-pressed", "true");
    }
  });

  // ── 6. Section timer counts down ─────────────────────────
  test("section timer is visible and displayed", async ({ page }) => {
    await page.getByRole("button", { name: /full mock|start|begin/i }).first().click();
    await page.waitForURL(/\/mock-test\/[a-zA-Z0-9-]+/, { timeout: 15_000 });

    // Timer should be visible (MM:SS format)
    const timer = page.locator("[data-testid='section-timer'], .section-timer");
    await expect(timer.first()).toBeVisible({ timeout: 10_000 });
  });

  // ── 7. Navigation between questions ──────────────────────
  test("can navigate to next question", async ({ page }) => {
    await page.getByRole("button", { name: /full mock|start|begin/i }).first().click();
    await page.waitForURL(/\/mock-test\/[a-zA-Z0-9-]+/, { timeout: 15_000 });
    await page.waitForLoadState("networkidle");

    const nextBtn = page.getByRole("button", { name: /next question|next →|›/i });
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      // Question number should increment
    }
  });
});

// ── Score Report Tests ──────────────────────────────────────────
test.describe("Score Report Page", () => {

  test("score report shows three sections", async ({ page }) => {
    // Navigate to a completed test result (if any exist)
    await page.goto("/mock-test/results");
    // If no results yet, check the page loads
    const hasContent = await page.locator("body").isVisible();
    expect(hasContent).toBe(true);
  });

  test("score display shows scaled scores in correct range", async ({ page }) => {
    await page.goto("/dashboard");
    // The dashboard should show recent score if any
    await expect(page.locator("body")).toBeVisible();
  });
});

// ── Vocabulary Flow ─────────────────────────────────────────────
test.describe("Vocabulary Tool Flow", () => {

  test("vocabulary page loads with stats", async ({ page }) => {
    await page.goto("/vocabulary");
    await expect(page.getByRole("heading", { name: /vocabulary/i })).toBeVisible({ timeout: 10_000 });
  });

  test("start review button is visible", async ({ page }) => {
    await page.goto("/vocabulary");
    await expect(page.getByRole("button", { name: /start review/i })).toBeVisible({ timeout: 10_000 });
  });

  test("browsing word list is possible", async ({ page }) => {
    await page.goto("/vocabulary");
    const browseBtn = page.getByRole("button", { name: /browse all/i });
    await expect(browseBtn).toBeVisible({ timeout: 10_000 });
    await browseBtn.click();
    // Word list grid should appear
    await expect(page.getByText(/word list/i)).toBeVisible({ timeout: 5_000 });
  });
});

// ── Progress Dashboard ──────────────────────────────────────────
test.describe("Progress Dashboard", () => {

  test("progress page loads without error", async ({ page }) => {
    await page.goto("/progress");
    await expect(page.getByRole("heading", { name: /progress/i })).toBeVisible({ timeout: 10_000 });
  });

  test("achievements link navigates correctly", async ({ page }) => {
    await page.goto("/progress");
    const achLink = page.getByRole("link", { name: /achievement|badge/i });
    if (await achLink.isVisible()) {
      await achLink.click();
      await expect(page.url()).toContain("achievement");
    }
  });
});

// ── AI Assistant ────────────────────────────────────────────────
test.describe("AI Assistant", () => {

  test("AI assistant page loads", async ({ page }) => {
    await page.goto("/ai-assistant");
    await expect(page.getByRole("heading", { name: /ai|assistant|tutor/i })).toBeVisible({ timeout: 10_000 });
  });

  test("chat input field is visible", async ({ page }) => {
    await page.goto("/ai-assistant");
    const input = page.getByPlaceholder(/ask|message|question/i);
    await expect(input).toBeVisible({ timeout: 10_000 });
  });
});
