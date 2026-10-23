/** Fictional monthly planning ledger. Negative cash is an unfunded plan, not credit. */
export const exampleIncome = [40000, 10000, 35000, 15000, 30000, 20000];
export function cashflowPlan(
  income: number[],
  openingCash: number,
  essentials: number,
  bill: number,
  dueMonth: number,
  monthlyReserve: number,
) {
  if (
    !income.length ||
    income.length > 24 ||
    !Number.isInteger(dueMonth) ||
    dueMonth < 1 ||
    dueMonth > income.length ||
    [...income, openingCash, essentials, bill, monthlyReserve].some(
      (n) => !Number.isSafeInteger(n) || n < 0,
    )
  )
    throw new RangeError(
      "Use valid whole-rupee amounts and a month within the plan.",
    );
  let cash = openingCash,
    pot = 0,
    billGap = 0;
  const rows = income.map((received, index) => {
    const month = index + 1;
    const reserved =
      month <= dueMonth ? Math.min(monthlyReserve, Math.max(0, bill - pot)) : 0;
    cash += received - essentials - reserved;
    pot += reserved;
    const billPaid = month === dueMonth ? Math.min(bill, pot) : 0;
    if (month === dueMonth) billGap = bill - billPaid;
    pot -= billPaid;
    if (!Number.isSafeInteger(cash) || !Number.isSafeInteger(pot))
      throw new RangeError("Plan totals exceed safe whole-rupee values.");
    return {
      month,
      received,
      essentials,
      reserved,
      cash,
      pot,
      billPaid,
      unfundedCash: Math.max(0, -cash),
    };
  });
  const totalIncome = income.reduce((a, b) => a + b, 0);
  if (!Number.isSafeInteger(totalIncome))
    throw new RangeError("Income total is too large.");
  return {
    rows,
    totalIncome,
    averageIncome: totalIncome / income.length,
    endingCash: cash,
    billGap,
    largestCashGap: Math.max(...rows.map((r) => r.unfundedCash)),
  };
}
