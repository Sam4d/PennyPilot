import { Capacitor } from "@capacitor/core";
import Dexie, { type Table } from "dexie";
import type { Language } from "../content/lessons";
import { freshProtection } from "./learning";
import type { StreakProtection, ReviewItem } from "./learning";
export type Session = {
  lessonId: string;
  stage: number;
  question: number;
  answers: Record<string, { answer: number | number[]; correct: boolean }>;
  review?: boolean;
  quickStart?: boolean;
  questionIds?: string[];
};
export type Progress = {
  version: 1;
  onboarded?: boolean;
  lastBackupAt?: string | null;
  protection?: StreakProtection;
  reports?: Record<string, string>;
  name: string;
  language: Language;
  theme: "light" | "dark";
  goal: number;
  xp: number;
  days: Record<string, number>;
  completed: Record<
    string,
    { score: number; total: number; date: string; attempts: number }
  >;
  reviews: Record<string, ReviewItem>;
  notes: Record<string, string>;
  saved: string[];
  session: Session | null;
  sound: boolean;
  scale: number;
};
export const freshProgress = (): Progress => ({
  version: 1,
  onboarded: false,
  lastBackupAt: null,
  protection: freshProtection(),
  reports: {},
  name: "",
  language: "hi",
  theme: "light",
  goal: 50,
  xp: 0,
  days: {},
  completed: {},
  reviews: {},
  notes: {},
  saved: [],
  session: null,
  sound: false,
  scale: 1,
});
class ProgressDB extends Dexie {
  state!: Table<{ id: string; value: Progress }>;
  constructor() {
    super("penny-pilot");
    this.version(1).stores({ state: "id" });
  }
}
const db = new ProgressDB();
let nativeDatabase:
  Promise<import("@capacitor-community/sqlite").SQLiteDBConnection> | undefined;
