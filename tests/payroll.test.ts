import { describe, expect, it } from "vitest";
import { examplePayroll, payroll, payrollBudget } from "../src/lib/payroll";

describe("fictional payslip reconciliation", () => {
  it("separates annual employer cost, monthly gross and the bank deposit", () => {
    expect(payroll(examplePayroll)).toEqual({
      gross: 30000,
      deductions: 3000,
      net: 27000,
      fixedAnnualCost: 388800,
      targetAnnualCost: 412800,
    });
  });
  it("does not turn employer benefits or a target bonus into monthly cash", () => {
    const original = payroll(examplePayroll);
    const benefit = payroll({ ...examplePayroll, employerBenefit: 3000 });
    expect(benefit.targetAnnualCost - original.targetAnnualCost).toBe(7200);
    expect(benefit.net).toBe(original.net);
    const noBonus = payroll({ ...examplePayroll, targetAnnualBonus: 0 });
    expect(noBonus.targetAnnualCost).toBe(388800);
    expect(noBonus.net).toBe(original.net);
  });
  it("reconciles every deduction and permits zero cuts without hiding rounding", () => {
    for (const employeeSaving of [0, 1800, 4000])
      for (const advanceRepayment of [0, 1200, 5000]) {
        const p = payroll({
          ...examplePayroll,
          employeeSaving,
          advanceRepayment,
        });
        expect(p.net + employeeSaving + advanceRepayment).toBe(p.gross);
        expect(p.net).toBe(30000 - employeeSaving - advanceRepayment);
      }
    expect(
      payroll({ ...examplePayroll, employeeSaving: 0, advanceRepayment: 0 })
        .net,
    ).toBe(30000);
  });
  it("rejects invalid or impossible figures instead of silently capping them", () => {
    for (const n of [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER])
      expect(() => payroll({ ...examplePayroll, basic: n })).toThrow(
        RangeError,
      );
    expect(() => payroll({ ...examplePayroll, employeeSaving: 40000 })).toThrow(
      RangeError,
    );
  });
});
describe("budget from take-home pay", () => {
  it("exposes a shortfall instead of budgeting the annual offer divided by twelve", () => {
    expect(payrollBudget(27000, 23000, 5000)).toEqual({
      available: 4000,
      gap: 1000,
      surplus: 0,
    });
    expect(payrollBudget(27000, 23000, 3000)).toEqual({
      available: 4000,
      gap: 0,
      surplus: 1000,
    });
  });
  it("preserves a deficit in essentials and validates all inputs", () => {
    expect(payrollBudget(27000, 28000, 0)).toEqual({
      available: -1000,
      gap: 1000,
      surplus: 0,
    });
    expect(payrollBudget(0, 0, 0)).toEqual({
      available: 0,
      gap: 0,
      surplus: 0,
    });
    expect(() => payrollBudget(27000, -1, 5000)).toThrow(RangeError);
  });
});
