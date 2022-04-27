export type H5PIntegrationObject = {
  baseUrl: string;
  url: string;
  postUserStatistics: boolean;
  ajax: {
    setFinished: string;
    contentUserData: string;
  };
  saveFreq: false | number;

  /** True if `Enable LRS dependent content types` is set to true, else false */
  reportingIsEnabled: boolean;

  l10n: {
    H5P: Record<string, string>;
  };
  hubIsEnabled: boolean;
  crossorigin: unknown;
  crossoriginCacheBuster: unknown;
  libraryConfig: unknown;
  pluginCacheBuster: string;
  libraryUrl: string;
  user: {
    name: string;
    mail: string;
  };
  contents: Record<string, unknown>;
  core: {
    scripts: Array<string>;
    styles: Array<string>;
  };
};
