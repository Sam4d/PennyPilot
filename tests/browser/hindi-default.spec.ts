import { test, expect } from "@playwright/test";
test("new learners start in simple Hindi with familiar Hinglish terms", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("combobox", { name: "Language", exact: true }),
  ).toHaveValue("hi");
  await expect(
    page.getByRole("heading", { name: "थोड़ा सीखें। समझदार बनें।" }),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: "पैसों का बढ़ता गोला, available lesson",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "पाठ शुरू करें", exact: true })
    .click();
  await page.getByRole("button", { name: "Concept 2", exact: true }).click();
  await expect(
    page.getByText(
      "सिंपल इंटरेस्ट सिर्फ़ शुरुआत के पैसों पर मिलता है। कंपाउंडिंग में पहले मिले ब्याज पर भी ब्याज मिलता है। याद रखें: इन्वेस्टमेंट का रिटर्न माइनस भी हो सकता है।",
      { exact: true },
    ),
  ).toBeVisible();
  await page.getByRole("button", { name: "आज़माएं", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "कंपाउंड इंटरेस्ट, यानी ब्याज पर भी ब्याज। यह किस पर मिलता है?",
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: /शुरुआत के पैसे और पहले मिले ब्याज पर/ })
    .click();
  await page.getByRole("button", { name: "जवाब देखें", exact: true }).click();
  await expect(page.getByText("बिल्कुल सही!", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Close dialog" }).click();
  await page.reload();
  await expect(
    page.getByRole("combobox", { name: "Language", exact: true }),
  ).toHaveValue("hi");
});

test("Hindi explains insurance terms in brackets and scores a health-cost answer", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "बिल का कौन सा हिस्सा आपका?, available lesson",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "पाठ शुरू करें", exact: true })
    .click();
  await page.getByRole("button", { name: "Concept 2", exact: true }).click();
  await expect(
    page
      .getByRole("dialog")
      .getByText(/पहले खुद देनी पड़ सकती है \(डिडक्टिबल\)/),
  ).toBeVisible();
  await page.getByRole("button", { name: "Concept 3", exact: true }).click();
  const visual = page.locator(".visual-health-cover");
  await visual
    .getByRole("slider", {
      name: "कवर वाले खर्च में आपका हिस्सा (को-पे %)",
      exact: true,
    })
    .fill("25");
  await expect(
    visual
      .locator(".claim-legend > span")
      .nth(1)
      .getByText("₹20,000", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "आज़माएं", exact: true }).click();
  await page.getByRole("button", { name: /03 कवर के बाहर वाले खर्च/ }).click();
  await page.getByRole("button", { name: "जवाब देखें", exact: true }).click();
  await expect(page.getByText("बिल्कुल सही!", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "आगे बढ़ें", exact: true }).click();
  await page.getByRole("spinbutton").fill("8000");
  await page.getByRole("button", { name: "जवाब देखें", exact: true }).click();
  await expect(page.getByText("बिल्कुल सही!", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Close dialog" }).click();
  await page.reload();
  await page
    .getByRole("button", { name: "पाठ जारी रखें", exact: true })
    .click();
  await expect(page.getByText("बिल्कुल सही!", { exact: true })).toBeVisible();
});

test("Hindi loan terms match with bracketed explanations", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "आपकी EMI के अंदर क्या है?, available lesson",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "पाठ शुरू करें", exact: true })
    .click();
  await page.getByRole("button", { name: "Concept 2", exact: true }).click();
  await expect(
    page.getByRole("dialog").getByText(/उधार की रकम \(प्रिंसिपल\)/),
  ).toBeVisible();
  await page.getByRole("button", { name: "आज़माएं", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const pairs = [
    ["शुरू की उधार रकम (प्रिंसिपल)", "शुरुआत में उधार लिए पैसे"],
    ["ब्याज", "उधार लेने पर लगने वाली कीमत"],
    ["महीने की किस्त (EMI)", "ब्याज और उधार वापसी जोड़कर नियमित पेमेंट"],
  ];
  for (const [term, meaning] of pairs) {
    await dialog
      .getByRole("group", { name: "शब्द", exact: true })
      .getByRole("button", { name: term, exact: true })
      .click();
    await dialog
      .getByRole("group", { name: "मतलब", exact: true })
      .getByRole("button", { name: meaning, exact: true })
      .click();
  }
  await dialog.getByRole("button", { name: "जवाब देखें", exact: true }).click();
  await expect(dialog.getByText("बिल्कुल सही!", { exact: true })).toBeVisible();
});
