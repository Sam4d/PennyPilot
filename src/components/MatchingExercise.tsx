import { useRef, useState } from "react";
import type { Exercise, Language } from "../content/schema";
import { read } from "../content/schema";
import { Icon, Local } from "./UI";
export default function MatchingExercise({
  question: q,
  language,
  values,
  result,
  onChange,
}: {
  question: Exercise;
  language: Language;
  values: number[];
  result?: { answer: number | number[]; correct: boolean };
  onChange: (values: number[]) => void;
}) {
  const termButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const selected = result ? (result.answer as number[]) : values;
  const s = (en: string, hi: string, hinglish: string) =>
    language === "hi" ? hi : language === "hinglish" ? hinglish : en;
  function pair(right: number) {
    if (active === null || result) return;
    const next = Array.from(
      { length: q.options!.length },
      (_, i) => selected[i] ?? -1,
    );
    for (let i = 0; i < next.length; i++) if (next[i] === right) next[i] = -1;
    next[active] = right;
    onChange(next);
    setAnnouncement(
      `${read(q.options![active], language)} → ${read(q.categories![right], language)}`,
    );
    setActive(null);
    const nextTerm = next.findIndex((n) => n < 0);
    termButtons.current[nextTerm >= 0 ? nextTerm : active]?.focus();
  }
  return (
    <div className="matching-exercise">
      <p className="muted">
        {s(
          "Choose a term, then its meaning. Use each meaning once. Choose another term to change a pair.",
          "पहले शब्द चुनें, फिर उसका मतलब। हर मतलब एक बार इस्तेमाल करें। जोड़ी बदलने के लिए शब्द फिर चुनें।",
          "Pehle shabd chunein, phir uska matlab. Har matlab ek baar istemaal karein. Jodi badalne ke liye shabd phir chunein.",
        )}
      </p>
      <div className="matching-grid">
        <div
          role="group"
          aria-label={s("Terms", "शब्द", "Shabd")}
          style={{
            gridTemplateRows: `auto repeat(${q.options!.length}, minmax(0, 1fr))`,
          }}
        >
          <h3>{s("Terms", "शब्द", "Shabd")}</h3>
          {q.options!.map((item, i) => (
            <button
              key={i}
              ref={(el) => {
                termButtons.current[i] = el;
              }}
              aria-describedby={`${q.id}-term-${i}`}
              disabled={!!result}
              aria-pressed={active === i}
              className={`${active === i ? "active" : ""} ${selected[i] >= 0 ? "paired" : ""}`}
              onClick={() => setActive(i)}
            >
              <span hidden id={`${q.id}-term-${i}`}>
                {selected[i] >= 0
                  ? s("Paired with: ", "जोड़ी: ", "Jodi: ") +
                    read(q.categories![selected[i]], language)
                  : s("Not paired", "जोड़ी नहीं बनी", "Jodi nahin bani")}
              </span>
              <span className="match-badge" aria-hidden="true">
                {i + 1}
              </span>
              <Local text={item} lang={language} />
              {selected[i] >= 0 && <Icon name="Check" size={15} />}
            </button>
          ))}
        </div>
        <div
          role="group"
          aria-label={s("Meanings", "मतलब", "Matlab")}
          style={{
            gridTemplateRows: `auto repeat(${q.categories!.length}, minmax(0, 1fr))`,
          }}
        >
          <h3>{s("Meanings", "मतलब", "Matlab")}</h3>
          {q.categories!.map((item, i) => {
            const left = selected.indexOf(i);
            return (
              <button
                key={i}
                aria-describedby={`${q.id}-meaning-${i}`}
                disabled={!!result || active === null}
                className={left >= 0 ? "paired" : ""}
                onClick={() => pair(i)}
              >
                <span hidden id={`${q.id}-meaning-${i}`}>
                  {left >= 0
                    ? s("Paired with: ", "जोड़ी: ", "Jodi: ") +
                      read(q.options![left], language)
                    : s("Not paired", "जोड़ी नहीं बनी", "Jodi nahin bani")}
                </span>
                <span className="match-badge" aria-hidden="true">
                  {left >= 0 ? left + 1 : "·"}
                </span>
                <Local text={item} lang={language} />
              </button>
            );
          })}
        </div>
      </div>
      <p className="match-status" role="status">
        {result
          ? s(
              "Pairs saved. Read the explanation below.",
              "जोड़ियाँ सेव हैं। नीचे समझें।",
              "Jodiyaan save hain. Neeche samjhein.",
            )
          : active !== null
            ? s(
                "Now choose a meaning for: ",
                "अब इसका मतलब चुनें: ",
                "Ab iska matlab chunein: ",
              ) + read(q.options![active], language)
            : announcement ||
              s(
                "Select a term to start.",
                "शुरू करने के लिए शब्द चुनें।",
                "Shuru karne ke liye shabd chunein.",
              )}
      </p>
      {result && (
        <ul className="match-review">
          {q.options!.map((item, i) => {
            const correct = selected[i] === (q.answer as number[])[i];
            return (
              <li key={i} className={correct ? "match-right" : "match-wrong"}>
                <Icon name={correct ? "CircleCheck" : "Lightbulb"} size={18} />
                <div>
                  <strong>
                    <Local text={item} lang={language} />
                  </strong>
                  <p>
                    {!correct &&
                      s("Correct pair: ", "सही जोड़ी: ", "Sahi jodi: ")}
                    <Local
                      text={q.categories![(q.answer as number[])[i]]}
                      lang={language}
                    />
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
