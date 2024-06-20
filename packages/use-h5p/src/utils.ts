import type { TranslationKey } from "./types/Translations";

export const getFallbackString = (translationKey: TranslationKey): string =>
  `[Missing translation: ${translationKey}]`;
