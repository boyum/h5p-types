import type { H5PEditorObject, H5PField, H5PObject } from "h5p-types";
import type { H5PContentType } from "../models/H5PContentType";
import type { H5PResumableContentType } from "../models/H5PResumableContentType";
import type { H5PWidget } from "../models/H5PWidget";

declare global {
  interface Window {
    H5P: H5PObject;
    H5PEditor: H5PEditorObject;
  }
}

export const H5P = window.H5P ?? {};
export const H5PEditor = window.H5PEditor ?? {};

/**
 * Get absolute path to image from relative parameters path
 *
 * @param path Relative path as found in content parameters
 * @returns Absolute path to image
 */
export const getAbsoluteUrlFromRelativePath = (path: string): string => {
  return H5P.getPath(path, H5PEditor.contentId);
};

export const getImageUrl = (imagePath: string | undefined): string | null => {
  if (!imagePath) {
    return null;
  }

  const imagePathIsUrl =
    imagePath.startsWith("http://") || imagePath.startsWith("https://");

  const imageUrl = imagePathIsUrl
    ? imagePath
    : getAbsoluteUrlFromRelativePath(imagePath);

  return imageUrl;
};

export const registerContentType = <TParams = unknown, TState = unknown>(
  name: string,
  contentType:
    | typeof H5PContentType<TParams>
    | typeof H5PResumableContentType<TParams, TState>,
): void => {
  // biome-ignore lint/suspicious/noExplicitAny: The way to register an H5P content type is to add a new key to the global H5P object
  (H5P as any)[name] = contentType;
};

/**
 * @param h5pName The widget's logical name, usually in PascalCase
 * @param widgetName The name that's used when using the widget in semantics.json (e.g. `html`, `showWhen`)
 * @param widget The widget class implementation
 */
export const registerWidget = <
  TField extends H5PField = H5PField,
  TParams = unknown,
>(
  h5pName: string,
  widgetName: string,
  widget: typeof H5PWidget<TField, TParams>,
): void => {
  H5PEditor[h5pName] = widget;
  H5PEditor.widgets[widgetName] = widget;
};
