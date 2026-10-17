import { useState } from "react";
import type { Language, Lesson } from "../content/schema";
import { insuranceGuides } from "../content/insurance-guides";
import { lessons, read } from "../content/lessons";
import { Icon, Local } from "../components/UI";
import InsuranceReader from "../components/InsuranceReader";
import Mia from "../components/Mia";
export default function Insurance({
  language,
  onStart,
  onCurriculum,
}: {
  language: Language;
  onStart: (lesson: Lesson) => void;
  onCurriculum: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [level, setLevel] = useState("All");
  const [query, setQuery] = useState("");
  const hi = language === "hi";
  const guide = insuranceGuides.find((g) => g.id === selected);
  const open = (id: string | null) => {
    setSelected(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const results = insuranceGuides.filter(
    (g) =>
      (level === "All" || g.level === level) &&
      `${read(g.title, language)} ${read(g.summary, language)} ${g.sections.map((s) => read(s.body, language)).join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="insurance-page">
      {guide ? (
        <InsuranceReader
          guide={guide}
          language={language}
          onBack={() => open(null)}
        />
      ) : (
        <>
          <div className="page-heading">
            <div>
              <span className="eyebrow">
                {hi
                  ? "अपने लोगों और प्लान की सुरक्षा"
                  : "PROTECT YOUR PEOPLE AND PLANS"}
              </span>
              <h1>
                {hi ? "इंश्योरेंस समझें।" : "Insurance, clearly explained."}
              </h1>
              <p>
                {hi
                  ? "क्यों चाहिए, क्या फायदा है, किन शर्तों पर है—शुरुआत से एडवांस तक।"
                  : "Why it matters, how it helps and where its limits lie—from the basics to advanced policy comparison."}
              </p>
            </div>
            <Icon name="Umbrella" size={38} />
          </div>
          <section className="insurance-hero">
            <Mia pose="read" />
            <div>
              <span className="pill">
                {hi ? "मिया की सुरक्षा क्लास" : "MIA’S PROTECTION CLASS"}
              </span>
              <h2>
                {hi
                  ? "बड़ा नुकसान, छोटा नहीं लगता। तैयारी मदद करती है।"
                  : "A large loss can change a plan. Preparation helps."}
              </h2>
              <p>
                {hi
                  ? "बचत तुरंत मदद देती है। सही कवर तय बड़े रिस्क में मदद कर सकता है। दोनों की अपनी जगह है।"
                  : "Savings help with urgent needs. Suitable insurance can help with specified larger risks. Learn how the two work together."}
              </p>
              <button
                className="button green"
                onClick={() => open("why-insurance")}
              >
                {hi
                  ? "क्यों ज़रूरी है, समझें"
                  : "Start with why insurance matters"}
                <Icon name="ArrowRight" size={17} />
              </button>
            </div>
          </section>
          <section className="insurance-practice">
            <div className="section-heading">
              <div>
                <h2>{hi ? "खेलकर समझें" : "Learn by doing"}</h2>
                <p>
                  {hi
                    ? "तीन पाठ: सुरक्षा, हेल्थ बिल और परिवार की ज़रूरत।"
                    : "Three interactive lessons: protection, health bills and family needs."}
                </p>
              </div>
            </div>
            <div className="insurance-lesson-grid">
              {lessons
                .filter((l) => l.chapter === "protection")
                .map((l) => (
                  <button key={l.id} onClick={() => onStart(l)}>
                    <Icon name={l.icon} size={25} />
                    <strong>
                      <Local text={l.title} lang={language} />
                    </strong>
                    <span>
                      {l.exercises.length} {hi ? "एक्सरसाइज़" : "exercises"}
                      <Icon name="ArrowRight" size={16} />
                    </span>
                  </button>
                ))}
            </div>
          </section>
          <div className="section-heading">
            <div>
              <h2>{hi ? "शुरुआत से एडवांस तक" : "Build your understanding"}</h2>
              <p>
                {hi
                  ? "8 गाइड, उदाहरण और काम की चेकलिस्ट।"
                  : "Eight reading guides with examples and practical checklists."}
              </p>
            </div>
          </div>
          <div className="insurance-controls">
            <div
              className="segmented"
              role="group"
              aria-label={hi ? "गाइड का स्तर" : "Guide level"}
            >
              {["All", "Beginner", "Intermediate", "Advanced"].map((item) => (
                <button
                  key={item}
                  aria-pressed={level === item}
                  className={level === item ? "active" : ""}
                  onClick={() => setLevel(item)}
                >
                  {hi
                    ? {
                        All: "सभी",
                        Beginner: "शुरुआत",
                        Intermediate: "आगे",
                        Advanced: "एडवांस",
                      }[item]
                    : item}
                </button>
              ))}
            </div>
            <label className="search-field">
              <Icon name="Search" size={18} />
              <input
                aria-label={
                  hi ? "इंश्योरेंस गाइड खोजें" : "Search insurance guides"
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  hi ? "को-पे, क्लेम, टर्म…" : "Co-pay, claims, term cover…"
                }
              />
            </label>
          </div>
          <div className="insurance-guide-grid">
            {results.map((g) => (
              <button
                key={g.id}
                className="insurance-guide-card"
                onClick={() => open(g.id)}
              >
                <span className="pill">{g.level}</span>
                <strong>
                  <Local text={g.title} lang={language} />
                </strong>
                <p>
                  <Local text={g.summary} lang={language} />
                </p>
                <span className="guide-open">
                  {hi ? "गाइड पढ़ें" : "Read guide"}
                  <Icon name="ArrowUpRight" size={18} />
                </span>
              </button>
            ))}
          </div>
          {!results.length && (
            <p role="status">
              {hi
                ? "कोई गाइड नहीं मिली। दूसरा शब्द आज़माएं।"
                : "No guides match. Try another search or level."}
            </p>
          )}
          <button
            className="insurance-catalogue button secondary"
            onClick={onCurriculum}
          >
            <Icon name="Grid2X2" size={19} />
            {hi
              ? "वर्ल्ड 12 के सभी 39 टॉपिक देखें"
              : "Explore all 39 insurance topics in World 12"}
            <Icon name="ArrowRight" size={17} />
          </button>
          <p className="tiny-text">
            {hi
              ? "गाइड और पाठ अभी एडिटोरियल ड्राफ़्ट हैं; जाँच बाकी है। गाइड पढ़ने से क्विज़ पूरा या XP नहीं मिलता।"
              : "Guides and lessons are editorial drafts pending review. Reading a guide does not complete a quiz or award XP."}
          </p>
        </>
      )}
    </div>
  );
}
