import { CopyProvider } from "./lib/ui-copy";
import { Copy, translateUI } from "./lib/ui-copy";
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
import {
  dayKey,
  scheduleReview,
  streak,
  earnFreeze,
  freshProtection,
  reconcileFreezes,
} from "./lib/learning";
import {
  exportBackup,
  flushProgress,
  freshProgress,
  loadProgress,
  saveProgress,
} from "./lib/store";
import type { Progress, Session } from "./lib/store";
import {
  createReviewSession,
  advanceReviewSession,
  type ReviewGroup,
} from "./lib/revision";
import Onboarding from "./components/Onboarding";
import AppUpdate from "./components/AppUpdate";
import Mia from "./components/Mia";
import { Icon } from "./components/UI";
import Learn from "./pages/Learn";
const LessonPlayer = lazy(() => import("./pages/LessonPlayer"));
const Tools = lazy(() => import("./pages/Tools"));
const Notebook = lazy(() => import("./pages/Notebook"));
const About = lazy(() => import("./pages/About"));
const Profile = lazy(() => import("./pages/Profile"));
const Revise = lazy(() => import("./pages/Revise"));
const Insurance = lazy(() => import("./pages/Insurance"));
const Curriculum = lazy(() => import("./pages/Curriculum"));
export type Update = (fn: (p: Progress) => Progress) => void;
export default function App() {
  const [progress, setProgress] = useState<Progress>(freshProgress);
  const state = useRef(progress);
  const [loaded, setLoaded] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [storageError, setStorageError] = useState("");
  const [page, setPage] = useState(() => {
    const p = window.location.hash.slice(1);
    return [
      "learn",
      "revise",
      "tools",
      "notebook",
      "me",
      "insurance",
      "about",
    ].includes(p)
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
  const [entering, setEntering] = useState(false);
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
  const ui = (value: string) => translateUI(value, progress.language);
  const hi = progress.language === "hi";
  useEffect(() => {
    const tick = () => setNow(new Date());
    const timer = window.setInterval(tick, 30000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);
  const todayIST = dayKey(now);
  useEffect(() => {
    if (!loaded) return;
    const protection = progress.protection ?? freshProtection();
    const next = reconcileFreezes(Object.keys(progress.days), protection, now);
    if (next !== protection) update((p) => ({ ...p, protection: next }));
  }, [loaded, todayIST, progress.days]);

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
        [
          "learn",
          "revise",
          "tools",
          "notebook",
          "me",
          "insurance",
          "about",
        ].includes(p)
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
      const bonus = perfect && !session.quickStart ? 20 : 0;
      const today = dayKey();
      return {
        ...p,
        xp: p.xp + bonus,
        days: { ...p.days, [today]: (p.days[today] || 0) + bonus },
        protection:
          session.review || session.quickStart
            ? (p.protection ?? freshProtection())
            : earnFreeze(p.protection ?? freshProtection(), session.lessonId),
        saved:
          session.quickStart || session.review
            ? p.saved
            : p.saved.includes(session.lessonId)
              ? p.saved
              : [...p.saved, session.lessonId],
        completed:
          session.review || session.quickStart
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
  if (loaded && (!progress.onboarded || entering))
    return (
      <Onboarding
        language={progress.language}
        onLanguage={(language) => update((p) => ({ ...p, language }))}
        busy={entering}
        onStart={async (quick) => {
          setEntering(true);
          update((p) => ({
            ...p,
            onboarded: true,
            session: quick
              ? {
                  lessonId: lessons[0].id,
                  stage: 1,
                  question: 0,
                  answers: {},
                  quickStart: true,
                }
              : p.session,
          }));
          try {
            await flushProgress();
          } finally {
            setEntering(false);
          }
          if (quick) {
            setCurriculum(false);
            navigate("learn");
            setActive(true);
          }
        }}
      />
    );

  return (
    <CopyProvider language={progress.language}>
      <>
        {!loaded ? (
          <div className="loading-screen">
            <Mia pose="face" />
            <p>
              <Copy en="Getting your journey ready… " />
            </p>
          </div>
        ) : (
          <>
            <a
              className="skip-link"
              href="#main"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("main")?.focus();
              }}
            >
              <Copy en="Skip to content " />
            </a>
            <aside
              inert={active || curriculum}
              className="sidebar"
              aria-label={ui("Penny Pilot navigation")}
            >
              <button
                className="brand"
                onClick={() => navigate("learn")}
                aria-label={ui("Penny Pilot. home")}
              >
                <span className="brand-mark">
                  <Mia pose="face" />
                </span>
                <span>
                  Penny<Copy> </Copy>
                  <span className="brand-pilot">
                    Pilot<span className="brand-dot">.</span>
                  </span>
                </span>
              </button>
              <span className="sidebar-label">
                <Copy en="A LITTLE WISER, EVERY DAY " />
              </span>
              <nav aria-label={ui("Main navigation")}>
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
                    <span>
                      <Copy>{label}</Copy>
                    </span>
                    {id === "learn" && <span className="nav-dot" />}
                    {id === "notebook" && progress.saved.length > 0 && (
                      <span className="nav-count">
                        <Copy>{progress.saved.length}</Copy>
                      </span>
                    )}
                  </button>
                ))}
              </nav>
              <div className="sidebar-bottom">
                <div className="sidebar-mia">
                  <Mia pose="read" />
                  <div className="tiny-stars">✧</div>
                  <h3>
                    <Copy>
                      {hi
                        ? "पैसों की समझ बढ़ रही है।"
                        : "You’ve got this, human."}
                    </Copy>
                  </h3>
                  <p>
                    <Copy>
                      {hi
                        ? "रोज़ थोड़ा सीखें। मिया साथ है।"
                        : "Money can feel complicated. Let’s make it a little less so."}
                    </Copy>
                  </p>
                  <span>
                    <Copy en="— Mia, your money buddy " />
                  </span>
                </div>
                <div className="privacy-small">
                  <Icon name="ShieldCheck" size={15} />
                  <Copy en="Your progress. Your device. " />
                </div>
                <span className="build-label">
                  <Copy en="MADE FOR CURIOUS MINDS IN INDIA " />
                </span>
              </div>
            </aside>
            <div className="app-shell" inert={active || curriculum}>
              <header className="topbar">
                <div className="breadcrumb">
                  <span className="mobile-brand">
                    <Mia pose="face" />
                    Penny Pilot
                  </span>
                  <span className="desktop-breadcrumb">
                    <Copy en="Your space " />
                    <Icon name="ChevronRight" size={14} />
                    <Copy> </Copy>
                    <strong>
                      <Copy>
                        {page === "learn"
                          ? "Learning journey"
                          : page === "insurance"
                            ? "Insurance learning"
                            : page === "tools"
                              ? "The playground"
                              : page === "about"
                                ? "About this content"
                                : page === "me"
                                  ? "Your profile"
                                  : page === "revise"
                                    ? "Your daily refresh"
                                    : "Your notebook"}
                      </Copy>
                    </strong>
                  </span>
                </div>
                <div className="topbar-actions">
                  {!online && (
                    <span className="offline">
                      <Icon name="WifiOff" size={15} />
                      <span>
                        <Copy en="Offline " />
                      </span>
                    </span>
                  )}
                  <label className="language-select">
                    <Icon name="Languages" size={17} />
                    <select
                      aria-label={ui("Language")}
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
                    aria-label={ui("Your profile")}
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
                  <Copy>{storageError}</Copy>
                  <Copy> </Copy>
                  <button
                    onClick={() => {
                      void exportBackup(progress).catch(() =>
                        setStorageError(
                          "Backup export failed. Please try again from Me.",
                        ),
                      );
                    }}
                  >
                    <Copy en="Export backup " />
                  </button>
                </div>
              )}
              <main id="main" className="main-content" tabIndex={-1}>
                <Suspense
                  fallback={
                    <div className="page-loading">
                      <Copy en="A little patience, a little progress… " />
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
                      streak={streak(
                        Object.keys(progress.days),
                        now,
                        progress.protection?.used,
                      )}
                    />
                  )}
                  {page === "about" && (
                    <About
                      language={progress.language}
                      onBack={() => navigate("learn")}
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
                      onAbout={() => navigate("about")}
                    />
                  )}
                  {page === "revise" && (
                    <Revise
                      progress={progress}
                      today={todayIST}
                      onStart={start}
                      onResume={() => setActive(true)}
                      onPlan={(groups: ReviewGroup[]) => {
                        const session = createReviewSession(groups);
                        if (!session) return;
                        update((p) => ({ ...p, session }));
                        setActive(true);
                      }}
                    />
                  )}
                </Suspense>
              </main>
              <footer className="app-footer">
                <span>
                  <Copy en="Small lessons. Lifelong confidence. " />
                </span>
                <span>
                  <span className="live-dot" />
                  <Copy en="Free to learn. Yours to keep. " />
                </span>
              </footer>
            </div>
            <nav
              className="mobile-nav"
              inert={active || curriculum}
              aria-label={ui("Mobile navigation")}
            >
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
                  <span>
                    <Copy>{label}</Copy>
                  </span>
                </button>
              ))}
            </nav>
            {curriculum && (
              <Suspense
                fallback={
                  <div className="modal-backdrop">
                    <p>
                      <Copy en="Opening the full journey… " />
                    </p>
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
                    <p>
                      <Copy en="Getting your lesson ready… " />
                    </p>
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
                  report={progress.reports?.[current.id] ?? ""}
                  onReport={(text) =>
                    update((p) => ({
                      ...p,
                      reports: { ...p.reports, [current.id]: text },
                    }))
                  }
                  onAnswer={answer}
                  onFinish={finish}
                  onNext={() => {
                    if (progress.session?.review) {
                      const next = advanceReviewSession(progress.session);
                      update((p) => ({ ...p, session: next }));
                      if (!next) {
                        setActive(false);
                        navigate("revise");
                      }
                      return;
                    }
                    setActive(false);
                    const next = progress.session?.quickStart
                      ? lessons[0]
                      : lessons[lessons.indexOf(current) + 1];
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
                <Copy>{toast}</Copy>
              </div>
            )}
          </>
        )}
      </>
    </CopyProvider>
  );
}
