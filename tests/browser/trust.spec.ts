import { test, expect } from "@playwright/test";
import { lessons } from "../../src/content/lessons";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("combobox", { name: /^(?:Language|भाषा)$/, exact: true })
    .selectOption("en");
  await page.getByTestId("onboarding-explore").click();
});
test("exit confirmation preserves a private error report and the original graded attempt", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Let’s start with Mia", exact: true })
    .click();
  await expect(
    page.getByText("Draft · Independent review pending", { exact: true }),
  ).toBeVisible();
  await page.locator(".lesson-report summary").click();
  await page
    .getByRole("textbox", { name: "What seems wrong or unclear?", exact: true })
    .fill("My private source-check reminder");
  await page.getByRole("button", { name: "Close dialog", exact: true }).click();
  await expect(page.getByRole("alertdialog")).toBeVisible();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Keep learning", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", {
      name: "What seems wrong or unclear?",
      exact: true,
    }),
  ).toHaveValue("My private source-check reminder");
  await page.getByRole("button", { name: "Let’s try it", exact: true }).click();
  await page
    .getByRole("button", { name: "Wheat has no use", exact: false })
    .click();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(page.locator(".answer-feedback.wrong")).toBeVisible();
  await page
    .getByRole("button", { name: "Try once more", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "The barber did not want wheat",
      exact: false,
    })
    .click();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(page.locator(".answer-feedback.right")).toBeVisible();
  await page.getByRole("button", { name: "Close dialog", exact: true }).click();
  await page.getByTestId("confirm-exit").click();
  await page.reload();
  await page
    .getByRole("button", { name: "Continue lesson", exact: true })
    .click();
  await expect(page.locator(".answer-feedback.wrong")).toBeVisible();
  await page.locator(".lesson-report summary").click();
  await expect(
    page.getByRole("textbox", {
      name: "What seems wrong or unclear?",
      exact: true,
    }),
  ).toHaveValue("My private source-check reminder");
});
test("backup export records a timestamp and content status is available offline", async ({
  page,
}) => {
  await page.goto("/#me");
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export my progress", exact: true })
    .click();
  expect((await download).suggestedFilename()).toMatch(/^penny-pilot-backup-/);
  await expect(page.locator(".backup-history")).toContainText("IST");
  await expect(page.locator(".backup-history")).toContainText(
    "Confirm the downloaded or shared file was saved.",
  );
  await page
    .getByRole("button", { name: "About this content", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Current status: Draft", exact: true }),
  ).toBeVisible();
});
test("numeric exercises accept Indian commas and Devanagari digits", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Let’s start with Mia", exact: true })
    .click();
  await page.getByRole("button", { name: "Let’s try it", exact: true }).click();
  for (const question of lessons[0].exercises.slice(0, 2)) {
    if (
      question.type !== "choice" ||
      !question.options ||
      typeof question.answer !== "number"
    )
      throw new Error("Expected introductory choice");
    await page
      .getByRole("button", {
        name: question.options[question.answer].en,
        exact: false,
      })
      .click();
    await page
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await expect(page.locator(".answer-feedback.right")).toBeVisible();
    await page.getByRole("button", { name: "Continue", exact: true }).click();
  }
  const input = page.getByLabel("Your answer (number only)", { exact: true });
  await expect(input).toBeVisible();
  await input.fill("१,२०");
  await expect(
    page.getByRole("button", { name: "Check answer", exact: true }),
  ).toBeDisabled();
  await input.fill("१२०");
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(page.locator(".answer-feedback.right")).toBeVisible();
});
