/** Fixed-price goal, no returns or fees; contributions arrive at each month end. */
export function savingsGoal(
  target: number,
  saved: number,
  months: number,
  monthly: number,
) {
  if (
    ![target, saved, monthly].every((n) => Number.isFinite(n) && n >= 0) ||
    !Number.isInteger(months) ||
    months < 1
  )
    throw new RangeError(
      "Use non-negative amounts and a positive whole number of months.",
    );
  const remaining = Math.max(0, target - saved);
  const projected = saved + monthly * months;
  return {
    remaining,
    monthlyNeeded: Math.ceil(remaining / months),
    projected,
    shortfall: Math.max(0, target - projected),
    surplus: Math.max(0, projected - target),
    monthsNeeded:
      remaining === 0
        ? 0
        : monthly === 0
          ? null
          : Math.ceil(remaining / monthly),
    funded: target === 0 ? 1 : Math.min(1, projected / target),
  };
}
/** Snapshot values, not purchase prices; income is not an asset balance. */
export function netWorth(assets: number[], debts: number[]) {
  if (![...assets, ...debts].every((n) => Number.isFinite(n) && n >= 0))
    throw new RangeError(
      "Asset and outstanding debt amounts must be finite and non-negative.",
    );
  const owned = assets.reduce((sum, n) => sum + n, 0);
  const owed = debts.reduce((sum, n) => sum + n, 0);
  return { owned, owed, total: owned - owed };
}
