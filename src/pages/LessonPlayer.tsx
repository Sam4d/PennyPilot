import { Copy, useUICopy } from "../lib/ui-copy";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Language, Lesson } from "../content/lessons";
import { read } from "../content/lessons";
import type { Session } from "../lib/store";
import type { Update } from "../App";
import { isCorrect, parseAmount } from "../lib/learning";
import Mia from "../components/Mia";
import MatchingExercise from "../components/MatchingExercise";
import ConceptScroller from "../components/ConceptScroller";
import LearningVisual from "../components/LearningVisual";
import {
  DocumentExercise,
  BucketExercise,
} from "../components/PracticalExercise";
import { Icon, Local, Modal } from "../components/UI";
export default function LessonPlayer({
  lesson,
  session,
  language,
  onClose,
  update,
  onAnswer,
  onFinish,
  onNext,
  report,
  onReport,
}: {
  lesson: Lesson;
  session: Session;
  language: Language;
  onClose: () => void;
  update: Update;
  onAnswer: (id: string, value: number | number[], correct: boolean) => void;
  onFinish: () => void;
  onNext: () => void;
  report: string;
  onReport: (text: string) => void;
}) {
  const ui = useUICopy();

  const hi = language === "hi";
  const [exitRequested, setExitRequested] = useState(false);
  const [practising, setPractising] = useState(false);
  const [practiceResult, setPracticeResult] = useState<
    { answer: number | number[]; correct: boolean } | undefined
  >();
  const exitRef = useRef<HTMLElement>(null);
  const requestExit = () => {
    if (session.stage === 3) onClose();
    else setExitRequested(true);
  };
  useEffect(() => {
    if (exitRequested) {
      exitRef.current?.focus();
      exitRef.current
        ?.closest(".modal")
        ?.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [exitRequested]);
  useEffect(() => {
    const back = () => setExitRequested(true);
    window.addEventListener("popstate", back);
    return () => window.removeEventListener("popstate", back);
  }, []);

  const [audioMessage, setAudioMessage] = useState("");
  const questions = session.quickStart
    ? lesson.exercises.slice(0, 1)
    : session.review
      ? lesson.exercises.filter((e) => session.questionIds?.includes(e.id))
      : lesson.exercises;
  const q = questions[session.question];
  const result = practising ? practiceResult : q && session.answers[q.id];
  const [selection, setSelection] = useState<number | null>(null),
    [number, setNumber] = useState(""),
    [ordered, setOrdered] = useState<number[]>([]),
    [classified, setClassified] = useState<number[]>([]),
    [card, setCard] = useState(0),
    [deep, setDeep] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setSelection(null);
    setNumber("");
    setOrdered([]);
    setClassified([]);
    setDeep(false);
    setPractising(false);
    setPracticeResult(undefined);
    answerRef.current?.focus();
  }, [session.question]);
  useEffect(
    () => () => {
      window.speechSynthesis?.cancel();
    },
    [],
  );
  const setStage = (stage: number) =>
    update((p) => ({
      ...p,
      session: p.session ? { ...p.session, stage } : null,
    }));
  const canAnswer =
    q &&
    (q.type === "choice" || q.type === "document"
      ? selection !== null
      : q.type === "numeric"
        ? number.trim() !== "" && Number.isFinite(parseAmount(number))
        : q.type === "bucket" || q.type === "match"
          ? (q.type !== "match" ||
              new Set(classified).size === q.options!.length) &&
            q.options!.every(
              (_, i) =>
                Number.isInteger(classified[i]) &&
                classified[i] >= 0 &&
                classified[i] < q.categories!.length,
            )
          : ordered.length === q.options!.length);
  const check = useCallback(() => {
    if (!canAnswer || result) return;
    const answer =
      q.type === "choice" || q.type === "document"
        ? selection!
        : q.type === "numeric"
          ? parseAmount(number)
          : q.type === "bucket" || q.type === "match"
            ? classified
            : ordered;
    if (practising)
      setPracticeResult({ answer, correct: isCorrect(answer, q.answer) });
    else onAnswer(q.id, answer, isCorrect(answer, q.answer));
  }, [
    canAnswer,
    result,
    q,
    selection,
    number,
    ordered,
    classified,
    onAnswer,
    practising,
  ]);
  const next = () => {
    if (session.question + 1 < questions.length)
      update((p) => ({
        ...p,
        session: p.session
          ? { ...p.session, question: p.session.question + 1 }
          : null,
      }));
    else setStage(2);
  };
  const actionRef = useRef<() => void>(() => {});
  actionRef.current = () => {
    if (session.stage === 0) setStage(1);
    else if (session.stage === 1) {
      if (result) next();
      else check();
    } else if (session.stage === 2) onFinish();
    else onNext();
  };
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (exitRequested) return;
      const target = e.target as HTMLElement;
      if (
        e.defaultPrevented ||
        target.closest(
          "input,textarea,select,button,a,summary,[contenteditable]:not([contenteditable=false])",
        )
      )
        return;
      if (e.key === "Enter") {
        e.preventDefault();
        actionRef.current();
      }
      if (
        session.stage === 1 &&
        !result &&
        (q?.type === "choice" || q?.type === "document") &&
        /^[1-4]$/.test(e.key)
      ) {
        const i = Number(e.key) - 1;
        if (i < q.options!.length) setSelection(i);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [session.stage, result, q, exitRequested]);
  const cards = [
    {
      label: hi ? "एक छोटी कहानी" : "A LITTLE STORY",
      icon: "MessageCircle",
      text: lesson.hook,
    },
    {
      label: hi ? "बात समझें" : "THE BIG IDEA",
      icon: "Lightbulb",
      text: lesson.idea,
    },
    {
      label: hi ? "उदाहरण देखें" : "LET’S MAKE IT REAL",
      icon: "Calculator",
      text: lesson.example,
    },
    {
      label: hi ? "याद रखें" : "A LITTLE HEADS-UP",
      icon: "ShieldCheck",
      text: lesson.mistake,
    },
  ];
  const speak = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const voice = window.speechSynthesis
      .getVoices()
      .find(
        (v) =>
          v.localService && v.lang.toLowerCase().startsWith(hi ? "hi" : "en"),
      );
    if (!voice) {
      setAudioMessage(
        hi
          ? "सुनने के लिए डिवाइस में हिन्दी वॉइस पैक जोड़ें।"
          : "Add an offline voice pack in your device settings to listen.",
      );
      return;
    }
    setAudioMessage("");
    const utterance = new SpeechSynthesisUtterance(
      read(
        session.stage === 0 ? cards[card].text : q?.prompt || lesson.title,
        language,
      ),
    );
    utterance.voice = voice;
    utterance.lang = voice.lang;
    window.speechSynthesis.speak(utterance);
  };
  const correct = Object.values(session.answers).filter(
    (a) => a.correct,
  ).length;
  return (
    <Modal
      topAligned
      wide
      onClose={exitRequested ? () => setExitRequested(false) : requestExit}
      label={`${read(lesson.title, language)} lesson`}
    >
      {exitRequested && (
        <section
          className="exit-confirmation"
          role="alertdialog"
          aria-label={hi ? "पाठ से बाहर जाएं?" : "Leave this lesson?"}
          ref={exitRef}
          tabIndex={-1}
        >
          <h2>{hi ? "बाद में जारी रखें?" : "Continue later?"}</h2>
          <p>
            {hi
              ? "जाँचे हुए जवाब अपने आप सेव हैं। इसी सवाल से फिर शुरू कर सकते हैं।"
              : "Checked answers are saved automatically. You can return to this question."}
          </p>
          <button
            className="button green"
            onClick={() => setExitRequested(false)}
          >
            {hi ? "पाठ में रहें" : "Keep learning"}
          </button>
          <button
            className="button secondary"
            data-testid="confirm-exit"
            onClick={onClose}
          >
            {hi ? "सेव करके बाहर जाएं" : "Save and leave"}
          </button>
        </section>
      )}
      <div
        className="lesson-player"
        inert={exitRequested}
        aria-hidden={exitRequested}
      >
        <p className="content-status">
          <Icon name="FileText" size={16} />
          {hi
            ? "ड्राफ़्ट · स्वतंत्र विशेषज्ञ की समीक्षा बाकी"
            : "Draft · Independent review pending"}
        </p>
        <div className="player-top">
          <span className="eyebrow">
            PENNY PILOT <span> / </span>
            <Copy> </Copy>
            <Copy>
              {session.review ? "DAILY REFRESH" : "MONEY FOUNDATIONS"}
            </Copy>
          </span>
          <div className="player-progress">
            <div
              style={{
                width: `${session.stage === 0 ? 5 : session.stage >= 2 ? 100 : 15 + (session.question / questions.length) * 80}%`,
              }}
            />
          </div>
          <span className="player-xp">
            <Icon name="Zap" size={17} />
            {correct * 10} XP
          </span>
        </div>
        <div className="player-language">
          <label>
            <Icon name="Languages" size={16} />
            <select
              aria-label={ui("Lesson language")}
              value={language}
              onChange={(e) =>
                update((p) => ({ ...p, language: e.target.value as Language }))
              }
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="hinglish">Hinglish (Roman)</option>
              <option value="both">Both / दोनों</option>
            </select>
          </label>
          {"speechSynthesis" in window && (
            <button className="text-button" onClick={speak}>
              <Icon name="Volume2" size={17} />
              <Copy>{hi ? "सुनें" : "Listen"}</Copy>
            </button>
          )}
        </div>
        {audioMessage && (
          <p className="tiny-text" role="status">
            <Copy>{audioMessage}</Copy>
          </p>
        )}
        {session.stage === 0 && (
          <>
            <div className="lesson-intro-heading">
              <Mia pose={lesson.id === "safety" ? "concerned" : "thinking"} />
              <span className="eyebrow">
                <Copy>
                  {session.review ? "A LITTLE REFRESH" : "YOUR NEXT SMALL STEP"}
                </Copy>
              </span>
              <h2>
                <Local text={lesson.title} lang={language} />
              </h2>
            </div>
            <ConceptScroller
              onChange={setCard}
              items={cards.map((c, i) => (
                <>
                  <span className={`concept-icon concept-${i}`}>
                    <Icon name={c.icon} size={27} />
                  </span>
                  <span className="eyebrow">
                    <Copy>{c.label}</Copy>
                  </span>
                  <p>
                    <Local text={c.text} lang={language} />
                  </p>
                  {i === 2 && (
                    <LearningVisual lessonId={lesson.id} language={language} />
                  )}
                </>
              ))}
            />
            <div className="player-footer">
              <span>
                <Icon name="Clock3" size={16} />
                <Copy>{questions.length}</Copy>
                <Copy en="exercises · Your pace " />
              </span>
              <button className="button green" onClick={() => setStage(1)}>
                <Copy>{hi ? "आज़माएं" : "Let’s try it"}</Copy>
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </>
        )}
        {session.stage === 1 && q && (
          <>
            <div className="question-content" ref={answerRef} tabIndex={-1}>
              <div className="question-eyebrow">
                <span className="eyebrow">
                  <Copy>{hi ? "खुद करके सीखें" : "YOUR TURN TO EXPLORE"}</Copy>
                </span>
                <span>
                  {session.question + 1} / <Copy>{questions.length}</Copy>
                </span>
              </div>
              <h2>
                <Local text={q.prompt} lang={language} />
              </h2>
              {q.type === "choice" && (
                <div className="answer-options">
                  {q.options!.map((option, i) => (
                    <button
                      key={i}
                      disabled={!!result}
                      className={`answer-option ${selection === i || result?.answer === i ? "chosen" : ""} ${result && q.answer === i ? "correct-answer" : ""} ${result && !result.correct && result.answer === i ? "wrong-answer" : ""}`}
                      onClick={() => setSelection(i)}
                    >
                      <span className="option-number">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>
                        <Local text={option} lang={language} />
                      </span>
                      <span className="option-indicator">
                        {result && q.answer === i ? (
                          <Icon name="Check" size={20} />
                        ) : result && result.answer === i && !result.correct ? (
                          <Icon name="X" size={20} />
                        ) : null}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {q.type === "document" && (
                <DocumentExercise
                  question={q}
                  language={language}
                  selection={selection}
                  result={result}
                  onSelect={setSelection}
                />
              )}
              {q.type === "bucket" && (
                <BucketExercise
                  question={q}
                  language={language}
                  values={classified}
                  result={result}
                  onChange={setClassified}
                />
              )}
              {q.type === "match" && (
                <MatchingExercise
                  key={q.id}
                  question={q}
                  language={language}
                  values={classified}
                  result={result}
                  onChange={setClassified}
                />
              )}
              {q.type === "numeric" && (
                <div className="numeric-exercise">
                  <label htmlFor="numeric-answer">
                    <Copy>
                      {hi
                        ? "आपका जवाब (सिर्फ़ संख्या)"
                        : "Your answer (number only)"}
                    </Copy>
                  </label>
                  <div className="numeric-input">
                    <span>₹</span>
                    <input
                      id="numeric-answer"
                      type="text"
                      inputMode={Number(q.answer) < 0 ? "text" : "decimal"}
                      value={result ? String(result.answer) : number}
                      onChange={(e) => setNumber(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (result) next();
                          else check();
                        }
                      }}
                      disabled={!!result}
                      placeholder="0"
                      autoComplete="off"
                    />
                  </div>
                  <small>
                    <span>
                      {hi
                        ? "1,00,000 या १,००,००० भी लिख सकते हैं। "
                        : "You can also type 1,00,000 or १,००,०००. "}
                    </span>
                    <Copy>
                      {hi
                        ? "अनुमान ठीक है। मिलकर समझेंगे।"
                        : "Take your time. The working comes next."}
                    </Copy>
                  </small>
                </div>
              )}
              {q.type === "order" && (
                <div className="order-exercise">
                  <p className="muted">
                    <Copy>
                      {hi
                        ? "सही क्रम में चुनें। हटाने के लिए फिर टैप करें।"
                        : "Tap in order. Tap again to remove a step."}
                    </Copy>
                  </p>
                  {q.options!.map((o, i) => {
                    const sequence = result
                      ? (result.answer as number[])
                      : ordered;
                    return (
                      <button
                        key={i}
                        disabled={!!result}
                        className={`answer-option ${sequence.includes(i) ? "chosen" : ""}`}
                        onClick={() =>
                          setOrdered((p) =>
                            p.includes(i)
                              ? p.filter((n) => n !== i)
                              : [...p, i],
                          )
                        }
                      >
                        <span className="order-number">
                          {sequence.includes(i) ? (
                            sequence.indexOf(i) + 1
                          ) : (
                            <Icon name="Plus" size={18} />
                          )}
                        </span>
                        <Local text={o} lang={language} />
                      </button>
                    );
                  })}
                </div>
              )}
              {practising && (
                <p className="tiny-text">
                  {hi
                    ? "यह अभ्यास है। सेव किया जवाब और XP वही रहेंगे।"
                    : "Practice mode. Your saved answer and XP stay unchanged."}
                </p>
              )}
              {result && (
                <div
                  className={`answer-feedback ${result.correct ? "right" : "wrong"}`}
                  role="status"
                >
                  <Icon
                    name={result.correct ? "CircleCheck" : "Lightbulb"}
                    size={24}
                  />
                  <div>
                    <strong>
                      <Copy>
                        {result.correct
                          ? hi
                            ? "बिल्कुल सही!"
                            : "That’s it. Nicely done!"
                          : hi
                            ? "गलतियाँ सीखने का हिस्सा हैं।"
                            : "A good moment to learn."}
                      </Copy>
                    </strong>
                    <p>
                      <Local text={q.explanation} lang={language} />
                    </p>
                    {!result.correct &&
                      (q.type === "choice" || q.type === "document") && (
                        <p className="correct-label">
                          <Copy>{hi ? "सही जवाब: " : "Correct answer: "}</Copy>
                          <Local
                            text={q.options![q.answer as number]}
                            lang={language}
                          />
                        </p>
                      )}
                    <button
                      className="text-button"
                      onClick={() => {
                        setPractising(true);
                        setPracticeResult(undefined);
                        setSelection(null);
                        setNumber("");
                        setOrdered([]);
                        setClassified([]);
                      }}
                    >
                      {hi ? "एक बार और आज़माएं" : "Try once more"}
                    </button>
                    <button
                      className="text-button"
                      aria-expanded={deep}
                      onClick={() => setDeep(!deep)}
                    >
                      <Copy>{hi ? "और समझें" : "A little more from Mia"}</Copy>
                      <Icon
                        name={deep ? "ChevronUp" : "ChevronDown"}
                        size={15}
                      />
                    </button>
                    {deep && (
                      <p className="deep-explanation">
                        <Local text={lesson.idea} lang={language} />
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="player-footer">
              <span>
                <Icon name="ShieldCheck" size={16} />
                <Copy>
                  {hi
                    ? "प्रगति अपने-आप सेव होती है"
                    : "Progress saved after every answer"}
                </Copy>
              </span>
              <button
                className="button green"
                disabled={!result && !canAnswer}
                onClick={result ? next : check}
              >
                <Copy>
                  {result
                    ? hi
                      ? "आगे बढ़ें"
                      : "Continue"
                    : hi
                      ? "जवाब देखें"
                      : "Check answer"}
                </Copy>
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </>
        )}
        {session.stage === 2 && session.quickStart && (
          <div className="notes-stage">
            <Mia pose="celebrate" />
            <h2>
              <Copy>{hi ? "पहला कदम पूरा!" : "Your first step, done."}</Copy>
            </h2>
            <p>
              <Copy>
                {hi
                  ? "आपने एक सवाल आज़माया। पूरा पाठ और नोट्स सीखने के सफ़र में मिलेंगे।"
                  : "You tried one question. The full lesson and its notes are waiting on your learning path."}
              </Copy>
            </p>
            <button className="button green" onClick={onFinish}>
              <Copy>{hi ? "पहला कदम सेव करें" : "Save my first step"}</Copy>
            </button>
          </div>
        )}
        {session.stage === 2 && !session.quickStart && (
          <div className="notes-stage">
            <span className="preview-icon">
              <Icon name="NotebookPen" size={30} />
            </span>
            <span className="eyebrow">
              <Copy en="A LITTLE KNOWLEDGE TO KEEP " />
            </span>
            <h2>
              <Copy>
                {hi ? "आपकी नोट्स कार्ड" : "Your pocket-sized wisdom."}
              </Copy>
            </h2>
            <div className="notes-paper">
              <h3>
                <Local text={lesson.title} lang={language} />
              </h3>
              <ul>
                {lesson.notes.map((n, i) => (
                  <li key={i}>
                    <Local text={n} lang={language} />
                  </li>
                ))}
              </ul>
              <div className="note-example">
                <span className="eyebrow">
                  <Copy en="WORKED EXAMPLE " />
                </span>
                <p>
                  <Local text={lesson.example} lang={language} />
                </p>
              </div>
              <div className="note-action">
                <Icon name="Footprints" size={20} />
                <div>
                  <strong>
                    <Copy>
                      {hi ? "असल ज़िंदगी में करें" : "One tiny real-life step"}
                    </Copy>
                  </strong>
                  <p>
                    <Local text={lesson.action} lang={language} />
                  </p>
                </div>
              </div>
            </div>
            <div className="player-footer">
              <span>
                <Icon name="BookOpen" size={16} />
                <Copy>
                  {hi
                    ? "नोटबुक में जुड़ जाएगी"
                    : "Auto-collected in your Notebook"}
                </Copy>
              </span>
              <button className="button green" onClick={onFinish}>
                <Copy>{hi ? "पाठ पूरा करें" : "Finish lesson"}</Copy>
                <Icon name="Check" size={18} />
              </button>
            </div>
          </div>
        )}
        {session.stage === 3 && (
          <div className="result-stage">
            <div className="result-mia">
              <Mia pose="celebrate" />
              <span className="confetti c1">✦</span>
              <span className="confetti c2">✧</span>
              <span className="confetti c3">✦</span>
            </div>
            <span className="eyebrow">
              <Copy en="ONE SMALL STEP. A LITTLE MORE CONFIDENT. " />
            </span>
            <h2>
              <Copy>
                {hi
                  ? "शाबाश! मिया को आप पर गर्व है।"
                  : "Look at you, money human."}
              </Copy>
            </h2>
            <p>
              <Copy>
                {hi
                  ? "आपने आज खुद में निवेश किया।"
                  : "You showed up for yourself. That’s a great investment."}
              </Copy>
            </p>
            <div className="result-stats">
              <div>
                <Icon name="Zap" />
                <strong>
                  +
                  {correct * 10 +
                    (correct === questions.length && !session.quickStart
                      ? 20
                      : 0)}
                </strong>
                <span>
                  <Copy en="XP EARNED " />
                </span>
              </div>
              <div>
                <Icon name="Target" />
                <strong>
                  <Copy>{correct}</Copy>/<Copy>{questions.length}</Copy>
                </strong>
                <span>
                  <Copy en="CORRECT ANSWERS " />
                </span>
              </div>
              <div>
                <Icon name="BookOpen" />
                <strong>
                  <Copy>{session.quickStart ? 0 : 1}</Copy>
                </strong>
                <span>
                  <Copy en="NOTE CARD SAVED " />
                </span>
              </div>
            </div>
            <button className="button green full" onClick={onNext}>
              <Copy>{hi ? "अगला कदम" : "Keep the good thing going"}</Copy>
              <Icon name="ArrowRight" size={18} />
            </button>
            <button className="text-button return-path" onClick={onClose}>
              <Copy>{hi ? "सफ़र पर वापस" : "Back to my learning path"}</Copy>
            </button>
          </div>
        )}
        <details className="lesson-report">
          <summary>
            {hi
              ? "कोई गलती मिली? निजी नोट लिखें"
              : "Report an error (local note)"}
          </summary>
          <label>
            {hi
              ? "कौन-सी बात गलत या उलझाने वाली लगी?"
              : "What seems wrong or unclear?"}
            <textarea
              maxLength={10000}
              value={report}
              onChange={(e) => onReport(e.target.value)}
            />
          </label>
          <p className="tiny-text">
            {hi
              ? "यह नोट इसी डिवाइस पर सेव है। किसी को भेजा नहीं जाता।"
              : "This note is saved only on this device. It is not sent to anyone."}
          </p>
        </details>
        <details className="lesson-sources">
          <summary>
            <Copy>
              {hi ? "स्रोत और सामग्री की स्थिति" : "Sources & content status"}
            </Copy>
          </summary>
          <p>
            <Copy en="Editorial preview. These source links are provided for verification; this content has not yet received independent expert review. Education only, not financial advice. " />
          </p>
          {lesson.sources.map((s) => (
            <a key={s} href={s} target="_blank" rel="noreferrer">
              <Copy>{new URL(s).hostname}</Copy>
              <Icon name="ExternalLink" size={12} />
            </a>
          ))}
        </details>
      </div>
    </Modal>
  );
}
