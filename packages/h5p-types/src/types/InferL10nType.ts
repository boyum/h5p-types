import type { ReadonlyDeep } from "type-fest";
import type { H5PFieldGroup } from "./H5PField";

export type InferL10nType<
  TField extends ReadonlyDeep<H5PFieldGroup & { name: "l10n" }>,
  TFieldNames extends string = TField["fields"][number]["name"],
> = {
  l10n: {
    [TKey in TFieldNames]: string;
  };
};
