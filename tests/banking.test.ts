import { describe, expect, it } from "vitest";
import { bankingFunds } from "../src/lib/banking";
describe("fictional bank hold reconciliation", () => {
  it("reconciles all stated base entries", () => {
    expect(bankingFunds(0, false)).toEqual({
      baseBalance: 10400,
      debit: 0,
      hold: 0,
      recorded: 10400,
      available: 10400,
    });
  });
  it("counts a separate pending hold once", () => {
    expect(bankingFunds(300, false)).toMatchObject({
      debit: 0,
      hold: 300,
      recorded: 10400,
      available: 10100,
    });
  });
  it("moves the same payment from hold to debit without a second reduction", () => {
    for (const n of [0, 300, 2000, 10400]) {
      const pending = bankingFunds(n, false),
        posted = bankingFunds(n, true);
      expect(posted.available).toBe(pending.available);
      expect(posted.hold).toBe(0);
      expect(posted.recorded).toBe(pending.recorded - n);
      expect(posted.debit).toBe(n);
    }
  });
  it("restores the base model when the assumed payment is removed", () => {
    expect(bankingFunds(0, true).available).toBe(10400);
    expect(bankingFunds(300, false).available).toBe(10100);
  });
  it("rejects invalid or unfunded input rather than inventing credit", () => {
    for (const n of [
      -1,
      0.5,
      NaN,
      Infinity,
      10401,
      Number.MAX_SAFE_INTEGER + 1,
    ])
      expect(() => bankingFunds(n, false)).toThrow(RangeError);
  });
});
