import { repaymentSchedule } from "./loans";
/** Fictional single rate reset: monthly reducing balance, unchanged final month,
 * payment recalculated after resetAfter completed payments, no intermediate rounding.
 * The fee is withheld once at the start, not financed or paid again.
 */
export function loanRateReset(
  principal: number,
  initialRate: number,
  revisedRate: number,
  months: number,
  resetAfter: number,
  fee = 0,
) {
  if (
    !Number.isSafeInteger(principal) ||
    principal <= 0 ||
    principal > 1e12 ||
    !Number.isSafeInteger(fee) ||
    fee < 0 ||
    fee >= principal ||
    !Number.isFinite(revisedRate) ||
    revisedRate < 0 ||
    revisedRate > 100 ||
    !Number.isInteger(resetAfter) ||
    resetAfter < 1 ||
    resetAfter >= months
  )
    throw new RangeError(
      "Use a valid fictional advance, fee, rate and reset before the final payment.",
    );
  const baseline = repaymentSchedule(principal, initialRate, months, fee);
  const first = baseline.rows.slice(0, resetAfter);
  const resetBalance = first.at(-1)!.closing;
  const remaining = repaymentSchedule(
    resetBalance,
    revisedRate,
    months - resetAfter,
  );
  const rows = [
    ...first,
    ...remaining.rows.map((row) => ({ ...row, month: row.month + resetAfter })),
  ];
  const totalPayments = rows.reduce((sum, row) => sum + row.payment, 0);
  const totalInterest = rows.reduce((sum, row) => sum + row.interest, 0);
  const difference = remaining.monthlyPayment - baseline.monthlyPayment;
  return {
    rows,
    resetBalance,
    beforePayment: baseline.monthlyPayment,
    afterPayment: remaining.monthlyPayment,
    paymentChange: Math.abs(difference) < 1e-8 ? 0 : difference,
    totalPayments,
    totalInterest,
    netReceived: principal - fee,
    totalCost: totalPayments - (principal - fee),
    baselineCost: baseline.totalCost,
  };
}
