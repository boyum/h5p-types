import type { EventDispatcher } from "../../types/EventDispatcher";

export declare class H5PContentType extends EventDispatcher {
  /**
   * Is the library standalone or not? Not being standalone,
   * means it is included in another library
   */
  isRoot(): boolean;

  /**
   * Returns the file path of a file in the current library
   *
   * @param filePath The path to the file relative to the library folder
   * @return The full path to the file
   */
  getLibraryFilePath(filePath: string): string;
}
