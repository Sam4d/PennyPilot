import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { lessons } from "../../src/content/lessons";
import { freshProgress, type Progress } from "../../src/lib/store";
import { closeDialog } from "./helpers";
import { mkdir } from "node:fs/promises";

async function readProgress(page: Page): Promise<Progress> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("penny-pilot");
        request.onerror = reject;
        request.onsuccess = () => {
          const db = request.result,
            tx = db.transaction("state"),
            get = tx.objectStore("state").get("progress");
          get.onsuccess = () => resolve(get.result.value);
          get.onerror = reject;
          tx.oncomplete = () => db.close();
        };
      }),
  );
}
async function setup(
  page: Page,
  width: number,
  language: "en" | "hi",
  extra = false,
  theme: "light" | "dark" = "light",
) {
  await page.setViewportSize({ width, height: width === 360 ? 800 : 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install({ time: new Date("2026-10-23T06:00:00Z") });
  await page.goto("/");
  await page
    .getByRole("combobox", { name: /^(Language|भाषा)$/ })
    .selectOption(language);
  await page.getByTestId("onboarding-explore").click();
  const item = (
    questionId: string,
    lessonId: string,
    due: string,
    wrong = 0,
    repetitions = 1,
  ) => ({
    questionId,
    lessonId,
    due,
    wrong,
    repetitions,
    ease: 2.5,
    interval: 1,
  });
  const progress: Progress = {
    ...freshProgress(),
    onboarded: true,
    language,
    theme,
    xp: 80,
    completed: {
      money: { score: 4, total: 8, date: "2026-10-20", attempts: 1 },
    },
    saved: ["money"],
    notes: { money: "My original note" },
    reviews: {
      "money-1": item("money-1", "money", "2026-10-21", 1, 0),
      "income-1": item("income-1", "income", "2026-10-23"),
      ...(extra
        ? {
            "money-2": item("money-2", "money", "2026-10-24"),
            "money-3": item("money-3", "money", "2026-11-01", 2, 2),
          }
        : {}),
    },
  };
  await page.evaluate(async (progress) => {
    const r = indexedDB.open("penny-pilot");
    await new Promise<void>((resolve, reject) => {
      r.onerror = reject;
      r.onsuccess = () => {
        const db = r.result,
          tx = db.transaction("state", "readwrite");
        tx.objectStore("state").put({ id: "progress", value: progress });
        tx.oncomplete = () => {
          db.close();
          resolve();
        };
        tx.onerror = reject;
      };
    });
  }, progress);
  await page.goto("/#revise");
  await page.reload();
  await expect(page.locator(".revision-planner")).toBeVisible();
}

for (const width of [360, 1440])
  for (const language of ["en", "hi"] as const) {
    const hi = language === "hi";
    test(`revision plan survives answers, exit, reload and topic transitions ${width} ${language}`, async ({
      page,
    }) => {
      await setup(page, width, language);
      await page.getByTestId("start-revision-plan").click();
      await expect(
        page.getByRole("dialog").locator(".review-plan-progress"),
      ).toContainText("0 / 2");
      const first = lessons[0].exercises[0];
      await page
        .getByRole("button", {
          name: first.options![first.answer as number][language],
          exact: false,
        })
        .click();
      await page
        .getByRole("button", {
          name: hi ? "जवाब देखें" : "Check answer",
          exact: true,
        })
        .click();
      await expect(page.locator(".answer-feedback.right")).toBeVisible();
      await closeDialog(page);
      await page.reload();
      await page.getByTestId("resume-revision").click();
      await expect(page.locator(".answer-feedback.right")).toBeVisible();
      await expect(page.locator(".review-plan-progress")).toContainText(
        "1 / 2",
      );
      await page
        .getByRole("button", {
          name: hi ? "आगे बढ़ें" : "Continue",
          exact: true,
        })
        .click();
      await page
        .getByRole("button", {
          name: hi ? "यह दोहराई सेव करें" : "Save this revision",
          exact: true,
        })
        .click();
      const earned = (await readProgress(page)).xp;
      await closeDialog(page);
      await page.reload();
      await page.getByTestId("resume-revision").click();
      expect((await readProgress(page)).xp).toBe(earned);
      await page
        .getByRole("button", {
          name: hi ? "अगला टॉपिक दोहराएं" : "Review next topic",
          exact: true,
        })
        .click();
      const second = lessons.find((l) => l.id === "income")!.exercises[0];
      await expect(page.locator(".question-content h2")).toContainText(
        second.prompt[language],
      );
      await expect(page.locator(".review-plan-progress")).toContainText(
        "1 / 2",
      );
      await page
        .getByRole("button", {
          name: second.options![second.answer as number][language],
          exact: false,
        })
        .click();
      await page
        .getByRole("button", {
          name: hi ? "जवाब देखें" : "Check answer",
          exact: true,
        })
        .click();
      await page
        .getByRole("button", {
          name: hi ? "आगे बढ़ें" : "Continue",
          exact: true,
        })
        .click();
      await page
        .getByRole("button", {
          name: hi ? "यह दोहराई सेव करें" : "Save this revision",
          exact: true,
        })
        .click();
      await page
        .getByRole("button", {
          name: hi ? "दोहराई पर वापस" : "Back to revision",
          exact: true,
        })
        .click();
      await expect(page.getByRole("dialog")).toHaveCount(0);
      const saved = await readProgress(page);
      expect(saved.version).toBe(3);
      expect(saved.session).toBeNull();
      expect(saved.completed.money.score).toBe(4);
      expect(saved.completed).not.toHaveProperty("income");
      expect(saved.saved).toEqual(["money"]);
      expect(saved.notes.money).toBe("My original note");
      expect(saved.reviews["money-1"].repetitions).toBe(1);
      expect(saved.reviews["income-1"].due).toBe("2026-10-29");
    });
    for (const theme of ["light", "dark"] as const)
      test(`revision calendar, modes and accessible layout ${width} ${language} ${theme}`, async ({
        page,
      }) => {
        await setup(page, width, language, true, theme);
        await page.evaluate(() => document.fonts.ready);
        const root = `docs/screens/revision-planner/verified/${width}-${language}-${theme}`;
        await mkdir(root, { recursive: true });
        await page.screenshot({ path: root + "/planner.png", fullPage: true });
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        const planner = page.locator(".revision-planner");
        await expect(planner.locator(".revision-selection")).toContainText("2");
        await planner
          .getByRole("button", {
            name: hi ? "और अभ्यास करें 1" : "Needs practice 1",
            exact: true,
          })
          .click();
        await expect(planner.locator(".revision-plan-topics li")).toHaveCount(
          1,
        );
        await planner.locator(".revision-week button").nth(1).click();
        await expect(planner.locator(".revision-plan-topics li")).toHaveCount(
          1,
        );
        await expect(planner.locator(".revision-selection")).toContainText("1");
        await planner
          .getByRole("button", {
            name: hi ? "सीखे हुए सभी सवाल 4" : "All learned questions 4",
            exact: true,
          })
          .click();
        await expect(planner.locator(".revision-selection")).toContainText("4");
        await planner.locator(".revision-week button").nth(2).click();
        await expect(page.getByTestId("start-revision-plan")).toHaveCount(0);
        await expect(planner.locator(".revision-no-questions")).toBeVisible();
        await page.evaluate(() => {
          document.documentElement.style.fontSize = "32px";
          document.documentElement.dataset.largeText = "true";
        });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      });
  }

test("replacing an unfinished plan needs confirmation and preserves checked history", async ({
  page,
}) => {
  await setup(page, 360, "en");
  await page.getByTestId("start-revision-plan").click();
  await closeDialog(page);
  await page.getByTestId("start-revision-plan").click();
  await expect(
    page.getByRole("dialog", { name: "Replace saved practice?" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Keep saved practice", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByTestId("start-revision-plan").click();
  await page.getByTestId("confirm-revision-plan").click();
  await expect(page.locator(".review-plan-progress")).toContainText("0 / 2");
  const saved = await readProgress(page);
  expect(saved.reviews["money-1"].wrong).toBe(1);
  expect(saved.completed.money.score).toBe(4);
});
