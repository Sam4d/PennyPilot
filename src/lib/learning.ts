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
export const dayKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
export function streak(days: string[], now = new Date()) {
  const set = new Set(days),
    d = new Date(now);
  if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1);
  let count = 0;
  while (set.has(dayKey(d))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
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
  const due = new Date(now);
  due.setDate(due.getDate() + interval);
  return {
    questionId,
    lessonId,
    due: dayKey(due),
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
