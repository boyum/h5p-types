/**
 * A simple and elegant class for creating thumbnails of images
 */
export declare class H5PThumbnail {
  constructor(source: string, width: number, height: number, alt: string);

  /**
   * @return HTML representation of thumbnail
   */
  toString(): string;
}
