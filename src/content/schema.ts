export type Language = "en" | "hi" | "hinglish" | "both";
export type Text = { en: string; hi: string; hinglish: string };
export const t = (en: string, hi: string, hinglish: string): Text => ({
  en,
  hi,
  hinglish,
});
export const read = (text: Text, language: Language) =>
  text[language === "both" ? "en" : language];
export type Exercise = {
  id: string;
  type: "choice" | "numeric" | "order" | "document" | "bucket";
  prompt: Text;
  options?: Text[];
  categories?: Text[];
  documentTitle?: Text;
  answer: number | number[];
  explanation: Text;
  calculation?: {
    operation: "subtract" | "multiply" | "compound";
    values: number[];
  };
};
export type Lesson = {
  id: string;
  skill: string;
  title: Text;
  subtitle: Text;
  minutes: number;
  icon: string;
  hook: Text;
  idea: Text;
  example: Text;
  mistake: Text;
  notes: Text[];
  action: Text;
  exercises: Exercise[];
  sources: string[];
  reviewStatus: "editorial-draft";
};
export const choice = (
  id: string,
  prompt: Text,
  options: Text[],
  answer: number,
  explanation: Text,
): Exercise => ({ id, type: "choice", prompt, options, answer, explanation });
export const numeric = (
  id: string,
  prompt: Text,
  answer: number,
  explanation: Text,
  calculation?: Exercise["calculation"],
): Exercise => ({
  id,
  type: "numeric",
  prompt,
  answer,
  explanation,
  calculation,
});
export const order = (
  id: string,
  prompt: Text,
  options: Text[],
  answer: number[],
  explanation: Text,
): Exercise => ({ id, type: "order", prompt, options, answer, explanation });

export const document = (
  id: string,
  prompt: Text,
  title: Text,
  rows: Text[],
  answer: number,
  explanation: Text,
): Exercise => ({
  id,
  type: "document",
  prompt,
  documentTitle: title,
  options: rows,
  answer,
  explanation,
});
export const bucket = (
  id: string,
  prompt: Text,
  items: Text[],
  categories: Text[],
  answer: number[],
  explanation: Text,
): Exercise => ({
  id,
  type: "bucket",
  prompt,
  options: items,
  categories,
  answer,
  explanation,
});
