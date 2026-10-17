import { lessons } from "../src/content/lessons";
import { glossary } from "../src/content/glossary";
import curriculum from "../src/content/curriculum.json";
import type { Text } from "../src/content/lessons";
const errors: string[] = [];
const ids = new Set<string>();
function text(value: Text, path: string) {
  for (const lang of ["en", "hi", "hinglish"] as const)
    if (!value?.[lang]?.trim()) errors.push(`${path}: missing ${lang}`);
  if (!/[\u0900-\u097f]/u.test(value.hi))
    errors.push(`${path}: Hindi must include Devanagari`);
  for (const [lang, valueText] of Object.entries(value)) {
    if (/sure shot|buy this|best stock/i.test(valueText))
      errors.push(`${path}.${lang}: prohibited promotional language`);
    if (/\{\{rule:/.test(valueText))
      errors.push(`${path}: unresolved rule reference`);
  }
}
for (const l of lessons) {
  if (ids.has(l.id)) errors.push(`Duplicate lesson ${l.id}`);
  ids.add(l.id);
  for (const k of [
    "title",
    "subtitle",
    "hook",
    "idea",
    "example",
    "mistake",
    "action",
  ] as const)
    text(l[k], `${l.id}.${k}`);
  l.notes.forEach((n, i) => text(n, `${l.id}.notes.${i}`));
  if (l.exercises.length < 8 || l.exercises.length > 12)
    errors.push(`${l.id}: expected 8–12 exercises`);
  if (l.notes.length < 3) errors.push(`${l.id}: expected 3+ notes`);
  if (!l.sources.length || l.sources.some((s) => !s.startsWith("https://")))
    errors.push(`${l.id}: sources missing or unsafe`);
  for (const q of l.exercises) {
    if (ids.has(q.id)) errors.push(`Duplicate question ${q.id}`);
    ids.add(q.id);
    text(q.prompt, q.id);
    text(q.explanation, q.id);
    q.options?.forEach((o, i) => text(o, `${q.id}.option${i}`));
    if (
      (q.type === "choice" || q.type === "document") &&
      (!Number.isInteger(q.answer) ||
        !q.options ||
        Number(q.answer) < 0 ||
        Number(q.answer) >= q.options.length)
    )
      errors.push(`${q.id}: invalid choice`);
    if (
      q.type === "order" &&
      (!Array.isArray(q.answer) ||
        q.answer.length !== q.options?.length ||
        new Set(q.answer).size !== q.options?.length ||
        q.answer.some((a) => a < 0 || a >= q.options!.length))
    )
      errors.push(`${q.id}: invalid order`);
    if (q.type === "document") text(q.documentTitle!, `${q.id}.documentTitle`);
    if (q.type === "bucket") {
      if (
        !q.options?.length ||
        !q.categories ||
        q.categories.length < 2 ||
        !Array.isArray(q.answer) ||
        q.answer.length !== q.options.length ||
        q.answer.some(
          (n) => !Number.isInteger(n) || n < 0 || n >= q.categories!.length,
        )
      )
        errors.push(`${q.id}: invalid bucket mapping`);
      q.categories?.forEach((category, i) =>
        text(category, `${q.id}.category${i}`),
      );
    }
    if (q.type === "numeric" && (!Number.isFinite(q.answer) || !q.calculation))
      errors.push(`${q.id}: numeric answer needs independent calculation`);
    if (q.calculation) {
      const { operation, values: v } = q.calculation;
      const recomputed =
        operation === "min"
          ? Math.min(...v)
          : operation === "multiply"
            ? v.reduce((a, b) => a * b, 1)
            : operation === "subtract"
              ? v.slice(1).reduce((a, b) => a - b, v[0])
              : v[0] * (1 + v[1]) ** v[2];
      if (Math.abs(recomputed - Number(q.answer)) > 0.01)
        errors.push(`${q.id}: expected ${recomputed}, got ${q.answer}`);
    }
  }
}
if (curriculum.length !== 16) errors.push("Expected 16 curriculum worlds");
const skills = new Set(
  curriculum.flatMap((w) => w.units.flatMap((u) => u.skills.map((s) => s.id))),
);
for (const l of lessons)
  if (!skills.has(l.skill)) errors.push(`Unknown skill ${l.skill}`);
for (const g of glossary)
  if (g.length !== 4 || g.some((x) => !x.trim()))
    errors.push(`Incomplete glossary ${g[0]}`);
if (errors.length) throw Error(errors.join("\n"));
console.log(
  `Validated ${lessons.length} lessons, ${lessons.reduce((n, l) => n + l.exercises.length, 0)} questions, ${glossary.length} glossary entries, and ${curriculum.length} world outlines.`,
);
console.log(
  "Editorial checks remain manual: factual accuracy, native-language tone, reading level, and expert review.",
);
