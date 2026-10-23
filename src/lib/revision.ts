import { lessons } from "../content/lessons";
import { addCalendarDays, type ReviewItem } from "./learning";
import type { Session } from "./store";

export type ReviewGroup = { lessonId: string; questionIds: string[] };
export type ReviewMode = "due" | "mistakes" | "all";

/** Old backups may contain retired/unknown questions. Never offer an empty lesson. */
export function availableReviews(reviews: Record<string, ReviewItem>) {
  const known = new Map(
    lessons.flatMap((lesson) =>
      lesson.exercises.map((q) => [q.id, lesson.id] as const),
    ),
  );
  return [
    ...new Map(
      Object.values(reviews)
        .filter((r) => known.get(r.questionId) === r.lessonId)
        .map((r) => [r.questionId, r]),
    ).values(),
  ];
}

export function selectReviews(
  items: ReviewItem[],
  mode: ReviewMode,
  today: string,
) {
  return items
    .filter((r) =>
      mode === "due"
        ? r.due <= today
        : mode === "mistakes"
          ? r.wrong > 0 && r.repetitions === 0
          : true,
    )
    .sort(
      (a, b) =>
        a.due.localeCompare(b.due) ||
        b.wrong - a.wrong ||
        a.questionId.localeCompare(b.questionId),
    );
}

/** Round-robin selection spreads a short plan across the learner's topics. */
export function buildReviewPlan(
  items: ReviewItem[],
  limit: number,
): ReviewGroup[] {
  const buckets = new Map<string, string[]>();
  for (const r of items) {
    const ids = buckets.get(r.lessonId) ?? [];
    if (!ids.includes(r.questionId)) ids.push(r.questionId);
    buckets.set(r.lessonId, ids);
  }
  const selected = new Map<string, string[]>();
  const count = Math.max(0, Math.floor(limit));
  let added = 0;
  while (added < count) {
    let found = false;
    for (const [lessonId, ids] of buckets) {
      if (added >= count) break;
      const id = ids.shift();
      if (!id) continue;
      found = true;
      selected.set(lessonId, [...(selected.get(lessonId) ?? []), id]);
      added++;
    }
    if (!found) break;
  }
  return [...selected].map(([lessonId, questionIds]) => ({
    lessonId,
    questionIds,
  }));
}

export function createReviewSession(groups: ReviewGroup[]): Session | null {
  const [first, ...remaining] = groups.filter((g) => g.questionIds.length);
  if (!first) return null;
  return {
    ...first,
    stage: 1,
    question: 0,
    answers: {},
    review: true,
    reviewPlan: {
      remaining,
      completedQuestions: 0,
      totalQuestions: groups.reduce((sum, g) => sum + g.questionIds.length, 0),
    },
  };
}

/** Advancement only happens after Finish, so returning to a summary cannot skip work. */
export function advanceReviewSession(session: Session): Session | null {
  if (!session.reviewPlan || session.stage !== 3) return null;
  const [next, ...remaining] = session.reviewPlan.remaining;
  if (!next) return null;
  return {
    ...next,
    stage: 1,
    question: 0,
    answers: {},
    review: true,
    reviewPlan: {
      ...session.reviewPlan,
      remaining,
      completedQuestions:
        session.reviewPlan.completedQuestions +
        (session.questionIds?.length ?? 0),
    },
  };
}

/** Today includes overdue questions. Future columns count only their exact IST day. */
export function reviewWeek(items: ReviewItem[], today: string) {
  return Array.from({ length: 7 }, (_, i) => {
    const day = addCalendarDays(today, i);
    return {
      day,
      count: items.filter((r) => (i === 0 ? r.due <= day : r.due === day))
        .length,
    };
  });
}
