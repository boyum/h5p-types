import { useContext } from "react";
import { L10nContext } from "../contexts/LocalizationContext";
import { getFallbackString } from "../utils";
import { TranslationKey } from "../types/Translations";

export const useLocalization = <
  TTranslationKey extends TranslationKey = TranslationKey,
>(
  translationKey: TTranslationKey,
): string => {
  const translations = useContext(L10nContext);

  return translations?.[translationKey] ?? getFallbackString(translationKey);
};

export const useL10n = useLocalization;
