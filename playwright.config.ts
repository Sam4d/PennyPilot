import { defineConfig, devices } from "@playwright/test";
const production = process.env.PENNY_TEST_PRODUCTION === "1";
export default defineConfig({
  testDir: "tests/browser",
  fullyParallel: true,
  snapshotPathTemplate:
    "{testDir}/../../docs/screens/foundation-redesign/visual-baselines/{arg}{ext}",
  workers: 2,
  use: {
    baseURL: production ? "http://127.0.0.1:4173" : "http://127.0.0.1:5173",
    headless: true,
    launchOptions: {
      executablePath: process.env.PENNY_BROWSER_EXECUTABLE || undefined,
      args: ["--no-sandbox"],
    },
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: production ? "npm run preview -- --port 4173" : "npm run dev",
    url: production ? "http://127.0.0.1:4173" : "http://127.0.0.1:5173",
    reuseExistingServer: true,
  },
  reporter: "list",
});
