import { describe, it, expect } from "vitest";
import { cashflowPlan, exampleIncome } from "../src/lib/cashflow";
describe("irregular-income teaching ledger", () => {
  it("separates operating cash from the known-bill pot and pays it once", () => {
    const plan = cashflowPlan(exampleIncome, 12000, 18000, 12000, 3, 4000);
    expect(plan.totalIncome).toBe(150000);
    expect(plan.averageIncome).toBe(25000);
    expect(plan.rows.map((r) => r.cash)).toEqual([
      30000, 18000, 31000, 28000, 40000, 42000,
    ]);
    expect(plan.rows.map((r) => r.pot)).toEqual([4000, 8000, 0, 0, 0, 0]);
    expect(plan.rows[2].billPaid).toBe(12000);
    expect(plan.rows.reduce((sum, r) => sum + r.billPaid, 0)).toBe(12000);
    expect(plan.billGap).toBe(0);
  });
  it("reveals timing risk even when the average and final balance are unchanged", () => {
    const reordered = [10000, 40000, 15000, 35000, 20000, 30000];
    const original = cashflowPlan(exampleIncome, 0, 18000, 12000, 3, 4000);
    const earlyGap = cashflowPlan(reordered, 0, 18000, 12000, 3, 4000);
    expect(earlyGap.totalIncome).toBe(original.totalIncome);
    expect(earlyGap.endingCash).toBe(original.endingCash);
    expect(original.largestCashGap).toBe(0);
    expect(earlyGap.rows[0].cash).toBe(-12000);
    expect(earlyGap.largestCashGap).toBe(12000);
    expect(
      cashflowPlan(reordered, 12000, 18000, 12000, 3, 4000).largestCashGap,
    ).toBe(0);
  });
  it("does not silently claim an underfunded bill was paid in full", () => {
    const plan = cashflowPlan(exampleIncome, 12000, 18000, 12000, 3, 3000);
    expect(plan.rows[2].billPaid).toBe(9000);
    expect(plan.billGap).toBe(3000);
  });
  it("stops reserving when the known bill is fully funded or already due", () => {
    const plan = cashflowPlan(exampleIncome, 12000, 18000, 12000, 3, 6000);
    expect(plan.rows.map((r) => r.reserved)).toEqual([6000, 6000, 0, 0, 0, 0]);
    expect(plan.billGap).toBe(0);
    expect(plan.endingCash).toBe(42000);
  });
  it("reconciles every month without counting reserved money as available cash", () => {
    const plan = cashflowPlan(exampleIncome, 12000, 18000, 12000, 3, 4000);
    for (const [i, r] of plan.rows.entries()) {
      const received = plan.rows
        .slice(0, i + 1)
        .reduce((sum, row) => sum + row.received, 0);
      const paid = plan.rows
        .slice(0, i + 1)
        .reduce((sum, row) => sum + row.billPaid, 0);
      expect(r.cash + r.pot).toBe(12000 + received - 18000 * (i + 1) - paid);
    }
  });
  it("handles zero income and refuses invalid amounts or month indices", () => {
    expect(cashflowPlan([0], 0, 1000, 500, 1, 0).largestCashGap).toBe(1000);
    for (const n of [-1, 0.5, NaN, Infinity])
      expect(() => cashflowPlan([n], 0, 0, 0, 1, 0)).toThrow(RangeError);
    expect(() => cashflowPlan([], 0, 0, 0, 1, 0)).toThrow(RangeError);
    expect(() => cashflowPlan([1000], 0, 0, 0, 2, 0)).toThrow(RangeError);
  });
});
