import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { loanTermsLesson } from "../../src/content/loan-terms";
import { closeDialog } from "./helpers";
async function open(
  page: Page,
  width: number,
  language: "en" | "hi",
  theme = "light",
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
  await page.goto("/#curriculum/S0.6.7");
  await page
    .getByRole("button", {
      name: language === "hi" ? "यह पाठ खोलें" : "Open this lesson",
      exact: true,
    })
    .click();
}
for (const width of [360, 1440])
  for (const language of ["en", "hi"] as const)
    for (const theme of ["light", "dark"] as const)
      test(`loan structures, withheld fees and a rate-reset scenario ${width} ${language} ${theme}`, async ({
        page,
      }) => {
        await open(page, width, language, theme);
        await page
          .getByRole("button", {
            name: language === "hi" ? "बात 6" : "Concept 6",
            exact: true,
          })
          .click();
        const board = page.locator(".loan-terms-board");
        await expect(board.locator("input,a")).toHaveCount(0);
        for (let i = 0; i < 3; i++) {
          await board.locator(".loan-terms-actions button").nth(i).click();
          await expect(board.locator(".loan-terms-feedback")).toBeEmpty();
          await board
            .locator(".loan-terms-options button")
            .nth((i + 1) % 3)
            .click();
          await expect(board.locator(".loan-terms-feedback")).toContainText(
            language === "hi" ? "फिर सोचें" : "Try again",
          );
          await board.locator(".loan-terms-options button").nth(i).click();
          await expect(board.locator(".loan-terms-feedback")).toContainText(
            language === "hi" ? "इस लिखी बात" : "Supported by this wording",
          );
        }
        await board.locator(".loan-terms-actions button").first().focus();
        await page.keyboard.press("Enter");
        await expect(board.locator(".loan-terms-feedback")).toBeEmpty();
        const root = `docs/screens/loan-terms/board/${width}-${language}-${theme}`;
        await mkdir(root, { recursive: true });
        await board
          .locator("h3")
          .evaluate((el) =>
            el.scrollIntoView({ block: "start", behavior: "instant" }),
          );
        await page.screenshot({ path: root + "/structure.png" });
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await board.locator(".loan-terms-tabs button").nth(1).click();
        await expect(board.getByTestId("loan-terms-net")).toHaveText(
          "₹1,17,000",
        );
        await expect(board.getByTestId("loan-terms-monthly")).toHaveText(
          "₹10,662",
        );
        await expect(board.getByTestId("loan-terms-cost")).toHaveText(
          "₹10,942",
        );
        const fee = board.getByRole("slider", {
          name: language === "hi" ? "पहले कटी फीस" : "Withheld fee",
          exact: true,
        });
        await fee.fill("0");
        await expect(board.getByTestId("loan-terms-net")).toHaveText(
          "₹1,20,000",
        );
        await expect(board.getByTestId("loan-terms-cost")).toHaveText("₹7,942");
        await fee.fill("5000");
        await expect(board.getByTestId("loan-terms-net")).toHaveText(
          "₹1,15,000",
        );
        await expect(board.getByTestId("loan-terms-monthly")).toHaveText(
          "₹10,662",
        );
        await expect(board.getByTestId("loan-terms-cost")).toHaveText(
          "₹12,942",
        );
        const period = board.getByRole("slider", {
          name:
            language === "hi"
              ? "लौटाने का समय (महीने)"
              : "Repayment period in months",
          exact: true,
        });
        await fee.fill("3000");
        await period.fill("24");
        await expect(board.getByTestId("loan-terms-monthly")).toHaveText(
          "₹5,649",
        );
        await expect(board.getByTestId("loan-terms-cost")).toHaveText(
          "₹18,572",
        );
        await period.focus();
        await period.press("ArrowRight");
        await expect(period).toHaveValue("36");
        await expect(board.getByTestId("loan-terms-monthly")).toHaveText(
          "₹3,986",
        );
        await board
          .getByRole("button", {
            name:
              language === "hi"
                ? "खर्च का example रीसेट करें"
                : "Reset cost example",
            exact: true,
          })
          .click();
        await expect(fee).toHaveValue("3000");
        await expect(period).toHaveValue("12");
        await board
          .locator("h3")
          .evaluate((el) =>
            el.scrollIntoView({ block: "start", behavior: "instant" }),
          );
        await page.screenshot({ path: root + "/cost.png" });
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await fee.fill("5000");
        await period.fill("36");
        await board.locator(".loan-terms-tabs button").nth(2).click();
        await expect(board.getByTestId("loan-terms-new-payment")).toHaveText(
          "₹11,031",
        );
        await expect(board.getByTestId("loan-terms-old-payment")).toHaveText(
          "₹10,662",
        );
        await expect(board.getByTestId("loan-terms-reset-balance")).toHaveText(
          "₹61,791",
        );
        await expect(board.getByTestId("loan-terms-stress-cost")).toHaveText(
          "₹13,158",
        );
        const rate = board.getByRole("slider", {
          name:
            language === "hi"
              ? "छह किस्त बाद का रेट"
              : "Rate after six payments",
          exact: true,
        });
        await rate.focus();
        await rate.press("ArrowRight");
        await expect(rate).toHaveValue("25");
        await expect(board.getByTestId("loan-terms-new-payment")).toHaveText(
          "₹11,062",
        );
        await rate.fill("0");
        await expect(board.getByTestId("loan-terms-new-payment")).toHaveText(
          "₹10,298",
        );
        await board
          .getByRole("button", {
            name: language === "hi" ? "रेट वही रखें" : "Keep rate unchanged",
            exact: true,
          })
          .click();
        await expect(board.getByTestId("loan-terms-change")).toHaveText("₹0");
        await expect(board.getByTestId("loan-terms-stress-cost")).toHaveText(
          "₹10,942",
        );
        await board
          .getByRole("button", {
            name:
              language === "hi"
                ? "24% वाला example रीसेट करें"
                : "Reset to 24% scenario",
            exact: true,
          })
          .click();
        await expect(board.getByTestId("loan-terms-new-payment")).toHaveText(
          "₹11,031",
        );
        await board
          .locator("h3")
          .evaluate((el) =>
            el.scrollIntoView({ block: "start", behavior: "instant" }),
          );
        await page.screenshot({ path: root + "/stress.png" });
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        for (const button of await board.locator("button").all())
          expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(
            44,
          );
        await page.evaluate(() => {
          document.documentElement.style.fontSize = "200%";
          document.documentElement.dataset.largeText = "true";
        });
        for (let i = 0; i < 3; i++) {
          await board.locator(".loan-terms-tabs button").nth(i).click();
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
        }
      });
for (const language of ["en", "hi"] as const)
  test(`loan-terms lesson completes and restores a fee answer ${language}`, async ({
    page,
  }) => {
    await open(page, 360, language);
    await page
      .getByRole("button", {
        name: language === "hi" ? "आज़माएं" : "Let’s try it",
        exact: true,
      })
      .click();
    for (const [i, q] of loanTermsLesson.exercises.entries()) {
      const dialog = page.getByRole("dialog");
      if (q.type === "numeric")
        await dialog
          .getByRole("textbox", {
            name:
              language === "hi"
                ? "आपका जवाब (सिर्फ़ संख्या)"
                : "Your answer (number only)",
            exact: true,
          })
          .fill(
            language === "hi"
              ? String(q.answer).replace(
                  /[0-9]/g,
                  (d) => "०१२३४५६७८९"[Number(d)],
                )
              : new Intl.NumberFormat("en-IN").format(q.answer as number),
          );
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
          .getByRole("button", {
            name: q.options![q.answer as number][language],
            exact: false,
          })
          .click();
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
