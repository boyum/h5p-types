/* eslint-disable @typescript-eslint/ban-types */

import type { Join, Split } from "type-fest";
import type { Prettify } from "../utility-types";

type StartsWith<
  TString extends string,
  TPrefix extends string,
> = TString extends `${TPrefix}${string}` ? true : false;

// TODO: Split by punctuation (".", ",", ";", ":") and line breaks as well
type SplitWords<TString extends string> = Split<TString, " ">;

export type TranslationHasParams<TTranslation extends string> =
  TTranslation extends `${string}:${string}` ? true : false;

export type TranslationParams<
  TTranslation extends string,
  TWords extends Array<string> = SplitWords<TTranslation>,
> = Prettify<
  TWords extends [infer TFirstWord, ...infer TRestWords]
    ? TFirstWord extends string
      ? StartsWith<TFirstWord, ":"> extends true
        ? TFirstWord extends ":"
          ? TRestWords extends []
            ? {}
            : TRestWords extends Array<string>
            ? TranslationParams<Join<TRestWords, " ">>
            : {}
          : Record<TFirstWord, string> &
              (TRestWords extends []
                ? {}
                : TRestWords extends Array<string>
                ? TranslationParams<Join<TRestWords, " ">>
                : {})
        : TRestWords extends []
        ? {}
        : TRestWords extends Array<string>
        ? TranslationParams<Join<TRestWords, " ">>
        : {}
      : {}
    : {}
>;
