import { describe, it, expect } from "vitest";
import {
  compound,
  sip,
  emi,
  streak,
  scheduleReview,
  isCorrect,
  dayKey,
  rupees,
} from "../src/lib/learning";
import { freshProgress, validateBackup } from "../src/lib/store";
describe("financial calculations", () => {
  it("compounds interest on earlier interest", () =>
    expect(compound(10000, 10, 2)).toBeCloseTo(12100, 6));
  it("uses end-of-month SIP deposits and handles zero return", () => {
    expect(sip(5000, 0, 10)).toBe(600000);
    expect(sip(5000, 12, 1)).toBeCloseTo(63412.515065984884, 6);
  });
  it("calculates reducing-balance EMI and handles zero interest", () => {
    expect(emi(500000, 9, 10)).toBeCloseTo(6333.79, 2);
    expect(emi(120000, 0, 1)).toBe(10000);
  });
  it("uses Indian rupee grouping", () =>
    expect(rupees(120000)).toContain("1,20,000"));
});
describe("streaks use local calendar days", () => {
  it("allows today to remain unfinished without losing the streak", () =>
    expect(
      streak(["2026-10-16", "2026-10-17"], new Date(2026, 9, 18, 14)),
    ).toBe(2));
  it("breaks after a missed day", () =>
    expect(streak(["2026-10-16"], new Date(2026, 9, 18))).toBe(0));
  it("does not count future or duplicate days", () =>
    expect(
      streak(["2026-10-17", "2026-10-17", "2026-10-18"], new Date(2026, 9, 17)),
    ).toBe(1));
  it("handles a month boundary", () =>
    expect(streak(["2026-02-28", "2026-03-01"], new Date(2026, 2, 1))).toBe(2));
});
describe("personalised revision", () => {
  it("schedules recall in one day, then six, then expands", () => {
    const now = new Date(2026, 9, 18);
    const a = scheduleReview(undefined, true, "q", "money", now);
    expect(a.interval).toBe(1);
    expect(a.due).toBe("2026-10-19");
    const b = scheduleReview(a, true, "q", "money", now);
    expect(b.interval).toBe(6);
    expect(scheduleReview(b, true, "q", "money", now).interval).toBeGreaterThan(
      6,
    );
  });
  it("resets a failed recall and remembers the mistake", () => {
    const a = scheduleReview(undefined, true, "q", "money");
    const b = scheduleReview(a, false, "q", "money");
    expect(b.interval).toBe(1);
    expect(b.repetitions).toBe(0);
    expect(b.wrong).toBe(1);
    expect(b.ease).toBeGreaterThanOrEqual(1.3);
  });
});
describe("exercise grading", () => {
  it("enforces numeric tolerance without accepting invalid numbers", () => {
    expect(isCorrect(120.005, 120)).toBe(true);
    expect(isCorrect(121, 120)).toBe(false);
    expect(isCorrect(NaN, 120)).toBe(false);
  });
  it("grades sequence, not just membership", () => {
    expect(isCorrect([1, 2, 0], [1, 2, 0])).toBe(true);
    expect(isCorrect([0, 1, 2], [1, 2, 0])).toBe(false);
  });
});
describe("backup validation", () => {
  it("round-trips a complete progress backup", () => {
    const p = freshProgress();
    p.notes.money = "My reminder";
    p.days[dayKey()] = 10;
    expect(validateBackup(JSON.parse(JSON.stringify(p)))).toEqual(p);
  });
  it("rejects unsupported versions and malformed history", () => {
    expect(() => validateBackup({ ...freshProgress(), version: 4 })).toThrow();
    expect(() =>
      validateBackup({
        ...freshProgress(),
        completed: {
          money: { score: 9, total: 8, date: "today", attempts: 1 },
        },
      }),
    ).toThrow();
    expect(() =>
      validateBackup({ ...freshProgress(), notes: { money: 5 } }),
    ).toThrow();
  });
  it("rejects corrupt suspended lessons", () =>
    expect(() =>
      validateBackup({
        ...freshProgress(),
        session: { lessonId: "money", stage: 1, question: -1, answers: {} },
      }),
    ).toThrow());
});