async function nativeStore() {
  nativeDatabase ??= (async () => {
    const { CapacitorSQLite, SQLiteConnection } =
      await import("@capacitor-community/sqlite");
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    const connection = await sqlite.createConnection(
      "penny_pilot",
      false,
      "no-encryption",
      1,
      false,
    );
    await connection.open();
    await connection.execute(
      "CREATE TABLE IF NOT EXISTS progress (id TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);",
    );
    return connection;
  })();
  return nativeDatabase;
}
let pending = Promise.resolve();
let writing = false;
let latest: Progress | null = null;
export async function loadProgress() {
  if (Capacitor.isNativePlatform()) {
    const native = await nativeStore();
    const result = await native.query(
      "SELECT value FROM progress WHERE id = ?;",
      ["progress"],
    );
    return result.values?.length
      ? validateBackup(JSON.parse(result.values[0].value))
      : freshProgress();
  }
  const row = await db.state.get("progress");
  return row ? validateBackup(row.value) : freshProgress();
}
export function saveProgress(value: Progress) {
  // Keep at most one in-flight write and one latest snapshot. Rapid typing
  // must not leave dozens of obsolete snapshots queued behind the user's text.
  latest = value;
  if (!writing) {
    writing = true;
    pending = (async () => {
      while (latest) {
        const snapshot: Progress = latest;
        latest = null;
        if (Capacitor.isNativePlatform()) {
          const native = await nativeStore();
          await native.run(
            "INSERT OR REPLACE INTO progress (id,value) VALUES (?,?);",
            ["progress", JSON.stringify(snapshot)],
          );
        } else await db.state.put({ id: "progress", value: snapshot });
      }
    })().finally(() => {
      writing = false;
    });
  }
  return pending;
}
export function flushProgress() {
  return pending;
}
export function validateBackup(value: unknown): Progress {
  if (!value || typeof value !== "object")
    throw Error("This is not a Penny Pilot backup.");
  const p = value as Progress;
  if (
    p.version !== 1 ||
    !["en", "hi", "hinglish", "both"].includes(p.language) ||
    !["light", "dark"].includes(p.theme) ||
    !Number.isFinite(p.xp) ||
    p.xp < 0 ||
    ![25, 50, 75].includes(p.goal) ||
    typeof p.name !== "string" ||
    p.name.length > 80 ||
    !p.days ||
    !p.completed ||
    !p.reviews ||
    !p.notes ||
    !Array.isArray(p.saved)
  )
    throw Error("The backup format is invalid or unsupported.");
  const record = (x: unknown): x is Record<string, unknown> =>
    !!x && typeof x === "object" && !Array.isArray(x);
  if (
    ![p.days, p.completed, p.reviews, p.notes].every(record) ||
    Object.entries(p.days).some(
      ([k, v]) =>
        !/^\d{4}-\d{2}-\d{2}$/.test(k) || !Number.isFinite(v) || v < 0,
    ) ||
    Object.values(p.notes).some(
      (n) => typeof n !== "string" || n.length > 10000,
    ) ||
    p.saved.some((s) => typeof s !== "string") ||
    Object.values(p.completed).some(
      (r) =>
        !r ||
        !Number.isInteger(r.score) ||
        !Number.isInteger(r.total) ||
        r.total <= 0 ||
        r.score < 0 ||
        r.score > r.total ||
        typeof r.date !== "string" ||
        !Number.isInteger(r.attempts),
    ) ||
    Object.values(p.reviews).some(
      (r) =>
        !r ||
        typeof r.questionId !== "string" ||
        typeof r.lessonId !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(r.due) ||
        !Number.isFinite(r.ease) ||
        !Number.isFinite(r.interval) ||
        !Number.isFinite(r.wrong) ||
        !Number.isInteger(r.repetitions),
    )
  )
    throw Error("The backup contains invalid progress.");
  if (p.session) {
    const s = p.session;
    if (
      !s ||
      typeof s.lessonId !== "string" ||
      !Number.isInteger(s.stage) ||
      s.stage < 0 ||
      s.stage > 3 ||
      !Number.isInteger(s.question) ||
      s.question < 0 ||
      s.question > 100 ||
      !record(s.answers) ||
      Object.values(s.answers).some(
        (a) =>
          !a ||
          typeof a.correct !== "boolean" ||
          !(
            (typeof a.answer === "number" && Number.isFinite(a.answer)) ||
            (Array.isArray(a.answer) && a.answer.every(Number.isInteger))
          ),
      ) ||
      (s.questionIds && !s.questionIds.every((q) => typeof q === "string"))
    )
      throw Error("The saved lesson is invalid.");
  }
  if (
    (p.onboarded !== undefined && typeof p.onboarded !== "boolean") ||
    (p.lastBackupAt != null &&
      (typeof p.lastBackupAt !== "string" ||
        !Number.isFinite(Date.parse(p.lastBackupAt)))) ||
    (p.reports !== undefined &&
      (!record(p.reports) ||
        Object.values(p.reports).some(
          (n) => typeof n !== "string" || n.length > 10000,
        ))) ||
    (p.protection !== undefined &&
      (!Number.isInteger(p.protection.credits) ||
        p.protection.credits < 0 ||
        p.protection.credits > 2 ||
        !Array.isArray(p.protection.used) ||
        !Array.isArray(p.protection.earned) ||
        p.protection.used.some(
          (d) => typeof d !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(d),
        ) ||
        p.protection.earned.some((id) => typeof id !== "string")))
  )
    throw Error("Invalid local preferences or streak protection.");
  return {
    ...freshProgress(),
    ...p,
    onboarded: p.onboarded ?? true,
    scale:
      typeof p.scale === "number" && p.scale >= 1 && p.scale <= 2 ? p.scale : 1,
  };
}
export async function exportBackup(p: Progress) {
  const timestamp = new Date().toISOString();
  const snapshot = { ...p, lastBackupAt: timestamp };
  if (Capacitor.isNativePlatform()) {
    const [{ Filesystem, Directory, Encoding }, { Share }] = await Promise.all([
      import("@capacitor/filesystem"),
      import("@capacitor/share"),
    ]);
    const file = await Filesystem.writeFile({
      path: `penny-pilot-backup-${Date.now()}.json`,
      data: JSON.stringify(snapshot, null, 2),
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
    });
    await Share.share({
      title: "Penny Pilot progress backup",
      files: [file.uri],
      dialogTitle: "Keep your learning safe",
    });
    return timestamp;
  }
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `penny-pilot-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return timestamp;
}
