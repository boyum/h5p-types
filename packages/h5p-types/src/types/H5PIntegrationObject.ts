import type { H5PContentId } from "./H5PContentId";
import type { H5PDisplayOptions } from "./H5PDisplayOptions";
import type { H5PMetadata } from "./H5PMetadata";

export type H5PIntegrationObject = {
  baseUrl: string;
  url: string;
  urlLibraries?: string;
  siteUrl?: string;

  postUserStatistics: boolean;

  ajax: {
    setFinished: string;
    contentUserData: string;
  };

  saveFreq: false | number;

  /** True if `Enable LRS dependent content types` is set to true, else false */
  reportingIsEnabled: boolean;

  l10n: Record<string, Record<string, string>>;

  hubIsEnabled: boolean;

  crossorigin: unknown;
  crossoriginRegex?: unknown;
  crossoriginCacheBuster: unknown;

  libraryConfig: unknown;
  libraryDirectories?: Record<string, unknown>;

  pluginCacheBuster: string;
  libraryUrl: string;

  fullscreenDisabled?: boolean;

  user?: {
    name: string;
    mail: string;
    id: number;
    canToggleViewOthersH5PContents?: number;
  };

  theme?: {
    density?: "large" | "medium" | "small";
  };

  contents: Record<`cid-${H5PContentId}`, H5PContentData>;

  core: {
    scripts: Array<string>;
    styles: Array<string>;
  };

  editor?: H5PEditorConfig;
};

type H5PContentData = {
  library: string;
  jsonContent: string;
  metadata?: H5PMetadata;
  fullScreen?: number;
  displayOptions?: H5PDisplayOptions;
  embedCode?: string;
  resizeCode?: string;
  exportUrl?: string;
  contentUrl?: string;
  styles?: Array<string>;
  scripts?: Array<string>;
  contentUserData?: Array<unknown>;
  jsonContentHash?: string;
  title?: string;
  url?: string;
};

type H5PEditorConfig = {
  libraryUrl: string;
  ajaxPath: string;
  filesPath: string;
  apiVersion: {
    majorVersion: number;
    minorVersion: number;
  };
  language: string;
  copyrightSemantics: unknown;
  metadataSemantics: unknown;
  assets: {
    css: Array<string>;
    js: Array<string>;
  };
  fileIcon: string;
  nodeVersionId?: number;
  enableContentHub?: boolean;
  hub?: {
    contentSearchUrl: string;
  };
};
