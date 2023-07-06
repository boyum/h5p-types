import { InferParamsFromSemantics, ReadonlyDeep } from "h5p-types";
import semantics from "../../semantics.json";

export type Params = InferParamsFromSemantics<ReadonlyDeep<typeof semantics>>;
export type TranslationKey = keyof Params["l10n"];
