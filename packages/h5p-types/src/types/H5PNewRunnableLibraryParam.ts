import type { H5PContentId } from "./H5PContentId";
import type { H5PMetadata } from "./H5PMetadata";

export type H5PNewRunnableLibraryParam = {
  library: string;
  params: Record<string | number | symbol, unknown>;
  subContentId?: H5PContentId;
  userDatas?: { state?: unknown };
  metadata?: H5PMetadata;
};
