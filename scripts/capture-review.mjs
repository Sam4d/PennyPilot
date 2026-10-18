import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const phase = process.argv[2] ?? "before";
const b = await chromium.launch({
  executablePath: process.env.PENNY_BROWSER_EXECUTABLE || undefined,
  args: ["--no-sandbox"],
});
for (const width of [360, 1440])
  for (const language of ["en", "hi"])
    for (const theme of ["light", "dark"]) {
      const p = await b.newPage({
        viewport: { width, height: width === 360 ? 800 : 900 },
      });
      await p.emulateMedia({ reducedMotion: "reduce" });
      await p.goto("http://127.0.0.1:5173");
      await p
        .getByRole("combobox", { name: /^(?:Language|भाषा)$/, exact: true })
        .first()
        .selectOption(language);
      await p.evaluate(
        async ({ language, theme }) => {
          const r = indexedDB.open("penny-pilot");
          await new Promise((ok, fail) => {
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
      await p.reload();
      await p.locator("#main h1").first().waitFor();
      const root = `docs/screens/foundation-redesign/${phase}/${width}-${language}-${theme}`;
      await mkdir(root, { recursive: true });
      await p.goto("http://127.0.0.1:5173/#curriculum");
      await p.locator(".curriculum").waitFor();
      await p.screenshot({ path: root + "/curriculum.png" });
      if (process.argv.includes("--curriculum-only")) {
        await p.close();
        continue;
      }
      for (const route of [
        "learn",
        "revise",
        "tools",
        "insurance",
        "notebook",
        "me",
        "about",
      ]) {
        await p.goto("http://127.0.0.1:5173/#" + route);
        await p.locator("#main h1").first().waitFor();
        await p.screenshot({ path: root + "/" + route + ".png" });
      }
      await p.goto("http://127.0.0.1:5173/#learn");
      await p
        .getByRole("button", {
          name:
            language === "hi"
              ? "शुरू करें: पैसों से दोस्ती, अगला पाठ"
              : "LET’S GO: Meet your money, next lesson",
          exact: true,
        })
        .click();
      await p
        .getByRole("button", {
          name: language === "hi" ? "पाठ शुरू करें" : "Let’s learn this",
          exact: true,
        })
        .click();
      await p.locator(".concept-carousel").waitFor();
      await p.screenshot({ path: root + "/lesson.png" });
      await p
        .getByRole("button", {
          name: language === "hi" ? "आज़माएं" : "Let’s try it",
          exact: true,
        })
        .click();
      await p.locator(".answer-options").waitFor();
      await p.screenshot({ path: root + "/exercise.png" });
      await p
        .getByRole("button", {
          name:
            language === "hi"
              ? "नाई को गेहूँ नहीं चाहिए था"
              : "The barber did not want wheat",
          exact: false,
        })
        .click();
      await p
        .getByRole("button", {
          name: language === "hi" ? "जवाब देखें" : "Check answer",
          exact: true,
        })
        .click();
      await p.locator(".answer-feedback.right").waitFor();
      await p.screenshot({ path: root + "/feedback.png" });
      await p
        .getByRole("button", {
          name: /^(?:Close dialog|संवाद बंद करें)$/,
          exact: true,
        })
        .click();
      await p.getByTestId("confirm-exit").waitFor();
      await p.screenshot({ path: root + "/exit.png" });
      await p.close();
      const intro = await b.newPage({
        viewport: { width, height: width === 360 ? 800 : 900 },
      });
      await intro.emulateMedia({ reducedMotion: "reduce" });
      await intro.goto("http://127.0.0.1:5173");
      await intro
        .getByRole("combobox", { name: /^(?:Language|भाषा)$/, exact: true })
        .selectOption(language);
      await intro.evaluate((theme) => {
        document.documentElement.dataset.theme = theme;
      }, theme);
      await intro.evaluate(() => document.fonts.ready);
      await intro.screenshot({ path: root + "/onboarding.png" });
      await intro.close();
    }
await b.close();
