import type { TranslationParams } from "h5p-types";
import { useContext } from "react";
import { L10nContext } from "../contexts/LocalizationContext";
import type { TranslationKey, Translations } from "../types/Translations";
import { getFallbackString } from "../utils";

export const useTranslation = <
  TTranslationKey extends TranslationKey = TranslationKey,
>() => {
  type TOpts = TranslationParams<Translations[TTranslationKey]>;

  const translations = useContext(L10nContext);

  return {
    t: (translationKey: TTranslationKey): string => {
      const translation =
        translations?.[translationKey] ?? getFallbackString(translationKey);

      return translation;
    },
    tOpts: (translationKey: TTranslationKey, opts: TOpts): string => {
      const translation =
        translations?.[translationKey] ?? getFallbackString(translationKey);

      const options: Array<[string, string]> = Object.entries(opts);

      return options.reduce(
        (acc, [key, value]) => acc.replaceAll(key, value),
        translation,
      );
    },
  };
};
