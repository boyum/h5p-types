import type { ReadonlyDeep } from "type-fest";
import type { H5PFieldGroup } from "./H5PField";
import { H5PFieldWithOptionalLabel } from "./InferParamsFromSemantics";

export type InferL10nType<
  TField extends ReadonlyDeep<
    | (Omit<H5PFieldGroup, "name"> & { name: "l10n" })
    | H5PFieldWithOptionalLabel<Omit<H5PFieldGroup, "name"> & { name: "l10n" }>
  >,
  TFieldNames extends string = TField["fields"][number]["name"],
> = {
  l10n: {
    [TKey in TFieldNames]: string;
  };
};
