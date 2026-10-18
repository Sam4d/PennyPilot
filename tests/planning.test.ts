import { describe, expect, it } from "vitest";
import { savingsGoal, netWorth } from "../src/lib/planning";
describe("fixed-price savings goal", () => {
  it("separates reserved savings from new monthly deposits", () => {
    const r = savingsGoal(24000, 6000, 6, 2000);
    expect(r.remaining).toBe(18000);
    expect(r.monthlyNeeded).toBe(3000);
    expect(r.projected).toBe(18000);
    expect(r.shortfall).toBe(6000);
    expect(r.monthsNeeded).toBe(9);
    expect(r.funded).toBe(0.75);
  });
  it("rounds up the required whole-rupee deposit to avoid a hidden shortfall", () => {
    const r = savingsGoal(10000, 0, 3, 3333);
    expect(r.monthlyNeeded).toBe(3334);
    expect(r.shortfall).toBe(1);
    expect(savingsGoal(10000, 0, 3, r.monthlyNeeded).surplus).toBe(2);
  });
  it("treats a gap with no new saving as unreachable, not Infinity or zero months", () => {
    expect(savingsGoal(24000, 6000, 6, 0).monthsNeeded).toBeNull();
    const covered = savingsGoal(24000, 25000, 6, 0);
    expect(covered.monthlyNeeded).toBe(0);
    expect(covered.monthsNeeded).toBe(0);
    expect(covered.shortfall).toBe(0);
    expect(covered.surplus).toBe(1000);
    expect(covered.funded).toBe(1);
    expect(savingsGoal(0, 0, 1, 0).funded).toBe(1);
  });
  it("makes the deadline trade-off without adding assumed investment gains", () => {
    const short = savingsGoal(24000, 6000, 6, 2000);
    const long = savingsGoal(24000, 6000, 9, 2000);
    expect(long.monthlyNeeded).toBe(2000);
    expect(long.projected - short.projected).toBe(3 * 2000);
    expect(long.shortfall).toBe(0);
  });
  it("rejects invalid amounts and fractional or empty durations", () => {
    for (const args of [
      [-1, 0, 6, 100],
      [100, -1, 6, 100],
      [100, 0, 0, 100],
      [100, 0, 1.5, 100],
      [100, 0, 6, -1],
      [NaN, 0, 6, 100],
      [100, 0, Infinity, 100],
      [100, 0, 6, Infinity],
    ])
      expect(() =>
        savingsGoal(...(args as [number, number, number, number])),
      ).toThrow(RangeError);
  });
});
describe("same-date net-worth snapshot", () => {
  it("uses current asset values and outstanding debts, preserving negative results", () => {
    expect(netWorth([40000, 60000, 50000], [70000, 10000])).toEqual({
      owned: 150000,
      owed: 80000,
      total: 70000,
    });
    expect(netWorth([50000], [80000]).total).toBe(-30000);
    expect(netWorth([], []).total).toBe(0);
  });
  it("does not create wealth by borrowing cash or repaying principal from cash", () => {
    const initial = netWorth([40000, 60000, 50000], [70000, 10000]);
    expect(netWorth([50000, 60000, 50000], [70000, 10000, 10000]).total).toBe(
      initial.total,
    );
    expect(netWorth([30000, 60000, 50000], [60000, 10000]).total).toBe(
      initial.total,
    );
    expect(netWorth([29000, 60000, 50000], [60000, 10000]).total).toBe(
      initial.total - 1000,
    );
  });
  it("rejects negative, missing and non-finite entries", () => {
    for (const bad of [-1, NaN, Infinity, -Infinity]) {
      expect(() => netWorth([bad], [])).toThrow(RangeError);
      expect(() => netWorth([], [bad])).toThrow(RangeError);
    }
  });
});
