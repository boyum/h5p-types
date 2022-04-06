// import { H5PExtras } from "./H5PExtras";

export interface IH5PContentType {
  // export interface IH5PContentType<Params> {
  // new (params: Params, contentId: string, extras?: H5PExtras): void;
  attach($wrapper: JQuery<HTMLElement>): void;
}
