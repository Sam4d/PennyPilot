import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
const root = resolve("dist");
let generation = 0;
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};
const server = createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, "http://localhost").pathname;
    const file = resolve(
      root,
      pathname === "/" ? "index.html" : "." + decodeURIComponent(pathname),
    );
    if (!file.startsWith(root + sep)) {
      res.writeHead(403).end();
      return;
    }
    let body = await readFile(file);
    if (pathname === "/sw.js")
      body = Buffer.concat([
        body,
        Buffer.from(`\n// update-test-generation: ${generation}\n`),
      ]);
    res
      .writeHead(200, {
        "Content-Type": types[extname(file)] || "application/octet-stream",
        "Cache-Control": "no-store",
      })
      .end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const browser = await chromium.launch({
  executablePath: process.env.PENNY_BROWSER_EXECUTABLE || undefined,
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page
    .getByRole("combobox", { name: /^(?:Language|भाषा)$/, exact: true })
    .selectOption("en");
  if (await page.getByTestId("onboarding-explore").isVisible())
    await page.getByTestId("onboarding-explore").click();
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("button", { name: "Me", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "What should Mia call you?", exact: true })
    .fill("Saved before updating");
  generation = 1;
  await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    await reg.update();
  });
  const update = page.getByRole("button", {
    name: "Save and update",
    exact: true,
  });
  await update.waitFor();
  const reload = page.waitForEvent("load");
  await update.click();
  await reload;
  await page
    .getByRole("textbox", { name: "What should Mia call you?", exact: true })
    .waitFor();
  assert.equal(
    await page
      .getByRole("textbox", { name: "What should Mia call you?", exact: true })
      .inputValue(),
    "Saved before updating",
  );
  assert.equal(
    await page
      .getByRole("banner")
      .getByRole("combobox", { name: /^(?:Language|भाषा)$/, exact: true })
      .inputValue(),
    "en",
  );
  console.log(
    "PASS: real service-worker replacement offers an update, saves progress, reloads and preserves English.",
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
