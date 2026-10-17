import { useCallback, useEffect, useRef, useState } from "react";
import type { Language, Lesson } from "../content/lessons";
import { read } from "../content/lessons";
import type { Session } from "../lib/store";
import type { Update } from "../App";
import { isCorrect } from "../lib/learning";
import Mia from "../components/Mia";
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
}: {
  lesson: Lesson;
  session: Session;
  language: Language;
  onClose: () => void;
  update: Update;
  onAnswer: (id: string, value: number | number[], correct: boolean) => void;
  onFinish: () => void;
  onNext: () => void;
}) {
  const hi = language === "hi";
  const [audioMessage, setAudioMessage] = useState("");
  const questions = session.review
    ? lesson.exercises.filter((e) => session.questionIds?.includes(e.id))
    : lesson.exercises;
  const q = questions[session.question];
  const result = q && session.answers[q.id];
  const [selection, setSelection] = useState<number | null>(null),
    [number, setNumber] = useState(""),
    [ordered, setOrdered] = useState<number[]>([]),
    [classified, setClassified] = useState<number[]>([]),
    [card, setCard] = useState(0),
    [deep, setDeep] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setSelection(null);
    setNumber("");
    setOrdered([]);
    setClassified([]);
    setDeep(false);
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
        ? number.trim() !== "" && Number.isFinite(Number(number))
        : q.type === "bucket"
          ? q.options!.every(
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
          ? Number(number)
          : q.type === "bucket"
            ? classified
            : ordered;
    onAnswer(q.id, answer, isCorrect(answer, q.answer));
  }, [canAnswer, result, q, selection, number, ordered, classified, onAnswer]);
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
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target.tagName))
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
  }, [session.stage, result, q]);
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
      wide
      onClose={onClose}
      label={`${read(lesson.title, language)} lesson`}
    >
      <div className="lesson-player">
        <div className="player-top">
          <span className="eyebrow">
            PENNY PILOT <span> / </span>{" "}
            {session.review ? "DAILY REFRESH" : "MONEY FOUNDATIONS"}
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
              aria-label="Lesson language"
              value={language}
              onChange={(e) =>
                update((p) => ({ ...p, language: e.target.value as Language }))
              }
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="hinglish">Hinglish</option>
              <option value="both">Both / दोनों</option>
            </select>
          </label>
          {"speechSynthesis" in window && (
            <button className="text-button" onClick={speak}>
              <Icon name="Volume2" size={17} />
              {hi ? "सुनें" : "Listen"}
            </button>
          )}
        </div>
        {audioMessage && (
          <p className="tiny-text" role="status">
            {audioMessage}
          </p>
        )}
        {session.stage === 0 && (
          <>
            <div className="lesson-intro-heading">
              <Mia pose="face" />
              <span className="eyebrow">
                {session.review ? "A LITTLE REFRESH" : "YOUR NEXT SMALL STEP"}
              </span>
              <h2>
                <Local text={lesson.title} lang={language} />
              </h2>
            </div>
            <div
              className="concept-carousel"
              ref={carousel}
              onScroll={() => {
                if (carousel.current)
                  setCard(
                    Math.round(
                      carousel.current.scrollLeft /
                        carousel.current.clientWidth,
                    ),
                  );
              }}
            >
              {cards.map((c, i) => (
                <article className="concept-card" key={i}>
                  <span className={`concept-icon concept-${i}`}>
                    <Icon name={c.icon} size={27} />
                  </span>
                  <span className="eyebrow">{c.label}</span>
                  <p>
                    <Local text={c.text} lang={language} />
                  </p>
                  {i === 2 && (
                    <LearningVisual lessonId={lesson.id} language={language} />
                  )}
                </article>
              ))}
            </div>
            <div className="carousel-controls">
              <button
                className="icon-button"
                aria-label="Previous concept"
                disabled={card === 0}
                onClick={() =>
                  carousel.current?.scrollTo({
                    left: (card - 1) * carousel.current.clientWidth,
                    behavior: "smooth",
                  })
                }
              >
                <Icon name="ArrowLeft" size={18} />
              </button>
              <div>
                {cards.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Concept ${i + 1}`}
                    aria-current={card === i ? "step" : undefined}
                    className={card === i ? "active" : ""}
                    onClick={() =>
                      carousel.current?.scrollTo({
                        left: i * carousel.current.clientWidth,
                        behavior: "smooth",
                      })
                    }
                  />
                ))}
              </div>
              <button
                className="icon-button"
                aria-label="Next concept"
                disabled={card === 3}
                onClick={() =>
                  carousel.current?.scrollTo({
                    left: (card + 1) * carousel.current.clientWidth,
                    behavior: "smooth",
                  })
                }
              >
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
            <div className="player-footer">
              <span>
                <Icon name="Clock3" size={16} />
                {questions.length} exercises · Your pace
              </span>
              <button className="button green" onClick={() => setStage(1)}>
                {hi ? "आज़माएं" : "Let’s try it"}
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
                  {hi ? "खुद करके सीखें" : "YOUR TURN TO EXPLORE"}
                </span>
                <span>
                  {session.question + 1} / {questions.length}
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
              {q.type === "numeric" && (
                <div className="numeric-exercise">
                  <label htmlFor="numeric-answer">
                    {hi
                      ? "आपका जवाब (सिर्फ़ संख्या)"
                      : "Your answer (number only)"}
                  </label>
                  <div className="numeric-input">
                    <span>₹</span>
                    <input
                      id="numeric-answer"
                      type="number"
                      inputMode="decimal"
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
                    {hi
                      ? "अनुमान ठीक है। मिलकर समझेंगे।"
                      : "Take your time. The working comes next."}
                  </small>
                </div>
              )}
              {q.type === "order" && (
                <div className="order-exercise">
                  <p className="muted">
                    {hi
                      ? "सही क्रम में चुनें। हटाने के लिए फिर टैप करें।"
                      : "Tap in order. Tap again to remove a step."}
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
                      {result.correct
                        ? hi
                          ? "बिल्कुल सही!"
                          : "That’s it. Nicely done!"
                        : hi
                          ? "गलतियाँ सीखने का हिस्सा हैं।"
                          : "A good moment to learn."}
                    </strong>
                    <p>
                      <Local text={q.explanation} lang={language} />
                    </p>
                    {!result.correct &&
                      (q.type === "choice" || q.type === "document") && (
                        <p className="correct-label">
                          {hi ? "सही जवाब: " : "Correct answer: "}
                          <Local
                            text={q.options![q.answer as number]}
                            lang={language}
                          />
                        </p>
                      )}
                    <button
                      className="text-button"
                      aria-expanded={deep}
                      onClick={() => setDeep(!deep)}
                    >
                      {hi ? "और समझें" : "A little more from Mia"}
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
                {hi
                  ? "प्रगति अपने-आप सेव होती है"
                  : "Progress saved after every answer"}
              </span>
              <button
                className="button green"
                disabled={!result && !canAnswer}
                onClick={result ? next : check}
              >
                {result
                  ? hi
                    ? "आगे बढ़ें"
                    : "Continue"
                  : hi
                    ? "जवाब देखें"
                    : "Check answer"}
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </>
        )}
        {session.stage === 2 && (
          <div className="notes-stage">
            <span className="preview-icon">
              <Icon name="NotebookPen" size={30} />
            </span>
            <span className="eyebrow">A LITTLE KNOWLEDGE TO KEEP</span>
            <h2>{hi ? "आपकी नोट्स कार्ड" : "Your pocket-sized wisdom."}</h2>
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
                <span className="eyebrow">WORKED EXAMPLE</span>
                <p>
                  <Local text={lesson.example} lang={language} />
                </p>
              </div>
              <div className="note-action">
                <Icon name="Footprints" size={20} />
                <div>
                  <strong>
                    {hi ? "असल ज़िंदगी में करें" : "One tiny real-life step"}
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
                {hi
                  ? "नोटबुक में जुड़ जाएगी"
                  : "Auto-collected in your Notebook"}
              </span>
              <button className="button green" onClick={onFinish}>
                {hi ? "पाठ पूरा करें" : "Finish lesson"}
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
              ONE SMALL STEP. A LITTLE MORE CONFIDENT.
            </span>
            <h2>
              {hi
                ? "शाबाश! मिया को आप पर गर्व है।"
                : "Look at you, money human."}
            </h2>
            <p>
              {hi
                ? "आपने आज खुद में निवेश किया।"
                : "You showed up for yourself. That’s a great investment."}
            </p>
            <div className="result-stats">
              <div>
                <Icon name="Zap" />
                <strong>
                  +{correct * 10 + (correct === questions.length ? 20 : 0)}
                </strong>
                <span>XP EARNED</span>
              </div>
              <div>
                <Icon name="Target" />
                <strong>
                  {correct}/{questions.length}
                </strong>
                <span>CORRECT ANSWERS</span>
              </div>
              <div>
                <Icon name="BookOpen" />
                <strong>1</strong>
                <span>NOTE CARD SAVED</span>
              </div>
            </div>
            <button className="button green full" onClick={onNext}>
              {hi ? "अगला कदम" : "Keep the good thing going"}
              <Icon name="ArrowRight" size={18} />
            </button>
            <button className="text-button return-path" onClick={onClose}>
              {hi ? "सफ़र पर वापस" : "Back to my learning path"}
            </button>
          </div>
        )}
        <details className="lesson-sources">
          <summary>
            {hi ? "स्रोत और सामग्री की स्थिति" : "Sources & content status"}
          </summary>
          <p>
            Editorial preview. These source links are provided for verification;
            this content has not yet received independent expert review.
            Education only, not financial advice.
          </p>
          {lesson.sources.map((s) => (
            <a key={s} href={s} target="_blank" rel="noreferrer">
              {new URL(s).hostname}
              <Icon name="ExternalLink" size={12} />
            </a>
          ))}
        </details>
      </div>
    </Modal>
  );
}
