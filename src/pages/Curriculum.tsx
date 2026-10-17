import { useEffect, useRef, useState } from "react";
import curriculum from "../content/curriculum.json";
import { lessons, type Language, type Lesson } from "../content/lessons";
import { insuranceGuides } from "../content/insurance-guides";
import {
  catalogueWorld,
  findCatalogueTarget,
  skillOutline,
} from "../lib/catalogue";
import { Icon, Local, Modal } from "../components/UI";
import InsuranceReader from "../components/InsuranceReader";
export default function Curriculum({
  onClose,
  language,
  onStart,
  target = "",
  onNavigate,
}: {
  onClose: () => void;
  language: Language;
  onStart: (lesson: Lesson) => void;
  target?: string;
  onNavigate: (target: string) => void;
}) {
  const [selected, setSelected] = useState(() => catalogueWorld(target));
  const [query, setQuery] = useState("");
  const [global, setGlobal] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const hi = language === "hi";
  useEffect(() => {
    setSelected(catalogueWorld(target));
    setQuery("");
    if (target && !target.startsWith("world/")) {
      heading.current?.focus();
      heading.current
        ?.closest(".modal")
        ?.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [target]);
  const w = curriculum[selected];
  const topic = findCatalogueTarget(target);
  const lesson = topic?.skill
    ? lessons.find((l) => l.skill === topic.skill!.id)
    : undefined;
  const guide = topic?.skill
    ? insuranceGuides.find((g) => g.skills.includes(topic.skill!.id))
    : undefined;
  const worlds = global && query ? curriculum : [w];
  const found = worlds.flatMap((world) =>
    world.units
      .filter((u) =>
        `${u.title} ${u.outline} ${u.skills.map((s) => s.title).join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
      .map((unit) => ({ world, unit })),
  );
  const isUnknown = !!target && !target.startsWith("world/") && !topic;
  return (
    <Modal
      wide
      label={hi ? "सीखने का पूरा सफ़र" : "The full learning journey"}
      onClose={onClose}
    >
      <div className="curriculum">
        <span className="eyebrow">
          {hi
            ? "अपनी पसंद का टॉपिक खोलें"
            : "OPEN ANY TOPIC. LEARN IN YOUR OWN ORDER."}
        </span>
        <h2>
          {hi ? "सीखने का पूरा सफ़र" : "A whole world of money. Actually, 16."}
        </h2>
        <p>
          {hi
            ? "हर वर्ल्ड, यूनिट और टॉपिक खुला है। तैयार क्विज़ सीधे शुरू करें। बाकी का ड्राफ़्ट आउटलाइन पढ़ें।"
            : "Every world, unit and topic is open. Start an available lesson directly, read an insurance guide, or explore a planned topic’s outline."}
        </p>
        <div className="curriculum-layout">
          <nav aria-label="Curriculum worlds">
            {curriculum.map((world, i) => (
              <button
                className={selected === i ? "active" : ""}
                key={world.id}
                onClick={() => onNavigate(`world/${i}`)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <Icon name={world.icon} size={18} />
                <strong>{hi ? world.hi : world.title}</strong>
              </button>
            ))}
          </nav>
          <div className="curriculum-detail">
            {topic ? (
              <>
                <button
                  className="text-button"
                  onClick={() => onNavigate(`world/${topic.world.id}`)}
                >
                  <Icon name="ArrowLeft" size={16} />
                  {hi ? "वर्ल्ड में वापस" : "Back to this world"}
                </button>
                <h3 ref={heading} tabIndex={-1} className="topic-heading">
                  {topic.skill?.title ?? topic.unit.title}
                </h3>
                <span className="pill">
                  {lesson
                    ? hi
                      ? "इंटरैक्टिव पाठ उपलब्ध"
                      : "Interactive lesson available"
                    : guide
                      ? hi
                        ? "गाइड उपलब्ध"
                        : "Reading guide available"
                      : hi
                        ? "ड्राफ़्ट आउटलाइन"
                        : "Draft outline"}
                </span>
                <p className="topic-breadcrumb">
                  {topic.world.title} · {topic.unit.title} ·{" "}
                  {topic.skill?.id ?? topic.unit.id}
                </p>
                {lesson && (
                  <section className="catalogue-lesson">
                    <h4>
                      <Local text={lesson.title} lang={language} />
                    </h4>
                    <p>
                      <Local text={lesson.subtitle} lang={language} />
                    </p>
                    <button
                      className="button green"
                      onClick={() => onStart(lesson)}
                    >
                      {hi ? "यह पाठ खोलें" : "Open this lesson"}
                      <Icon name="Play" size={17} />
                    </button>
                  </section>
                )}
                {guide && <InsuranceReader guide={guide} language={language} />}
                {!guide && (
                  <section className="topic-outline">
                    <h4>
                      {hi
                        ? "इस टॉपिक में क्या सीखेंगे"
                        : "What this topic covers"}
                    </h4>
                    <p>
                      {topic.skill
                        ? skillOutline(topic.unit, topic.skill)
                        : topic.unit.outline.replace(/^• /gm, "")}
                    </p>
                    <p className="tiny-text">
                      {hi
                        ? "यह दिए हुए सिलेबस का ड्राफ़्ट है। पूरा पढ़ने वाला पाठ और क्विज़ अभी तैयार नहीं है। आँकड़े और नियम जाँचे हुए नहीं हैं; ऑफ़िशियल जानकारी चेक करें।"
                        : "This is the supplied curriculum outline, not a completed lesson. Full teaching content and a quiz are still in development. Figures and rules in this draft are unverified; check current official sources."}
                    </p>
                  </section>
                )}
                {topic.skill && (
                  <div className="topic-neighbours">
                    {(() => {
                      const all = curriculum.flatMap((world) =>
                        world.units.flatMap((unit) => unit.skills),
                      );
                      const i = all.findIndex((s) => s.id === topic.skill!.id);
                      return (
                        <>
                          {i > 0 && (
                            <button
                              className="button secondary"
                              onClick={() => onNavigate(all[i - 1].id)}
                            >
                              <Icon name="ArrowLeft" size={15} />
                              {hi ? "पिछला टॉपिक" : "Previous topic"}
                            </button>
                          )}
                          {i < all.length - 1 && (
                            <button
                              className="button secondary"
                              onClick={() => onNavigate(all[i + 1].id)}
                            >
                              {hi ? "अगला टॉपिक" : "Next topic"}
                              <Icon name="ArrowRight" size={15} />
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}
              </>
            ) : (
              <>
                {isUnknown && (
                  <p role="alert">
                    {hi
                      ? "यह टॉपिक नहीं मिला। नीचे से चुनें।"
                      : "That topic was not found. Choose a topic below."}
                  </p>
                )}
                <div className="curriculum-world-header">
                  <span className="preview-icon">
                    <Icon name={w.icon} size={32} />
                  </span>
                  <span className="pill">
                    {selected === 0
                      ? `${lessons.length} PLAYABLE LESSONS`
                      : selected === 12
                        ? "8 READING GUIDES"
                        : "TOPIC OUTLINES"}
                  </span>
                  <h3>{hi ? w.hi : w.title}</h3>
                  <p>{w.description}</p>
                  <span className="muted">
                    {w.units.length} {hi ? "यूनिट" : "units"} ·{" "}
                    {w.units.reduce((n, u) => n + u.skills.length, 0)}{" "}
                    {hi ? "टॉपिक" : "topics"}
                  </span>
                </div>
                {selected === 11 && (
                  <div className="risk-notice">
                    <Icon name="ShieldAlert" />
                    <p>
                      {hi
                        ? "डेरिवेटिव में बड़ा नुकसान हो सकता है। रिस्क से शुरुआत करें।"
                        : "Derivatives can cause substantial losses. Start with risk and how losses can exceed a small initial payment."}
                    </p>
                  </div>
                )}
                <label className="search-field">
                  <Icon name="Search" size={18} />
                  <input
                    placeholder={hi ? "टॉपिक खोजें…" : "Find a topic…"}
                    aria-label="Search curriculum"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <label className="catalogue-global">
                  <input
                    type="checkbox"
                    checked={global}
                    onChange={(e) => setGlobal(e.target.checked)}
                  />
                  {hi ? "सभी 16 वर्ल्ड में खोजें" : "Search all 16 worlds"}
                </label>
                {found.length ? (
                  found.map(({ world, unit: u }) => (
                    <details className="unit-accordion" key={u.id}>
                      <summary>
                        <span>{u.id}</span>
                        <strong>
                          {global && query ? `${world.title} · ` : ""}
                          {u.title}
                        </strong>
                        <Icon name="ChevronDown" size={17} />
                      </summary>
                      <button
                        className="text-button unit-open"
                        onClick={() => onNavigate(`unit/${u.id}`)}
                      >
                        {hi ? "यूनिट का आउटलाइन खोलें" : "Open unit outline"}
                        <Icon name="ArrowUpRight" size={14} />
                      </button>
                      {u.skills.length ? (
                        <ul>
                          {u.skills.map((s) => (
                            <li key={s.id}>
                              <button
                                className="catalogue-topic"
                                onClick={() => onNavigate(s.id)}
                              >
                                <span>{s.title}</span>
                                <small>
                                  {lessons.some((l) => l.skill === s.id)
                                    ? hi
                                      ? "पाठ खोलें"
                                      : "Open lesson"
                                    : insuranceGuides.some((g) =>
                                          g.skills.includes(s.id),
                                        )
                                      ? hi
                                        ? "गाइड पढ़ें"
                                        : "Read guide"
                                      : s.tier}
                                  <Icon name="ArrowRight" size={13} />
                                </small>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{u.outline.replace(/^• /gm, "")}</p>
                      )}
                    </details>
                  ))
                ) : (
                  <p role="status">
                    {hi
                      ? "इस खोज में टॉपिक नहीं मिला। दूसरा शब्द आज़माएं।"
                      : `No topics match “${query}”. Try another word.`}
                  </p>
                )}
                {selected === 0 && (
                  <button
                    className="button green full"
                    onClick={() => onStart(lessons[0])}
                  >
                    {hi ? "बुनियाद से शुरू करें" : "Start with the foundations"}
                    <Icon name="ArrowRight" size={18} />
                  </button>
                )}
                <p className="tiny-text">
                  {hi
                    ? "खुला आउटलाइन, पूरा तैयार पाठ नहीं है। क्विज़ और गाइड की स्थिति हर टॉपिक पर दी है।"
                    : "An open outline is not a completed lesson. Each topic shows whether an interactive lesson, a reading guide or a draft outline is available."}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
