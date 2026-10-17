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
console.log(
  "PASS: production service worker, offline reload, lazy lesson player, answer save, offline curriculum, and new bank-document answer recovery.",
);
await b.close();
