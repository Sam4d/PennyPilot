import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [360, 1440])
  for (const language of ["en", "hi"])
    for (const theme of ["light", "dark"])
      test(`main screens ${width} ${language} ${theme}`, async ({ page }) => {
        test.setTimeout(120000);
        await page.setViewportSize({
          width,
          height: width === 360 ? 800 : 900,
        });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.clock.install({ time: new Date("2026-10-18T06:00:00Z") });
        await page.goto("/");
        await page
          .getByRole("combobox", { name: /^(?:Language|भाषा)$/, exact: true })
          .selectOption(language);
        await page.getByTestId("onboarding-explore").click();
        await page.evaluate(
          async ({ language, theme }) => {
            const r = indexedDB.open("penny-pilot");
            await new Promise<void>((ok, fail) => {
              r.onerror = fail;
              r.onsuccess = () => {
                const db = r.result;
                const tx = db.transaction("state", "readwrite");
                const q = tx.objectStore("state").get("progress");
                q.onsuccess = () =>
                  tx.objectStore("state").put({
                    id: "progress",
                    value: {
                      ...q.result.value,
                      language,
                      theme,
                      onboarded: true,
                    },
                  });
                tx.oncomplete = () => {
                  db.close();
                  ok();
                };
              };
            });
          },
          { language, theme },
        );
        await page.reload();
        for (const route of [
          "learn",
          "revise",
          "tools",
          "insurance",
          "notebook",
          "me",
        ]) {
          await page.goto("/#" + route);
          await expect(
            page.locator("#main").getByRole("heading", { level: 1 }),
          ).toBeVisible();
          await page.evaluate(() => document.fonts.ready);
          await expect(page).toHaveScreenshot(
            `${width}-${language}-${theme}-${route}.png`,
            { animations: "disabled", maxDiffPixelRatio: 0.001 },
          );
          expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
            [],
          );
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          ).toBe(true);
        }
      });
