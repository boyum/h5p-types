import { EventDispatcher } from "../../../H5P";
import { H5PForm } from "./H5PForm";

export type H5PGroup = EventDispatcher & {
  parent: H5PForm;
};
