import { expect, it } from "vitest";
import { readFileSync } from "node:fs";
const css = readFileSync(
  new URL("../src/design-tokens.css", import.meta.url),
  "utf8",
);
const luminance = (hex: string) => {
  const c = hex
    .replace("#", "")
    .match(/../g)!
    .map((x) => parseInt(x, 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
it("semantic normal-text pairs meet WCAG AA in both themes", () => {
  const [light, dark] = css.split(':root[data-theme="dark"]');
  const vars = (text: string) =>
    Object.fromEntries(
      [...text.matchAll(/--([\w-]+):\s*(#[\da-f]{6})\s*;/gi)].map((m) => [
        m[1],
        m[2],
      ]),
    );
  const base = vars(light);
  for (const theme of [base, { ...base, ...vars(dark) }])
    for (const [bg, fg] of [
      ["surface-base", "text-primary"],
      ["surface-base", "text-secondary"],
      ["brand", "brand-text"],
      ["correct-bg", "correct-text"],
      ["incorrect-bg", "incorrect-text"],
      ["warning-bg", "warning-text"],
      ["info-bg", "info-text"],
    ]) {
      const a = luminance(theme[bg]),
        b = luminance(theme[fg]);
      expect(
        (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
        `${bg}/${fg}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
});
