type Dependency = {
  machineName: string;
  majorVersion: number;
  minorVersion: number;
};

export type Library = {
  /**
   * Textual library name
   *
   * @see https://h5p.org/library-definition#libtitle
   */
  title: string;

  /** @see https://h5p.org/library-definition#libmachinename */
  machineName: string;

  /** @see https://h5p.org/library-definition#libmajorversion */
  majorVersion: number;

  /** @see https://h5p.org/library-definition#libminorversion */
  minorVersion: number;

  /** @see https://h5p.org/library-definition#libpatchversion */
  patchVersion: number;

  /**
   * Whether or not this library is runnable. If it is
   * runnable the authoring tool will enable authors to
   * create new instances of content using this library.
   * Values are 0 for not runnable and 1 for runnable.
   *
   * @default 0
   *
   * @see https://h5p.org/library-definition#librunnable
   */
  runnable?: 0 | 1;

  /**
   * Specifies the required version of H5P Core API. If
   * not set, v1.0 is assumed, and the library must not
   * use any functionality added in newer versions of
   * H5P Core.
   *
   * @see https://h5p.org/library-definition#libcoreApi
   */
  coreApi?: {
    /** @default 1 */
    majorVersion: number;

    /** @default 0 */
    minorVersion: number;
  };

  /** @see https://h5p.org/library-definition#libauthor */
  author?: string;

  /** @see https://h5p.org/library-definition#liblicense */
  license?: string;

  /** @see https://h5p.org/library-definition#libdescription */
  description?: string;

  /** @see https://h5p.org/library-definition#libpreload */
  preloadedDependencies?: Dependency[];

  /** @see https://h5p.org/library-definition#libdynamic */
  ddynamicDependencies?: Dependency[];

  /** @see https://h5p.org/library-definition#libpreloadjs */
  preloadedJs?: { path: string }[];

  /** @see https://h5p.org/library-definition#libpreloadcss */
  preloadedCss?: { path: string }[];

  /**
   * List of possible ways to embed the package in the page
   *
   * @default ["div"]
   *
   * @see https://h5p.org/library-definition#libembedtypes
   */
  embedTypes?: ("div" | "iframe")[];

  /**
   * Enables the integrated full-screen button
   *
   * @default 0
   *
   * @see https://h5p.org/library-definition#fullscreen
   */
  fullscreen?: 0 | 1;

  /**
   * Disable metadata completely or just hide title field from content type's form.
   *
   * @see https://h5p.org/library-definition#metadata-settings
   */
  metadataSettings?: {
    /** @default 0 */
    disable: 0 | 1;

    /** @default 1 */
    disableExtraTitleField: 0 | 1;
  };
};
