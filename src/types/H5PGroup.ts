import { EventDispatcher } from "./EventDispatcher";
import { H5PForm } from "./H5PForm";

export type H5PGroup = EventDispatcher & {
  parent: H5PForm;
};
