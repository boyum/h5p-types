import type { H5PFieldGroup, H5PFieldText } from "./H5PField";

export type H5PL10n =
  | Omit<H5PFieldGroup, "name" | "fields" | "common"> & {
      name: "l10n";
      fields: Array<Omit<H5PFieldText, "default"> & { default: string }>;
      common: boolean;
    };
