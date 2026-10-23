const closeDialog = async (p) => {
  await p
    .getByRole("button", { name: /^(Close dialog|संवाद बंद करें)$/ })
    .click();
  if (await p.getByTestId("confirm-exit").isVisible())
    await p.getByTestId("confirm-exit").click();
};
import { chromium, expect } from "@playwright/test";
const b = await chromium.launch({
  executablePath: process.env.PENNY_BROWSER_EXECUTABLE || undefined,
  args: ["--no-sandbox"],
});
const c = await b.newContext();
const p = await c.newPage();
await p.goto("http://127.0.0.1:4173");
await p
  .getByRole("combobox", { name: /^(?:Language|भाषा)$/, exact: true })
  .selectOption("en");
if (await p.getByTestId("onboarding-explore").isVisible())
  await p.getByTestId("onboarding-explore").click();
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
await closeDialog(p);
await p.getByRole("button", { name: "All worlds" }).click();
await p
  .getByRole("heading", { name: "A whole world of money. Actually, 16." })
  .waitFor();
await closeDialog(p);
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
await closeDialog(p);
await p.reload();
await p.getByRole("button", { name: "Continue lesson", exact: true }).click();
await p.getByText("That’s it. Nicely done!").waitFor();
await closeDialog(p);
await p
  .getByRole("button", {
    name: "Who pays which part?, available lesson",
    exact: true,
  })
  .click();
await p.getByRole("button", { name: "Let’s learn this" }).click();
await p
  .getByRole("button", { name: /^(?:Concept 3|बात 3)$/, exact: true })
  .click();
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
await closeDialog(p);
await p
  .getByRole("button", {
    name: "Inside your monthly payment, available lesson",
    exact: true,
  })
  .click();
await p.getByRole("button", { name: "Let’s learn this", exact: true }).click();
await p
  .getByRole("button", { name: /^(?:Concept 3|बात 3)$/, exact: true })
  .click();
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
await closeDialog(p);
await p.reload();
await p.getByRole("button", { name: "Continue lesson", exact: true }).click();
await p.getByText("That’s it. Nicely done!", { exact: true }).waitFor();
if ((await p.locator(".match-review li").count()) !== 3)
  throw Error("Matching feedback did not recover offline.");
await closeDialog(p);
await p
  .getByRole("navigation", {
    name: /^(?:Main navigation|मुख्य मेन्यू)$/,
    exact: true,
  })
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
await closeDialog(p);
await p
  .getByRole("navigation", {
    name: /^(?:Main navigation|मुख्य मेन्यू)$/,
    exact: true,
  })
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
const lumpAmount = p.getByRole("slider", {
  name: "One-time investment",
  exact: true,
});
await lumpAmount.fill("500000");
await expect(lumpAmount.locator("..").locator("output")).toHaveText(
  "₹5,00,000",
);
await p
  .locator(".big-result")
  .getByText("₹5,00,000", { exact: true })
  .waitFor();
await p.goto("http://127.0.0.1:4173/#curriculum/S0.10.1");
await p.getByRole("button", { name: "Open this lesson", exact: true }).click();
await p
  .getByRole("button", { name: /^(?:Concept 3|बात 3)$/, exact: true })
  .click();
const goal = p.locator(".visual-goal-plan");
await goal
  .getByRole("slider", { name: "Your monthly saving", exact: true })
  .fill("2000");
await expect(goal.locator(".planning-outcome")).toContainText("₹6,000 short");
await p.getByRole("button", { name: "Let’s try it", exact: true }).click();
await p
  .getByRole("button", {
    name: "Save ₹24,000 for a course in six months",
    exact: false,
  })
  .click();
await p.getByRole("button", { name: "Check answer", exact: true }).click();
await p.getByText("That’s it. Nicely done!", { exact: true }).waitFor();
await closeDialog(p);
await p.reload();
await p
  .getByRole("navigation", {
    name: /^(?:Main navigation|मुख्य मेन्यू)$/,
    exact: true,
  })
  .getByRole("button", { name: "Learn", exact: true })
  .click();
