import { Copy, useUICopy } from "../lib/ui-copy";
import { useState } from "react";
import type { Progress } from "../lib/store";
import type { Lesson } from "../content/lessons";
import { lessons, read, t } from "../content/lessons";
import { addCalendarDays, dayKey } from "../lib/learning";
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
  {
    id: "planning",
    eyebrow: "A PLAN FOR YOUR NEXT STEP",
    title: t(
      "Turn a wish into a money plan",
      "सपने को पैसों का प्लान दें",
      "Sapne ko paison ka plan dein",
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
  const ui = useUICopy();

  const [selected, setSelected] = useState<Lesson | null>(null);
  const hi = progress.language === "hi";
  const completed = Object.keys(progress.completed).length;
  const next =
    progress.session && progress.session.stage !== 3
      ? lessons.find((l) => l.id === progress.session?.lessonId) || lessons[0]
      : lessons.find((l) => !progress.completed[l.id]) || lessons[0];
  const today = progress.days[dayKey()] || 0;
  const percent = Math.min(today / progress.goal, 1);
  const weekday = (new Date(`${dayKey()}T00:00:00Z`).getUTCDay() + 6) % 7;
  return (
    <div className="learn-page">
      {Object.keys(progress.days).length > 0 && streak === 0 && (
        <p className="welcome-back" role="status">
          <Copy>
            {hi
              ? "फिर स्वागत है। आज का एक छोटा कदम ही काफ़ी है।"
              : "Welcome back. One small step today is enough."}
          </Copy>
        </p>
      )}

      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <Copy en="YOUR MONEY ERA STARTS HERE " />
          </span>
          <h1>
            {hi ? (
              "थोड़ा सीखें। समझदार बनें।"
            ) : (
              <>
                <Copy en="A little wiser. " />
                <span>
                  <Copy en="Every day. " />
                </span>
              </>
            )}
          </h1>
          <p>
            <Copy>
              {hi
                ? "छोटे कदम, बड़े सपने। मिया आपके साथ है।"
                : "Small steps, big possibilities. Let’s make money make sense."}
            </Copy>
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
              <Copy>{streak}</Copy>
              <Copy> </Copy>
              <span>
                <Copy>{hi ? "दिन" : "day"}</Copy>
                <Copy>{streak !== 1 && !hi ? "s" : ""}</Copy>
              </span>
            </strong>
            <small>
              <Copy>{hi ? "लगातार सीखना" : "Learning streak"}</Copy>
            </small>
          </div>
          <span className="stat-micro">
            <Copy>{streak ? "Keep it growing" : "A fresh beginning"}</Copy>
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
            <small>
              <Copy>{hi ? "ज्ञान बढ़ रहा है" : "Knowledge, earned"}</Copy>
            </small>
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
              stroke="var(--color-70aa48)"
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
              <Copy>{completed}</Copy>
              <span>
                {" "}
                / <Copy>{lessons.length}</Copy>
              </span>
            </strong>
            <small>
              <Copy>{hi ? "पाठ पूरे" : "Foundation lessons"}</Copy>
            </small>
          </div>
          <span className="stat-pill">
            <Copy>{hi ? "आपके लिए" : "Your own pace"}</Copy>
          </span>
        </div>
      </div>
      <p className="streak-protection">
        <Copy>
          {hi
            ? `फ्री स्ट्रीक फ़्रीज़: ${progress.protection?.credits ?? 0}/2 · नया पूरा पाठ करके पाएं।`
            : `Free streak freezes: ${progress.protection?.credits ?? 0}/2 · Earn one with a newly completed lesson.`}
        </Copy>
      </p>
      <div className="learning-grid">
        <div className="journey-column">
          <section className="hero-card">
            <div className="hero-text">
              <span className="hero-tag">
                <span />
                <Copy en="WORLD 01 · MONEY FOUNDATIONS " />
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
                    <Copy en="Big dreams. " />
                    <br />
                    <Copy en="Meet small steps. " />
                  </>
                )}
              </h2>
              <p>
                <Copy>
                  {hi
                    ? "बिना उलझन। बिना दबाव। बस आप, मिया और पैसों की समझ।"
                    : "No jargon. No judgement. Just you, Mia, and a little money wisdom."}
                </Copy>
              </p>
              <button className="button primary" onClick={() => onStart(next)}>
                <Copy>
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
                </Copy>
                <Icon name="ArrowRight" size={18} />
              </button>
              <span className="hero-time">
                <Icon name="Clock3" size={13} /> <Copy>{next.minutes}</Copy>
                <Copy en="min · " />
                <Copy> </Copy>
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
                <Copy en="Hi, I’m Mia! " />
                <span>↗</span>
              </span>
            </div>
          </section>
          <div className="section-heading">
            <div>
              <h2>
                <Copy>{hi ? "आपका सफ़र" : "Your learning path"}</Copy>
                <Copy> </Copy>
                <span className="small-leaf">✦</span>
              </h2>
              <p>
                <Copy>
                  {hi
                    ? "बुनियाद मज़बूत बनाएं। भविष्य के लिए।"
                    : "A strong foundation. For everything ahead."}
                </Copy>
              </p>
            </div>
            <button className="text-button" onClick={onCurriculum}>
              <Copy>{hi ? "सभी वर्ल्ड" : "All worlds"}</Copy>
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
                    <span className="eyebrow">
                      <Copy>{path.eyebrow}</Copy>
                    </span>
                    <h3>
                      <Local text={path.title} lang={progress.language} />
                    </h3>
                  </div>
                  <span className="unit-progress">
                    {group.filter((l) => progress.completed[l.id]).length}/
                    <Copy>{group.length}</Copy>
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
                          aria-label={`${current ? (hi ? "शुरू करें: " : "LET’S GO: ") : ""}${read(lesson.title, progress.language)}, ${hi ? (done ? "पूरा पाठ" : current ? "अगला पाठ" : "उपलब्ध पाठ") : done ? "completed" : current ? "next lesson" : "available lesson"}`}
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
                              <Copy>{hi ? "शुरू करें" : "LET’S GO"}</Copy>
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
                            <Copy>
                              {done
                                ? "NICE WORK"
                                : `LESSON ${String(lessons.indexOf(lesson) + 1).padStart(2, "0")}`}
                            </Copy>
                          </span>
                          <strong>
                            <Local
                              text={lesson.title}
                              lang={progress.language}
                            />
                          </strong>
                          <small>
                            <Copy>{lesson.minutes}</Copy>
                            <Copy en="min " />
                            <span>·</span>
                            <Copy> </Copy>
                            <Copy>
                              {done
                                ? "Revisit anytime"
                                : i === 0
                                  ? "Start here, go anywhere"
                                  : "Learn by doing"}
                            </Copy>
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
                      <Copy>
                        {hi
                          ? "आपकी मज़बूत शुरुआत"
                          : "A little confidence, unlocked."}
                      </Copy>
                    </strong>
                    <p>
                      <Copy>
                        {hi
                          ? `${group.length} पाठ। रोज़मर्रा के पैसों की समझ।`
                          : `${group.length} lessons. Real-world money skills.`}
                      </Copy>
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
              <small>
                <Copy en="THE BIGGER PICTURE " />
              </small>
              <strong>
                <Copy>
                  {hi
                    ? "दुनिया की अर्थव्यवस्था समझें"
                    : "From your wallet to the world"}
                </Copy>
              </strong>
              <span>
                <Copy en="Explore the 16-world curriculum " />
              </span>
            </span>
            <Icon name="ArrowUpRight" size={23} />
          </button>
        </div>
        <aside className="learning-rail" aria-label={ui("Your daily learning")}>
          <section className="daily-card">
            <div className="card-header">
              <h3>
                <Copy>{hi ? "आज का छोटा लक्ष्य" : "A little, every day"}</Copy>
              </h3>
              <span className="square-icon">
                <Icon name="Target" size={18} />
              </span>
            </div>
            <div className="goal-ring">
              <svg
                viewBox="0 0 150 150"
                aria-label={`${Math.round(percent * 100)} ${hi ? "प्रतिशत रोज़ का लक्ष्य" : "percent of daily goal"}`}
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
                  stroke="var(--color-78bb46)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={`${percent * 396} 396`}
                  transform="rotate(-90 75 75)"
                />
              </svg>
              <div>
                <Icon name={percent === 1 ? "Check" : "Zap"} size={24} />
                <strong>
                  <Copy>{today}</Copy>
                  <span>
                    {" "}
                    / <Copy>{progress.goal}</Copy>
                  </span>
                </strong>
                <small>
                  <Copy en="XP TODAY " />
                </small>
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
                const date = addCalendarDays(dayKey(), -weekday + i);
                const earned = Object.hasOwn(progress.days, date);
                return (
                  <div className={i === weekday ? "today" : ""} key={i}>
                    <span>
                      <Copy>{label}</Copy>
                    </span>
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
              <Copy>{hi ? "लक्ष्य बदलें" : "Make it your goal"}</Copy>
              <Icon name="ChevronRight" size={15} />
            </button>
          </section>
          <section className="mia-tip">
            <div className="tip-heading">
              <span className="mini-mia">
                <Mia pose="face" />
              </span>
              <div>
                <strong>
                  <Copy en="Mia’s little wisdom " />
                </strong>
                <span>
                  <Copy en="YOUR MONEY BUDDY " />
                </span>
              </div>
              <Icon name="Sparkles" size={17} />
            </div>
            <blockquote>
              <Copy en="“You don’t need a lot of money to start learning about it.” " />
            </blockquote>
            <div className="tip-underline" />
            <p>
              <Copy en="Curiosity is a pretty great first investment. " />
            </p>
          </section>
          <button className="playground-card" onClick={onTools}>
            <div className="card-header">
              <span className="pill">
                <Copy en="LEARN BY PLAYING " />
              </span>
              <Icon name="ArrowUpRight" size={20} />
            </div>
            <h3>
              <Copy en="What if your money " />
              <br />
              <Copy en="could grow? " />
            </h3>
            <p>
              <Copy en="Slide, explore, and see the " />
              <br />
              <Copy en="magic of compounding. " />
            </p>
            <svg
              viewBox="0 0 250 100"
              className="mini-growth"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="chartfill" x2="0" y2="1">
                  <stop stopColor="var(--color-a5d570)" stopOpacity=".5" />
                  <stop
                    offset="1"
                    stopColor="var(--color-a5d570)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <path d="M10 90Q130 92 235 10V100H10Z" fill="url(#chartfill)" />
              <path
                d="M10 90Q130 92 235 10"
                fill="none"
                stroke="var(--color-6d9f43)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="235" cy="10" r="5" fill="var(--color-6d9f43)" />
              <path
                d="M10 90H240"
                stroke="var(--color-d8dfcf)"
                strokeDasharray="3 5"
              />
            </svg>
            <span className="tool-link">
              <Copy en="Enter the playground " />
              <Icon name="ArrowRight" size={16} />
            </span>
          </button>
          <div className="promise">
            <Icon name="Heart" size={18} />
            <p>
              <Copy en="No ads. No hot stock tips. " />
              <br />
              <Copy en="Just good money education. " />
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
            <span className="eyebrow">
              <Copy en="MONEY FOUNDATIONS · BEGINNER " />
            </span>
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
                <Copy>{selected.minutes}</Copy>
                <Copy en="minutes " />
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
              <Copy>{hi ? "पाठ शुरू करें" : "Let’s learn this"}</Copy>
              <Icon name="ArrowRight" size={18} />
            </button>
            <p className="tiny-text">
              <Copy en="Editorial preview · Sources included with every lesson " />
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
