import { Media } from "./Media";

export type Image = Media & {
  alt?: string;
  height?: number;
  width?: number;
};
