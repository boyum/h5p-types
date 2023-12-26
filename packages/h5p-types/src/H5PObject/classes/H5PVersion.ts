type VersionObject = {
  localMajorVersion?: number | string;
  localMinorVersion?: number | string;
  majorVersion: number | string;
  minorVersion: number | string;
};

export declare class H5PVersion<
  TVersionType extends string | VersionObject = string,
> {
  constructor(version: TVersionType);

  major: number;
  minor: number;

  /**
   * Returns the version as either a string or a version object,
   * depending on the type of the version the instance was constructed
   * with.
   */
  toString(): TVersionType;
}
