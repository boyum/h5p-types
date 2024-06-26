/**
 * Copied from i18next (https://github.com/i18next/i18next/blob/7e752ae8450cc147eaaaec26b9146226f79b7c3e/index.d.ts)
 */
type $MergeBy<T, K> = Omit<T, keyof K> & K;

// biome-ignore lint/suspicious/noEmptyInterface: `CustomTypeOptions` is to be extended by the consumer, and should be empty
export interface CustomTypeOptions {}

export type TypeOptions = $MergeBy<
  {
    translationKeys: string;
  },
  CustomTypeOptions
>;
