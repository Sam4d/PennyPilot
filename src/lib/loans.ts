export type RepaymentRow = {
  month: number;
  opening: number;
  interest: number;
  principal: number;
  payment: number;
  closing: number;
};
/** Fixed monthly reducing-balance example. No intermediate rounding, tax, penalties or rate changes. */
export function repaymentSchedule(
  principal: number,
  annualRate: number,
  months: number,
  upfrontFee = 0,
) {
  if (
    ![principal, annualRate, months, upfrontFee].every(Number.isFinite) ||
    principal <= 0 ||
    annualRate < 0 ||
    annualRate > 100 ||
    !Number.isInteger(months) ||
    months < 1 ||
    months > 600 ||
    upfrontFee < 0 ||
    upfrontFee >= principal
  )
    throw new RangeError(
      "Use positive principal, 1–600 whole months, a 0–100% annual rate and an upfront fee below principal.",
    );
  const r = annualRate / 1200;
  const monthlyPayment =
    r === 0
      ? principal / months
      : (principal * r) / -Math.expm1(-months * Math.log1p(r));
  const rows: RepaymentRow[] = [];
  let balance = principal,
    totalInterest = 0,
    totalPayments = 0;
  for (let month = 1; month <= months; month++) {
    const interest = balance * r;
    const repaid =
      month === months
        ? balance
        : Math.min(balance, Math.max(0, monthlyPayment - interest));
    const payment = repaid + interest;
    const closing = Math.max(0, balance - repaid);
    rows.push({
      month,
      opening: balance,
      interest,
      principal: repaid,
      payment,
      closing,
    });
    totalInterest += interest;
    totalPayments += payment;
    balance = closing;
  }
  return {
    monthlyPayment,
    rows,
    totalInterest,
    totalPayments,
    netReceived: principal - upfrontFee,
    totalCost: totalInterest + upfrontFee,
  };
}
/** Same item and delivery date; equal instalments, no interest or other charges in this fictional offer. */
export function purchaseComparison(
  cashPrice: number,
  instalment: number,
  months: number,
  fee: number,
) {
  if (
    ![cashPrice, instalment, months, fee].every(Number.isFinite) ||
    cashPrice < 0 ||
    instalment < 0 ||
    !Number.isInteger(months) ||
    months < 1 ||
    months > 600 ||
    fee < 0
  )
    throw new RangeError(
      "Use non-negative prices and fees and 1–600 whole months.",
    );
  const repayments = instalment * months;
  return {
    cashPrice,
    repayments,
    fee,
    total: repayments + fee,
    extra: repayments + fee - cashPrice,
  };
}
