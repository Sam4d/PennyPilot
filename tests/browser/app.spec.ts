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
    if (q.type === "choice" || q.type === "document")
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
      if (q.type === "choice" || q.type === "document")
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
      else if (q.type === "bucket")
        for (const [i, category] of (q.answer as number[]).entries())
          await dialog
            .getByRole("group", { name: q.options![i].en, exact: true })
            .getByRole("radio", {
              name: q.categories![category].en,
              exact: true,
            })
            .check();
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

for (const theme of ["light", "dark"]) {
  test(`bank statement and sorting work after reload in ${theme} mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 360, height: 800 });
    if (theme === "dark") {
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("button", { name: "Me", exact: true })
        .click();
      await page
        .getByRole("button", { name: "After hours", exact: true })
        .click();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("button", { name: "Learn", exact: true })
        .click();
    }
    const bank = lessons.find((l) => l.id === "banking")!;
    await page
      .getByRole("button", {
        name: `${bank.title.en}, available lesson`,
        exact: true,
      })
      .click();
    await page.getByRole("button", { name: "Let’s learn this" }).click();
    await page.getByRole("button", { name: "Let’s try it" }).click();
    const dialog = page.getByRole("dialog");
    await expect(
      dialog.getByRole("button", { name: "Check answer", exact: true }),
    ).toBeDisabled();
    await dialog
      .getByRole("button", { name: /Opening balance · ₹10,000/ })
      .click();
    await dialog
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await expect(
      dialog.getByText("Correct answer: Rent · DEBIT −₹12,000", {
        exact: true,
      }),
    ).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await dialog.getByRole("button", { name: "Continue", exact: true }).click();
    await dialog.getByRole("spinbutton").fill("28000");
    await dialog
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await dialog.getByRole("button", { name: "Continue", exact: true }).click();
    await dialog.getByRole("button", { name: /False/ }).click();
    await dialog
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await dialog.getByRole("button", { name: "Continue", exact: true }).click();
    const q = bank.exercises[3];
    const group = (i: number) =>
      dialog.getByRole("group", { name: q.options![i].en, exact: true });
    await group(0)
      .getByRole("radio", { name: "Money in", exact: true })
      .check();
    await expect(
      dialog.getByRole("button", { name: "Check answer", exact: true }),
    ).toBeDisabled();
    for (let i = 1; i < q.options!.length; i++)
      await group(i)
        .getByRole("radio", {
          name: q.categories![(q.answer as number[])[i]].en,
          exact: true,
        })
        .check();
    // Changing a completed classification must grade the latest mapping.
    await group(0)
      .getByRole("radio", { name: "Money out", exact: true })
      .check();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await dialog
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await expect(
      group(0).getByText("Correct bucket: Money in", { exact: true }),
    ).toBeVisible();
    await dialog.getByRole("button", { name: "Close dialog" }).click();
    await page.reload();
    await page
      .getByRole("button", { name: "Continue lesson", exact: true })
      .click();
    await expect(
      group(0).getByRole("radio", { name: "Money out", exact: true }),
    ).toBeChecked();
    await expect(
      group(0).getByRole("radio", { name: "Money out", exact: true }),
    ).toBeDisabled();
    await expect(
      group(0).getByText("Correct bucket: Money in", { exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
}

test("new Hindi money models respond to the sliders", async ({ page }) => {
  await page
    .getByRole("combobox", { name: "Language", exact: true })
    .selectOption("hi");
  for (const [id, value, result] of [
    ["inflation", "50", "2"],
    ["banking", "20000", "₹20,000"],
    ["credit-card", "10000", "₹0"],
    ["debt-plan", "2000", "₹40"],
  ]) {
    const lesson = lessons.find((l) => l.id === id)!;
    await page
      .getByRole("button", {
        name: `${lesson.title.hi}, available lesson`,
        exact: true,
      })
      .click();
    await page
      .getByRole("button", { name: "पाठ शुरू करें", exact: true })
      .click();
    await page.getByRole("button", { name: "Concept 3", exact: true }).click();
    const visual = page.locator(`.visual-${id}`);
    await visual.getByRole("slider").fill(value);
    await expect(
      visual.getByText(result, { exact: false }).first(),
    ).toBeVisible();
    await page.getByRole("button", { name: "Close dialog" }).click();
  }
});

test("a version-one backup keeps six completed lessons and opens the new batch", async ({
  page,
}) => {
  const legacy = {
    version: 1,
    name: "Aman",
    language: "en",
    theme: "light",
    goal: 50,
    xp: 600,
    days: {},
    completed: Object.fromEntries(
      ["money", "income", "budget", "safety", "compound", "emergency"].map(
        (id) => [id, { score: 8, total: 8, date: "2026-10-01", attempts: 1 }],
      ),
    ),
    reviews: {},
    notes: { money: "Money makes barter easier." },
    saved: ["money"],
    session: null,
    sound: true,
    scale: 1,
  };
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("button", { name: "Me", exact: true })
    .click();
  await page.locator("input[type=file]").setInputFiles({
    name: "penny-pilot-v1.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(legacy)),
  });
  await page.getByRole("button", { name: "Restore this backup" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("button", { name: "Learn", exact: true })
    .click();
  await expect(
    page.getByRole("button", {
      name: "LET’S GO: Same rupees. Smaller basket., next lesson",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /, completed$/, exact: false }),
  ).toHaveCount(6);
  await page.getByRole("button", { name: "Keep learning" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Same rupees. Smaller basket.",
      exact: true,
    }),
  ).toBeVisible();
});

for (const theme of ["light", "dark"]) {
  test(`protection models explain shares and limits in ${theme} mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 360, height: 800 });
    if (theme === "dark") {
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("button", { name: "Me", exact: true })
        .click();
      await page
        .getByRole("button", { name: "After hours", exact: true })
        .click();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("button", { name: "Learn", exact: true })
        .click();
    }
    await expect(page.locator(".path-card")).toHaveCount(3);
    await expect(page.locator(".lesson-node")).toHaveCount(13);
    for (const id of ["insurance", "health-cover", "term-cover"]) {
      const lesson = lessons.find((l) => l.id === id)!;
      await page
        .getByRole("button", {
          name: `${lesson.title.en}, available lesson`,
          exact: true,
        })
        .click();
      await page
        .getByRole("button", { name: "Let’s learn this", exact: true })
        .click();
      await page
        .getByRole("button", { name: "Concept 3", exact: true })
        .click();
      const visual = page.locator(`.visual-${id}`);
      if (id === "insurance") {
        await visual
          .getByRole("button", { name: "Excluded treatment", exact: true })
          .click();
        await expect(
          visual
            .locator(".claim-legend > span")
            .nth(1)
            .getByText("₹40,000", { exact: true }),
        ).toBeVisible();
        await expect(
          visual.getByRole("button", {
            name: "Excluded treatment",
            exact: true,
          }),
        ).toHaveAttribute("aria-pressed", "true");
      } else if (id === "health-cover") {
        await visual
          .getByRole("slider", {
            name: "Your share of eligible costs (co-pay %)",
            exact: true,
          })
          .fill("30");
        await expect(
          visual
            .locator(".claim-legend > span")
            .nth(1)
            .getByText("₹22,000", { exact: true }),
        ).toBeVisible();
        await visual
          .getByRole("slider", {
            name: "Available cover in rupees",
            exact: true,
          })
          .fill("10000");
        await expect(
          visual
            .locator(".claim-legend > span")
            .nth(1)
            .getByText("₹40,000", { exact: true }),
        ).toBeVisible();
        await expect(
          visual
            .locator(".claim-breakdown")
            .getByText("₹18,000", { exact: true }),
        ).toBeVisible();
        await visual
          .getByRole("slider", {
            name: "Available cover in rupees",
            exact: true,
          })
          .fill("0");
        await expect(
          visual
            .locator(".claim-legend > span")
            .nth(1)
            .getByText("₹50,000", { exact: true }),
        ).toBeVisible();
      } else {
        await visual
          .getByRole("slider", {
            name: "Monthly essential family costs",
            exact: true,
          })
          .fill("10000");
        await visual
          .getByRole("slider", {
            name: "Years of support in this example",
            exact: true,
          })
          .fill("1");
        await expect(
          visual
            .locator(".support-result")
            .getByText("₹20,000", { exact: true }),
        ).toBeVisible();
        await expect(
          visual.getByText("A planning example, not a cover recommendation", {
            exact: true,
          }),
        ).toBeVisible();
      }
      expect(
        (await new AxeBuilder({ page }).include(".learning-visual").analyze())
          .violations,
      ).toEqual([]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.getByRole("button", { name: "Close dialog" }).click();
    }
  });
}
