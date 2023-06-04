import type { EventDispatcher } from "../EventDispatcher";

export interface IH5PContentType<TParams = unknown> extends EventDispatcher {
  attach($wrapper: JQuery<HTMLElement>): void;

  params?: TParams;
}
