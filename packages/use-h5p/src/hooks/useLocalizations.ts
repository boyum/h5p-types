import { useContext } from "react";
import { L10nContext } from "../contexts/LocalizationContext";
import { TranslationKey } from "../types/Translations";
import { getFallbackString } from "../utils";

/**
 * @param translationKeys A list of valid translation keys
 * @returns An object where the translation keys are keys and their translations are values
 *
 * @example
 * ```ts
 * export const Component = () => {
 *   const { title, body } = useL10ns("title", "body");
 *
 *   return <>
 *     <h1>{title}</h1>
 *     <p>{body}</p>
 *   <>;
 * }
 * ```
 */
export const useLocalizations = <
  TTranslationKey extends TranslationKey = TranslationKey,
>(
  ...translationKeys: Array<TTranslationKey>
): Record<TTranslationKey, string> => {
  const translations = useContext(L10nContext);

  return Object.fromEntries(
    translationKeys.map((key) => [
      key,
      translations[key] ?? getFallbackString(key),
    ]),
  ) as Record<TTranslationKey, string>;
};
export const useL10ns = useLocalizations;
