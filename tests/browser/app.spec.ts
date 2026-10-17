import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { lessons } from "../../src/content/lessons";
// Most regression cases exercise the optional English mode. Select it through
// the UI and wait for the saved preference, so reload tests remain realistic.
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("combobox", { name: "Language", exact: true })
    .selectOption("en");
  await page.waitForFunction(
    () =>
      new Promise<boolean>((resolve) => {
        const open = indexedDB.open("penny-pilot");
        open.onerror = () => resolve(false);
        open.onsuccess = () => {
          const db = open.result;
          const tx = db.transaction("state", "readonly");
          const read = tx.objectStore("state").get("progress");
          read.onsuccess = () => resolve(read.result?.value.language === "en");
          read.onerror = () => resolve(false);
          tx.oncomplete = () => db.close();
        };
      }),
  );
});
test("complete a real lesson, resume after reload, and keep personal notes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.getByRole("button", { name: "Let’s start with Mia" }).click();
  await page.getByRole("button", { name: "Let’s try it" }).click();
  for (let i = 0; i < 8; i++) {
    const q = lessons[0].exercises[i];
    if (q.type === "choice")
      await page
        .getByRole("button", {
          name: new RegExp(
            q.options![q.answer as number].en.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&",
            ),
          ),
        })
        .click();
    else if (q.type === "numeric")
      await page.getByRole("spinbutton").fill(String(q.answer));
    else
      for (const index of q.answer as number[])
        await page
          .getByRole("button", { name: q.options![index].en, exact: false })
          .click();
    await page
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await expect(page.getByText("That’s it. Nicely done!")).toBeVisible();
    if (i === 0) {
      await page.reload();
      await page
        .getByRole("button", { name: "Continue lesson", exact: true })
        .click();
      await expect(page.getByText("That’s it. Nicely done!")).toBeVisible();
      await expect(
        page.getByRole("dialog").getByText("10 XP", { exact: true }),
      ).toBeVisible();
    }
    await page.getByRole("button", { name: "Continue", exact: true }).click();
  }
  await expect(
    page.getByRole("heading", { name: "Your pocket-sized wisdom." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Finish lesson" }).click();
  await expect(page.getByText("+100", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Back to my learning path" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("button", { name: "Notebook" })
    .click();
  await page
    .getByRole("button", { name: /MONEY FOUNDATIONS.*Meet your money/ })
    .click();
  await page
    .getByRole("textbox", { name: "In your own words" })
    .pressSequentially("Price is not the same as value.");
  await expect(
    page.getByRole("textbox", { name: "In your own words" }),
  ).toHaveValue("Price is not the same as value.");
  await page.getByRole("button", { name: "Tuck it away" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.reload();
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("button", { name: "Notebook" })
    .click();
  await expect(
    page.getByText("“Price is not the same as value.”"),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("calculators update with sliders and handle zero return", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("button", { name: "Playground" })
    .click();
  const slider = page.getByRole("slider", { name: "Assumed annual return" });
  await slider.fill("0");
  await expect(page.locator(".big-result")).toHaveText("₹6,00,000");
  await page.getByRole("tab", { name: "Loan & EMI" }).click();
  await page.getByRole("slider", { name: "Annual interest rate" }).fill("0");
  await expect(page.locator(".big-result")).toHaveText("₹4,167");
  await page.getByRole("tab", { name: "Safety cushion" }).click();
  await expect(page.locator(".big-result")).toHaveText("₹1,20,000");
});
test("curriculum exposes 16 worlds and searches advanced topics", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "All worlds" }).click();
  await page
    .getByRole("navigation", { name: "Curriculum worlds" })
    .getByRole("button", { name: "Think like an analyst" })
    .click();
  await page.getByRole("textbox", { name: "Search curriculum" }).fill("cash");
  await page.getByText("Cash Flow Statement", { exact: true }).click();
  await expect(
    page.getByText("Why Cash is King", { exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("Hindi lesson text, mobile layouts and reduced motion work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("combobox", { name: "Language", exact: true })
    .selectOption("hi");
  await page.getByRole("button", { name: "मिया के साथ शुरू करें" }).click();
  await expect(
    page.getByRole("heading", { name: "पैसों से दोस्ती" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "आज़माएं" }).click();
  await expect(
    page.getByRole("heading", { name: "राजू की अदला-बदली मुश्किल क्यों थी?" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test("valid backups restore and malformed backups leave progress intact", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("button", { name: "Me", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "What should Mia call you?" })
    .fill("Aman");
  await page.locator("input[type=file]").setInputFiles({
    name: "bad.json",
    mimeType: "application/json",
    buffer: Buffer.from('{"version":999}'),
  });
  await expect(page.getByRole("alert")).toContainText("invalid");
  await expect(
    page.getByRole("textbox", { name: "What should Mia call you?" }),
  ).toHaveValue("Aman");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export my progress" }).click();
  const file = await download;
  const path = await file.path();
  expect(path).toBeTruthy();
  await page
    .getByRole("textbox", { name: "What should Mia call you?" })
    .fill("Priya");
  await page.locator("input[type=file]").setInputFiles(path!);
  await page.getByRole("button", { name: "Restore this backup" }).click();
  await expect(
    page.getByRole("textbox", { name: "What should Mia call you?" }),
  ).toHaveValue("Aman");
});
test("home has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("heading", { name: "A little wiser. Every day." })
    .waitFor();
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact || ""),
    ),
  ).toEqual([]);
});
for (const lesson of lessons.slice(1)) {
  test(`finish all eight exercises in ${lesson.id}`, async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("button", {
        name: new RegExp(
          `${lesson.title.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}, available lesson`,
        ),
      })
      .click();
    await page.getByRole("button", { name: "Let’s learn this" }).click();
    await page.getByRole("button", { name: "Let’s try it" }).click();
    for (const q of lesson.exercises) {
      const dialog = page.getByRole("dialog");
      if (q.type === "choice")
        await dialog
          .getByRole("button", {
            name: new RegExp(
              q.options![q.answer as number].en.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&",
              ),
            ),
          })
          .click();
      else if (q.type === "numeric")
        await dialog.getByRole("spinbutton").fill(String(q.answer));
      else
        for (const i of q.answer as number[])
          await dialog
            .getByRole("button", { name: q.options![i].en, exact: false })
            .click();
      await dialog
        .getByRole("button", { name: "Check answer", exact: true })
        .click();
      await expect(dialog.getByText("That’s it. Nicely done!")).toBeVisible();
      await dialog
        .getByRole("button", { name: "Continue", exact: true })
        .click();
    }
    await page.getByRole("button", { name: "Finish lesson" }).click();
    await expect(page.getByText("+100", { exact: true })).toBeVisible();
  });
}
test("a mistaken answer is explained and saved for revision", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Let’s start with Mia" }).click();
  await page.getByRole("button", { name: "Let’s try it" }).click();
  await page.getByRole("button", { name: "Wheat has no use" }).click();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(page.getByText("A good moment to learn.")).toBeVisible();
  await expect(
    page.getByText("Correct answer: The barber did not want wheat"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close dialog" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("button", { name: "Revise" })
    .click();
  await expect(
    page.getByRole("heading", { name: "A little extra attention." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Meet your money Practise again" })
    .click();
  await expect(
    page.getByRole("dialog").getByText("DAILY REFRESH", { exact: false }),
  ).toBeVisible();
});
test("200 percent text size reflows without horizontal scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name: "Me", exact: true })
    .click();
  await page.getByRole("slider", { name: "Text size" }).fill("2");
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name: "Learn", exact: true })
    .click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(
    page.getByRole("button", { name: "Let’s start with Mia" }),
  ).toBeVisible();
});
test("the swipeable worked example is an interactive money model", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Let’s start with Mia" }).click();
  await page.getByRole("button", { name: "Next concept", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Concept 2", exact: true }),
  ).toHaveAttribute("aria-current", "step");
  await page.getByRole("button", { name: "Concept 3", exact: true }).click();
  const slider = page.getByRole("slider", {
    name: "What if the haircut costs…",
  });
  await expect(slider).toBeInViewport();
  await slider.fill("140");
  await expect(
    page.getByRole("dialog").getByText("₹60", { exact: true }),
  ).toBeVisible();
});
test("browser back restores the previous screen", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("button", { name: "Playground" })
    .click();
  await expect(page).toHaveURL(/#tools$/);
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("button", { name: "Notebook" })
    .click();
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "What if? Let’s find out." }),
  ).toBeVisible();
});
