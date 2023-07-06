import { useContext } from "react";
import { L10nContext } from "../contexts/LocalizationContext";
import { TranslationKey } from "../types/Translations";
import { getFallbackString } from "../utils";

/**
 * @deprecated Use `useTranslation` instead
 */
export const useLocalization = <
  TTranslationKey extends TranslationKey = TranslationKey,
>(
  translationKey: TTranslationKey,
): string => {
  const translations = useContext(L10nContext);

  return translations?.[translationKey] ?? getFallbackString(translationKey);
};

/**
 * @deprecated Use `useTranslation` instead
 */
export const useL10n = useLocalization;
