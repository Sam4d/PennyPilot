import { test, expect } from "@playwright/test";
for (const language of ["en", "hi"] as const)
  test(`first launch chooses ${language} and answers a real question without completing a whole lesson`, async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByTestId("onboarding")).toBeVisible();
    await page
      .getByRole("combobox", { name: /^(?:Language|भाषा)$/, exact: true })
      .selectOption(language);
    const started = Date.now();
    await page.getByTestId("onboarding-start").click();
    await page
      .getByRole("button", {
        name:
          language === "hi"
            ? "नाई को गेहूँ नहीं चाहिए था"
            : "The barber did not want wheat",
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
    expect(Date.now() - started).toBeLessThan(30000);
    await page
      .getByRole("button", {
        name: language === "hi" ? "आगे बढ़ें" : "Continue",
        exact: true,
      })
      .click();
    await page
      .getByRole("button", {
        name: language === "hi" ? "पहला कदम सेव करें" : "Save my first step",
        exact: true,
      })
      .click();
    await expect(page.getByText("+10", { exact: true })).toBeVisible();
    await page
      .getByRole("button", {
        name: language === "hi" ? "सफ़र पर वापस" : "Back to my learning path",
        exact: true,
      })
      .click();
    await page.reload();
    await expect(page.getByTestId("onboarding")).toHaveCount(0);
    const completed = await page.evaluate(
      () =>
        new Promise((resolve) => {
          const r = indexedDB.open("penny-pilot");
          r.onsuccess = () => {
            const db = r.result;
            const q = db
              .transaction("state")
              .objectStore("state")
              .get("progress");
            q.onsuccess = () => {
              resolve(Object.keys(q.result.value.completed).length);
              db.close();
            };
          };
        }),
    );
    expect(completed).toBe(0);
  });
