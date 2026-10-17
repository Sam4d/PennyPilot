import type { Progress } from "../lib/store";
import type { Lesson } from "../content/lessons";
import { lessons, read } from "../content/lessons";
import { dayKey } from "../lib/learning";
import { Empty, Icon } from "../components/UI";
import Mia from "../components/Mia";
export default function Revise({
  progress,
  onStart,
}: {
  progress: Progress;
  onStart: (lesson: Lesson, ids?: string[]) => void;
}) {
  const today = dayKey();
  const due = Object.values(progress.reviews).filter((r) => r.due <= today);
  const weak = Object.values(progress.reviews).filter((r) => r.wrong > 0);
  const groups = lessons
    .map((l) => ({
      lesson: l,
      questions: due.filter((r) => r.lessonId === l.id),
    }))
    .filter((g) => g.questions.length);
  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">A LITTLE REFRESH GOES A LONG WAY</span>
          <h1>
            {progress.language === "hi" ? (
              "यादें ताज़ा करें।"
            ) : (
              <>
                Good things <span>stick with practice.</span>
              </>
            )}
          </h1>
          <p>Not a test. Just a friendly check-in with what you’ve learned.</p>
        </div>
        <Icon name="RotateCcw" size={37} />
      </div>
      <div className="review-banner">
        <Mia pose="read" />
        <div>
          <span className="eyebrow">MAKE ROOM FOR A LITTLE RECALL</span>
          <h2>
            {due.length
              ? `${due.length} little refresh${due.length === 1 ? "" : "es"} ready for you.`
              : "Your next refresh is growing."}
          </h2>
          <p>
            {Object.keys(progress.reviews).length
              ? "We schedule each question from your answers. Correct answers come back less often; tricky ones get a little more care."
              : "Finish your first lesson and Mia will remember which ideas to revisit."}
          </p>
        </div>
      </div>
      {groups.length ? (
        <div className="review-list">
          {groups.map(({ lesson, questions }) => (
            <button
              className="review-item"
              key={lesson.id}
              onClick={() =>
                onStart(
                  lesson,
                  questions.slice(0, 10).map((q) => q.questionId),
                )
              }
            >
              <span className="preview-icon">
                <Icon name={lesson.icon} />
              </span>
              <span>
                <strong>{read(lesson.title, progress.language)}</strong>
                <small>
                  {questions.length} questions due · A few thoughtful minutes
                </small>
              </span>
              <Icon name="ArrowRight" />
            </button>
          ))}
        </div>
      ) : (
        <Empty
          icon="Coffee"
          title={
            Object.keys(progress.reviews).length
              ? "All caught up. Let it settle."
              : "A fresh page, a curious mind."
          }
          description={
            Object.keys(progress.reviews).length
              ? "Your next revision is due tomorrow or later. You can practise a lesson again anytime."
              : "Start with the basics. Your personal revision queue will grow as you learn."
          }
        >
          <button className="button green" onClick={() => onStart(lessons[0])}>
            Explore a lesson
            <Icon name="ArrowRight" size={17} />
          </button>
        </Empty>
      )}
      {weak.length > 0 && (
        <section className="mistakes-section">
          <span className="eyebrow">MISTAKES ARE LITTLE TEACHERS</span>
          <h2>A little extra attention.</h2>
          <p>
            These questions have been tricky before. They’re saved here, without
            judgement.
          </p>
          {lessons
            .filter((l) => weak.some((r) => r.lessonId === l.id))
            .map((l) => (
              <button
                className="review-item"
                key={l.id}
                onClick={() =>
                  onStart(
                    l,
                    weak
                      .filter((r) => r.lessonId === l.id)
                      .slice(0, 10)
                      .map((r) => r.questionId),
                  )
                }
              >
                <Icon name="Lightbulb" />
                <strong>{read(l.title, progress.language)}</strong>
                <span>Practise again</span>
                <Icon name="ArrowRight" size={17} />
              </button>
            ))}
        </section>
      )}
    </div>
  );
}
