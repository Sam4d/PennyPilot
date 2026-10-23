import { Copy, useUICopy } from "../lib/ui-copy";
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
import appInfo from "../../package.json";
export default function Profile({
  progress,
  update,
  notify,
  count,
  onAbout,
}: {
  progress: Progress;
  update: Update;
  notify: (s: string) => void;
  count: number;
  onAbout: () => void;
}) {
  const ui = useUICopy();
  const hi = progress.language === "hi";

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
  const backup = async () => {
    try {
      const timestamp = await exportBackup(progress);
      update((p) => ({ ...p, lastBackupAt: timestamp }));
      notify(
        hi
          ? "बैकअप का डाउनलोड या शेयर शुरू हुआ। फ़ाइल सेव हुई है, यह चेक करें।"
          : "Backup export started. Check that you saved the file.",
      );
    } catch {
      setError(
        hi
          ? "बैकअप नहीं निकला। दोबारा आज़माएं।"
          : "Could not export your backup. Please try again.",
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
            <Copy en="YOUR PACE. YOUR PROGRESS. YOUR PENNY PILOT. " />
          </span>
          <h1>
            <Copy en="A little more " />
            <span>
              <Copy en="you. " />
            </span>
          </h1>
          <p>
            <Copy en="Build a habit that fits your life, not the other way around. " />
          </p>
        </div>
        <Icon name="Fingerprint" size={38} />
      </div>
      <section className="profile-hero">
        <Mia pose="celebrate" />
        <div>
          <span className="pill">
            {ui(
              count >= lessons.length
                ? "FOUNDATION EXPLORER"
                : count
                  ? "CURIOUS MONEY HUMAN"
                  : "A FRESH BEGINNING",
            )}
          </span>
          <h2>
            {progress.name
              ? hi
                ? `${progress.name}, अपने कदमों पर भरोसा रखें।`
                : `${progress.name}, you’ve got this.`
              : ui("Hi, curious human.")}
          </h2>
          <p>
            <Copy en="No comparison. No leaderboard. Just your own little wins. " />
          </p>
          <div className="profile-stats">
            <span>
              <Icon name="Zap" />{" "}
              <strong>
                <Copy>{progress.xp}</Copy>
              </strong>
              <Copy en="XP earned " />
            </span>
            <span>
              <Icon name="Flame" />
              <Copy> </Copy>
              <strong>
                {streak(
                  Object.keys(progress.days),
                  new Date(),
                  progress.protection?.used,
                )}
              </strong>
              <Copy en="day streak " />
            </span>
            <span>
              <Icon name="BookOpen" />{" "}
              <strong>
                <Copy>{count}</Copy>
              </strong>
              <Copy en="lessons learned " />
            </span>
          </div>
        </div>
      </section>
      <div className="settings-grid">
        <section className="settings-card">
          <div className="card-header">
            <h2>
              <Copy en="Make yourself at home " />
            </h2>
            <Icon name="SlidersHorizontal" />
          </div>
          <label className="setting-field">
            <Copy en="What should Mia call you? " />
            <input
              maxLength={80}
              placeholder={ui("Your name (optional)")}
              value={progress.name}
              onChange={(e) => update((p) => ({ ...p, name: e.target.value }))}
            />
          </label>
          <div className="setting-field">
            <Copy en="Your daily little goal " />
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
                  <strong>
                    <Copy>{xp}</Copy> XP
                  </strong>
                  <span>
                    <Copy>{label}</Copy>
                  </span>
                  <small>
                    <Copy>{desc}</Copy>
                  </small>
                </button>
              ))}
            </div>
            <small className="muted">
              <Copy en="XP depends on correct answers. Time estimates vary by learner. " />
            </small>
          </div>
          <label className="setting-field">
            <Copy en="Language " />
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
            <Copy en="Your kind of light " />
            <div className="theme-options">
              <button
                className={progress.theme === "light" ? "active" : ""}
                onClick={() => update((p) => ({ ...p, theme: "light" }))}
              >
                <Icon name="Sun" />
                <Copy en="Light & bright " />
              </button>
              <button
                className={progress.theme === "dark" ? "active" : ""}
                onClick={() => update((p) => ({ ...p, theme: "dark" }))}
              >
                <Icon name="Moon" />
                <Copy en="After hours " />
              </button>
            </div>
          </div>
          <label className="setting-field">
            <Copy en="Text size " />
            <span>{Math.round(progress.scale * 100)}%</span>
            <input
              aria-label={ui("Text size")}
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
            <div className="backup-history">
              <strong>
                {hi ? "पिछला बैकअप एक्सपोर्ट" : "Last backed up (export)"}
              </strong>
              <p>
                {progress.lastBackupAt
                  ? new Intl.DateTimeFormat(hi ? "hi-IN" : "en-IN", {
                      timeZone: "Asia/Kolkata",
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(progress.lastBackupAt)) + " IST"
                  : hi
                    ? "अभी तक बैकअप नहीं निकाला"
                    : "No backup exported yet"}
              </p>
              <small>
                {hi
                  ? "यह डाउनलोड या शेयर शुरू होने का समय है। फ़ाइल सच में सेव हुई है, यह खुद चेक करें।"
                  : "This records an export request. Confirm the downloaded or shared file was saved."}
              </small>
            </div>

            <div className="card-header">
              <h2>
                <Copy en="Your progress, safely tucked away " />
              </h2>
              <Icon name="ShieldCheck" />
            </div>
            <p>
              <Copy en="Your learning stays on this device. Export a backup to move between your phone and computer, or keep a spare copy. " />
            </p>
            <button className="button green full" onClick={() => void backup()}>
              <Icon name="Download" size={18} />
              <Copy en="Export my progress " />
            </button>
            <button
              className="button secondary full"
              onClick={() => file.current?.click()}
            >
              <Icon name="Upload" size={18} />
              <Copy en="Restore a backup " />
            </button>
            <input
              ref={file}
              type="file"
              aria-label={ui("Choose a Penny Pilot progress backup")}
              accept="application/json,.json"
              className="visually-hidden"
              onChange={importFile}
            />
            {error && (
              <p className="form-error" role="alert">
                <Copy>{error}</Copy>
              </p>
            )}
            <button className="text-button" onClick={persist}>
              <Icon name="HardDrive" size={16} />
              <Copy en="Protect browser storage " />
            </button>
            {persisted && (
              <p className="tiny-text" role="status">
                <Copy>{persisted}</Copy>
              </p>
            )}
          </section>
          <section className="settings-card trust-card">
            <button className="text-button" onClick={onAbout}>
              {hi ? "इस सामग्री के बारे में" : "About this content"}
            </button>
            <div className="card-header">
              <h2>
                <Copy en="A small promise " />
              </h2>
              <Icon name="Heart" />
            </div>
            <ul>
              <li>
                <Icon name="Check" />
                <Copy en="No ads, trackers, or broker referrals. " />
              </li>
              <li>
                <Icon name="Check" />
                <Copy en="No login. Your learning stays local. " />
              </li>
              <li>
                <Icon name="Check" />
                <Copy en="No stock picks or promised returns. " />
              </li>
            </ul>
            <p>
              <Copy en="This app is for education only. It is not investment, tax or legal advice. It does not provide personal financial advice. " />
            </p>
            <details>
              <summary>
                <Copy en="About this first release " />
              </summary>
              <p>
                <span>Penny Pilot {appInfo.version} · </span>
                <Copy>{lessons.length}</Copy>
                <Copy en="editorial-preview lessons, " />
                <Copy> </Copy>
                {lessons.reduce((n, l) => n + l.exercises.length, 0)}
                <Copy en="exercises, " />
                <Copy>{glossary.length}</Copy>
                <Copy en="glossary entries, four calculators, and a 16-world topic library, eight insurance reading guides, and a lump-sum investment mode. Content needs expert financial and Hindi editorial review. Current tax and regulatory rules are intentionally excluded until verified. " />
              </p>
              <p>
                <Copy en="Animations respect your device’s reduced-motion preference. Lessons and fonts are bundled for offline use after the first full load. " />
              </p>
            </details>
          </section>
        </div>
      </div>
      {incoming && (
        <Modal label={ui("Restore progress")} onClose={() => setIncoming(null)}>
          <div className="restore-dialog">
            <span className="preview-icon">
              <Icon name="Upload" size={30} />
            </span>
            <h2>
              <Copy en="Bring your learning along. " />
            </h2>
            <p>
              <Copy en="This backup contains " />
              <Copy>{incoming.xp}</Copy>
              <Copy en="XP and " />
              <Copy> </Copy>
              <Copy>{Object.keys(incoming.completed).length}</Copy>
              <Copy en="completed lessons. Restoring replaces the progress on this device. " />
            </p>
            <p>
              <Copy en="Export your current progress first if you want to keep it. " />
            </p>
            <button
              className="button secondary full"
              onClick={() => void backup()}
            >
              <Copy en="Export current progress " />
            </button>
            <button
              className="button green full"
              onClick={() => {
                update(() => incoming);
                setIncoming(null);
                notify("Your learning is right where you left it.");
              }}
            >
              <Copy en="Restore this backup " />
              <Icon name="Check" size={18} />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
