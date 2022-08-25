import type { H5PMetadata } from "./H5PMetadata";

export type H5PNewRunnableLibraryParam = {
  library: string;
  params: Record<string | number | symbol, unknown>;
  subContentId?: string;
  userDatas?: { state?: unknown };
  metadata?: H5PMetadata;
};
