import { expect, it } from "vitest";
import {
  addCalendarDays,
  dayKey,
  earnFreeze,
  freshProtection,
  reconcileFreezes,
  streak,
} from "../src/lib/learning";
import { freshProgress, validateBackup } from "../src/lib/store";
it("rolls over at IST midnight rather than UTC midnight", () => {
  expect(dayKey(new Date("2026-10-18T18:29:59Z"))).toBe("2026-10-18");
  expect(dayKey(new Date("2026-10-18T18:30:00Z"))).toBe("2026-10-19");
  expect(dayKey(new Date("2026-10-19T00:00:00+05:30"))).toBe(
    dayKey(new Date("2026-10-18T11:30:00-07:00")),
  );
});
it("adds calendar days across leap years and year end", () => {
  expect(addCalendarDays("2028-02-28", 1)).toBe("2028-02-29");
  expect(addCalendarDays("2026-12-31", 1)).toBe("2027-01-01");
});
it("earns a capped free freeze once per completed lesson", () => {
  let p = freshProtection();
  p = earnFreeze(p, "money");
  expect(p.credits).toBe(1);
  expect(earnFreeze(p, "money")).toBe(p);
  p = earnFreeze(p, "budget");
  p = earnFreeze(p, "income");
  expect(p.credits).toBe(2);
});
it("bridges a complete affordable missed day without adding learning or XP", () => {
  const history = ["2026-10-16"];
  const p = earnFreeze(freshProtection(), "money");
  const protectedState = reconcileFreezes(
    history,
    p,
    new Date("2026-10-18T04:00:00Z"),
  );
  expect(protectedState.used).toEqual(["2026-10-17"]);
  expect(protectedState.credits).toBe(0);
  expect(history).toEqual(["2026-10-16"]);
  expect(
    streak(history, new Date("2026-10-18T04:00:00Z"), protectedState.used),
  ).toBe(2);
  expect(
    reconcileFreezes(history, protectedState, new Date("2026-10-18T04:00:00Z")),
  ).toBe(protectedState);
});
it("does not spend freezes on a gap too large to protect or on today", () => {
  const p = earnFreeze(freshProtection(), "money");
  expect(
    reconcileFreezes(["2026-10-15"], p, new Date("2026-10-18T04:00:00Z")),
  ).toBe(p);
  expect(
    reconcileFreezes(["2026-10-17"], p, new Date("2026-10-18T04:00:00Z")),
  ).toBe(p);
});
it("migrates old version-one backups and validates new optional fields", () => {
  const p = freshProgress();
  delete p.onboarded;
  delete p.protection;
  delete p.reports;
  delete p.lastBackupAt;
  expect(validateBackup(p).onboarded).toBe(true);
  expect(validateBackup(p).protection?.credits).toBe(0);
  expect(() =>
    validateBackup({
      ...freshProgress(),
      protection: { credits: 99, used: [], earned: [] },
    }),
  ).toThrow();
  expect(() =>
    validateBackup({ ...freshProgress(), lastBackupAt: "nonsense" }),
  ).toThrow();
  expect(freshProgress().sound).toBe(false);
});
