import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { irregularIncomeLesson } from "../../src/content/irregular";
import { closeDialog } from "./helpers";
async function openLesson(
  page: Page,
  width: number,
  language: "en" | "hi",
  theme: "light" | "dark" = "light",
) {
  await page.setViewportSize({ width, height: width === 360 ? 800 : 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("combobox", { name: /^(Language|भाषा)$/ })
    .selectOption(language);
  await page.getByTestId("onboarding-explore").click();
  if (theme === "dark") {
    await page.goto("/#me");
    await page
      .getByRole("button", {
        name: language === "hi" ? "गहरा रंग" : "After hours",
        exact: true,
      })
      .click();
  }
  await page.goto("/#curriculum/S0.2.5");
  await expect(page.locator(".catalogue-lesson")).toHaveCount(2);
  await page
    .getByRole("button", {
      name:
        language === "hi"
          ? "यह पाठ खोलें: हर महीने अलग कमाई का प्लान"
          : "Open this lesson: Plan for uneven income",
      exact: true,
    })
    .click();
}
for (const width of [360, 1440])
  for (const language of ["en", "hi"] as const)
    for (const theme of ["light", "dark"] as const)
      test(`cash-flow timing, reserved pots and accessible layout ${width} ${language} ${theme}`, async ({
        page,
      }) => {
        await openLesson(page, width, language, theme);
        await page
          .getByRole("button", {
            name: language === "hi" ? "बात 6" : "Concept 6",
            exact: true,
          })
          .click();
        const board = page.locator(".cashflow-board");
        await expect(board.getByTestId("cashflow-total")).toHaveText(
          "₹1,50,000",
        );
        await expect(board.getByTestId("cashflow-working")).toHaveText(
          "₹30,000",
        );
        await expect(board.getByTestId("cashflow-pot")).toHaveText("₹4,000");
        await board
          .getByRole("button", {
            name: language === "hi" ? "महीना 3 ₹35,000" : "Month 3 ₹35,000",
            exact: true,
          })
          .click();
        await expect(board.getByTestId("cashflow-bill-paid")).toHaveText(
          "₹12,000",
        );
        await expect(board.getByTestId("cashflow-pot")).toHaveText("₹0");
        const root = `docs/screens/payslip/cashflow/${width}-${language}-${theme}`;
        await mkdir(root, { recursive: true });
        await board.scrollIntoViewIfNeeded();
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: root + "/board.png" });
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await board
          .getByRole("button", {
            name:
              language === "hi" ? "कम कमाई वाला महीना पहले" : "Low month first",
            exact: true,
          })
          .click();
        await board
          .getByRole("slider", {
            name:
              language === "hi"
                ? "शुरुआत में रोज़ के लिए पैसे"
                : "Opening working cash",
            exact: true,
          })
          .fill("0");
        await expect(board.getByTestId("cashflow-total")).toHaveText(
          "₹1,50,000",
        );
        await expect(board.getByTestId("cashflow-gap")).toHaveText("₹12,000");
        await expect(board.locator(".cashflow-warning")).toBeVisible();
        await board
          .getByRole("button", {
            name: language === "hi" ? "महीना 1 ₹10,000" : "Month 1 ₹10,000",
            exact: true,
          })
          .click();
        await expect(board.getByTestId("cashflow-working")).toHaveText(
          "-₹12,000",
        );
        await board
          .getByRole("slider", {
            name:
              language === "hi"
                ? "शुरुआत में रोज़ के लिए पैसे"
                : "Opening working cash",
            exact: true,
          })
          .fill("12000");
        await expect(board.getByTestId("cashflow-gap")).toHaveText("₹0");
        await board
          .getByRole("slider", {
            name:
              language === "hi"
                ? "तय फ़ीस की महीने की बचत"
                : "Monthly known-fee saving",
            exact: true,
          })
          .fill("3000");
        await expect(board.getByTestId("cashflow-bill-gap")).toHaveText(
          "₹3,000",
        );
        await board
          .getByRole("slider", {
            name:
              language === "hi"
                ? "तय फ़ीस की महीने की बचत"
                : "Monthly known-fee saving",
            exact: true,
          })
          .fill("6000");
        await expect(board.getByTestId("cashflow-bill-gap")).toHaveText("₹0");
        await board
          .getByRole("button", {
            name: language === "hi" ? "महीना 6 ₹30,000" : "Month 6 ₹30,000",
            exact: true,
          })
          .click();
        await expect(board.getByTestId("cashflow-bill-paid")).toHaveText("₹0");
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await page.evaluate(() => {
          document.documentElement.style.fontSize = "32px";
          document.documentElement.dataset.largeText = "true";
        });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        expect(
          await page
            .getByRole("dialog")
            .evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
        ).toBe(true);
      });
test("Hindi uneven-income lesson completes and preserves an answered saving calculation", async ({
  page,
}) => {
  await openLesson(page, 360, "hi");
  await page.getByRole("button", { name: "आज़माएं", exact: true }).click();
  for (const [i, q] of irregularIncomeLesson.exercises.entries()) {
    const dialog = page.getByRole("dialog");
    if (q.type === "choice" || q.type === "document")
      await dialog
        .getByRole("button", {
          name: q.options![q.answer as number].hi,
          exact: false,
        })
        .click();
    else if (q.type === "bucket")
      for (const [j, category] of (q.answer as number[]).entries())
        await dialog
          .getByRole("group", { name: q.options![j].hi, exact: true })
          .getByRole("radio", { name: q.categories![category].hi, exact: true })
          .check();
    else
      await dialog
        .getByRole("textbox", {
          name: "आपका जवाब (सिर्फ़ संख्या)",
          exact: true,
        })
        .fill(String(q.answer));
    await dialog
      .getByRole("button", { name: "जवाब देखें", exact: true })
      .click();
    await expect(page.locator(".answer-feedback.right")).toBeVisible();
    if (i === 1) {
      await closeDialog(page);
      await page.goto("/#learn");
      await page.reload();
      await page
        .getByRole("button", { name: "पाठ जारी रखें", exact: true })
        .click();
      await expect(page.locator(".answer-feedback.right")).toBeVisible();
    }
    await page.getByRole("button", { name: "आगे बढ़ें", exact: true }).click();
  }
  await page
    .getByRole("button", { name: "पाठ पूरा करें", exact: true })
    .click();
  await expect(page.getByText("+100", { exact: true })).toBeVisible();
});
