import type { EventDispatcher } from "./EventDispatcher";
import type { H5PField } from "./H5PField";
import type { H5PGroup } from "./H5PGroup";

export type H5PMetadataForm = EventDispatcher & {
  passReadies: boolean;
  appendTo($wrapper: JQuery<HTMLElement>): void;
  appendButtonTo($wrapper: JQuery<HTMLElement>): void;
  children: Array<H5PGroup>;
  getExtraTitleField: () => H5PField;
  ready: (callback: () => void) => void;
};
