import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { payslipLesson } from "../../src/content/payslip";
import { closeDialog } from "./helpers";

async function openPayslip(
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
  await page.goto("/#curriculum/S0.2.2");
  await page
    .getByRole("button", {
      name: language === "hi" ? "यह पाठ खोलें" : "Open this lesson",
      exact: true,
    })
    .click();
  await expect(page.locator(".concept-scroller")).toBeVisible();
}
const concept = (page: Page, language: "en" | "hi", n: number) =>
  page.getByRole("button", {
    name: language === "hi" ? `बात ${n}` : `Concept ${n}`,
    exact: true,
  });

for (const width of [360, 1440])
  for (const language of ["en", "hi"] as const)
    for (const theme of ["light", "dark"] as const) {
      test(`payslip reconciliation, budget and accessible reading ${width} ${language} ${theme}`, async ({
        page,
      }) => {
        await openPayslip(page, width, language, theme);
        await expect(page.locator(".extended-concepts > button")).toHaveCount(
          7,
        );
        await page
          .getByRole("button", {
            name: language === "hi" ? "अगली बात" : "Next concept",
            exact: true,
          })
          .click();
        await expect(concept(page, language, 2)).toHaveAttribute(
          "aria-current",
          "step",
        );
        // Arrow navigation must reach the last dot without widening the dialog.
        for (let i = 2; i < 7; i++)
          await page
            .getByRole("button", {
              name: language === "hi" ? "अगली बात" : "Next concept",
              exact: true,
            })
            .click();
        await expect(concept(page, language, 7)).toHaveAttribute(
          "aria-current",
          "step",
        );
        await expect(concept(page, language, 7)).toBeInViewport();
        await concept(page, language, 6).click();
        const board = page.locator(".payslip-board");
        await expect(board.getByTestId("payroll-net")).toHaveText("₹27,000");
        await expect(board.getByTestId("payroll-gross")).toHaveText("₹30,000");
        await expect(board.getByTestId("payroll-ctc")).toHaveText("₹4,12,800");
        await page.evaluate(() => document.fonts.ready);
        const root = `docs/screens/payslip/board/${width}-${language}-${theme}`;
        await mkdir(root, { recursive: true });
        await page.getByRole("dialog").evaluate((el) => el.scrollTo(0, 0));
        await page.screenshot({ path: root + "/reading.png" });
        await board.scrollIntoViewIfNeeded();
        await page.screenshot({ path: root + "/board.png" });
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await board
          .getByRole("button", {
            name:
              language === "hi"
                ? "कंपनी का फ़ायदा +₹600"
                : "Employer benefit +₹600",
            exact: true,
          })
          .click();
        await expect(board.getByTestId("payroll-ctc")).toHaveText("₹4,20,000");
        await expect(board.getByTestId("payroll-net")).toHaveText("₹27,000");
        const employer = board.getByRole("slider", {
          name:
            language === "hi"
              ? "कंपनी के फ़ायदे का खर्च"
              : "Employer-paid benefit cost",
          exact: true,
        });
        await employer.fill("6000");
        await expect(board.getByTestId("payroll-ctc")).toHaveText("₹4,56,000");
        await expect(board.getByTestId("payroll-net")).toHaveText("₹27,000");
        await board
          .getByRole("button", {
            name: language === "hi" ? "₹1,000 और लौटाएं" : "Repay ₹1,000 more",
            exact: true,
          })
          .click();
        await expect(board.getByTestId("payroll-net")).toHaveText("₹26,000");
        const activeRow = board.locator(".payslip-rows > li > div:visible");
        await activeRow.getByRole("slider").scrollIntoViewIfNeeded();
        await expect(activeRow.getByTestId("payroll-local-net")).toHaveText(
          "₹26,000",
        );
        await expect(
          activeRow.getByTestId("payroll-local-net"),
        ).toBeInViewport();
        await board
          .getByRole("button", {
            name:
              language === "hi" ? "बोनस का लक्ष्य शून्य" : "No target bonus",
            exact: true,
          })
          .click();
        await expect(board.getByTestId("payroll-ctc")).toHaveText("₹3,88,800");
        await expect(board.getByTestId("payroll-net")).toHaveText("₹27,000");
        await board
          .getByRole("button", {
            name: language === "hi" ? "बजट बनाएं" : "Build a budget",
            exact: true,
          })
          .click();
        await expect(board.getByTestId("payroll-gap")).toHaveText("₹1,000");
        await board
          .getByRole("slider", {
            name:
              language === "hi"
                ? "महीने की बचत का लक्ष्य"
                : "Monthly saving target",
            exact: true,
          })
          .fill("3000");
        await expect(board.getByTestId("payroll-gap")).toHaveText("₹1,000");
        await expect(board.locator(".payslip-budget-result")).toContainText(
          language === "hi" ? "प्लान पूरा है" : "plan fits",
        );
        await board
          .getByRole("slider", {
            name:
              language === "hi" ? "महीने के ज़रूरी खर्च" : "Monthly essentials",
            exact: true,
          })
          .fill("28000");
        await expect(board.getByTestId("payroll-gap")).toHaveText("₹4,000");
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
    }
for (const language of ["en", "hi"] as const)
  test(`complete the detailed payslip lesson and recover a checked answer ${language}`, async ({
    page,
  }) => {
    await openPayslip(page, 360, language);
    await page
      .getByRole("button", {
        name: language === "hi" ? "आज़माएं" : "Let’s try it",
        exact: true,
      })
      .click();
    for (const [i, q] of payslipLesson.exercises.entries()) {
      const dialog = page.getByRole("dialog");
      if (q.type === "choice" || q.type === "document")
        await dialog
          .getByRole("button", {
            name: q.options![q.answer as number][language],
            exact: false,
          })
          .click();
      else if (q.type === "bucket")
        for (const [j, category] of (q.answer as number[]).entries())
          await dialog
            .getByRole("group", { name: q.options![j][language], exact: true })
            .getByRole("radio", {
              name: q.categories![category][language],
              exact: true,
            })
            .check();
      else
        await dialog
          .getByRole("textbox", {
            name:
              language === "hi"
                ? "आपका जवाब (सिर्फ़ संख्या)"
                : "Your answer (number only)",
            exact: true,
          })
          .fill(String(q.answer));
      await dialog
        .getByRole("button", {
          name: language === "hi" ? "जवाब देखें" : "Check answer",
          exact: true,
        })
        .click();
      await expect(page.locator(".answer-feedback.right")).toBeVisible();
      if (i === 2) {
        await closeDialog(page);
        await page.goto("/#learn");
        await page.reload();
        await page
          .getByRole("button", {
            name: language === "hi" ? "पाठ जारी रखें" : "Continue lesson",
            exact: true,
          })
          .click();
        await expect(page.locator(".answer-feedback.right")).toBeVisible();
      }
      await page
        .getByRole("button", {
          name: language === "hi" ? "आगे बढ़ें" : "Continue",
          exact: true,
        })
        .click();
    }
    await page
      .getByRole("button", {
        name: language === "hi" ? "पाठ पूरा करें" : "Finish lesson",
        exact: true,
      })
      .click();
    await expect(page.getByText("+100", { exact: true })).toBeVisible();
  });
