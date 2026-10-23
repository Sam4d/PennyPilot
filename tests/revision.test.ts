import { describe, expect, it } from "vitest";
import {
  availableReviews,
  selectReviews,
  buildReviewPlan,
  createReviewSession,
  advanceReviewSession,
  reviewWeek,
} from "../src/lib/revision";
import { freshProgress, validateBackup } from "../src/lib/store";
import { translateUI } from "../src/lib/ui-copy";
import { scheduleReview, type ReviewItem } from "../src/lib/learning";

const today = "2026-10-23";
const review = (
  questionId: string,
  lessonId = "money",
  due = today,
  wrong = 0,
  repetitions = 1,
): ReviewItem => ({
  questionId,
  lessonId,
  due,
  wrong,
  repetitions,
  ease: 2.5,
  interval: 1,
});

describe("revision plans", () => {
  it("offers only unique questions belonging to an existing lesson", () => {
    const good = review("money-1");
    expect(
      availableReviews({
        one: good,
        duplicate: good,
        wrongLesson: review("money-2", "income"),
        retired: review("retired"),
      }),
    ).toEqual([good]);
  });
  it("separates overdue, unrecovered mistakes, and all previously tried questions", () => {
    const failed = review("money-1", "money", "2026-10-24", 1, 0);
    const recovered = review("money-2", "money", today, 2, 1);
    const old = review("income-1", "income", "2026-10-20");
    expect(selectReviews([failed, recovered, old], "due", today)).toEqual([
      old,
      recovered,
    ]);
    expect(selectReviews([failed, recovered, old], "mistakes", today)).toEqual([
      failed,
    ]);
    expect(selectReviews([failed, recovered, old], "all", today)).toHaveLength(
      3,
    );
    expect(
      selectReviews(
        [
          scheduleReview(
            failed,
            true,
            failed.questionId,
            "money",
            new Date(today),
          ),
        ],
        "mistakes",
        today,
      ),
    ).toEqual([]);
  });
  it("shares a short plan across topics before filling one large topic", () => {
    const items = [
      review("money-1"),
      review("money-2"),
      review("money-3"),
      review("income-1", "income"),
      review("budget-1", "budget"),
    ];
    const original = structuredClone(items);
    const groups = buildReviewPlan(items, 4);
    expect(groups).toEqual([
      { lessonId: "money", questionIds: ["money-1", "money-2"] },
      { lessonId: "income", questionIds: ["income-1"] },
      { lessonId: "budget", questionIds: ["budget-1"] },
    ]);
    expect(items).toEqual(original);
    expect(buildReviewPlan(items, 0)).toEqual([]);
    expect(buildReviewPlan([items[0], items[0]], 20)[0].questionIds).toEqual([
      "money-1",
    ]);
  });
  it("keeps overdue work in today only and crosses month boundaries", () => {
    const week = reviewWeek(
      [
        review("a", "money", "2026-10-29"),
        review("b", "money", "2026-11-01"),
        review("c", "money", "2026-11-10"),
      ],
      "2026-10-31",
    );
    expect(week[0]).toEqual({ day: "2026-10-31", count: 1 });
    expect(week[1]).toEqual({ day: "2026-11-01", count: 1 });
    expect(week).toHaveLength(7);
    expect(week.reduce((sum, d) => sum + d.count, 0)).toBe(2);
  });
  it("resumes the remaining queue without moving forward before Finish", () => {
    expect(createReviewSession([])).toBeNull();
    const first = createReviewSession([
      { lessonId: "money", questionIds: ["money-1"] },
      { lessonId: "income", questionIds: ["income-1", "income-2"] },
    ])!;
    expect(advanceReviewSession(first)).toBeNull();
    const saved = validateBackup(
      JSON.parse(
        JSON.stringify({
          ...freshProgress(),
          session: {
            ...first,
            stage: 3,
            answers: { "money-1": { answer: 0, correct: true } },
          },
        }),
      ),
    );
    const next = advanceReviewSession(saved.session!)!;
    expect(next.lessonId).toBe("income");
    expect(next.answers).toEqual({});
    expect(next.reviewPlan).toEqual({
      remaining: [],
      completedQuestions: 1,
      totalQuestions: 3,
    });
    expect(advanceReviewSession({ ...next, stage: 3 })).toBeNull();
  });
});

describe("version-three backup migration", () => {
  it.each([1, 2])(
    "preserves a version-%i suspended lesson, notes and language",
    (version) => {
      const legacy = {
        ...freshProgress(),
        version,
        language: "en",
        xp: 230,
        saved: ["money"],
        notes: { money: "Keep this" },
        session: {
          lessonId: "money",
          stage: 1,
          question: 0,
          answers: { "money-1": { answer: 0, correct: true } },
        },
      };
      const migrated = validateBackup(JSON.parse(JSON.stringify(legacy)));
      expect(migrated).toEqual({ ...legacy, version: 3 });
    },
  );
  it("rejects malformed queues, inconsistent totals and invalid question-ID lists", () => {
    const session = createReviewSession([
      { lessonId: "money", questionIds: ["money-1"] },
    ])!;
    expect(translateUI("The saved revision plan is invalid.", "hi")).toBe(
      "सेव किए दोहराई के प्लान का डेटा सही नहीं है।",
    );
    expect(translateUI("The saved revision plan is invalid.", "en")).toBe(
      "The saved revision plan is invalid.",
    );
    for (const reviewPlan of [
      null,
      { ...session.reviewPlan, remaining: "bad" },
      { ...session.reviewPlan, totalQuestions: 20 },
      { ...session.reviewPlan, completedQuestions: -1 },
      {
        ...session.reviewPlan,
        remaining: [{ lessonId: "income", questionIds: ["x", "x"] }],
      },
    ]) {
      expect(() =>
        validateBackup({
          ...freshProgress(),
          session: { ...session, reviewPlan },
        }),
      ).toThrow("saved revision plan");
    }
    expect(() =>
      validateBackup({
        ...freshProgress(),
        session: { ...session, review: false },
      }),
    ).toThrow();
    expect(() =>
      validateBackup({
        ...freshProgress(),
        session: { ...session, questionIds: "bad" },
      }),
    ).toThrow("saved lesson");
  });
});
