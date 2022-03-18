import { H5PObject, H5PEditorObject } from "../../H5P";

export const H5P: H5PObject = (window as any).H5P ?? {};
export const H5PEditor: H5PEditorObject = (window as any).H5PEditor ?? {};

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

  const imagePathIsAbsolute =
    imagePath.startsWith("http://") || imagePath.startsWith("https://");

  const imageUrl = imagePathIsAbsolute
    ? imagePath
    : getAbsoluteUrlFromRelativePath(imagePath);

  return imageUrl;
};
