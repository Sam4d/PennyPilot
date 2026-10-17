import { chromium } from "@playwright/test";
const b = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const c = await b.newContext();
const p = await c.newPage();
await p.goto("http://127.0.0.1:4173");
await p
  .getByRole("combobox", { name: "Language", exact: true })
  .selectOption("en");
await p.getByRole("heading", { name: "A little wiser. Every day." }).waitFor();
await p.evaluate(async () => {
  await navigator.serviceWorker.ready;
});
await p.reload();
await p.waitForFunction(() => !!navigator.serviceWorker.controller);
await c.setOffline(true);
await p.reload();
await p.getByRole("button", { name: "Let’s start with Mia" }).click();
await p.getByRole("button", { name: "Let’s try it" }).click();
await p.getByRole("button", { name: "The barber did not want wheat" }).click();
await p.getByRole("button", { name: "Check answer", exact: true }).click();
await p.getByText("That’s it. Nicely done!").waitFor();
await p.getByRole("button", { name: "Close dialog" }).click();
await p.getByRole("button", { name: "All worlds" }).click();
await p
  .getByRole("heading", { name: "A whole world of money. Actually, 16." })
  .waitFor();
await p.getByRole("button", { name: "Close dialog" }).click();
await p
  .getByRole("button", {
    name: "Read your bank’s money story, available lesson",
    exact: true,
  })
  .click();
await p.getByRole("button", { name: "Let’s learn this" }).click();
await p.getByRole("button", { name: "Let’s try it" }).click();
await p.getByRole("button", { name: /Rent · DEBIT −₹12,000/ }).click();
await p.getByRole("button", { name: "Check answer", exact: true }).click();
await p.getByText("That’s it. Nicely done!").waitFor();
await p.getByRole("button", { name: "Close dialog" }).click();
await p.reload();
await p.getByRole("button", { name: "Continue lesson", exact: true }).click();
await p.getByText("That’s it. Nicely done!").waitFor();
await p.getByRole("button", { name: "Close dialog" }).click();
await p
  .getByRole("button", {
    name: "Who pays which part?, available lesson",
    exact: true,
  })
  .click();
await p.getByRole("button", { name: "Let’s learn this" }).click();
await p.getByRole("button", { name: "Concept 3", exact: true }).click();
const health = p.locator(".visual-health-cover");
await health
  .getByRole("slider", {
    name: "Your share of eligible costs (co-pay %)",
    exact: true,
  })
  .fill("30");
await health
  .getByRole("slider", { name: "Available cover in rupees", exact: true })
  .fill("0");
await health
  .locator(".claim-legend > span")
  .nth(1)
  .getByText("₹50,000", { exact: true })
  .waitFor();
await p.getByRole("button", { name: "Close dialog" }).click();
await p
  .getByRole("button", {
    name: "Inside your monthly payment, available lesson",
    exact: true,
  })
  .click();
await p.getByRole("button", { name: "Let’s learn this", exact: true }).click();
await p.getByRole("button", { name: "Concept 3", exact: true }).click();
const loan = p.locator(".visual-emi");
await loan
  .getByRole("slider", { name: "Repayment period in months", exact: true })
  .fill("24");
await loan.getByRole("button", { name: "Month 24", exact: true }).click();
await loan.locator(".loan-month").getByText("₹0", { exact: true }).waitFor();
await p.getByRole("button", { name: "Let’s try it", exact: true }).click();
for (const [term, meaning] of [
  ["Starting amount (principal)", "Money originally borrowed"],
  ["Interest", "The cost charged for borrowing"],
  [
    "Monthly payment (EMI)",
    "The regular payment combining interest and repayment",
  ],
]) {
  await p
    .getByRole("group", { name: "Terms", exact: true })
    .getByRole("button", { name: term, exact: true })
    .click();
  await p
    .getByRole("group", { name: "Meanings", exact: true })
    .getByRole("button", { name: meaning, exact: true })
    .click();
}
await p.getByRole("button", { name: "Check answer", exact: true }).click();
await p.getByText("That’s it. Nicely done!", { exact: true }).waitFor();
await p.getByRole("button", { name: "Close dialog" }).click();
await p.reload();
await p.getByRole("button", { name: "Continue lesson", exact: true }).click();
await p.getByText("That’s it. Nicely done!", { exact: true }).waitFor();
if ((await p.locator(".match-review li").count()) !== 3)
  throw Error("Matching feedback did not recover offline.");
await p.getByRole("button", { name: "Close dialog" }).click();
await p
  .getByRole("navigation", { name: "Main navigation", exact: true })
  .getByRole("button", { name: "Insurance", exact: true })
  .click();
await p
  .getByRole("button", {
    name: "Start with why insurance matters",
    exact: true,
  })
  .click();
await p
  .getByRole("heading", { name: "Why insurance matters", exact: true })
  .waitFor();
await p.goto("http://127.0.0.1:4173/#curriculum/S12.3.3");
await p
  .getByRole("heading", {
    name: "Deductibles, top-ups and restored cover",
    exact: true,
  })
  .waitFor();
await p.reload();
await p
  .getByRole("heading", {
    name: "Deductibles, top-ups and restored cover",
    exact: true,
  })
  .waitFor();
await p.getByRole("button", { name: "Close dialog" }).click();
await p
  .getByRole("navigation", { name: "Main navigation", exact: true })
  .getByRole("button", { name: "Playground", exact: true })
  .click();
await p.getByRole("button", { name: "Lump sum", exact: true }).click();
await p
  .getByRole("slider", { name: "Assumed annual return", exact: true })
  .fill("0");
await p
  .locator(".big-result")
  .getByText("₹1,00,000", { exact: true })
  .waitFor();
console.log(
  "PASS: production offline reload, lazy lessons and curriculum, bank answer recovery, insurance/repayment models, matching answer recovery, insurance guides, direct topic reload, and lump-sum mode.",
);
await b.close();
