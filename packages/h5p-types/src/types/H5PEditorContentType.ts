import type { H5PLibrary } from "./H5PLibrary";

export declare class H5PEditorContentType {
  constructor(nameVersionString: `${string} ${number}.${number}`);

  static getPossibleUpgrade<T extends H5PEditorContentType | H5PLibrary>(
    library: H5PEditorContentType,
    libraries: T,
  ): T | undefined;

  static isHigherVersion(
    libraryA: H5PEditorContentType | H5PLibrary,
    libraryB: H5PEditorContentType | H5PLibrary,
  ): boolean;

  static hasSameName(
    libraryA: H5PEditorContentType | H5PLibrary,
    libraryB: H5PEditorContentType | H5PLibrary,
  ): boolean;

  static getNameVersionString(
    library: H5PEditorContentType | H5PLibrary,
  ): `${string} ${number}.${number}`;

  static getMajorVersion(library: H5PEditorContentType | H5PLibrary): number;

  static getMinorVersion(library: H5PEditorContentType | H5PLibrary): number;

  static getName(library: H5PEditorContentType | H5PLibrary): string;
}
