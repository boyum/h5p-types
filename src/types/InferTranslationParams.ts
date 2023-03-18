/* eslint-disable @typescript-eslint/ban-types */

import type { Join, Split } from "type-fest";
import type { Prettify } from "../utility-types";

type StartsWith<
  TString extends string,
  TPrefix extends string,
> = TString extends `${TPrefix}${string}` ? true : false;

type SplitWords<TString extends string> = Split<TString, " ">;

type Replace<
  TString extends string,
  TSearch extends string,
  TReplace extends string,
> = Join<Split<TString, TSearch>, TReplace>;

type TrimEnd<
  TString extends string,
  TChar extends string,
> = TString extends `${infer THead}${TChar}`
  ? THead extends `${THead}${TChar}`
    ? TrimEnd<THead, TChar>
    : THead
  : TString;

type StopChars =
  | "."
  | ","
  | ":"
  | ";"
  | "<"
  | ">"
  | "("
  | ")"
  | "["
  | "]"
  | "{"
  | "}"
  | "!"
  | "?"
  | "-"
  | '"'
  | "'"
  | "@"
  | "^"
  | "¨"
  | "*"
  | "–"
  | "—"
  | "#"
  | "$"
  | "%"
  | "`"
  | "´"
  | "+"
  | "="
  | "\n"
  | "\r\n";

export type TranslationHasParams<TTranslation extends string> =
  TTranslation extends `${string}:${string}` ? true : false;

export type TranslationParams<
  TTranslation extends string,
  TWords extends Array<string> = SplitWords<Replace<TTranslation, "\n", " ">>,
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
          : Record<TrimEnd<TFirstWord, StopChars>, string> &
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
