import { en } from "./en.js";
import { nb } from "./nb.js";

export type Language = "en" | "nb";

export const wordLists: Record<Language, Array<string>> = {
  en,
  nb,
};

export function getWords(language: Language): Array<string> {
  return wordLists[language];
}

export const wordListSizes: Record<Language, number> = {
  en: wordLists.en.length,
  nb: wordLists.nb.length,
};
