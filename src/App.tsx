import {
  useCallback,
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
} from "react";
import { lessons } from "./content/lessons";
import type { Lesson } from "./content/lessons";
import { dayKey, scheduleReview, streak } from "./lib/learning";
import {
  exportBackup,
  flushProgress,
  freshProgress,
  loadProgress,
  saveProgress,
} from "./lib/store";
import type { Progress, Session } from "./lib/store";
import AppUpdate from "./components/AppUpdate";
import Mia from "./components/Mia";
import { Icon } from "./components/UI";
import Learn from "./pages/Learn";
const LessonPlayer = lazy(() => import("./pages/LessonPlayer"));
const Tools = lazy(() => import("./pages/Tools"));
const Notebook = lazy(() => import("./pages/Notebook"));
const Profile = lazy(() => import("./pages/Profile"));
const Revise = lazy(() => import("./pages/Revise"));
const Insurance = lazy(() => import("./pages/Insurance"));
const Curriculum = lazy(() => import("./pages/Curriculum"));
export type Update = (fn: (p: Progress) => Progress) => void;
export default function App() {
  const [progress, setProgress] = useState<Progress>(freshProgress);
  const state = useRef(progress);
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [page, setPage] = useState(() => {
    const p = window.location.hash.slice(1);
    return ["learn", "revise", "tools", "notebook", "me", "insurance"].includes(
      p,
    )
      ? p
      : "learn";
  });
  const [curriculum, setCurriculum] = useState(() =>
    window.location.hash.startsWith("#curriculum"),
  );
  const [catalogueTarget, setCatalogueTarget] = useState(() =>
    window.location.hash.startsWith("#curriculum/")
      ? window.location.hash.slice(12)
      : "",
  );
  const [active, setActive] = useState(false);
  const [toast, setToast] = useState("");
  const [online, setOnline] = useState(navigator.onLine);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 4000);
  }, []);
  useEffect(() => {
    loadProgress()
      .then((p) => {
        state.current = p;
        setProgress(p);
      })
      .catch(() =>
        setStorageError(
          "Device storage is unavailable. Progress will only last this session. Enable browser storage or export a backup.",
        ),
      )
      .finally(() => setLoaded(true));
    const online = () => setOnline(navigator.onLine);
    window.addEventListener("online", online);
    window.addEventListener("offline", online);
    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", online);
    };
  }, []);
  const update: Update = useCallback((fn) => {
    const p = fn(state.current);
    state.current = p;
    setProgress(p);
    saveProgress(p).catch(() =>
      setStorageError(
        "Progress could not be saved. Export a backup from Me before closing the app.",
      ),
    );
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = progress.theme;
    document.documentElement.dataset.largeText =
      progress.scale >= 1.5 ? "true" : "false";
    document.documentElement.style.fontSize = `${16 * progress.scale}px`;
    document.documentElement.lang = progress.language === "hi" ? "hi" : "en";
  }, [progress.theme, progress.language, progress.scale]);
  const hi = progress.language === "hi";
  useEffect(() => {
    const route = () => {
      const p = window.location.hash.slice(1);
      if (p === "curriculum" || p.startsWith("curriculum/")) {
        setCurriculum(true);
        setCatalogueTarget(p.slice(11));
        return;
      }
      setCurriculum(false);
      setPage(
        ["learn", "revise", "tools", "notebook", "me", "insurance"].includes(p)
          ? p
          : "learn",
      );
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", route);
    return () => window.removeEventListener("hashchange", route);
  }, []);
  const navigate = (next: string) => {
    window.location.hash = next;
    setPage(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const openCurriculum = (target = "") => {
    setCatalogueTarget(target);
    setCurriculum(true);
    window.location.hash = `curriculum/${target}`;
  };
  const closeCurriculum = () => {
    setCurriculum(false);
    window.location.hash = page;
  };
  const start = (lesson: Lesson, reviewIds?: string[]) => {
    if (
      progress.session?.lessonId !== lesson.id ||
      !!reviewIds !== !!progress.session.review ||
      progress.session.stage === 3
    ) {
      const session: Session = {
        lessonId: lesson.id,
        stage: 0,
        question: 0,
        answers: {},
        review: !!reviewIds,
        questionIds: reviewIds,
      };
      update((p) => ({ ...p, session }));
    }
    setActive(true);
  };
  const answer = (id: string, value: number | number[], correct: boolean) => {
    update((p) => {
      if (!p.session) return p;
      if (p.session.answers[id]) return p;
      const today = dayKey();
      const earned = correct ? 10 : 0;
      return {
        ...p,
        xp: p.xp + earned,
        days: { ...p.days, [today]: (p.days[today] || 0) + earned },
        reviews: {
          ...p.reviews,
          [id]: scheduleReview(p.reviews[id], correct, id, p.session.lessonId),
        },
        session: {
          ...p.session,
          answers: { ...p.session.answers, [id]: { answer: value, correct } },
        },
      };
    });
  };
  const finish = () => {
    update((p) => {
      if (!p.session || p.session.stage === 3) return p;
      const session = p.session,
        values = Object.values(session.answers),
        score = values.filter((a) => a.correct).length;
      const old = p.completed[session.lessonId];
      const perfect = score === values.length;
      const bonus = perfect ? 20 : 0;
      const today = dayKey();
      return {
        ...p,
        xp: p.xp + bonus,
        days: { ...p.days, [today]: (p.days[today] || 0) + bonus },
        saved: p.saved.includes(session.lessonId)
          ? p.saved
          : [...p.saved, session.lessonId],
        completed: session.review
          ? p.completed
          : {
              ...p.completed,
              [session.lessonId]: {
                score: Math.max(old?.score || 0, score),
                total: values.length,
                date: today,
                attempts: (old?.attempts || 0) + 1,
              },
            },
        session: { ...session, stage: 3 },
      };
    });
  };
  const current = lessons.find((l) => l.id === progress.session?.lessonId);
  const count = Object.keys(progress.completed).length;
  return (
    <>
      {!loaded ? (
        <div className="loading-screen">
          <Mia pose="face" />
          <p>Getting your journey ready…</p>
        </div>
      ) : (
        <>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <aside className="sidebar" aria-label="Penny Pilot navigation">
            <button
              className="brand"
              onClick={() => navigate("learn")}
              aria-label="Penny Pilot. home"
            >
              <span className="brand-mark">
                <Mia pose="face" />
              </span>
              <span>
                Penny{" "}
                <span className="brand-pilot">
                  Pilot<span className="brand-dot">.</span>
                </span>
              </span>
            </button>
            <span className="sidebar-label">A LITTLE WISER, EVERY DAY</span>
            <nav aria-label="Main navigation">
              {[
                ["learn", "Route", hi ? "सीखें" : "Learn"],
                ["revise", "RotateCcw", hi ? "दोहराएं" : "Revise"],
                ["tools", "SlidersHorizontal", hi ? "टूल्स" : "Playground"],
                ["insurance", "Umbrella", hi ? "बीमा" : "Insurance"],
                ["notebook", "BookOpen", hi ? "नोटबुक" : "Notebook"],
                ["me", "UserRound", hi ? "मेरी प्रोफ़ाइल" : "Me"],
              ].map(([id, icon, label]) => (
                <button
                  key={id}
                  className={`nav-item ${page === id ? "selected" : ""}`}
                  aria-current={page === id ? "page" : undefined}
                  onClick={() => navigate(id)}
                >
                  <Icon name={icon} />
                  <span>{label}</span>
                  {id === "learn" && <span className="nav-dot" />}
                  {id === "notebook" && progress.saved.length > 0 && (
                    <span className="nav-count">{progress.saved.length}</span>
                  )}
                </button>
              ))}
            </nav>
            <div className="sidebar-bottom">
              <div className="sidebar-mia">
                <Mia pose="read" />
                <div className="tiny-stars">✧</div>
                <h3>
                  {hi ? "पैसों की समझ बढ़ रही है।" : "You’ve got this, human."}
                </h3>
                <p>
                  {hi
                    ? "रोज़ थोड़ा सीखें। मिया साथ है।"
                    : "Money can feel complicated. Let’s make it a little less so."}
                </p>
                <span>— Mia, your money buddy</span>
              </div>
              <div className="privacy-small">
                <Icon name="ShieldCheck" size={15} />
                Your progress. Your device.
              </div>
              <span className="build-label">
                MADE FOR CURIOUS MINDS IN INDIA
              </span>
            </div>
          </aside>
          <div className="app-shell">
            <header className="topbar">
              <div className="breadcrumb">
                <span className="mobile-brand">
                  <Mia pose="face" />
                  Penny Pilot
                </span>
                <span className="desktop-breadcrumb">
                  Your space <Icon name="ChevronRight" size={14} />{" "}
                  <strong>
                    {page === "learn"
                      ? "Learning journey"
                      : page === "insurance"
                        ? "Insurance learning"
                        : page === "tools"
                          ? "The playground"
                          : page === "me"
                            ? "Your profile"
                            : page === "revise"
                              ? "Your daily refresh"
                              : "Your notebook"}
                  </strong>
                </span>
              </div>
              <div className="topbar-actions">
                {!online && (
                  <span className="offline">
                    <Icon name="WifiOff" size={15} />
                    <span>Offline</span>
                  </span>
                )}
                <label className="language-select">
                  <Icon name="Languages" size={17} />
                  <select
                    aria-label="Language"
                    value={progress.language}
                    onChange={(e) =>
                      update((p) => ({
                        ...p,
                        language: e.target.value as Progress["language"],
                      }))
                    }
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                    <option value="hinglish">Hinglish (Roman)</option>
                    <option value="both">English + हिन्दी</option>
                  </select>
                  <Icon name="ChevronDown" size={12} />
                </label>
                <button
                  className="avatar"
                  aria-label="Your profile"
                  onClick={() => navigate("me")}
                >
                  {progress.name ? (
                    progress.name[0].toUpperCase()
                  ) : (
                    <Icon name="UserRound" size={20} />
                  )}
                </button>
              </div>
            </header>
            <AppUpdate language={progress.language} />
            {storageError && (
              <div className="storage-warning" role="alert">
                {storageError}{" "}
                <button
                  onClick={() => {
                    void exportBackup(progress).catch(() =>
                      setStorageError(
                        "Backup export failed. Please try again from Me.",
                      ),
                    );
                  }}
                >
                  Export backup
                </button>
              </div>
            )}
            <main id="main" className="main-content">
              <Suspense
                fallback={
                  <div className="page-loading">
                    A little patience, a little progress…
                  </div>
                }
              >
                {page === "learn" && (
                  <Learn
                    progress={progress}
                    onStart={start}
                    onCurriculum={() => openCurriculum()}
                    onTools={() => navigate("tools")}
                    onGoal={() => navigate("me")}
                    streak={streak(Object.keys(progress.days))}
                  />
                )}
                {page === "tools" && <Tools language={progress.language} />}
                {page === "insurance" && (
                  <Insurance
                    language={progress.language}
                    onStart={start}
                    onCurriculum={() => openCurriculum("world/12")}
                  />
                )}
                {page === "notebook" && (
                  <Notebook
                    progress={progress}
                    update={update}
                    notify={notify}
                    onStart={start}
                  />
                )}
                {page === "me" && (
                  <Profile
                    progress={progress}
                    update={update}
                    notify={notify}
                    count={count}
                  />
                )}
                {page === "revise" && (
                  <Revise progress={progress} onStart={start} />
                )}
              </Suspense>
            </main>
            <footer className="app-footer">
              <span>Small lessons. Lifelong confidence.</span>
              <span>
                <span className="live-dot" />
                Free to learn. Yours to keep.
              </span>
            </footer>
          </div>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {[
              ["learn", "Route", "Learn"],
              ["revise", "RotateCcw", "Revise"],
              ["tools", "SlidersHorizontal", "Playground"],
              ["insurance", "Umbrella", hi ? "बीमा" : "Insurance"],
              ["notebook", "BookOpen", "Notebook"],
              ["me", "UserRound", "Me"],
            ].map(([id, icon, label]) => (
              <button
                key={id}
                aria-current={page === id ? "page" : undefined}
                className={page === id ? "selected" : ""}
                onClick={() => navigate(id)}
              >
                <Icon name={icon} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
          {curriculum && (
            <Suspense
              fallback={
                <div className="modal-backdrop">
                  <p>Opening the full journey…</p>
                </div>
              }
            >
              <Curriculum
                onClose={closeCurriculum}
                language={progress.language}
                target={catalogueTarget}
                onNavigate={openCurriculum}
                onStart={(lesson) => {
                  closeCurriculum();
                  start(lesson);
                }}
              />
            </Suspense>
          )}
          {active && current && progress.session && (
            <Suspense
              fallback={
                <div className="modal-backdrop">
                  <p>Getting your lesson ready…</p>
                </div>
              }
            >
              <LessonPlayer
                key={current.id}
                lesson={current}
                session={progress.session}
                language={progress.language}
                onClose={async () => {
                  await flushProgress().catch(() => {});
                  setActive(false);
                }}
                update={update}
                onAnswer={answer}
                onFinish={finish}
                onNext={() => {
                  setActive(false);
                  const next = lessons[lessons.indexOf(current) + 1];
                  if (next) start(next);
                  else {
                    navigate("notebook");
                    notify(
                      "Your foundations preview is complete. Beautiful work!",
                    );
                  }
                }}
              />
            </Suspense>
          )}
          {toast && (
            <div className="toast" role="status">
              <Icon name="CircleCheck" size={18} />
              {toast}
            </div>
          )}
        </>
      )}
    </>
  );
}
