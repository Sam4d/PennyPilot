import type { Exercise, Language } from "../content/schema";
import { read } from "../content/schema";
import { Icon, Local } from "./UI";
type SavedAnswer = { answer: number | number[]; correct: boolean };
export function DocumentExercise({
  question: q,
  language,
  selection,
  result,
  onSelect,
}: {
  question: Exercise;
  language: Language;
  selection: number | null;
  result?: SavedAnswer;
  onSelect: (value: number) => void;
}) {
  const selected = result ? result.answer : selection;
  return (
    <div
      className="document-exercise"
      role="group"
      aria-label={read(q.documentTitle!, language)}
    >
      <div className="document-heading">
        <Icon name="FileText" size={21} />
        <span>
          <Local text={q.documentTitle!} lang={language} />
        </span>
      </div>
      <p className="document-hint">
        {language === "hi"
          ? "सही लाइन पर टैप करें। ये आँकड़े सिर्फ़ सीखने के लिए हैं।"
          : language === "hinglish"
            ? "Sahi line par tap karein. Yeh aankde sirf seekhne ke liye hain."
            : "Tap the right line. These figures are fictional practice data."}
      </p>
      {q.options!.map((row, i) => (
        <button
          key={i}
          className={`document-row ${selected === i ? "chosen" : ""} ${result && q.answer === i ? "correct-line" : ""}`}
          aria-pressed={selected === i}
          disabled={!!result}
          onClick={() => onSelect(i)}
        >
          <span className="document-line-number">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>
            <Local text={row} lang={language} />
          </span>
          <span className="document-line-marker">
            {result && q.answer === i ? (
              <Icon name="Check" size={19} />
            ) : selected === i ? (
              <Icon name="CircleCheck" size={19} />
            ) : (
              <Icon name="Circle" size={17} />
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
export function BucketExercise({
  question: q,
  language,
  values,
  result,
  onChange,
}: {
  question: Exercise;
  language: Language;
  values: number[];
  result?: SavedAnswer;
  onChange: (values: number[]) => void;
}) {
  const selected = result ? (result.answer as number[]) : values;
  return (
    <div className="bucket-exercise">
      <p className="muted">
        {language === "hi"
          ? "हर चीज़ के लिए एक जगह चुनें। जवाब देखने से पहले सभी को रखें।"
          : language === "hinglish"
            ? "Har cheez ke liye ek jagah chunein. Jawaab dekhne se pehle sabhi ko rakhein."
            : "Choose one bucket for every item before checking."}
      </p>
      <div className="bucket-totals" aria-live="polite">
        {q.categories!.map((category, c) => (
          <div key={c}>
            <Icon name={c === 0 ? "ArrowDownLeft" : "ArrowUpRight"} size={20} />
            <span>
              <Local text={category} lang={language} />
            </span>
            <strong>{selected.filter((n) => n === c).length}</strong>
          </div>
        ))}
      </div>
      {q.options!.map((item, i) => (
        <fieldset
          key={i}
          className={`sort-item ${result ? (selected[i] === (q.answer as number[])[i] ? "sorted-correct" : "sorted-wrong") : ""}`}
        >
          <legend>
            <Local text={item} lang={language} />
          </legend>
          <div className="bucket-choices">
            {q.categories!.map((category, c) => (
              <label key={c} className={selected[i] === c ? "selected" : ""}>
                <input
                  type="radio"
                  name={`${q.id}-${i}`}
                  value={c}
                  checked={selected[i] === c}
                  disabled={!!result}
                  onChange={() => {
                    const next = Array.from(
                      { length: q.options!.length },
                      (_, n) => selected[n] ?? -1,
                    );
                    next[i] = c;
                    onChange(next);
                  }}
                />
                <span>
                  <Local text={category} lang={language} />
                </span>
              </label>
            ))}
          </div>
          {result && selected[i] !== (q.answer as number[])[i] && (
            <p className="sort-correction">
              <Icon name="Lightbulb" size={15} />
              {language === "hi"
                ? "सही जगह: "
                : language === "hinglish"
                  ? "Sahi jagah: "
                  : "Correct bucket: "}
              <Local
                text={q.categories![(q.answer as number[])[i]]}
                lang={language}
              />
            </p>
          )}
        </fieldset>
      ))}
    </div>
  );
}
