import { useState } from "react";
import type { Progress } from "../lib/store";
import { lessons, read } from "../content/lessons";
import {
  availableReviews,
  buildReviewPlan,
  reviewWeek,
  selectReviews,
  type ReviewGroup,
  type ReviewMode,
} from "../lib/revision";
import { Icon, Modal } from "./UI";

export default function RevisionPlanner({
  progress,
  today,
  onPlan,
  onResume,
}: {
  progress: Progress;
  today: string;
  onPlan: (groups: ReviewGroup[]) => void;
  onResume: () => void;
}) {
  const hi = progress.language === "hi";
  const [mode, setMode] = useState<ReviewMode>("due");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [limit, setLimit] = useState(10);
  const [pending, setPending] = useState<ReviewGroup[] | null>(null);
  const items = availableReviews(progress.reviews);
  if (!items.length) return null;
  const activeDay = selectedDay && selectedDay >= today ? selectedDay : today;
  const candidates =
    mode === "due" && activeDay !== today
      ? items.filter((r) => r.due === activeDay)
      : selectReviews(items, mode, today);
  const plan = buildReviewPlan(candidates, limit);
  const questionCount = plan.reduce((sum, g) => sum + g.questionIds.length, 0);
  const session = progress.session;
  const resumable =
    session && (session.stage < 3 || !!session.reviewPlan?.remaining.length);
  const savedLesson =
    resumable && lessons.find((l) => l.id === session.lessonId);
  const dateLabel = (day: string) =>
    new Intl.DateTimeFormat(hi ? "hi-IN" : "en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(new Date(`${day}T12:00:00Z`));
  const modes: [ReviewMode, string][] = [
    ["due", hi ? "अभी दोहराएं" : "Due now"],
    ["mistakes", hi ? "और अभ्यास करें" : "Needs practice"],
    ["all", hi ? "सीखे हुए सभी सवाल" : "All learned questions"],
  ];
  return (
    <section
      className="revision-planner"
      aria-labelledby="revision-planner-title"
    >
      <div className="revision-planner-heading">
        <div>
          <span className="eyebrow">
            {hi ? "थोड़ा दोहराएं, बातें जोड़ें" : "RECALL. CONNECT. REPEAT."}
          </span>
          <h2 id="revision-planner-title">
            {hi ? "अपनी दोहराई का प्लान बनाएं।" : "Build your revision plan."}
          </h2>
          <p>
            {hi
              ? "पहले आज़माए सवाल अलग-अलग टॉपिक से फिर देखें। सही जवाब के बाद अगली तारीख बदलती है।"
              : "Revisit questions you have tried across different topics. Each checked answer updates its next review date."}
          </p>
        </div>
        <Icon name="CalendarDays" size={28} />
      </div>
      {savedLesson && (
        <div className="revision-resume">
          <div>
            <strong>
              {hi ? "आपका सेव किया अभ्यास" : "Your saved practice"}
            </strong>
            <p>{read(savedLesson.title, progress.language)}</p>
            {session.reviewPlan && (
              <small>
                {session.reviewPlan.completedQuestions +
                  Object.keys(session.answers).length}{" "}
                / {session.reviewPlan.totalQuestions}{" "}
                {hi ? "जवाब सेव" : "answers saved"}
              </small>
            )}
          </div>
          <button
            className="button secondary"
            onClick={onResume}
            data-testid="resume-revision"
          >
            {hi ? "जारी रखें" : "Resume saved practice"}
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      )}
      <div className="revision-week-label">
        <h3>{hi ? "अगले 7 दिन" : "The next 7 days"}</h3>
        <span>{hi ? "भारतीय समय (IST)" : "India time (IST)"}</span>
      </div>
      <div
        className="revision-week"
        role="group"
        aria-label={hi ? "दोहराई की तारीख चुनें" : "Choose a review date"}
      >
        {reviewWeek(items, today).map(({ day, count }, i) => (
          <button
            key={day}
            type="button"
            aria-pressed={mode === "due" && activeDay === day}
            onClick={() => {
              setMode("due");
              setSelectedDay(day);
            }}
          >
            <span>{i === 0 ? (hi ? "आज" : "Today") : dateLabel(day)}</span>
            <strong>{count}</strong>
            <small>
              {hi ? "सवाल" : count === 1 ? "question" : "questions"}
            </small>
          </button>
        ))}
      </div>
      <p className="tiny-text">
        {hi
          ? "आज की गिनती में छूटी हुई दोहराई भी है। जल्दी अभ्यास करने पर तारीख बदल सकती है।"
          : "Today includes overdue questions. Practising early can change the schedule."}
      </p>
      <div
        className="revision-modes"
        role="group"
        aria-label={hi ? "अभ्यास के सवाल चुनें" : "Choose practice questions"}
      >
        {modes.map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={mode === id && (id !== "due" || activeDay === today)}
            onClick={() => {
              setMode(id);
              setSelectedDay(null);
            }}
          >
            {label}
            <span>{selectReviews(items, id, today).length}</span>
          </button>
        ))}
      </div>
      <div className="revision-plan-controls">
        <label>
          {hi
            ? "एक प्लान में ज़्यादा से ज़्यादा सवाल"
            : "Maximum questions per plan"}
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            {[5, 10, 20].map((n) => (
              <option value={n} key={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <div className="revision-selection" role="status" aria-live="polite">
          <strong>
            {questionCount}{" "}
            {hi ? "सवाल" : questionCount === 1 ? "question" : "questions"} ·{" "}
            {plan.length}{" "}
            {hi ? "टॉपिक" : plan.length === 1 ? "topic" : "topics"}
          </strong>
          <p>
            {mode === "due" && activeDay !== today
              ? dateLabel(activeDay)
              : modes.find(([id]) => id === mode)?.[1]}
          </p>
        </div>
      </div>
      {plan.length > 0 ? (
        <>
          <ol className="revision-plan-topics">
            {plan.map((g) => {
              const lesson = lessons.find((l) => l.id === g.lessonId)!;
              return (
                <li key={g.lessonId}>
                  <Icon name={lesson.icon} size={18} />
                  <span>{read(lesson.title, progress.language)}</span>
                  <strong>{g.questionIds.length}</strong>
                </li>
              );
            })}
          </ol>
          <button
            className="button green"
            data-testid="start-revision-plan"
            onClick={() => (savedLesson ? setPending(plan) : onPlan(plan))}
          >
            {hi ? "यह प्लान शुरू करें" : "Start this plan"}
            <Icon name="ArrowRight" size={18} />
          </button>
        </>
      ) : (
        <p className="revision-no-questions" role="status">
          {hi
            ? "इस चुनाव में अभी सवाल नहीं हैं। दूसरी तारीख या सीखे हुए सभी सवाल चुनें।"
            : "No questions in this selection. Choose another date or all learned questions."}
        </p>
      )}
      <p className="tiny-text">
        {hi
          ? "दोहराई से बातें याद रहती हैं। इससे नया पाठ पूरा नहीं माना जाता और पुराने पाठ का स्कोर नहीं बदलता।"
          : "Revision helps you remember. It keeps your original lesson scores and does not complete new lessons."}
      </p>
      {pending && (
        <Modal
          label={hi ? "सेव किया अभ्यास बदलें?" : "Replace saved practice?"}
          onClose={() => setPending(null)}
        >
          <h2>{hi ? "नया प्लान शुरू करें?" : "Start a new plan?"}</h2>
          <p>
            {hi
              ? "जाँचे हुए जवाब और दोहराई की हिस्ट्री सेव रहेंगी। पुराने अभ्यास को जहाँ छोड़ा था वहाँ से जारी करने की जगह नया प्लान सेव होगा।"
              : "Checked answers and review history stay saved. The new plan replaces your current place in the unfinished practice."}
          </p>
          <div className="revision-confirm-actions">
            <button
              className="button secondary"
              onClick={() => setPending(null)}
            >
              {hi ? "पुराना अभ्यास रखें" : "Keep saved practice"}
            </button>
            <button
              className="button green"
              onClick={() => {
                onPlan(pending);
                setPending(null);
              }}
              data-testid="confirm-revision-plan"
            >
              {hi ? "नया प्लान शुरू करें" : "Start new plan"}
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
