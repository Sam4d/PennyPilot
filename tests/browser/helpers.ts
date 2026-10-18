import { expect, type Page } from "@playwright/test";
export async function closeDialog(page: Page) {
  await page
    .getByRole("button", {
      name: /^(Close dialog|संवाद बंद करें)$/,
      exact: true,
    })
    .click();
  const confirmation = page.getByTestId("confirm-exit");
  if (await confirmation.isVisible()) await confirmation.click();
  await expect(confirmation).toHaveCount(0);
}
