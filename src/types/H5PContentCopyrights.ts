import type { H5PMediaCopyright } from "./H5PMediaCopyright";

export declare class H5PContentCopyrights {
  /**
   * Set label
   *
   * @param newLabel
   */
  setLabel(newLabel: string): void;

  /**
   * Add sub content
   *
   * @param media
   */
  addMedia(media: H5PMediaCopyright): void;

  /**
   * Add sub content in front
   *
   * @param newMedia
   */
  addMediaInFront(newMedia: H5PMediaCopyright): void;

  /**
   * Add sub content
   *
   * @param newContent
   */
  addContent(newContent: H5PContentCopyrights): void;

  /**
   * Print content copyright
   *
   * @returns HTML
   */
  toString(): string;
}
