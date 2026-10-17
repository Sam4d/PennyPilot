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
