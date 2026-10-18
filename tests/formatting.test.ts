import { expect, it } from "vitest";
import { parseAmount } from "../src/lib/learning";
it("accepts Indian grouping and Devanagari digits", () => {
  for (const s of ["100000", "1,00,000", "१,००,०००", " १,००,००० "])
    expect(parseAmount(s)).toBe(100000);
  expect(parseAmount("−३०,०००")).toBe(-30000);
  expect(parseAmount("१२०.५")).toBe(120.5);
});
it("accepts standard grouping while rejecting ambiguous or malformed amounts", () => {
  expect(parseAmount("100,000")).toBe(100000);
  for (const s of [
    "",
    "1,2",
    "1,00",
    "1,0000",
    "1e3",
    "₹100",
    "1.2.3",
    "Infinity",
  ])
    expect(Number.isNaN(parseAmount(s))).toBe(true);
});
