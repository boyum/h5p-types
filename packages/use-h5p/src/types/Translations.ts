import type { TypeOptions } from "./TypeOptions";

export type TranslationKey = TypeOptions["translationKeys"];

export type Translations<TTranslationKey extends string = TranslationKey> =
  Record<TTranslationKey, string>;