await p.getByRole("button", { name: "Continue lesson", exact: true }).click();
await p.getByText("That’s it. Nicely done!", { exact: true }).waitFor();
await closeDialog(p);
await p.goto("http://127.0.0.1:4173/#curriculum/S0.10.3");
await p.getByRole("button", { name: "Open this lesson", exact: true }).click();
await p
  .getByRole("button", { name: /^(?:Concept 3|बात 3)$/, exact: true })
  .click();
const snapshot = p.locator(".visual-net-worth");
await snapshot
  .getByRole("slider", { name: "Outstanding vehicle loan", exact: true })
  .fill("200000");
await expect(snapshot.locator(".net-worth-result dd")).toHaveText("-₹60,000");
await closeDialog(p);
await p.goto("http://127.0.0.1:4173/#curriculum/S0.5.1");
await p.getByRole("button", { name: "Open this lesson", exact: true }).click();
await p
  .getByRole("button", { name: /^(?:Concept 3|बात 3)$/, exact: true })
  .click();
const interest = p.locator(".visual-simple-interest");
await interest
  .getByRole("slider", { name: "Time in years", exact: true })
  .fill("0.5");
await expect(interest.locator(".planning-summary dd").first()).toHaveText(
  "₹400",
);
await expect(interest.locator(".planning-summary dd").last()).toHaveText(
  "₹10,400",
);
const summary = p.locator(".lesson-sources summary");
await summary.focus();
await summary.press("Enter");
await expect(p.locator(".concept-carousel")).toBeVisible();
await expect(p.locator(".lesson-sources")).toHaveAttribute("open", "");
await closeDialog(p);
await p.goto("http://127.0.0.1:4173/#curriculum/S0.2.2");
await p.getByRole("button", { name: "Open this lesson", exact: true }).click();
await p.getByRole("button", { name: "Concept 6", exact: true }).click();
const payslip = p.locator(".payslip-board");
await payslip
  .getByRole("button", { name: "Employer benefit +₹600", exact: true })
  .click();
await expect(payslip.getByTestId("payroll-ctc")).toHaveText("₹4,20,000");
await expect(payslip.getByTestId("payroll-net")).toHaveText("₹27,000");
await payslip
  .getByRole("button", { name: "Build a budget", exact: true })
  .click();
await expect(payslip.getByTestId("payroll-gap")).toHaveText("₹1,000");
await p.getByRole("button", { name: "Let’s try it", exact: true }).click();
await p.getByRole("button", { name: /No\. Check monthly net pay/ }).click();
await p.getByRole("button", { name: "Check answer", exact: true }).click();
await expect(p.locator(".answer-feedback.right")).toBeVisible();
await closeDialog(p);
await p.goto("http://127.0.0.1:4173/#learn");
await p.reload();
await p.getByRole("button", { name: "Continue lesson", exact: true }).click();
await expect(p.locator(".answer-feedback.right")).toBeVisible();
await closeDialog(p);
await p.goto("http://127.0.0.1:4173/#curriculum/S0.2.5");
await p
  .getByRole("button", {
    name: "Open this lesson: Plan for uneven income",
    exact: true,
  })
  .click();
await p.getByRole("button", { name: "Concept 6", exact: true }).click();
const cashflow = p.locator(".cashflow-board");
await cashflow
  .getByRole("button", { name: "Low month first", exact: true })
  .click();
await cashflow
  .getByRole("slider", { name: "Opening working cash", exact: true })
  .fill("0");
await expect(cashflow.getByTestId("cashflow-gap")).toHaveText("₹12,000");
await cashflow
  .getByRole("slider", { name: "Monthly known-fee saving", exact: true })
  .fill("3000");
await expect(cashflow.getByTestId("cashflow-bill-gap")).toHaveText("₹3,000");
await p.getByRole("button", { name: "Let’s try it", exact: true }).click();
await p
  .getByRole("button", {
    name: /Keep some working cash for the lower-income month/,
  })
  .click();
await p.getByRole("button", { name: "Check answer", exact: true }).click();
await expect(p.locator(".answer-feedback.right")).toBeVisible();
await closeDialog(p);
await p.goto("http://127.0.0.1:4173/#curriculum/S0.9.2");
await p.getByRole("button", { name: "Open this lesson", exact: true }).click();
await p.getByRole("button", { name: "Concept 6", exact: true }).click();
const identity = p.locator(".identity-board");
await identity
  .getByRole("button", { name: "Inspect the address", exact: true })
  .click();
