import type { H5PContentId } from "./H5PContentId";
import type { H5PMetadata } from "./H5PMetadata";

export type H5PExtras = {
  metadata: H5PMetadata;
  standalone: boolean;
  subContentId?: H5PContentId;
};
