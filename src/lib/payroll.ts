/** Whole-rupee teaching model, assumed 23 October 2026. No statutory rates. */
export type PayrollInputs = {
  basic: number;
  allowance: number;
  employeeSaving: number;
  advanceRepayment: number;
  employerBenefit: number;
  targetAnnualBonus: number;
};
export const examplePayroll: Readonly<PayrollInputs> = Object.freeze({
  basic: 24000,
  allowance: 6000,
  employeeSaving: 1800,
  advanceRepayment: 1200,
  employerBenefit: 2400,
  targetAnnualBonus: 24000,
});
const amounts = (values: number[]) => {
  if (values.some((n) => !Number.isSafeInteger(n) || n < 0))
    throw new RangeError("Use non-negative whole-rupee amounts.");
};
export function payroll(input: PayrollInputs) {
  amounts(Object.values(input));
  const gross = input.basic + input.allowance;
  const deductions = input.employeeSaving + input.advanceRepayment;
  const net = gross - deductions;
  const fixedAnnualCost = 12 * (gross + input.employerBenefit);
  const targetAnnualCost = fixedAnnualCost + input.targetAnnualBonus;
  if (deductions > gross || !Number.isSafeInteger(targetAnnualCost))
    throw new RangeError(
      "Deductions cannot exceed pay; totals must be safe integers.",
    );
  return { gross, deductions, net, fixedAnnualCost, targetAnnualCost };
}
export function payrollBudget(
  net: number,
  essentials: number,
  savingGoal: number,
) {
  amounts([net, essentials, savingGoal]);
  const available = net - essentials;
  return {
    available,
    gap: Math.max(0, savingGoal - available),
    surplus: Math.max(0, available - savingGoal),
  };
}
