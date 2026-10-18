/** Fixed annual simple interest: no added/withdrawn principal, fees or tax. */
export function simpleInterest(
  principal: number,
  annualPercent: number,
  years: number,
) {
  if (
    ![principal, annualPercent, years].every(
      (n) => Number.isFinite(n) && n >= 0,
    )
  )
    throw new RangeError("Use finite, non-negative principal, rate and years.");
  const yearlyInterest = (principal * annualPercent) / 100;
  const interest = yearlyInterest * years;
  return { yearlyInterest, interest, total: principal + interest };
}
