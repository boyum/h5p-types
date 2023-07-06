import type { TranslationParams } from "h5p-types";
import { useContext } from "react";
import { L10nContext } from "../contexts/LocalizationContext";
import { TranslationKey } from "../types/Translations";
import { getFallbackString } from "../utils";

export const useTranslation = <
  TTranslationKey extends TranslationKey = TranslationKey,
>() => {
  const translations = useContext(L10nContext);

  type Translations = typeof translations;

  return {
    t: (translationKey: TTranslationKey): string => {
      const translation =
        translations?.[translationKey] ?? getFallbackString(translationKey);

      return translation;
    },
    tOpts: (
      translationKey: TTranslationKey,
      opts: TranslationParams<Translations[TTranslationKey]>,
    ): string => {
      const translation =
        translations?.[translationKey] ?? getFallbackString(translationKey);

      const options: Array<[string, string]> = Object.entries(opts);

      return options.reduce((acc, [key, value]) => {
        const regex = new RegExp(key, "g");

        return acc.replace(regex, value);
      }, translation);
    },
  };
};
