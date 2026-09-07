import type { H5PExtras, IH5PContentType } from "h5p-types";
import { installH5PMocks } from "../mock/h5pGlobals.js";
import { createJQueryLike } from "./dom.js";

export type ContentTypeConstructor<
  TParams,
  TInstance extends IH5PContentType,
> = new (params: TParams, contentId: string, extras?: H5PExtras) => TInstance;

export type RenderedContentType<TInstance extends IH5PContentType> = {
  container: HTMLElement;
  instance: TInstance;
  destroy: () => void;
};

export type RenderContentTypeOptions<TParams> = {
  params: TParams;
  contentId?: string;
  extras?: H5PExtras;
};

/**
 * Instantiates an H5P content type, attaches it to a fresh container element
 * and returns the container, the instance and a `destroy` function.
 *
 * The returned container is *not* mounted into the DOM automatically. Use the
 * `container` element in your render function/story, e.g. `render: (args) =>
 * renderContentType(...).container`.
 */
export function renderContentType<TParams, TInstance extends IH5PContentType>(
  ContentType: ContentTypeConstructor<TParams, TInstance>,
  options: RenderContentTypeOptions<TParams>,
): RenderedContentType<TInstance> {
  installH5PMocks();

  const { params, contentId = "1", extras } = options;
  const container = document.createElement("div");
  const instance = new ContentType(params, contentId, extras);
  instance.attach(createJQueryLike(container));

  const destroy = (): void => {
    if ("destroy" in instance && typeof instance.destroy === "function") {
      instance.destroy();
      return;
    }

    container.remove();
  };

  return { container, instance, destroy };
}
