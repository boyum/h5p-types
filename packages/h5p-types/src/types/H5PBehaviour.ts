import type { Prettify, StrictOmit } from "../utility-types";
import type { H5PFieldGroup } from "./H5PField";

export type H5PBehaviour = Prettify<
  {
    name: "behaviour";
  } & StrictOmit<H5PFieldGroup, "name">
>;
