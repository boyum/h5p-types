import type { H5PMedia } from "./H5PMedia";

export type H5PImage = H5PMedia & {
  alt?: string;
  height?: number;
  width?: number;
};
