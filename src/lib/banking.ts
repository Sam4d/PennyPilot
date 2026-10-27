/** Fictional one-payment hold model. No bank rules or credit facility implied. */
export function bankingFunds(payment: number, posted: boolean) {
  if (!Number.isSafeInteger(payment) || payment < 0 || payment > 10400)
    throw new RangeError(
      "Use a whole-rupee payment within the fictional balance.",
    );
  const baseBalance = 5000 + 12000 - 6000 - 500 - 100;
  const debit = posted ? payment : 0;
  const hold = posted ? 0 : payment;
  const recorded = baseBalance - debit;
  return { baseBalance, debit, hold, recorded, available: recorded - hold };
}
