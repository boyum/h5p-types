import type { H5PFieldGroup } from "./H5PField";

export type H5PBehaviour =
  | Omit<H5PFieldGroup, "name"> & {
      name: "behaviour";
    };
