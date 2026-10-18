export const rupees = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
export function compound(principal: number, annualRate: number, years: number) {
  return principal * (1 + annualRate / 100) ** years;
}
export function sip(monthly: number, annualRate: number, years: number) {
  const r = annualRate / 1200,
    n = years * 12;
  return r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
}
export function emi(principal: number, rate: number, years: number) {
  const n = years * 12,
    r = rate / 1200;
  return r === 0
    ? principal / n
    : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
const ist = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
/** Learning days are always IST, including while travelling. */
export const dayKey = (date = new Date()) => ist.format(date);
export const addCalendarDays = (day: string, count: number) =>
  new Date(Date.parse(`${day}T00:00:00Z`) + count * 86400000)
    .toISOString()
    .slice(0, 10);
export function streak(
  days: string[],
  now = new Date(),
  frozenDays: string[] = [],
) {
  const set = new Set([...days, ...frozenDays]);
  let day = dayKey(now),
    count = 0;
  if (!set.has(day)) day = addCalendarDays(day, -1);
  while (set.has(day)) {
    count++;
    day = addCalendarDays(day, -1);
  }
  return count;
}
export type StreakProtection = {
  credits: number;
  used: string[];
  earned: string[];
};
export const freshProtection = (): StreakProtection => ({
  credits: 0,
  used: [],
  earned: [],
});
export function earnFreeze(
  current: StreakProtection,
  lessonId: string,
): StreakProtection {
  return current.earned.includes(lessonId)
    ? current
    : {
        ...current,
        credits: Math.min(2, current.credits + 1),
        earned: [...current.earned, lessonId],
      };
}
/** Protect only an affordable complete gap through yesterday; never invent study or XP. */
export function reconcileFreezes(
  days: string[],
  current: StreakProtection,
  now = new Date(),
): StreakProtection {
  const today = dayKey(now);
  const latest = [...days, ...current.used]
    .filter(
      (d) =>
        /^\d{4}-\d{2}-\d{2}$/.test(d) &&
        d <= today &&
        Number.isFinite(Date.parse(d)),
    )
    .sort()
    .at(-1);
  if (!latest) return current;
  const gap =
    Math.round((Date.parse(today) - Date.parse(latest)) / 86400000) - 1;
  if (gap <= 0 || gap > current.credits) return current;
  return {
    ...current,
    credits: current.credits - gap,
    used: [
      ...current.used,
      ...Array.from({ length: gap }, (_, i) => addCalendarDays(latest, i + 1)),
    ],
  };
}
export type ReviewItem = {
  questionId: string;
  lessonId: string;
  due: string;
  interval: number;
  ease: number;
  repetitions: number;
  wrong: number;
};
export function scheduleReview(
  previous: ReviewItem | undefined,
  correct: boolean,
  questionId: string,
  lessonId: string,
  now = new Date(),
): ReviewItem {
  const ease = Math.max(1.3, (previous?.ease ?? 2.5) + (correct ? 0.1 : -0.2));
  const repetitions = correct ? (previous?.repetitions ?? 0) + 1 : 0;
  const interval = !correct
    ? 1
    : repetitions === 1
      ? 1
      : repetitions === 2
        ? 6
        : Math.round((previous?.interval ?? 6) * ease);
  const due = addCalendarDays(dayKey(now), interval);
  return {
    questionId,
    lessonId,
    due,
    interval,
    ease,
    repetitions,
    wrong: (previous?.wrong ?? 0) + (correct ? 0 : 1),
  };
}
export function isCorrect(
  answer: number | number[],
  expected: number | number[],
) {
  return Array.isArray(expected)
    ? Array.isArray(answer) &&
        answer.length === expected.length &&
        answer.every((n, i) => n === expected[i])
    : !Array.isArray(answer) &&
        Number.isFinite(answer) &&
        Math.abs(answer - expected) <= 0.01;
}

/** Accept Indian/standard grouping and Devanagari digits without guessing malformed groups. */
export function parseAmount(raw: string): number {
  const text = raw
    .trim()
    .replace(/[०-९]/g, (c) => String(c.charCodeAt(0) - 0x0966))
    .replaceAll("−", "-");
  if (
    text.includes(",") &&
    !/^-?\d{1,3}(?:,\d{2})*,\d{3}(?:\.\d+)?$/.test(text) &&
    !/^-?\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(text)
  )
    return NaN;
  const plain = text.replaceAll(",", "");
  return /^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(plain) ? Number(plain) : NaN;
}
