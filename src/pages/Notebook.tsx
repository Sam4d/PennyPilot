import { Copy, useUICopy } from "../lib/ui-copy";
import { useState } from "react";
import { flushProgress } from "../lib/store";
import type { Progress } from "../lib/store";
import type { Update } from "../App";
import type { Lesson } from "../content/lessons";
import { lessons, read } from "../content/lessons";
import { glossary } from "../content/glossary";
import { Empty, Icon, Local, Modal } from "../components/UI";
export default function Notebook({
  progress,
  update,
  notify,
  onStart,
}: {
  progress: Progress;
  update: Update;
  notify: (s: string) => void;
  onStart: (l: Lesson) => void;
}) {
  const ui = useUICopy();

  const [tab, setTab] = useState("notes"),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState<Lesson | null>(null);
  const closeNote = async () => {
    try {
      await flushProgress();
      setSelected(null);
    } catch {
      notify("Your note could not be saved. Export a backup before closing.");
    }
  };
  const hi = progress.language === "hi";
  const list = lessons.filter(
    (l) =>
      progress.saved.includes(l.id) &&
      `${l.title.en} ${l.title.hi} ${l.notes.map((n) => n.en).join(" ")} ${progress.notes[l.id] || ""}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="notebook-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <Copy en="A LITTLE WISDOM, ALWAYS WITH YOU " />
          </span>
          <h1>
            {hi ? (
              "आपकी अपनी नोटबुक।"
            ) : (
              <>
                <Copy en="Worth learning. " />
                <span>
                  <Copy en="Worth keeping. " />
                </span>
              </>
            )}
          </h1>
          <p>
            <Copy en="Little lessons, worked examples, and thoughts in your own words. " />
          </p>
        </div>
        <button
          className="button secondary"
          onClick={() => {
            if (!progress.saved.length) {
              notify("Finish a lesson to collect your first note card.");
              return;
            }
            window.print();
          }}
        >
          <Icon name="Printer" size={17} />
          <Copy en="Save as PDF " />
        </button>
      </div>
      <div className="notebook-toolbar">
        <div className="segmented">
          <button
            className={tab === "notes" ? "active" : ""}
            onClick={() => setTab("notes")}
          >
            <Copy en="My notes " />
            <span>
              <Copy>{progress.saved.length}</Copy>
            </span>
          </button>
          <button
            className={tab === "glossary" ? "active" : ""}
            onClick={() => setTab("glossary")}
          >
            <Copy en="Money dictionary " />
            <span>
              <Copy>{glossary.length}</Copy>
            </span>
          </button>
        </div>
        <label className="search-field">
          <Icon name="Search" size={17} />
          <input
            aria-label={ui("Search notebook")}
            placeholder={ui(
              tab === "notes" ? "Find a little wisdom…" : "Find a money word…",
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      {tab === "notes" &&
        (list.length ? (
          <div className="notebook-grid">
            {list.map((l) => (
              <button
                className="notebook-card"
                key={l.id}
                onClick={() => setSelected(l)}
              >
                <span className="notecard-top">
                  <span className="pill">
                    <Copy en="MONEY FOUNDATIONS " />
                  </span>
                  <Icon name="BookmarkCheck" size={20} />
                </span>
                <Icon name={l.icon} className="notecard-icon" size={28} />
                <h2>
                  <Local text={l.title} lang={progress.language} />
                </h2>
                <ul>
                  {l.notes.map((n, i) => (
                    <li key={i}>
                      <Local text={n} lang={progress.language} />
                    </li>
                  ))}
                </ul>
                {progress.notes[l.id] && (
                  <p className="personal-snippet">
                    “{progress.notes[l.id].slice(0, 110)}”
                  </p>
                )}
                <span className="notecard-footer">
                  <Copy en="Open your note card " />
                  <Icon name="ArrowUpRight" size={17} />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <Empty
            icon="NotebookPen"
            title={
              query
                ? "No notes match yet."
                : "Your first little piece of wisdom awaits."
            }
            description={
              query
                ? "Try another word, or clear your search."
                : "Every completed lesson leaves a helpful note card here. Add your thoughts and make it yours."
            }
          >
            {!query && (
              <button
                className="button green"
                onClick={() => onStart(lessons[0])}
              >
                <Copy en="Find my first lesson " />
                <Icon name="ArrowRight" size={17} />
              </button>
            )}
          </Empty>
        ))}
      {tab === "glossary" && (
        <div className="glossary-grid">
          {glossary
            .filter((g) =>
              g.join(" ").toLowerCase().includes(query.toLowerCase()),
            )
            .map(([en, translation, definition, hindi]) => (
              <article className="glossary-card" key={en}>
                <h3>
                  <Copy>{en}</Copy>
                  {(hi || progress.language === "both") && (
                    <span lang="hi">
                      <Copy>{translation}</Copy>
                    </span>
                  )}
                </h3>
                <p>
                  <Copy>{hi ? hindi : definition}</Copy>
                </p>
                {progress.language === "both" && (
                  <p lang="hi" className="muted">
                    <Copy>{hindi}</Copy>
                  </p>
                )}
              </article>
            ))}
        </div>
      )}
      {selected && (
        <Modal wide label={ui("Your note card")} onClose={closeNote}>
          <div className="notebook-detail">
            <span className="eyebrow">
              <Copy en="YOUR MONEY FOUNDATIONS NOTEBOOK " />
            </span>
            <h2>
              <Local text={selected.title} lang={progress.language} />
            </h2>
            <ul>
              {selected.notes.map((n, i) => (
                <li key={i}>
                  <Local text={n} lang={progress.language} />
                </li>
              ))}
            </ul>
            <div className="note-example">
              <span className="eyebrow">
                <Copy en="THE MATHS, MADE CLEAR " />
              </span>
              <p>
                <Local text={selected.example} lang={progress.language} />
              </p>
            </div>
            <div className="note-action">
              <Icon name="Footprints" />
              <div>
                <strong>
                  <Copy en="Try this in real life " />
                </strong>
                <p>
                  <Local text={selected.action} lang={progress.language} />
                </p>
              </div>
            </div>
            <label className="personal-note-label">
              <Copy en="In your own words " />
              <textarea
                placeholder={ui(
                  "An idea, a reminder, a thought for future you…",
                )}
                maxLength={10000}
                value={progress.notes[selected.id] || ""}
                onChange={(e) =>
                  update((p) => ({
                    ...p,
                    notes: { ...p.notes, [selected.id]: e.target.value },
                  }))
                }
              />
            </label>
            <span className="tiny-text">
              <Copy en="Saved automatically on your device. " />
            </span>
            <div className="notebook-detail-actions">
              <button
                className="button secondary"
                onClick={async () => {
                  await closeNote();
                  onStart(selected);
                }}
              >
                <Copy en="Revisit lesson " />
                <Icon name="RotateCcw" size={16} />
              </button>
              <button className="button green" onClick={closeNote}>
                <Copy en="Tuck it away " />
                <Icon name="Check" size={17} />
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="print-notebook">
        <h1>
          <Copy en="Penny Pilot · My money notebook " />
        </h1>
        {lessons
          .filter((l) => progress.saved.includes(l.id))
          .map((l) => (
            <article key={l.id}>
              <h2>{read(l.title, progress.language)}</h2>
              <ul>
                {l.notes.map((n, i) => (
                  <li key={i}>{read(n, progress.language)}</li>
                ))}
              </ul>
              <p>{read(l.example, progress.language)}</p>
              <p>{read(l.action, progress.language)}</p>
              {progress.notes[l.id] && (
                <p>
                  <Copy en="My thoughts: " />
                  {progress.notes[l.id]}
                </p>
              )}
            </article>
          ))}
      </div>
    </div>
  );
}
