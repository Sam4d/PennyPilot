import { chromium } from "@playwright/test";
import { writeFile, mkdir } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.PENNY_BROWSER_EXECUTABLE || undefined,
  args: ["--no-sandbox"],
});
const results = [];
for (let sample = 1; sample <= 3; sample++) {
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: 200000,
    uploadThroughput: 93750,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    window.__pennyMetrics = { lcp: 0, cls: 0 };
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        window.__pennyMetrics.lcp = e.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        if (!e.hadRecentInput) window.__pennyMetrics.cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  const began = Date.now();
  await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  await page.getByTestId("onboarding-start").waitFor();
  await page.waitForTimeout(1000);
  const metrics = await page.evaluate(() => ({
    ...window.__pennyMetrics,
    fcp:
      performance.getEntriesByName("first-contentful-paint")[0]?.startTime ??
      null,
    resources: performance.getEntriesByType("resource").length,
  }));
  await page.getByTestId("onboarding-start").click();
  await page.locator(".answer-options").waitFor();
  const ready = Date.now() - began;
  await page.waitForTimeout(500);
  results.push({
    sample,
    ...metrics,
    firstQuestionReadyMs: ready,
    clsThroughQuestion: await page.evaluate(() => window.__pennyMetrics.cls),
  });
  await context.close();
}
await browser.close();
await mkdir("docs/screens/foundation-redesign", { recursive: true });
const report = {
  conditions: {
    cpuSlowdown: 4,
    latencyMs: 150,
    downloadMbps: 1.6,
    uploadMbps: 0.75,
    viewport: "360x800",
    samples: 3,
    cache: "new browser context, browser cache disabled",
    scope:
      "local production HTTP server; not a physical phone or public deployment",
  },
  results,
  lighthouseScores:
    "Not verified: Lighthouse is not installed; these are measured browser timings, not converted scores.",
};
await writeFile(
  "docs/screens/foundation-redesign/performance.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
