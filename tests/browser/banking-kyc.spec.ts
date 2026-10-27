import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { bankingKycLesson } from "../../src/content/banking-kyc";
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
  await page.goto("/#curriculum/S0.4.2");
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
      test(`identity requests, payment routes and hold reconciliation ${width} ${language} ${theme}`, async ({
        page,
      }) => {
        await open(page, width, language, theme);
        await page
          .getByRole("button", {
            name: language === "hi" ? "बात 6" : "Concept 6",
            exact: true,
          })
          .click();
        const board = page.locator(".banking-board");
        await expect(board.locator("a,input")).toHaveCount(0);
        for (let i = 0; i < 3; i++) {
          const option = board.locator(".banking-options button").nth(i);
          await option.click();
          await expect(option).toHaveAttribute("aria-pressed", "true");
          await expect(board.locator(".banking-detail h4")).toHaveText(
            await option.innerText(),
          );
          await board.locator(".banking-actions button").first().click();
          await expect(board.locator(".banking-feedback")).toContainText(
            language === "hi" ? "फिर सोचें" : "Try again",
          );
          await board.locator(".banking-actions button").last().click();
          await expect(board.locator(".banking-feedback")).toContainText(
            language === "hi" ? "बेहतर जवाब" : "Safer response",
          );
        }
        await board.locator(".banking-options button").nth(1).focus();
        await page.keyboard.press("Enter");
        await expect(board.locator(".banking-feedback")).toBeEmpty();
        await expect(page.locator(".concept-carousel")).toBeVisible();
        const root = `docs/screens/banking-kyc/board/${width}-${language}-${theme}`;
        await mkdir(root, { recursive: true });
        await board
          .locator("h3")
          .evaluate((el) =>
            el.scrollIntoView({ block: "start", behavior: "instant" }),
          );
        await page.screenshot({ path: root + "/request.png" });
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await board.locator(".banking-tabs button").nth(1).click();
        for (let i = 0; i < 3; i++) {
          const option = board.locator(".banking-options button").nth(i);
          await option.click();
          await expect(board.locator(".banking-detail h4")).toHaveText(
            await option.innerText(),
          );
        }
        await board
          .locator("h3")
          .evaluate((el) =>
            el.scrollIntoView({ block: "start", behavior: "instant" }),
          );
        await page.screenshot({ path: root + "/routes.png" });
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await board.locator(".banking-tabs button").nth(2).click();
        await expect(board.getByTestId("banking-recorded")).toHaveText(
          "₹10,400",
        );
        await expect(board.getByTestId("banking-available")).toHaveText(
          "₹10,100",
        );
        await expect(board.getByTestId("banking-hold")).toHaveText("₹300");
        const stage = board.getByRole("group", {
          name: language === "hi" ? "पेमेंट का चरण" : "Payment stage",
          exact: true,
        });
        await stage.locator("button").last().click();
        await expect(board.getByTestId("banking-recorded")).toHaveText(
          "₹10,100",
        );
        await expect(board.getByTestId("banking-available")).toHaveText(
          "₹10,100",
        );
        await expect(board.getByTestId("banking-hold")).toHaveText("₹0");
        await expect(board.getByTestId("banking-debit")).toHaveText("₹300");
        await stage.locator("button").first().click();
        const slider = board.getByRole("slider", {
          name:
            language === "hi"
              ? "example पेमेंट की रकम"
              : "Example payment amount",
          exact: true,
        });
        await slider.fill("2000");
        await expect(board.getByTestId("banking-available")).toHaveText(
          "₹8,400",
        );
        await slider.focus();
        await slider.press("ArrowRight");
        await expect(board.getByTestId("banking-available")).toHaveText(
          "₹8,300",
        );
        await stage.locator("button").last().click();
        await expect(board.getByTestId("banking-recorded")).toHaveText(
          "₹8,300",
        );
        await expect(board.getByTestId("banking-available")).toHaveText(
          "₹8,300",
        );
        await board
          .getByRole("button", {
            name:
              language === "hi"
                ? "example पेमेंट हटाएं"
                : "Remove example payment",
            exact: true,
          })
          .click();
        await expect(board.getByTestId("banking-recorded")).toHaveText(
          "₹10,400",
        );
        await expect(board.getByTestId("banking-available")).toHaveText(
          "₹10,400",
        );
        await board
          .getByRole("button", {
            name: language === "hi" ? "example रीसेट करें" : "Reset example",
            exact: true,
          })
          .click();
        await expect(board.getByTestId("banking-available")).toHaveText(
          "₹10,100",
        );
        await expect(stage.locator("button").first()).toHaveAttribute(
          "aria-pressed",
          "true",
        );
        await board
          .locator("h3")
          .evaluate((el) =>
            el.scrollIntoView({ block: "start", behavior: "instant" }),
          );
        await page.screenshot({ path: root + "/reconciliation.png" });
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
          await board.locator(".banking-tabs button").nth(i).click();
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
  test(`banking lesson completes and restores a grouped-number answer ${language}`, async ({
    page,
  }) => {
    await open(page, 360, language);
    await page
      .getByRole("button", {
        name: language === "hi" ? "आज़माएं" : "Let’s try it",
        exact: true,
      })
      .click();
    for (const [i, q] of bankingKycLesson.exercises.entries()) {
      if (q.type === "numeric")
        await page
          .getByRole("textbox", {
            name:
              language === "hi"
                ? "आपका जवाब (सिर्फ़ संख्या)"
                : "Your answer (number only)",
            exact: true,
          })
          .fill(
            language === "hi"
              ? q.answer === 10400
                ? "१०,४००"
                : "१०,१००"
              : q.answer === 10400
                ? "10,400"
                : "10,100",
          );
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
      if (i === 3) {
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
