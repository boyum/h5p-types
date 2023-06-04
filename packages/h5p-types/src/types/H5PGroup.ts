import type { H5PFieldGroup } from "./H5PField";
import type { IH5PFieldInstance } from "./Interfaces/IH5PFieldInstance";

export type H5PGroup<TParams = unknown> = IH5PFieldInstance<
  TParams,
  H5PFieldGroup
>;
