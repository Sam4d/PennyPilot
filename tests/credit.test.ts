import { describe, expect, it } from "vitest";
import { creditUtilisation } from "../src/lib/credit";
describe("single-card illustrative utilisation", () => {
  it("uses the stated balance and limit", () => {
    expect(creditUtilisation(3000, 10000)).toBe(30);
    expect(creditUtilisation(3000, 20000)).toBe(15);
  });
  it("separates a zero balance from an unknown limit", () => {
    expect(creditUtilisation(0, 10000)).toBe(0);
    expect(creditUtilisation(3000, 0)).toBeNull();
    expect(creditUtilisation(0, 0)).toBeNull();
  });
  it("does not cap a balance above the example limit", () => {
    expect(creditUtilisation(12000, 10000)).toBe(120);
  });
  it("retains precision until the display formats it", () => {
    expect(creditUtilisation(1000, 3000)).toBeCloseTo(100 / 3, 12);
  });
  it("rejects invalid data instead of showing a misleading ratio", () => {
    for (const n of [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
      expect(() => creditUtilisation(n, 10000)).toThrow(RangeError);
      expect(() => creditUtilisation(3000, n)).toThrow(RangeError);
    }
  });
});
