import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { identitySafetyLesson } from "../../src/content/identity-safety";
import { closeDialog } from "./helpers";
for (const width of [360, 1440])
  for (const language of ["en", "hi"] as const)
    for (const theme of ["light", "dark"] as const)
      test(`identity inspection, independent verification and layout ${width} ${language} ${theme}`, async ({
        page,
      }) => {
        await page.setViewportSize({
          width,
          height: width === 360 ? 800 : 900,
        });
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
        await page.goto("/#curriculum/S0.9.2");
        await page
          .getByRole("button", {
            name: language === "hi" ? "यह पाठ खोलें" : "Open this lesson",
            exact: true,
          })
          .click();
        await page
          .getByRole("button", {
            name: language === "hi" ? "बात 6" : "Concept 6",
            exact: true,
          })
          .click();
        const board = page.locator(".identity-board");
        await expect(board.locator(".identity-count")).toContainText("0");
        await expect(board.locator("a,input")).toHaveCount(0);
        for (const scenario of [0, 1, 2]) {
          await board.locator(".identity-cases button").nth(scenario).click();
          await expect(board.locator(".identity-count")).toContainText("0");
          await expect(board.locator(".identity-feedback")).toBeEmpty();
          for (let i = 0; i < 3; i++) {
            const button = board.locator(".identity-clues button").nth(i);
            await button.click();
            await expect(button).toHaveAttribute("aria-expanded", "true");
            await expect(board.locator(`#identity-clue-${i}`)).toBeVisible();
          }
          await expect(board.locator(".identity-count")).toContainText("3");
          await board.locator(".identity-decisions button").first().click();
          await expect(board.locator(".identity-feedback")).toContainText(
            language === "hi" ? "फिर सोचें" : "Try again",
          );
          await board.locator(".identity-decisions button").last().click();
          await expect(board.locator(".identity-feedback")).toContainText(
            language === "hi" ? "बेहतर जवाब" : "Safer response",
          );
        }
        const root = `docs/screens/fraud-safety/board/${width}-${language}-${theme}`;
        await mkdir(root, { recursive: true });
        await board.scrollIntoViewIfNeeded();
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: root + "/board.png" });
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        for (const button of await board.locator("button").all()) {
          const box = await button.boundingBox();
          expect(box!.height).toBeGreaterThanOrEqual(44);
        }
        await page.evaluate(() => {
          document.documentElement.style.fontSize = "200%";
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
for (const language of ["en", "hi"] as const)
  test(`identity lesson completes and resumes answered practice ${language}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    await page
      .getByRole("combobox", { name: /^(Language|भाषा)$/ })
      .selectOption(language);
    await page.getByTestId("onboarding-explore").click();
    await page.goto("/#curriculum/S0.9.2");
    await page
      .getByRole("button", {
        name: language === "hi" ? "यह पाठ खोलें" : "Open this lesson",
        exact: true,
      })
      .click();
    await page
      .getByRole("button", {
        name: language === "hi" ? "आज़माएं" : "Let’s try it",
        exact: true,
      })
      .click();
    for (const [i, q] of identitySafetyLesson.exercises.entries()) {
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
      if (i === 1) {
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
