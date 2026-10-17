import { describe, it, expect } from "vitest";
import { claimSplit, supportGap } from "../src/lib/protection";
describe("fictional health claim calculations", () => {
  it("keeps excluded costs separate from the percentage share", () => {
    expect(claimSplit(40000, 10000, 20, 100000)).toEqual({
      insurer: 32000,
      coPay: 8000,
      excluded: 10000,
      coverGap: 0,
      you: 18000,
      total: 50000,
    });
  });
  it("accounts for exhausted cover without double counting the co-pay", () => {
    const r = claimSplit(40000, 10000, 20, 10000);
    expect(r).toEqual({
      insurer: 10000,
      coPay: 8000,
      excluded: 10000,
      coverGap: 22000,
      you: 40000,
      total: 50000,
    });
  });
  it("handles zero eligible costs, no cover, and full co-pay", () => {
    expect(claimSplit(0, 5000, 0, 100000).you).toBe(5000);
    expect(claimSplit(40000, 10000, 0, 0).you).toBe(50000);
    expect(claimSplit(40000, 10000, 100, 100000).you).toBe(50000);
  });
  it("conserves the total bill over a range of cover and share values", () => {
    for (const cap of [0, 1000, 10000, 30000, 100000])
      for (const percent of [0, 10, 20, 50, 100]) {
        const r = claimSplit(40000, 10000, percent, cap);
        expect(r.insurer + r.you).toBeCloseTo(r.total, 8);
        expect(r.insurer).toBeLessThanOrEqual(cap);
        expect(r.you).toBeGreaterThanOrEqual(r.excluded);
      }
  });
  it("rejects non-finite values and invalid percentages", () => {
    expect(() => claimSplit(40000, 0, 101, 100000)).toThrow(RangeError);
    expect(() => claimSplit(-1, 0, 0, 100000)).toThrow(RangeError);
    expect(() => claimSplit(40000, 0, NaN, 100000)).toThrow(RangeError);
  });
});
describe("static-cost support example", () => {
  it("adds debt and subtracts usable savings from the cost horizon", () => {
    expect(supportGap(30000, 5, 200000, 300000)).toEqual({
      costs: 1800000,
      debt: 200000,
      usableSavings: 300000,
      gap: 1700000,
    });
  });
  it("floors a covered gap at zero", () =>
    expect(supportGap(10000, 1, 0, 300000).gap).toBe(0));
  it("rejects invalid planning inputs", () =>
    expect(() => supportGap(30000, Infinity, 0, 0)).toThrow(RangeError));
});
