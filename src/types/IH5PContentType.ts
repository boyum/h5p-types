import { H5PExtras } from "./H5PExtras";

export interface IH5PContentType<Params extends {}> {
  new (params: Params, contentId: string, extras?: H5PExtras): void;
  attach($wrapper: JQuery<HTMLElement>): void;
}
