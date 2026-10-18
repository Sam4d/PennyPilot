import { expect, it } from "vitest";
import { simpleInterest } from "../src/lib/interest";
import { compound } from "../src/lib/learning";
it("keeps the earning base constant across whole and half years", () => {
  expect(simpleInterest(10000, 8, 2)).toEqual({
    yearlyInterest: 800,
    interest: 1600,
    total: 11600,
  });
  expect(simpleInterest(10000, 8, 0.5).interest).toBe(400);
  for (const years of [0.5, 1, 2, 5, 10])
    expect(
      simpleInterest(10000, 8, years + 1).interest -
        simpleInterest(10000, 8, years).interest,
    ).toBeCloseTo(800);
});
it("distinguishes simple interest from annually compounded interest", () => {
  expect(simpleInterest(10000, 8, 1).total).toBeCloseTo(compound(10000, 8, 1));
  expect(compound(10000, 8, 2) - simpleInterest(10000, 8, 2).total).toBeCloseTo(
    64,
  );
});
it("returns principal unchanged for zero time or rate", () => {
  expect(simpleInterest(10000, 0, 2).total).toBe(10000);
  expect(simpleInterest(10000, 8, 0).total).toBe(10000);
  expect(simpleInterest(0, 8, 2).total).toBe(0);
});
it("rejects invalid amounts, rates and time", () => {
  for (const bad of [-1, NaN, Infinity]) {
    expect(() => simpleInterest(bad, 8, 2)).toThrow(RangeError);
    expect(() => simpleInterest(10000, bad, 2)).toThrow(RangeError);
    expect(() => simpleInterest(10000, 8, bad)).toThrow(RangeError);
  }
});
