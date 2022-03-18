import { H5PFieldGroup } from "./H5PField";

export type H5PBehaviour =
  | H5PFieldGroup
  | {
      name: "behaviour";
    };
