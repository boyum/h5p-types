import type { H5PThumbnail } from "./H5PThumbnail";

export declare class H5PMediaCopyright {
  constructor(
    copyright: Record<string, string> & {
      license: string;
      version?: string;
    },
    labels?: Record<string, string>,
    order?: Array<string>,
    extraFields?: Record<string, string>
  );

  setThumbnail(newThumbnail: H5PThumbnail): void;

  /**
   * Checks if this copyright is undisclosed.
   * I.e. only has the license attribute set, and it's undisclosed.
   */
  undisclosed(): boolean;

  /**
   * @return HTML representation of Copyright
   */
  toString(): string;
}
