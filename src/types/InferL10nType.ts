import type { DeepReadonly } from "../utility-types";
import type { H5PFieldGroup } from "./H5PField";

export type InferL10nType<
  TField extends DeepReadonly<H5PFieldGroup & { name: "l10n" }>,
> = {
  l10n: {
    [TKey in TField["fields"][number]["name"]]: string;
  };
};
