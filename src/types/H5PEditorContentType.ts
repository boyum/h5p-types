import type { Library } from "./H5PLibrary";

export declare class H5PEditorContentType {
  constructor(nameVersionString: `${string} ${number}.${number}`);

  static getPossibleUpgrade<T extends H5PEditorContentType | Library>(
    library: H5PEditorContentType,
    libraries: T,
  ): T | undefined;

  static isHigherVersion(
    libraryA: H5PEditorContentType | Library,
    libraryB: H5PEditorContentType | Library,
  ): boolean;

  static hasSameName(
    libraryA: H5PEditorContentType | Library,
    libraryB: H5PEditorContentType | Library,
  ): boolean;

  static getNameVersionString(
    library: H5PEditorContentType | Library,
  ): `${string} ${number}.${number}`;

  static getMajorVersion(library: H5PEditorContentType | Library): number;

  static getMinorVersion(library: H5PEditorContentType | Library): number;

  static getName(library: H5PEditorContentType | Library): string;
}