await expect(identity.locator("#identity-clue-1")).toContainText(".invalid");
await identity
  .getByRole("button", { name: "Pause and verify independently", exact: true })
  .click();
await expect(identity.locator(".identity-feedback")).toContainText(
  "Safer response",
);
await p.getByRole("button", { name: "Let’s try it", exact: true }).click();
await p
  .getByRole("button", {
    name: /The sender used that logo; identity still needs checking/,
  })
  .click();
await p.getByRole("button", { name: "Check answer", exact: true }).click();
await expect(p.locator(".answer-feedback.right")).toBeVisible();
await closeDialog(p);
await p.goto("http://127.0.0.1:4173/#learn");
await p.reload();
await p.getByRole("button", { name: "Continue lesson", exact: true }).click();
await expect(p.locator(".answer-feedback.right")).toBeVisible();
await closeDialog(p);
await p.goto("http://127.0.0.1:4173/#curriculum/S0.6.5");
await p.getByRole("button", { name: "Open this lesson", exact: true }).click();
await p.getByRole("button", { name: "Concept 6", exact: true }).click();
const credit = p.locator(".credit-board");
await credit
  .getByRole("button", { name: "Payment-record mismatch", exact: true })
  .click();
await expect(credit.locator(".credit-entry")).toContainText("matching receipt");
await credit
  .getByRole("button", { name: "Balance and limit", exact: true })
  .click();
await credit
  .getByRole("button", { name: "Same balance, ₹20,000 limit", exact: true })
  .click();
await expect(credit.getByTestId("credit-ratio")).toHaveText("15%");
await expect(credit.getByTestId("credit-balance")).toHaveText("₹3,000");
await credit
  .getByRole("button", { name: "Limit unknown", exact: true })
  .click();
await expect(credit.getByTestId("credit-ratio")).toHaveText("Unknown");
await p.getByRole("button", { name: "Let’s try it", exact: true }).click();
for (const answer of [
  /The report is a record; the score summarises/,
  /Report says unpaid; matching receipt says paid/,
]) {
  await p.getByRole("dialog").getByRole("button", { name: answer }).click();
  await p.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(p.locator(".answer-feedback.right")).toBeVisible();
  await p.getByRole("button", { name: "Continue", exact: true }).click();
}
await p
  .getByRole("textbox", { name: "Your answer (number only)", exact: true })
  .fill("0.3");
await p.getByRole("button", { name: "Check answer", exact: true }).click();
await expect(p.locator(".answer-feedback.right")).toBeVisible();
await closeDialog(p);
await p.goto("http://127.0.0.1:4173/#learn");
await p.reload();
await p.getByRole("button", { name: "Continue lesson", exact: true }).click();
await expect(p.locator(".answer-feedback.right")).toBeVisible();
await closeDialog(p);
await p.goto("http://127.0.0.1:4173/#revise");
await p.getByRole("button", { name: /All learned questions/ }).click();
await p.getByTestId("start-revision-plan").click();
if (await p.getByTestId("confirm-revision-plan").isVisible())
  await p.getByTestId("confirm-revision-plan").click();
await expect(p.locator(".review-plan-progress")).toBeVisible();
const reviewPrompt = await p.locator(".question-content h2").textContent();
const reviewCount = await p.locator(".review-plan-progress").textContent();
await closeDialog(p);
await p.reload();
await p.getByTestId("resume-revision").click();
await expect(p.locator(".question-content h2")).toHaveText(reviewPrompt);
await expect(p.locator(".review-plan-progress")).toHaveText(reviewCount);
console.log(
  "PASS: production offline reload, lazy lessons and curriculum, bank answer recovery, insurance/repayment models, matching answer recovery, insurance guides, direct topic reload, lump-sum mode, goal-answer recovery and negative net-worth exploration, simple interest, keyboard source expansion, payslip reconciliation/budget and answer recovery, uneven-income timing/fee reserves, identity-safety inspection and answered-question recovery, credit-report inspection, unknown-limit handling and decimal-answer recovery, and cumulative revision-plan reload/resume.",
);
await b.close();
