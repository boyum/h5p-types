import { H5PFieldGroup, H5PFieldText } from "./H5PField";

export type H5PL10n =
  | H5PFieldGroup
  | {
      name: "l10n";
      fields: Array<H5PFieldText | { default: string }>;
      common: boolean;
    };
