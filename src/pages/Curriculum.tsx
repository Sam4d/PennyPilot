import { useState } from "react";
import curriculum from "../content/curriculum.json";
import { lessons, type Language } from "../content/lessons";
import { Icon, Modal } from "../components/UI";
export default function Curriculum({
  onClose,
  language,
  onStart,
}: {
  onClose: () => void;
  language: Language;
  onStart: () => void;
}) {
  const [selected, setSelected] = useState(0),
    [query, setQuery] = useState("");
  const w = curriculum[selected];
  const units = w.units.filter((u) =>
    `${u.title} ${u.skills.map((s) => s.title).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <Modal wide label="The full learning journey" onClose={onClose}>
      <div className="curriculum">
        <span className="eyebrow">
          FROM YOUR FIRST RUPEE TO THE BIGGER PICTURE
        </span>
        <h2>
          {language === "hi"
            ? "सीखने का पूरा सफ़र"
            : "A whole world of money. Actually, 16."}
        </h2>
        <p>
          {language === "hi"
            ? `एकदम शुरुआत से एडवांस तक का सिलेबस देखें। इस प्रीव्यू में ${lessons.length} पाठ अभी खेलकर सीख सकते हैं। बाकी की तैयारी चल रही है।`
            : `Explore a beginner-to-advanced syllabus. ${lessons.length} foundation lessons are playable in this preview; the rest are in development.`}
        </p>
        <div className="curriculum-layout">
          <nav aria-label="Curriculum worlds">
            {curriculum.map((world, i) => (
              <button
                className={i === selected ? "active" : ""}
                key={world.id}
                onClick={() => {
                  setSelected(i);
                  setQuery("");
                }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <Icon name={world.icon} size={18} />
                <strong>{language === "hi" ? world.hi : world.title}</strong>
              </button>
            ))}
          </nav>
          <div className="curriculum-detail">
            <div className="curriculum-world-header">
              <span className="preview-icon">
                <Icon name={w.icon} size={32} />
              </span>
              <span className="pill">
                {selected === 0
                  ? `${lessons.length} PLAYABLE LESSONS`
                  : "CURRICULUM · IN DEVELOPMENT"}
              </span>
              <h3>{language === "hi" ? w.hi : w.title}</h3>
              <p>{w.description}</p>
              <span className="muted">
                {w.units.length} units ·{" "}
                {w.units.reduce((a, u) => a + u.skills.length, 0)} outlined
                skills
              </span>
            </div>
            {selected === 11 && (
              <div className="risk-notice">
                <Icon name="ShieldAlert" />
                <p>
                  Derivatives involve leverage and can cause substantial losses.
                  This world is planned as risk-first education. Regulatory
                  statistics must be verified before publication.
                </p>
              </div>
            )}
            <label className="search-field">
              <Icon name="Search" size={18} />
              <input
                placeholder="Find a topic in this world…"
                aria-label="Search curriculum"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            {units.length ? (
              units.map((u) => (
                <details className="unit-accordion" key={u.id}>
                  <summary>
                    <span>{u.id}</span>
                    <strong>{u.title}</strong>
                    <Icon name="ChevronDown" size={17} />
                  </summary>
                  {u.skills.length ? (
                    <ul>
                      {u.skills.map((s) => (
                        <li key={s.id}>
                          <span>{s.title}</span>
                          <small>{s.tier}</small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{u.outline.replace(/^• /gm, "")}</p>
                  )}
                </details>
              ))
            ) : (
              <p>No topics match “{query}”. Try a broader search.</p>
            )}
            {selected === 0 && (
              <button className="button green full" onClick={onStart}>
                Start with the foundations
                <Icon name="ArrowRight" size={18} />
              </button>
            )}
            <p className="tiny-text">
              Outlined skills are not completed lesson content. All lessons need
              numerical validation, primary-source checks, and Hindi editorial
              review before release.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
