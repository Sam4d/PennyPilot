import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { creditScoreLesson } from "../../src/content/credit-score";
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
  await page.goto("/#curriculum/S0.6.5");
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
      test(`credit records, ratio and behaviour comparison ${width} ${language} ${theme}`, async ({
        page,
      }) => {
        await open(page, width, language, theme);
        await page
          .getByRole("button", {
            name: language === "hi" ? "बात 6" : "Concept 6",
            exact: true,
          })
          .click();
        const board = page.locator(".credit-board");
        await expect(
          board.locator("a,input[type=file],input[type=text]"),
        ).toHaveCount(0);
        const entries = board.locator(".credit-rows button");
        for (let i = 0; i < 4; i++) {
          await entries.nth(i).click();
          await expect(entries.nth(i)).toHaveAttribute("aria-pressed", "true");
          await expect(board.locator(".credit-detail h4")).toHaveText(
            await entries.nth(i).innerText(),
          );
        }
        await entries.nth(2).focus();
        await page.keyboard.press("Enter");
        await expect(board.locator(".credit-entry")).toContainText(
          language === "hi" ? "मिलती रसीद" : "matching receipt",
        );
        await expect(page.locator(".concept-carousel")).toBeVisible();
        const root = `docs/screens/credit-score/board/${width}-${language}-${theme}`;
        await mkdir(root, { recursive: true });
        await board
          .locator("h3")
          .evaluate((el) =>
            el.scrollIntoView({ block: "start", behavior: "instant" }),
          );
        await page.screenshot({ path: root + "/report.png" });
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await board.locator(".credit-tabs button").nth(1).click();
        await expect(board.getByTestId("credit-balance")).toHaveText("₹3,000");
        await expect(board.getByTestId("credit-ratio")).toHaveText("30%");
        await board.locator(".credit-actions button").first().click();
        await expect(board.getByTestId("credit-ratio")).toHaveText("15%");
        await expect(board.getByTestId("credit-balance")).toHaveText("₹3,000");
        await board.locator(".credit-actions button").nth(1).click();
        await expect(board.getByTestId("credit-ratio")).toHaveText(
          language === "hi" ? "पता नहीं" : "Unknown",
        );
        await expect(board.locator(".credit-formula")).toContainText("0%");
        await board.locator(".credit-actions button").last().click();
        const balance = board.getByRole("slider", {
          name:
            language === "hi" ? "बताया कार्ड बकाया" : "Reported card balance",
          exact: true,
        });
        const limit = board.getByRole("slider", {
          name:
            language === "hi" ? "बनाई कार्ड लिमिट" : "Illustrative card limit",
          exact: true,
        });
        await balance.fill("12000");
        await expect(board.getByTestId("credit-ratio")).toHaveText("120%");
        await balance.focus();
        await balance.press("ArrowRight");
        await expect(board.getByTestId("credit-balance")).toHaveText("₹13,000");
        await expect(board.getByTestId("credit-ratio")).toHaveText("130%");
        await expect(board).toBeVisible();
        await balance.fill("0");
        await expect(board.getByTestId("credit-ratio")).toHaveText("0%");
        await limit.fill("0");
        await expect(board.getByTestId("credit-ratio")).toHaveText(
          language === "hi" ? "पता नहीं" : "Unknown",
        );
        await board.locator(".credit-actions button").last().click();
        await board
          .locator("h3")
          .evaluate((el) =>
            el.scrollIntoView({ block: "start", behavior: "instant" }),
          );
        await page.screenshot({ path: root + "/ratio.png" });
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await board.locator(".credit-tabs button").nth(2).click();
        for (let i = 0; i < 3; i++) {
          const action = board.locator(".credit-actions button").nth(i);
          await action.click();
          await expect(board.locator(".credit-detail h4")).toHaveText(
            await action.innerText(),
          );
        }
        await board
          .locator("h3")
          .evaluate((el) =>
            el.scrollIntoView({ block: "start", behavior: "instant" }),
          );
        await page.screenshot({ path: root + "/actions.png" });
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
          await board.locator(".credit-tabs button").nth(i).click();
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
  test(`credit lesson completes and resumes numeric answer ${language}`, async ({
    page,
  }) => {
    await open(page, 360, language);
    await page
      .getByRole("button", {
        name: language === "hi" ? "आज़माएं" : "Let’s try it",
        exact: true,
      })
      .click();
    for (const [i, q] of creditScoreLesson.exercises.entries()) {
      if (q.type === "numeric")
        await page
          .getByRole("textbox", {
            name:
              language === "hi"
                ? "आपका जवाब (सिर्फ़ संख्या)"
                : "Your answer (number only)",
            exact: true,
          })
          .fill(language === "hi" ? "०.३" : "0.3");
      else
        await page
          .getByRole("dialog")
          .getByRole("button", {
            name: q.options![q.answer as number][language],
            exact: false,
          })
          .click();
      await page
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
