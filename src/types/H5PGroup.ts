import type { EventDispatcher } from "./EventDispatcher";
import type { H5PForm } from "./H5PForm";

export type H5PGroup = EventDispatcher & {
  parent: H5PForm;
};
