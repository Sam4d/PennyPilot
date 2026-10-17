/** Learning-only arithmetic. Actual claims depend on the complete policy. */
export function claimSplit(
  eligible: number,
  excluded: number,
  coPayPercent: number,
  availableCover: number,
) {
  if (
    ![eligible, excluded, availableCover].every(
      (n) => Number.isFinite(n) && n >= 0,
    ) ||
    !Number.isFinite(coPayPercent) ||
    coPayPercent < 0 ||
    coPayPercent > 100
  ) {
    throw new RangeError(
      "Claim inputs must be finite and non-negative; co-pay must be between 0 and 100.",
    );
  }
  const coPay = (eligible * coPayPercent) / 100;
  const insurer = Math.min(eligible - coPay, availableCover);
  const coverGap = Math.max(0, eligible - coPay - insurer);
  return {
    insurer,
    coPay,
    excluded,
    coverGap,
    you: excluded + coPay + coverGap,
    total: eligible + excluded,
  };
}
/** Static-cost planning example, not a personalised cover recommendation. */
export function supportGap(
  monthlyCosts: number,
  years: number,
  debt: number,
  usableSavings: number,
) {
  if (
    ![monthlyCosts, years, debt, usableSavings].every(
      (n) => Number.isFinite(n) && n >= 0,
    )
  )
    throw new RangeError("Planning inputs must be finite and non-negative.");
  const costs = monthlyCosts * 12 * years;
  return {
    costs,
    debt,
    usableSavings,
    gap: Math.max(0, costs + debt - usableSavings),
  };
}
