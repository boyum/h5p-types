import type { ReadonlyDeep } from "type-fest";
import type { H5PFieldGroup } from "./H5PField";

type H5PFieldGroupWithoutLabel = Omit<H5PFieldGroup, "label">;
type L10nGroup = ReadonlyDeep<H5PFieldGroupWithoutLabel & { name: "l10n" }>;
export type L10nGroupWithoutLabel = Omit<L10nGroup, "label">;

type FieldNames<TField extends L10nGroupWithoutLabel> =
  TField["fields"][number]["name"];

export type InferL10nType<
  TField extends ReadonlyDeep<H5PFieldGroupWithoutLabel & { name: "l10n" }>,
> = {
  l10n: {
    [TKey in FieldNames<TField>]: string;
  };
};
