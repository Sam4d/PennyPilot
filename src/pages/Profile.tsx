import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { exportBackup, validateBackup } from "../lib/store";
import type { Progress } from "../lib/store";
import type { Update } from "../App";
import { streak } from "../lib/learning";
import { Icon, Modal } from "../components/UI";
import { lessons } from "../content/lessons";
import { glossary } from "../content/glossary";
import Mia from "../components/Mia";
export default function Profile({
  progress,
  update,
  notify,
  count,
}: {
  progress: Progress;
  update: Update;
  notify: (s: string) => void;
  count: number;
}) {
  const file = useRef<HTMLInputElement>(null);
  const [incoming, setIncoming] = useState<Progress | null>(null);
  const [error, setError] = useState("");
  const [persisted, setPersisted] = useState<string>("");
  const importFile = async (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      if (f.size > 5000000)
        throw Error("Please choose a backup smaller than 5 MB.");
      const p = validateBackup(JSON.parse(await f.text()));
      setIncoming(p);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not read this backup.",
      );
    }
  };
  const persist = async () => {
    if (!navigator.storage?.persist) {
      setPersisted(
        "Your browser manages storage automatically. Keep an exported backup too.",
      );
      return;
    }
    try {
      const ok = await navigator.storage.persist();
      setPersisted(
        ok
          ? "Persistent storage is enabled. Keep a backup for moving devices."
          : "Your browser has not granted persistent storage. Keep regular exported backups.",
      );
    } catch {
      setPersisted(
        "Storage protection is unavailable here. Please keep an exported backup.",
      );
    }
  };
  return (
    <div className="profile-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            YOUR PACE. YOUR PROGRESS. YOUR PENNY PILOT.
          </span>
          <h1>
            A little more <span>you.</span>
          </h1>
          <p>Build a habit that fits your life, not the other way around.</p>
        </div>
        <Icon name="Fingerprint" size={38} />
      </div>
      <section className="profile-hero">
        <Mia pose="celebrate" />
        <div>
          <span className="pill">
            {count >= lessons.length
              ? "FOUNDATION EXPLORER"
              : count
                ? "CURIOUS MONEY HUMAN"
                : "A FRESH BEGINNING"}
          </span>
          <h2>
            {progress.name
              ? `${progress.name}, you’ve got this.`
              : "Hi, curious human."}
          </h2>
          <p>No comparison. No leaderboard. Just your own little wins.</p>
          <div className="profile-stats">
            <span>
              <Icon name="Zap" /> <strong>{progress.xp}</strong> XP earned
            </span>
            <span>
              <Icon name="Flame" />{" "}
              <strong>{streak(Object.keys(progress.days))}</strong> day streak
            </span>
            <span>
              <Icon name="BookOpen" /> <strong>{count}</strong> lessons learned
            </span>
          </div>
        </div>
      </section>
      <div className="settings-grid">
        <section className="settings-card">
          <div className="card-header">
            <h2>Make yourself at home</h2>
            <Icon name="SlidersHorizontal" />
          </div>
          <label className="setting-field">
            What should Mia call you?
            <input
              maxLength={80}
              placeholder="Your name (optional)"
              value={progress.name}
              onChange={(e) => update((p) => ({ ...p, name: e.target.value }))}
            />
          </label>
          <div className="setting-field">
            Your daily little goal
            <div className="goal-options">
              {[
                [25, "A gentle start", "A few minutes"],
                [50, "A steady habit", "Around 5 minutes"],
                [75, "A curious mind", "Around 10 minutes"],
              ].map(([xp, label, desc]) => (
                <button
                  key={xp}
                  className={progress.goal === xp ? "active" : ""}
                  onClick={() => update((p) => ({ ...p, goal: Number(xp) }))}
                >
                  <strong>{xp} XP</strong>
                  <span>{label}</span>
                  <small>{desc}</small>
                </button>
              ))}
            </div>
            <small className="muted">
              XP depends on correct answers. Time estimates vary by learner.
            </small>
          </div>
          <label className="setting-field">
            Language
            <select
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
          </label>
          <div className="setting-field">
            Your kind of light
            <div className="theme-options">
              <button
                className={progress.theme === "light" ? "active" : ""}
                onClick={() => update((p) => ({ ...p, theme: "light" }))}
              >
                <Icon name="Sun" />
                Light & bright
              </button>
              <button
                className={progress.theme === "dark" ? "active" : ""}
                onClick={() => update((p) => ({ ...p, theme: "dark" }))}
              >
                <Icon name="Moon" />
                After hours
              </button>
            </div>
          </div>
          <label className="setting-field">
            Text size <span>{Math.round(progress.scale * 100)}%</span>
            <input
              aria-label="Text size"
              type="range"
              min={1}
              max={2}
              step={0.1}
              value={progress.scale}
              onChange={(e) =>
                update((p) => ({ ...p, scale: Number(e.target.value) }))
              }
            />
          </label>
        </section>
        <div>
          <section className="settings-card backup-card">
            <div className="card-header">
              <h2>Your progress, safely tucked away</h2>
              <Icon name="ShieldCheck" />
            </div>
            <p>
              Your learning stays on this device. Export a backup to move
              between your phone and computer, or keep a spare copy.
            </p>
            <button
              className="button green full"
              onClick={() => {
                void exportBackup(progress).catch(() =>
                  setError("Could not export your backup. Please try again."),
                );
                notify("Your backup is ready. Keep it somewhere safe.");
              }}
            >
              <Icon name="Download" size={18} />
              Export my progress
            </button>
            <button
              className="button secondary full"
              onClick={() => file.current?.click()}
            >
              <Icon name="Upload" size={18} />
              Restore a backup
            </button>
            <input
              ref={file}
              type="file"
              aria-label="Choose a Penny Pilot progress backup"
              accept="application/json,.json"
              className="visually-hidden"
              onChange={importFile}
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="text-button" onClick={persist}>
              <Icon name="HardDrive" size={16} />
              Protect browser storage
            </button>
            {persisted && (
              <p className="tiny-text" role="status">
                {persisted}
              </p>
            )}
          </section>
          <section className="settings-card trust-card">
            <div className="card-header">
              <h2>A small promise</h2>
              <Icon name="Heart" />
            </div>
            <ul>
              <li>
                <Icon name="Check" />
                No ads, trackers, or broker referrals.
              </li>
              <li>
                <Icon name="Check" />
                No login. Your learning stays local.
              </li>
              <li>
                <Icon name="Check" />
                No stock picks or promised returns.
              </li>
            </ul>
            <p>
              This app is for education only. It is not investment, tax or legal
              advice. The creators are not SEBI-registered advisors.
            </p>
            <details>
              <summary>About this first release</summary>
              <p>
                Penny Pilot 0.5 · {lessons.length} editorial-preview lessons,{" "}
                {lessons.reduce((n, l) => n + l.exercises.length, 0)} exercises,
                {glossary.length} glossary entries, four calculators, and a
                16-world topic library, eight insurance reading guides, and a
                lump-sum investment mode. Content needs expert financial and
                Hindi editorial review. Current tax and regulatory rules are
                intentionally excluded until verified.
              </p>
              <p>
                Animations respect your device’s reduced-motion preference.
                Lessons and fonts are bundled for offline use after the first
                full load.
              </p>
            </details>
          </section>
        </div>
      </div>
      {incoming && (
        <Modal label="Restore progress" onClose={() => setIncoming(null)}>
          <div className="restore-dialog">
            <span className="preview-icon">
              <Icon name="Upload" size={30} />
            </span>
            <h2>Bring your learning along.</h2>
            <p>
              This backup contains {incoming.xp} XP and{" "}
              {Object.keys(incoming.completed).length} completed lessons.
              Restoring replaces the progress on this device.
            </p>
            <p>Export your current progress first if you want to keep it.</p>
            <button
              className="button secondary full"
              onClick={() => {
                void exportBackup(progress).catch(() =>
                  setError("Could not export your backup. Please try again."),
                );
              }}
            >
              Export current progress
            </button>
            <button
              className="button green full"
              onClick={() => {
                update(() => incoming);
                setIncoming(null);
                notify("Your learning is right where you left it.");
              }}
            >
              Restore this backup
              <Icon name="Check" size={18} />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
