import type { Prettify, StrictOmit } from "../utility-types";
import type { H5PFieldGroup, H5PFieldText } from "./H5PField";

export type H5PL10n = Prettify<
  {
    name: "l10n";
    fields: Array<StrictOmit<H5PFieldText, "default"> & { default: string }>;
    common: boolean;
  } & StrictOmit<H5PFieldGroup, "name" | "fields" | "common">
>;
