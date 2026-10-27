import { describe, expect, it } from "vitest";
import { loanRateReset } from "../src/lib/loan-reset";
import { repaymentSchedule } from "../src/lib/loans";
describe("single fictional loan rate reset", () => {
  it("matches an independently calculated six-month balance and new payment", () => {
    const r = loanRateReset(120000, 12, 24, 12, 6, 3000);
    expect(r.beforePayment).toBeCloseTo(10661.854641401, 6);
    expect(r.resetBalance).toBeCloseTo(61790.527749624, 6);
    expect(r.afterPayment).toBeCloseTo(11031.204161122, 6);
    expect(r.totalInterest).toBeCloseTo(10158.352815141, 6);
    expect(r.netReceived).toBe(117000);
    expect(r.totalCost).toBeCloseTo(13158.352815141, 6);
  });
  it("preserves principal, cash-flow cost and monthly continuity across resets", () => {
    for (const rate of [0, 12, 24, 36])
      for (const after of [1, 6, 11]) {
        const r = loanRateReset(120000, 12, rate, 12, after, 3000);
        expect(r.rows).toHaveLength(12);
        expect(r.rows.reduce((s, x) => s + x.principal, 0)).toBeCloseTo(
          120000,
          6,
        );
        expect(r.totalCost).toBeCloseTo(r.totalInterest + 3000, 6);
        expect(r.rows.at(-1)!.closing).toBe(0);
        for (const [i, row] of r.rows.entries()) {
          expect(row.month).toBe(i + 1);
          expect(row.payment).toBeCloseTo(row.interest + row.principal, 7);
          if (i) expect(row.opening).toBeCloseTo(r.rows[i - 1].closing, 7);
        }
      }
  });
  it("reproduces the fixed schedule when the rate does not change", () => {
    const r = loanRateReset(120000, 12, 12, 12, 6, 3000),
      fixed = repaymentSchedule(120000, 12, 12, 3000);
    expect(r.paymentChange).toBe(0);
    expect(r.totalPayments).toBeCloseTo(fixed.totalPayments, 6);
    expect(r.totalCost).toBeCloseTo(fixed.totalCost, 6);
  });
  it("supports zero interest before and after a reset", () => {
    const r = loanRateReset(60000, 0, 0, 12, 6, 1000);
    expect(r.beforePayment).toBe(5000);
    expect(r.afterPayment).toBe(5000);
    expect(r.totalPayments).toBe(60000);
    expect(r.totalInterest).toBe(0);
    expect(r.totalCost).toBe(1000);
  });
  it("allows a lower payment after a downward rate change", () => {
    const r = loanRateReset(120000, 12, 0, 12, 6);
    expect(r.paymentChange).toBeLessThan(0);
    expect(r.afterPayment).toBeCloseTo(r.resetBalance / 6, 7);
  });
  it("withholds the fee once without changing interest or principal", () => {
    const a = loanRateReset(120000, 12, 24, 12, 6, 0),
      b = loanRateReset(120000, 12, 24, 12, 6, 3000);
    expect(b.rows).toEqual(a.rows);
    expect(b.totalCost - a.totalCost).toBeCloseTo(3000, 6);
  });
  it("rejects invalid cash flows, periods and reset rates", () => {
    for (const args of [
      [0, 12, 24, 12, 6, 0],
      [120000, 12, 24, 12, 0, 0],
      [120000, 12, 24, 12, 12, 0],
      [120000, 12, 24, 12, 1.5, 0],
      [120000, 12, -1, 12, 6, 0],
      [120000, 12, 101, 12, 6, 0],
      [120000, 12, NaN, 12, 6, 0],
      [120000, 12, 24, 12, 6, 120000],
      [120000, 12, 24, 12, 6, 0.5],
      [Infinity, 12, 24, 12, 6, 0],
      [120000, 12, 24, 0, 1, 0],
      [120000, -1, 24, 12, 6, 0],
    ])
      expect(() =>
        loanRateReset(
          ...(args as [number, number, number, number, number, number]),
        ),
      ).toThrow(RangeError);
  });
});
