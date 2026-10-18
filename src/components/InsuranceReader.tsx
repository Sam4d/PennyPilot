import type { InsuranceGuide } from "../content/insurance-guides";
import type { Language } from "../content/schema";
import { Local, Icon } from "./UI";
export default function InsuranceReader({
  guide,
  language,
  onBack,
}: {
  guide: InsuranceGuide;
  language: Language;
  onBack?: () => void;
}) {
  const hi = language === "hi";
  return (
    <article className="insurance-reader">
      {onBack && (
        <button className="text-button" onClick={onBack}>
          <Icon name="ArrowLeft" size={17} />
          {hi ? "सभी गाइड" : "All insurance guides"}
        </button>
      )}
      <span className="pill">
        {hi
          ? {
              Beginner: "शुरुआत",
              Intermediate: "आगे की समझ",
              Advanced: "गहरी समझ",
            }[guide.level]
          : guide.level}{" "}
        · {hi ? "पढ़कर समझें" : "Reading guide"}
      </span>
      <h2>
        <Local text={guide.title} lang={language} />
      </h2>
      <p className="reader-summary">
        <Local text={guide.summary} lang={language} />
      </p>
      <nav
        className="reader-contents"
        aria-label={hi ? "इस गाइड में" : "In this guide"}
      >
        {guide.sections.map((section, i) => (
          <a
            href={`#guide-section-${guide.id}-${i}`}
            key={i}
            onClick={(e) => {
              e.preventDefault();
              const destination = document.getElementById(
                `guide-section-${guide.id}-${i}`,
              );
              destination?.scrollIntoView({
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
                block: "start",
              });
              destination?.focus({ preventScroll: true });
            }}
          >
            <span>{i + 1}</span>
            <Local text={section.title} lang={language} />
          </a>
        ))}
      </nav>
      {guide.sections.map((section, i) => (
        <section key={i} id={`guide-section-${guide.id}-${i}`} tabIndex={-1}>
          <h3>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <Local text={section.title} lang={language} />
          </h3>
          <p>
            <Local text={section.body} lang={language} />
          </p>
        </section>
      ))}
      <section className="reader-example">
        <h3>
          <Icon name="FlaskConical" />
          {hi ? "एक example से समझें" : "Work through an example"}
        </h3>
        <p>
          <Local text={guide.example} lang={language} />
        </p>
      </section>
      <section className="reader-checklist">
        <h3>
          <Icon name="ListChecks" />
          {hi ? "खुद चेक करें" : "Your practical checklist"}
        </h3>
        <ul>
          {guide.checklist.map((item, i) => (
            <li key={i}>
              <Icon name="Check" size={18} />
              <Local text={item} lang={language} />
            </li>
          ))}
        </ul>
      </section>
      <aside className="reader-review">
        <Icon name="Info" size={19} />
        <div>
          <strong>{hi ? "एडिटोरियल ड्राफ़्ट" : "Editorial draft"}</strong>
          <p>
            {hi
              ? "वित्तीय जानकार और भाषा संपादक की जाँच बाकी है। उदाहरण काल्पनिक हैं। मौजूदा नियम और अपनी पॉलिसी ऑफ़िशियल स्रोत से चेक करें।"
              : "Financial and language review is pending. Examples are fictional. Check current official rules and your actual policy before acting."}
          </p>
          {guide.sources.map((url) => (
            <a key={url} href={url} target="_blank" rel="noreferrer">
              {hi ? "IRDAI · ऑफ़िशियल स्रोत" : "IRDAI · official source"}{" "}
              <Icon name="ExternalLink" size={13} />
            </a>
          ))}
        </div>
      </aside>
    </article>
  );
}
