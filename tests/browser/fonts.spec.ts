import { test, expect } from "@playwright/test";

test("Hindi labels and rupee decorations render with bundled fonts", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("combobox", { name: /^(Language|भाषा)$/ })
    .selectOption("hi");
  await page.getByTestId("onboarding-explore").click();
  await expect(page.locator("#main h1")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const session = await page.context().newCDPSession(page);
  await session.send("DOM.enable");
  await session.send("CSS.enable");
  const { root } = await session.send("DOM.getDocument");
  for (const selector of [
    ".desktop-breadcrumb strong",
    ".stat strong span",
    ".floating-coin.coin-one",
  ]) {
    const { nodeId } = await session.send("DOM.querySelector", {
      nodeId: root.nodeId,
      selector,
    });
    const { fonts } = await session.send("CSS.getPlatformFontsForNode", {
      nodeId,
    });
    expect(fonts.length, `${selector} must render text`).toBeGreaterThan(0);
    expect(
      fonts.filter((font) => !font.isCustomFont),
      `${selector} must not depend on installed fonts`,
    ).toEqual([]);
  }
  await session.detach();
});
