import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "tests/browser",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:5173",
    headless: true,
    launchOptions: {
      executablePath: process.env.PENNY_USE_PLAYWRIGHT_BROWSER
        ? undefined
        : "/usr/bin/chromium",
      args: ["--no-sandbox"],
    },
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: true,
  },
  reporter: "list",
});
