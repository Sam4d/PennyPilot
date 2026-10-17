import { describe, it, expect } from "vitest";
import { purchaseComparison, repaymentSchedule } from "../src/lib/loans";
describe("monthly reducing-balance illustration", () => {
  it("splits the first payment and clears the final balance", () => {
    const r = repaymentSchedule(120000, 12, 12);
    expect(r.monthlyPayment).toBeCloseTo(10661.854644, 5);
    expect(r.rows[0].interest).toBe(1200);
    expect(r.rows[0].principal).toBeCloseTo(9461.854644, 5);
    expect(r.rows.at(-1)!.closing).toBe(0);
    expect(r.rows.at(-1)!.interest).toBeLessThan(r.rows[0].interest);
  });
  it("conserves payment and principal across rates and terms", () => {
    for (const rate of [0, 0.00001, 12, 36])
      for (const months of [1, 12, 60, 600]) {
        const r = repaymentSchedule(120000, rate, months);
        expect(r.rows.reduce((n, row) => n + row.principal, 0)).toBeCloseTo(
          120000,
          5,
        );
        expect(r.totalPayments - r.totalInterest).toBeCloseTo(120000, 5);
        for (const row of r.rows) {
          expect(row.interest + row.principal).toBeCloseTo(row.payment, 7);
          expect(row.closing).toBeGreaterThanOrEqual(0);
        }
      }
  });
  it("uses the zero-interest limit without NaN", () => {
    const r = repaymentSchedule(120000, 0, 12);
    expect(r.monthlyPayment).toBe(10000);
    expect(r.totalInterest).toBe(0);
    expect(r.totalPayments).toBe(120000);
  });
  it("shows the affordability and interest trade-off of a longer period", () => {
    const short = repaymentSchedule(120000, 12, 12),
      long = repaymentSchedule(120000, 12, 24);
    expect(long.monthlyPayment).toBeLessThan(short.monthlyPayment);
    expect(long.totalInterest).toBeGreaterThan(short.totalInterest);
  });
  it("includes an upfront deducted fee in the cost relative to cash received", () => {
    const r = repaymentSchedule(120000, 12, 12, 1000);
    expect(r.netReceived).toBe(119000);
    expect(r.totalPayments - r.netReceived).toBeCloseTo(r.totalCost, 5);
  });
  it("rejects invalid durations, rates and fees", () => {
    for (const args of [
      [0, 12, 12, 0],
      [120000, NaN, 12, 0],
      [120000, 12, 12.5, 0],
      [120000, 12, 601, 0],
      [120000, 12, 12, 120000],
    ])
      expect(() =>
        repaymentSchedule(...(args as [number, number, number, number])),
      ).toThrow(RangeError);
  });
});
describe("fictional same-item price comparison", () => {
  it("adds the upfront fee and forgone discount once each", () =>
    expect(purchaseComparison(34000, 6000, 6, 1000)).toEqual({
      cashPrice: 34000,
      repayments: 36000,
      fee: 1000,
      total: 37000,
      extra: 3000,
    }));
  it("handles equal total prices without calling the difference a rate", () =>
    expect(purchaseComparison(36000, 6000, 6, 0).extra).toBe(0));
  it("allows a cheaper instalment offer to remain a negative difference", () =>
    expect(purchaseComparison(40000, 6000, 6, 0).extra).toBe(-4000));
  it("rejects non-finite or negative costs and fractional months", () => {
    expect(() => purchaseComparison(34000, 6000, 6, -1)).toThrow(RangeError);
    expect(() => purchaseComparison(Infinity, 6000, 6, 0)).toThrow(RangeError);
    expect(() => purchaseComparison(34000, 6000, 1.5, 0)).toThrow(RangeError);
  });
});
