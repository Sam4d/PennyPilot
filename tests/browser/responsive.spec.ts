import { closeDialog } from "./helpers";
import { test, expect } from "@playwright/test";
for (const device of ["phone", "desktop"] as const) {
  test.describe(device, () => {
    test.use(
      device === "phone"
        ? {
            viewport: { width: 390, height: 844 },
            isMobile: true,
            hasTouch: true,
          }
        : { viewport: { width: 1440, height: 900 } },
    );
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");
      await page
        .getByRole("combobox", { name: /^(?:Language|भाषा)$/, exact: true })
        .selectOption("en");
      if (await page.getByTestId("onboarding-explore").isVisible())
        await page.getByTestId("onboarding-explore").click();
      await page.goto("/#curriculum/S0.10.1");
      await page
        .getByRole("button", { name: "Open this lesson", exact: true })
        .click();
      await expect(page.locator(".concept-carousel")).toBeVisible();
    });
    test("lesson dialog keeps Tab inside with sources collapsed or expanded", async ({
      page,
    }) => {
      const dialog = page.getByRole("dialog");
      const close = dialog.getByRole("button", {
        name: "Close dialog",
        exact: true,
      });
      const summary = dialog.locator(".lesson-sources summary");
      await summary.focus();
      await page.keyboard.press("Tab");
      await expect(close).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(summary).toBeFocused();
      await summary.press("Enter");
      await expect(page.locator(".concept-carousel")).toBeVisible();
      await expect(dialog.locator(".lesson-sources")).toHaveAttribute(
        "open",
        "",
      );
      const lastSource = dialog.locator(".lesson-sources a").last();
      await lastSource.focus();
      await page.keyboard.press("Tab");
      await expect(close).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(lastSource).toBeFocused();
    });
    test("concept height follows its content and preserves position on resize", async ({
      page,
    }) => {
      const carousel = page.locator(".concept-carousel");
      const heightGap = () =>
        carousel.evaluate((el) => {
          const active = el.children[
            Math.round(el.scrollLeft / el.clientWidth)
          ] as HTMLElement;
          return Math.abs(
            active.getBoundingClientRect().bottom -
              active.lastElementChild!.getBoundingClientRect().bottom -
              parseFloat(getComputedStyle(active).paddingBottom),
          );
        });
      await expect.poll(heightGap).toBeLessThan(4);
      await page
        .getByRole("button", { name: /^(?:Concept 3|बात 3)$/, exact: true })
        .click();
      await expect(
        page.getByRole("button", {
          name: /^(?:Concept 3|बात 3)$/,
          exact: true,
        }),
      ).toHaveAttribute("aria-current", "step");
      await expect.poll(heightGap).toBeLessThan(4);
      await page.setViewportSize(
        device === "phone"
          ? { width: 844, height: 390 }
          : { width: 800, height: 900 },
      );
      await expect
        .poll(() =>
          carousel.evaluate((el) =>
            Math.abs(el.scrollLeft - 2 * el.clientWidth),
          ),
        )
        .toBeLessThan(2);
      await expect.poll(heightGap).toBeLessThan(4);
      await page
        .getByRole("button", { name: "Concept 1", exact: true })
        .click();
      await expect.poll(heightGap).toBeLessThan(4);
      await page
        .getByRole("button", { name: /^(?:Concept 3|बात 3)$/, exact: true })
        .click();
      await page
        .getByRole("button", { name: "Let’s try it", exact: true })
        .click();
      await closeDialog(page);
      await page
        .getByRole("button", { name: "Continue lesson", exact: true })
        .click();
      await expect(page.locator(".answer-options")).toBeVisible();
    });
    test("rapid navigation, local sliders and all main screens work", async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page
        .getByRole("button", {
          name: /^(?:Next concept|अगली बात)$/,
          exact: true,
        })
        .dblclick({ delay: 30 });
      await expect(
        page.getByRole("button", {
          name: /^(?:Concept 3|बात 3)$/,
          exact: true,
        }),
      ).toHaveAttribute("aria-current", "step");
      const carousel = page.locator(".concept-carousel");
      await expect
        .poll(() =>
          carousel.evaluate((el) =>
            Math.abs(el.scrollLeft - 2 * el.clientWidth),
          ),
        )
        .toBeLessThan(2);
      await page
        .getByRole("slider", { name: "Your monthly saving", exact: true })
        .fill("1000");
      await expect(page.locator(".planning-outcome")).toContainText(
        "₹12,000 short",
      );
      await closeDialog(page);
      const navigation = page.getByRole("navigation", {
        name: device === "phone" ? "Mobile navigation" : "Main navigation",
        exact: true,
      });
      for (const route of [
        "Revise",
        "Playground",
        "Insurance",
        "Notebook",
        "Me",
        "Learn",
      ]) {
        const button = navigation.getByRole("button", {
          name: route,
          exact: true,
        });
        await button.click();
        await expect(button).toHaveAttribute("aria-current", "page");
        await expect(
          page.locator("#main").getByRole("heading", { level: 1 }),
        ).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
      expect(errors).toEqual([]);
    });
    if (device === "phone")
      test("touch swipes select concepts and touch dragging changes the saving amount", async ({
        page,
        context,
      }) => {
        const cdp = await context.newCDPSession(page);
        const swipe = async (start: number, end: number, y: number) => {
          await cdp.send("Input.dispatchTouchEvent", {
            type: "touchStart",
            touchPoints: [{ x: start, y }],
          });
          for (let i = 1; i <= 10; i++) {
            await cdp.send("Input.dispatchTouchEvent", {
              type: "touchMove",
              touchPoints: [{ x: start + ((end - start) * i) / 10, y }],
            });
            await page.waitForTimeout(30);
          }
          await cdp.send("Input.dispatchTouchEvent", {
            type: "touchEnd",
            touchPoints: [],
          });
        };
        const carousel = page.locator(".concept-carousel");
        await carousel.scrollIntoViewIfNeeded();
        const box = (await carousel.boundingBox())!;
        await swipe(
          box.x + box.width * 0.85,
          box.x + box.width * 0.15,
          Math.max(20, box.y) + 70,
        );
        await expect(
          page.getByRole("button", {
            name: /^(?:Concept 2|बात 2)$/,
            exact: true,
          }),
        ).toHaveAttribute("aria-current", "step");
        await expect
          .poll(() =>
            carousel.evaluate((el) => Math.abs(el.scrollLeft - el.clientWidth)),
          )
          .toBeLessThan(2);
        await page
          .getByRole("button", { name: /^(?:Concept 3|बात 3)$/, exact: true })
          .tap();
        await expect
          .poll(() =>
            carousel.evaluate((el) =>
              Math.abs(el.scrollLeft - 2 * el.clientWidth),
            ),
          )
          .toBeLessThan(2);
        const slider = page.getByRole("slider", {
          name: "Your monthly saving",
          exact: true,
        });
        await slider.scrollIntoViewIfNeeded();
        const range = (await slider.boundingBox())!;
        await swipe(
          range.x + 8 + (range.width - 16) * 0.3,
          range.x + 8 + (range.width - 16) * 0.7,
          range.y + range.height / 2,
        );
        await expect(
          page.getByRole("button", {
            name: /^(?:Concept 3|बात 3)$/,
            exact: true,
          }),
        ).toHaveAttribute("aria-current", "step");
        const value = Number(await slider.inputValue());
        expect(value).toBeGreaterThanOrEqual(6500);
        await expect(slider.locator("..").locator("output")).toHaveText(
          new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }).format(value),
        );
        await cdp.detach();
      });
    test("reduced motion does not request an animated concept scroll", async ({
      page,
    }) => {
      await page.evaluate(() => {
        const el = document.querySelector(".concept-carousel")!;
        const original = el.scrollTo.bind(el);
        el.scrollTo = ((options: ScrollToOptions) => {
          el.setAttribute("data-scroll-behavior", options.behavior ?? "auto");
          original(options);
        }) as typeof el.scrollTo;
      });
      await page
        .getByRole("button", { name: /^(?:Concept 3|बात 3)$/, exact: true })
        .click();
      await expect(page.locator(".concept-carousel")).toHaveAttribute(
        "data-scroll-behavior",
        "instant",
      );
    });
  });
}
