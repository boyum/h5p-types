import type { EventDispatcher } from "./EventDispatcher";

export interface IH5PContentType extends EventDispatcher {
  attach($wrapper: JQuery<HTMLElement>): void;
}
