import type { H5PExtras, IH5PContentType } from "h5p-types";
import { H5P } from "../utils/H5P.utils.js";

export abstract class H5PContentType<
    TParams extends Record<string, unknown> | unknown = unknown,
  >
  extends H5P.EventDispatcher
  implements IH5PContentType
{
  protected wrapper: HTMLElement;

  constructor(
    public params: TParams,
    protected contentId: string,
    protected extras?: H5PExtras,
  ) {
    super();
    this.wrapper = document.createElement("div");
  }

  public abstract attach($wrapper: JQuery<HTMLElement>): void;
}
