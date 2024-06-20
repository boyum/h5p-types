import type { InferParamsFromSemantics } from "h5p-types";
import semantics from "../../semantics.json";

export type Params = InferParamsFromSemantics<typeof semantics>;
export type TranslationKey = keyof Params["l10n"];

// Use the semantics object in JS space to force `unplugin-json-dts`
// to generate the `semantics.json.d.ts` file.
semantics;
