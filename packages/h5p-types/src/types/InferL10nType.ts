import type { ReadonlyDeep } from "type-fest";
import type { H5PFieldGroup } from "./H5PField";

export type L10nGroup = ReadonlyDeep<H5PFieldGroup & { name: "l10n" }>;

type FieldNames<TField extends L10nGroup> = TField["fields"][number]["name"];

export type InferL10nType<
  TField extends ReadonlyDeep<H5PFieldGroup & { name: "l10n" }>,
> = {
  l10n: {
    [TKey in FieldNames<TField>]: string;
  };
};
