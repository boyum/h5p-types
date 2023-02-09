import type { H5PCopyright } from "./H5PCopyright";

export type H5PMedia = {
  path: string;
  mime?: string;
  copyright?: H5PCopyright;
};
