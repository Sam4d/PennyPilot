import { useState } from "react";
import type { Progress } from "../lib/store";
import type { Lesson } from "../content/lessons";
import { lessons, read, t } from "../content/lessons";
import { dayKey } from "../lib/learning";
import { Icon, Local, Modal } from "../components/UI";
import Mia from "../components/Mia";
const pathGroups = [
  {
    id: "foundation",
    eyebrow: "THE VERY BEGINNING",
    title: t(
      "Make friends with your money",
      "पैसों से दोस्ती",
      "Paison se dosti",
    ),
  },
  {
    id: "everyday",
    eyebrow: "EVERYDAY MONEY CONFIDENCE",
    title: t(
      "Put your money skills to work",
      "रोज़ के पैसों की समझ",
      "Roz ke paison ki samajh",
    ),
  },
  {
    id: "protection",
    eyebrow: "YOUR SAFETY NET",
    title: t(
      "Protect the people and plans you love",
      "अपने लोगों और प्लान की सुरक्षा",
      "Apne logon aur plan ki suraksha",
    ),
  },
  {
    id: "borrowing",
    eyebrow: "BORROW WITH YOUR EYES OPEN",
    title: t(
      "Understand the full cost",
      "उधार का पूरा हिसाब",
      "Udhaar ka poora hisaab",
    ),
  },
].flatMap((chapter) => {
  const items = lessons.filter(
    (l) => (l.chapter ?? "foundation") === chapter.id,
  );
  return Array.from({ length: Math.ceil(items.length / 6) }, (_, i) => ({
    ...chapter,
    lessons: items.slice(i * 6, i * 6 + 6),
  }));
});
const pathCurve = (count: number) => {
  const x = [200, 300, 180, 290, 190, 260];
  let d = `M${x[0]} 54.5`;
  for (let i = 1; i < count; i++) {
    const y = 54.5 + i * 109,
      mid = y - 54.5;
    d += ` C${x[i - 1]} ${mid} ${x[i]} ${mid} ${x[i]} ${y}`;
  }
  return d;
};
export default function Learn({
  progress,
  onStart,
  onCurriculum,
  onTools,
  onGoal,
  streak,
}: {
  progress: Progress;
  onStart: (l: Lesson) => void;
  onCurriculum: () => void;
  onTools: () => void;
  onGoal: () => void;
  streak: number;
}) {
  const [selected, setSelected] = useState<Lesson | null>(null);
  const hi = progress.language === "hi";
  const completed = Object.keys(progress.completed).length;
  const next =
    progress.session && progress.session.stage !== 3
      ? lessons.find((l) => l.id === progress.session?.lessonId) || lessons[0]
      : lessons.find((l) => !progress.completed[l.id]) || lessons[0];
  const today = progress.days[dayKey()] || 0;
  const percent = Math.min(today / progress.goal, 1);
  const d = new Date();
  const weekday = (d.getDay() + 6) % 7;
  return (
    <div className="learn-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR MONEY ERA STARTS HERE</span>
          <h1>
            {hi ? (
              "थोड़ा सीखें। समझदार बनें।"
            ) : (
              <>
                A little wiser. <span>Every day.</span>
              </>
            )}
          </h1>
          <p>
            {hi
              ? "छोटे कदम, बड़े सपने। मिया आपके साथ है।"
              : "Small steps, big possibilities. Let’s make money make sense."}
          </p>
        </div>
        <span className="heading-doodle" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="stats-strip">
        <div className="stat">
          <span className="stat-icon peach">
            <Icon name="Flame" size={23} />
          </span>
          <div>
            <strong>
              {streak}{" "}
              <span>
                {hi ? "दिन" : "day"}
                {streak !== 1 && !hi ? "s" : ""}
              </span>
            </strong>
            <small>{hi ? "लगातार सीखना" : "Learning streak"}</small>
          </div>
          <span className="stat-micro">
            {streak ? "Keep it growing" : "A fresh beginning"}
          </span>
        </div>
        <div className="stat">
          <span className="stat-icon lime">
            <Icon name="Zap" size={23} />
          </span>
          <div>
            <strong>
              {progress.xp.toLocaleString("en-IN")} <span>XP</span>
            </strong>
            <small>{hi ? "ज्ञान बढ़ रहा है" : "Knowledge, earned"}</small>
          </div>
          <svg
            className="sparkline"
            width="64"
            height="30"
            viewBox="0 0 64 30"
            aria-hidden="true"
          >
            <path
              d="m1 26 10-5 9 2 10-11 10 5 10-10 13-5"
              fill="none"
              stroke="#70aa48"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="stat">
          <span className="stat-icon lavender">
            <Icon name="Flag" size={22} />
          </span>
          <div>
            <strong>
              {completed}
              <span> / {lessons.length}</span>
            </strong>
            <small>{hi ? "पाठ पूरे" : "Foundation lessons"}</small>
          </div>
          <span className="stat-pill">{hi ? "आपके लिए" : "Your own pace"}</span>
        </div>
      </div>
      <div className="learning-grid">
        <div className="journey-column">
          <section className="hero-card">
            <div className="hero-text">
              <span className="hero-tag">
                <span />
                WORLD 01 · MONEY FOUNDATIONS
              </span>
              <h2>
                {hi ? (
                  <>
                    पैसों की समझ।
                    <br />
                    एक पाठ हर दिन।
                  </>
                ) : (
                  <>
                    Big dreams.
                    <br />
                    Meet small steps.
                  </>
                )}
              </h2>
              <p>
                {hi
                  ? "बिना उलझन। बिना दबाव। बस आप, मिया और पैसों की समझ।"
                  : "No jargon. No judgement. Just you, Mia, and a little money wisdom."}
              </p>
              <button className="button primary" onClick={() => onStart(next)}>
                {progress.session && progress.session.stage !== 3
                  ? hi
                    ? "पाठ जारी रखें"
                    : "Continue lesson"
                  : completed
                    ? hi
                      ? "सीखते रहें"
                      : "Keep learning"
                    : hi
                      ? "मिया के साथ शुरू करें"
                      : "Let’s start with Mia"}
                <Icon name="ArrowRight" size={18} />
              </button>
              <span className="hero-time">
                <Icon name="Clock3" size={13} /> {next.minutes} min ·{" "}
                {read(next.title, progress.language)}
              </span>
            </div>
            <div className="hero-art">
              <span className="orbit orbit-one" />
              <span className="orbit orbit-two" />
              <span className="hero-spark spark-one">✦</span>
              <span className="hero-spark spark-two">✧</span>
              <div className="floating-coin coin-one">₹</div>
              <div className="floating-coin coin-two">₹</div>
              <Mia />
              <span className="mia-name">
                Hi, I’m Mia! <span>↗</span>
              </span>
            </div>
          </section>
          <div className="section-heading">
            <div>
              <h2>
                {hi ? "आपका सफ़र" : "Your learning path"}{" "}
                <span className="small-leaf">✦</span>
              </h2>
              <p>
                {hi
                  ? "बुनियाद मज़बूत बनाएं। भविष्य के लिए।"
                  : "A strong foundation. For everything ahead."}
              </p>
            </div>
            <button className="text-button" onClick={onCurriculum}>
              {hi ? "सभी वर्ल्ड" : "All worlds"}
              <Icon name="Grid2X2" size={15} />
            </button>
          </div>
          {pathGroups.map((path, groupIndex) => {
            const group = path.lessons;
            return (
              <section className="path-card" key={groupIndex}>
                <div className="unit-heading">
                  <span className="unit-number">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="eyebrow">{path.eyebrow}</span>
                    <h3>
                      <Local text={path.title} lang={progress.language} />
                    </h3>
                  </div>
                  <span className="unit-progress">
                    {group.filter((l) => progress.completed[l.id]).length}/
                    {group.length}
                  </span>
                </div>
                <div className="path-scroll" style={{ minHeight: 0 }}>
                  <svg
                    className="winding-line"
                    viewBox={`0 0 480 ${group.length * 109}`}
                    style={{ height: group.length * 109 }}
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d={pathCurve(group.length)}
                      fill="none"
                      stroke="var(--path-line)"
                      strokeWidth="5"
                      strokeDasharray="2 13"
                      strokeLinecap="round"
                    />
                  </svg>
                  {group.map((lesson, i) => {
                    const done = !!progress.completed[lesson.id],
                      current = lesson.id === next.id;
                    return (
                      <div
                        className={`path-row row-${i} ${current ? "current" : ""} ${done ? "done" : ""}`}
                        key={lesson.id}
                      >
                        <button
                          className="lesson-node"
                          onClick={() => setSelected(lesson)}
                          aria-label={`${current ? (hi ? "शुरू करें: " : "LET’S GO: ") : ""}${read(lesson.title, progress.language)}, ${done ? "completed" : current ? "next lesson" : "available lesson"}`}
                        >
                          <span>
                            {done ? (
                              <Icon name="Check" size={29} />
                            ) : (
                              <Icon
                                name={current ? "Play" : lesson.icon}
                                size={current ? 29 : 25}
                                fill={current ? "currentColor" : "none"}
                              />
                            )}
                          </span>
                          {current && (
                            <span className="start-bubble">
                              {hi ? "शुरू करें" : "LET’S GO"}
                              <span aria-hidden="true">✦</span>
                            </span>
                          )}
                          {done && <span className="node-star">★</span>}
                        </button>
                        <button
                          className="path-label"
                          onClick={() => setSelected(lesson)}
                        >
                          <span className="path-step">
                            {done
                              ? "NICE WORK"
                              : `LESSON ${String(lessons.indexOf(lesson) + 1).padStart(2, "0")}`}
                          </span>
                          <strong>
                            <Local
                              text={lesson.title}
                              lang={progress.language}
                            />
                          </strong>
                          <small>
                            {lesson.minutes} min <span>·</span>{" "}
                            {done
                              ? "Revisit anytime"
                              : i === 0
                                ? "Start here, go anywhere"
                                : "Learn by doing"}
                          </small>
                        </button>
                        {i === 2 && (
                          <span className="path-sprout" aria-hidden="true">
                            <Icon name="Sprout" size={43} />
                          </span>
                        )}
                        {i === 4 && (
                          <span className="path-star" aria-hidden="true">
                            ✧
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="checkpoint">
                  <span className="checkpoint-icon">
                    <Icon name="Flag" size={23} />
                  </span>
                  <div>
                    <strong>
                      {hi
                        ? "आपकी मज़बूत शुरुआत"
                        : "A little confidence, unlocked."}
                    </strong>
                    <p>
                      {hi
                        ? `${group.length} पाठ। रोज़मर्रा के पैसों की समझ।`
                        : `${group.length} lessons. Real-world money skills.`}
                    </p>
                  </div>
                  <Icon name="Sparkles" size={23} />
                </div>
              </section>
            );
          })}
          <button className="next-world" onClick={onCurriculum}>
            <span className="next-world-icon">
              <Icon name="Globe" size={27} />
            </span>
            <span>
              <small>THE BIGGER PICTURE</small>
              <strong>
                {hi
                  ? "दुनिया की अर्थव्यवस्था समझें"
                  : "From your wallet to the world"}
              </strong>
              <span>Explore the 16-world curriculum</span>
            </span>
            <Icon name="ArrowUpRight" size={23} />
          </button>
        </div>
        <aside className="learning-rail" aria-label="Your daily learning">
          <section className="daily-card">
            <div className="card-header">
              <h3>{hi ? "आज का छोटा लक्ष्य" : "A little, every day"}</h3>
              <span className="square-icon">
                <Icon name="Target" size={18} />
              </span>
            </div>
            <div className="goal-ring">
              <svg
                viewBox="0 0 150 150"
                aria-label={`${Math.round(percent * 100)} percent of daily goal`}
              >
                <circle
                  cx="75"
                  cy="75"
                  r="63"
                  fill="none"
                  stroke="var(--soft)"
                  strokeWidth="9"
                />
                <circle
                  cx="75"
                  cy="75"
                  r="63"
                  fill="none"
                  stroke="#78bb46"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={`${percent * 396} 396`}
                  transform="rotate(-90 75 75)"
                />
              </svg>
              <div>
                <Icon name={percent === 1 ? "Check" : "Zap"} size={24} />
                <strong>
                  {today}
                  <span> / {progress.goal}</span>
                </strong>
                <small>XP TODAY</small>
              </div>
            </div>
            <p className="goal-copy">
              {percent >= 1
                ? "Daily goal, done. Look at you grow!"
                : hi
                  ? "खुद के लिए कुछ मिनट निकालें।"
                  : "A few minutes for a future you."}
            </p>
            <div className="week-row">
              {["M", "T", "W", "T", "F", "S", "S"].map((label, i) => {
                const date = new Date();
                date.setDate(date.getDate() - weekday + i);
                const earned = !!progress.days[dayKey(date)];
                return (
                  <div className={i === weekday ? "today" : ""} key={i}>
                    <span>{label}</span>
                    <span className={earned ? "earned" : ""}>
                      {earned ? (
                        <Icon name="Check" size={13} />
                      ) : i === weekday ? (
                        <span className="today-dot" />
                      ) : (
                        <span className="week-dot" />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
            <button className="goal-button" onClick={onGoal}>
              {hi ? "लक्ष्य बदलें" : "Make it your goal"}
              <Icon name="ChevronRight" size={15} />
            </button>
          </section>
          <section className="mia-tip">
            <div className="tip-heading">
              <span className="mini-mia">
                <Mia pose="face" />
              </span>
              <div>
                <strong>Mia’s little wisdom</strong>
                <span>YOUR MONEY BUDDY</span>
              </div>
              <Icon name="Sparkles" size={17} />
            </div>
            <blockquote>
              “You don’t need a lot of money to start learning about it.”
            </blockquote>
            <div className="tip-underline" />
            <p>Curiosity is a pretty great first investment.</p>
          </section>
          <button className="playground-card" onClick={onTools}>
            <div className="card-header">
              <span className="pill">LEARN BY PLAYING</span>
              <Icon name="ArrowUpRight" size={20} />
            </div>
            <h3>
              What if your money
              <br />
              could grow?
            </h3>
            <p>
              Slide, explore, and see the
              <br />
              magic of compounding.
            </p>
            <svg
              viewBox="0 0 250 100"
              className="mini-growth"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="chartfill" x2="0" y2="1">
                  <stop stopColor="#a5d570" stopOpacity=".5" />
                  <stop offset="1" stopColor="#a5d570" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M10 90Q130 92 235 10V100H10Z" fill="url(#chartfill)" />
              <path
                d="M10 90Q130 92 235 10"
                fill="none"
                stroke="#6d9f43"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="235" cy="10" r="5" fill="#6d9f43" />
              <path d="M10 90H240" stroke="#d8dfcf" strokeDasharray="3 5" />
            </svg>
            <span className="tool-link">
              Enter the playground
              <Icon name="ArrowRight" size={16} />
            </span>
          </button>
          <div className="promise">
            <Icon name="Heart" size={18} />
            <p>
              No ads. No hot stock tips.
              <br />
              Just good money education.
            </p>
          </div>
        </aside>
      </div>
      {selected && (
        <Modal
          onClose={() => setSelected(null)}
          label={read(selected.title, progress.language)}
        >
          <div className="lesson-preview">
            <span className="preview-icon">
              <Icon name={selected.icon} size={32} />
            </span>
            <span className="eyebrow">MONEY FOUNDATIONS · BEGINNER</span>
            <h2>
              <Local text={selected.title} lang={progress.language} />
            </h2>
            <p>
              <Local text={selected.subtitle} lang={progress.language} />
            </p>
            <ul>
              {selected.notes.map((n, i) => (
                <li key={i}>
                  <Icon name="CircleCheck" size={19} />
                  <span>
                    <Local text={n} lang={progress.language} />
                  </span>
                </li>
              ))}
            </ul>
            <div className="lesson-meta">
              <span>
                <Icon name="Clock3" size={16} />
                {selected.minutes} minutes
              </span>
              <span>
                <Icon name="Zap" size={16} />
                Up to 100 XP
              </span>
            </div>
            <button
              className="button green full"
              onClick={() => {
                onStart(selected);
                setSelected(null);
              }}
            >
              {hi ? "पाठ शुरू करें" : "Let’s learn this"}
              <Icon name="ArrowRight" size={18} />
            </button>
            <p className="tiny-text">
              Editorial preview · Sources included with every lesson
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
