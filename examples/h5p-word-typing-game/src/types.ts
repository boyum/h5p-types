import type { InferParamsFromSemantics } from "h5p-types";
import semantics from "../semantics.json";

export type Params = InferParamsFromSemantics<typeof semantics>;

export type TranslationKey = keyof Params["l10n"];

export type ActiveWordSerializable = {
  text: string;
  typed: string;
  x: number;
  y: number;
};

export type State = {
  score: number;
  missed: number;
  difficulty: number;
  bestScore: number;
  isRunning: boolean;
  words: Array<ActiveWordSerializable>;
};

export type ParamsBehaviour = Params["behaviour"];
export type ParamsWords = Params["words"];
export type ParamsL10n = Params["l10n"];

semantics;
