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
  | "\t"
  | "\n"
  | "\r\n";

type DefaultPrefix = ":";

export type TranslationHasParams<
  TTranslation extends string,
  TPrefix extends string = DefaultPrefix,
> = TTranslation extends `${string}${TPrefix}${string}` ? true : false;

type EmptyArray = never[];

type JoinWords<TWords extends Array<string>> = Join<TWords, " ">;

type TranslationParamListToString<
  TWords extends Array<string>,
  TPrefix extends string,
> = TranslationParams<JoinWords<TWords>, TPrefix>;

export type TranslationParams<
  TTranslation extends string,
  TPrefix extends string = DefaultPrefix,
  _TWords extends Array<string> = SplitWords<Replace<TTranslation, "\n", " ">>,
> = Prettify<
  _TWords extends [
    infer TFirstWord extends string,
    ...infer TRestWords extends Array<string>,
  ]
    ? StartsWith<TFirstWord, TPrefix> extends true
      ? TFirstWord extends TPrefix
        ? TRestWords extends EmptyArray
          ? {}
          : TranslationParamListToString<TRestWords, TPrefix>
        : Record<TrimEnd<TFirstWord, StopChars>, string> &
            (TRestWords extends EmptyArray
              ? {}
              : TranslationParamListToString<TRestWords, TPrefix>)
      : TRestWords extends EmptyArray
      ? {}
      : TranslationParamListToString<TRestWords, TPrefix>
    : {}
>;
