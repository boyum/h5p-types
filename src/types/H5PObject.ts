import type { EventDispatcher } from "./EventDispatcher";
import type { H5PClipboardItem } from "./H5PClipboardItem";
import type { H5PCommunicator } from "./H5PCommunicator";
import type { H5PConfirmationDialog } from "./H5PConfirmationDialog";
import type { H5PContentCopyrights } from "./H5PContentCopyrights";
import type { H5PContentId } from "./H5PContentId";
import type { H5PCoords } from "./H5PCoords";
import type { H5PCopyrightLicenses } from "./H5PCopyrightLicenses";
import type { H5PDefinitionList } from "./H5PDefinitionList";
import type { H5PDialog } from "./H5PDialog";
import type { H5PDisplayOptions } from "./H5PDisplayOptions";
import type { H5PEvent } from "./H5PEvent";
import type { H5PExtras } from "./H5PExtras";
import type { H5PFieldClass } from "./H5PFieldClass";
import type { H5PLibraryInfo } from "./H5PLibraryInfo";
import type { H5PMediaCopyright } from "./H5PMediaCopyright";
import type { H5PMetadata } from "./H5PMetadata";
import type { H5PNewRunnableLibraryParam } from "./H5PNewRunnableLibraryParam";
import type { H5PThumbnail } from "./H5PThumbnail";
import type { IH5PContentType } from "./IH5PContentType";
import type { H5PMedia } from "./H5PMedia";

export type H5PObject = {
  // --- Properties ---
  $body: JQuery<HTMLBodyElement>;

  $window: JQuery<Window>;

  /** @deprecated Use `fullscreenSupported` instead */
  canHasFullscreen: boolean;

  /** When embedded, the communicator helps talk to the parent page. */
  communicator: H5PCommunicator | undefined;

  copyrightLicenses: H5PCopyrightLicenses;

  externalEmbed?: boolean;

  fullScreenBrowserPrefix: "webkit" | "moz" | "ms";

  fullscreenSupported: boolean;

  instances: Array<IH5PContentType>;

  /** H5P content is rendered inside an iframe */
  isFramed: boolean;

  /** H5P content is in fullscreen mode */
  isFullscreen: boolean;

  /** Prevent H5P Core from initializing. Must be overriden before document ready. */
  preventInit?: boolean;

  safariBrowser: number;

  // --- Methods ---
  /**
   * Helper for adding a query parameter to an existing path that may already
   * contain one or a hash.
   *
   * @param path
   * @param parameter
   */
  addQueryParameter: (path: string, parameter: string) => string;

  /**
   * Show a toast message.
   *
   * The reference element could be dom elements the toast should be attached to,
   * or e.g. the document body for general toast messages.
   *
   * @param element Reference element to show toast message for.
   * @param message Message to show.
   * @param config Configuration.
   * @param config.style Style name for the tooltip. Default: `h5p-toast`
   * @param config.duration Toast message length in ms. Default: `3000`
   * @param config.position Relative positioning of the toast.
   * @param config.position.horizontal Default: `centered`
   * @param config.position.vertical Default: `below`
   * @param config.position.offsetHorizontal Extra horizontal offset. Default: `0`
   * @param config.position.offsetVertical Extra vertical offset. Default: `0`
   * @param config.position.noOverflowLeft True to prevent overflow left. Default: `false`
   * @param config.position.noOverflowRight True to prevent overflow right. Default: `false`
   * @param config.position.noOverflowTop True to prevent overflow top. Default: `false`
   * @param config.position.noOverflowBottom True to prevent overflow bottom. Default: `false`
   * @param config.position.noOverflowX True to prevent overflow left and right. Default: `false`
   * @param config.position.noOverflowY True to prevent overflow top and bottom. Default: `false`
   * @param config.position.overflowReference DOM reference for overflow. Default: `document.body`
   */
  attachToastTo: (
    element: HTMLElement,
    message: string,
    config?: {
      style?: string;
      duration?: number;
      position: {
        horizontal?: "before" | "left" | "centered" | "right" | "after";
        vertical?: "above" | "top" | "centered" | "bottom" | "below";
        offsetHorizontal?: number;
        offsetVertical?: number;
        noOverflowLeft?: boolean;
        noOverflowRight?: boolean;
        noOverflowTop?: boolean;
        noOverflowBottom?: boolean;
        noOverflowX?: boolean;
        noOverflowY?: boolean;
        overflowReference?: HTMLElement;
      };
    },
  ) => void;

  buildMetadataCopyrights(metadata: H5PMetadata): H5PMediaCopyright;

  classFromName: (name: `H5P.${string}`) => IH5PContentType;

  /**
   * Store item in the H5P Clipboard
   */
  clipboardify: <
    TParams extends Record<string, unknown> = Record<string, unknown>,
  >(
    clipboardItem: H5PClipboardItem<TParams> | TParams,
  ) => void;

  /**
   * Recursively clone the given object
   *
   * @param object Object to clone
   * @param recursive
   * @returns A clone of object
   */
  cloneObject: <T>(object: T, recursive?: boolean) => T;

  /**
   * Create title as an HTML string
   *
   * @param rawTitle
   * @param maxLength Default: 60
   */
  createTitle: (rawTitle: string, maxLength?: number) => string;

  createUUID: () => string;

  /**
   * Check if styles path/key is loaded
   */
  cssLoaded: (path: string) => boolean;

  /**
   * @private
   *
   * Delete user data for given content
   *
   * @param contentId
   *   What content to remove data for
   * @param dataId Identifies the set of data for this content
   * @param subContentId Identifies which data belongs to sub content
   */
  deleteUserData: (
    contentId: H5PContentId,
    dataId: string,
    subContentId?: H5PContentId,
  ) => void;

  error: (error: Error | string) => void;

  exitFullScreen: () => void;

  /**
   * Gather a flat list of copyright information from the given parameters.
   *
   * @param info Used to collect all information in.
   * @param parameters To search for file objects in.
   * @param contentId  Used to insert thumbnails for images.
   * @param extras - Extras.
   * @param extras.metadata - Metadata
   * @param extras.machineName - Library name of some kind.
   *   Metadata of the content instance.
   */
  findCopyrights: (
    info: H5PContentCopyrights,
    parameters:
      | Record<
          string,
          | ({
              library?: string | { library: string };
            } & Partial<H5PMedia>)
          | Array<
              {
                library?: string | { library: string };
              } & Partial<H5PMedia>
            >
        >
      | Array<
          {
            library?: string | { library: string };
          } & Partial<H5PMedia>
        >,
    contentId: H5PContentId,
    extras?: { metadata: H5PMetadata; machineName: string },
  ) => void;

  fullScreen: (
    $element: JQuery,
    instance: IH5PContentType,
    exitCallback?: () => void,
    body?: JQuery,
    forceSemiFullScreen?: boolean,
  ) => void;

  getClipboard: () =>
    | ({
        generic?: unknown;
      } & Record<string, unknown>)
    | undefined;

  /**
   * Function for getting content for a certain ID
   *
   * @param {number} contentId
   * @return {Object}
   */
  getContentForInstance: (contentId?: H5PContentId) =>
    | {
        contentUserData?: Array<unknown> | undefined;
        displayOptions?: H5PDisplayOptions;
        embedCode?: string;
        exportUrl: string;
        fullScreen: "0" | "1";
        jsonContent?: string;
        library: string;
        metadata: H5PMetadata;
        resizeCode: string;
        scripts: Array<string> | undefined;
        styles: Array<string> | undefined;
        title: string;
        url: string;
      }
    | undefined;

  /**
   * @deprecated Use `getPath` instead
   */
  getContentPath: (contentId: H5PContentId) => string;

  /**
   * Gather copyright information for the given content.
   *
   * @param instance H5P instance to get copyright information for.
   * @param parameters Parameters of the content instance.
   * @param contentId Identifies the H5P content
   * @param metadata Metadata of the content instance.
   *
   * @returns Copyright information.
   */
  getCopyrights<TContentType extends IH5PContentType>(
    instance: TContentType,
    parameters: TContentType["params"],
    contentId: H5PContentId,
    metadata: H5PMetadata,
  ): string | undefined;

  /**
   * Get the crossOrigin policy to use for img, video and audio tags on the current site.
   *
   * @param source File object from parameters/json_content - Can also be URL(deprecated usage)
   *
   * @returns crossOrigin attribute value required by the source
   */
  getCrossOrigin:
    | ((source: string) => string | null)
    | ((source: H5PMedia) => string | undefined);

  /**
   * Get config for a library
   *
   * @param string machineName
   */
  getLibraryConfig: (machineName: string) => unknown | Record<string, never>;

  /**
   * Get the path to the library
   *
   * @param library The library identifier in the format "machineName-majorVersion.minorVersion".
   * @returns The full path to the library
   */
  getLibraryPath: (library: `${string}-${number}.${number}`) => string;

  /**
   * Find the path to the content files based on the id of the content.
   * Also identifies and returns absolute paths
   *
   * @param path Relative to content folder or absolute
   * @param contentId ID of the content requesting the path
   *
   * @returns Complete URL to path
   */
  getPath: (path: string, contentId: H5PContentId) => string;

  /**
   * @private
   *
   * Get user data for given content
   *
   * @param contentId What content to get data for
   * @param dataId Identifies the set of data for this content
   * @param done Callback with error and data parameters
   * @param subContentId Identifies which data belongs to sub content
   */
  getUserData: (
    contentId: H5PContentId,
    dataId: string,
    done: (error?: Error, data?: Record<string, unknown> | null) => void,
    subContentId?: H5PContentId,
  ) => void;

  /**
   * Initialize H5P content.
   * Scans for ".h5p-content" in the document and initializes H5P instances where found.
   *
   * @param target DOM Element
   */
  init: (target: HTMLElement) => void;

  /**
   * Check if JavaScript path/key is loaded
   */
  jsLoaded: (path: string) => boolean;

  /**
   * Parse library string into values.
   *
   * @param library library in the format "machineName majorVersion.minorVersion"
   * @returns library as an object with machineName, majorVersion and minorVersion properties,
   *          or false if the library parameter is invalid
   */
  libraryFromString: <
    TLibraryName extends string,
    TMajorVersion extends number,
    TMinorVersion extends number,
  >(
    library: `${TLibraryName} ${TMajorVersion}.${TMinorVersion}`,
  ) =>
    | {
        machineName: TLibraryName;
        majorVersion: TMajorVersion;
        minorVersion: TMinorVersion;
      }
    | false;

  /**
   * A safe way of creating a new instance of a runnable H5P.
   *
   * @param library Library/action object form params.
   * @param contentId Identifies the content.
   * @param $attachTo Element to attach the instance to.
   * @param skipResize Skip triggering of the resize event after attaching.
   * @param extras Extra parameters for the H5P content constructor
   *
   * @returns Instance
   */
  newRunnable: <TLibraryParam extends H5PNewRunnableLibraryParam>(
    library: TLibraryParam,
    contentId: H5PContentId,
    $attachTo?: JQuery,
    skipResize?: boolean,
    extras?: H5PExtras,
  ) => IH5PContentType & {
    $: typeof jQuery;
    libraryInfo: H5PLibraryInfo;
    subContentId: TLibraryParam["subContentId"];
  };

  on: <TData = unknown>(
    instance: EventDispatcher,
    eventType: string,
    handler: (event: H5PEvent<TData>) => void,
  ) => void;

  /**
   * Display a dialog containing the embed code
   *
   * @param $element Element to insert dialog after
   * @param embedCode The embed code
   * @param resizeCode The advanced resize code
   * @param size The content's size
   */
  openEmbedDialog: (
    $element: JQuery<HTMLElement>,
    embedCode: string,
    resizeCode: string,
    size: {
      width: number;
      height: number;
    },
  ) => void;

  /**
   * Display a dialog containing the download button and copy button
   */
  openReuseDialog: (
    $element: JQuery<HTMLElement>,
    contentData: {
      displayOptions: H5PDisplayOptions;
    },
    library: ConstructorParameters<typeof H5PClipboardItem>[0],
    instance: IH5PContentType,
    contentId: H5PContentId,
  ) => void;

  /**
   * Enter semi fullscreen for the given H5P instance
   *
   * @param $element Content container.
   * @param instance
   * @param exitCallback Callback function called when user exits fullscreen.
   * @param $body For internal use. Gives the body of the iframe.
   */
  semiFullScreen: (
    $element: Parameters<H5PObject["fullScreen"]>[0],
    instance: Parameters<H5PObject["fullScreen"]>[1],
    exitCallback: Parameters<H5PObject["fullScreen"]>[2],
    $body: Parameters<H5PObject["fullScreen"]>[3],
  ) => void;

  /**
   * Set item in the H5P Clipboard
   *
   * @param clipboardItem Data to be set
   */
  setClipboard: <TParams extends Record<string, unknown>>(
    clipboardItem: H5PClipboardItem<TParams> | TParams,
  ) => void;

  /**
   * Post finished results for user
   *
   * @deprecated Do not use this function directly, trigger the finish event instead
   *
   * @param contentId Identifies the content
   * @param score Achieved score/points
   * @param maxScore The maximum score/points that can be achieved
   * @param time Reported time consumption/usage
   */
  setFinished: (
    contentId: H5PContentId,
    score: number,
    maxScore: number,
    time?: number,
  ) => void;

  /**
   * Helper for setting the crossOrigin attribute + the complete correct source.
   * Note: This will start loading the resource.
   *
   * @param element DOM element, typically img, video or audio
   * @param source File object from parameters/json_content (created by H5PEditor)
   * @param contentId Needed to determine the complete correct file path
   */
  setSource: (
    element: HTMLImageElement | HTMLVideoElement | HTMLAudioElement,
    source: H5PMedia,
    contentId: H5PContentId,
  ) => void;

  /**
   * @private
   *
   * Set user data for given content
   *
   * @param contentId What content to get data for
   * @param dataId Identifies the set of data for this content
   * @param data The data that is to be stored
   * @param extras Extra properties
   * @param extras.subContentId Identifies which data belongs to sub content
   * @param extras.preloaded If the data should be loaded when content is loaded. Default: `true`
   * @param extras.deleteOnChange If the data should be invalidated when the content changes. Default: `false`
   * @param extras.errorCallback Callback with error as parameters
   * @param extras.async Default: `true`
   */
  setUserData: (
    contentId: H5PContentId,
    dataId: string,
    data: unknown,
    extras?: {
      subContentId?: H5PContentId;
      preloaded?: boolean;
      deleteOnChange?: boolean;
      errorCallback?: (error: Error) => void;
      async?: boolean;
    },
  ) => void;

  /**
   * Shuffle an array in place
   *
   * @deprecated Use [Array#sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) instead
   */
  shuffleArray: <T>(array: Array<T>) => Array<T>;

  /**
   * Translate text strings.
   *
   * @param key
   *   Translation identifier, may only contain a-zA-Z0-9. No spaces or special chars.
   * @param placeholderVars Data for placeholders.
   * @param namespace Translation namespace. Defaults to H5P.
   *
   * @returns Translated text
   */
  t: (
    key: string,
    placeholderVars?: Record<string, string>,
    namespace?: string,
  ) => string;

  /**
   * Trigger an event on an instance
   *
   * Helper function that triggers an event if the instance supports event handling
   *
   * @param instance Instance of H5P content
   * @param eventType Type of event to trigger
   * @param data
   * @param extras
   */
  trigger: <TData = unknown>(
    instance: EventDispatcher,
    eventType: Parameters<EventDispatcher["trigger"]>[0],
    data: TData,
    extras: Parameters<EventDispatcher["trigger"]>[2],
  ) => void;

  /**
   * Remove all empty spaces before and after the value
   *
   * @deprecated Use [`String#trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) instead
   */
  trim: (value: string) => string;

  // --- Classes ---
  jQuery: typeof jQuery;

  ClipboardItem: typeof H5PClipboardItem;

  ConfirmationDialog: typeof H5PConfirmationDialog;

  /**
   * Copyrights for an H5P Content Library
   */
  ContentCopyrights: typeof H5PContentCopyrights;

  /**
   * @deprecated
   *
   * Helper object for keeping coordinates in the same format all over.
   */
  Coords: typeof H5PCoords;

  DefinitionList: typeof H5PDefinitionList;

  Dialog: typeof H5PDialog;

  EventDispatcher: typeof EventDispatcher;

  /**
   * Simple data structure class for storing a single field
   */
  Field: typeof H5PFieldClass;

  /**
   * An ordered list of copyright fields for media
   */
  MediaCopyright: typeof H5PMediaCopyright;

  /**
   * A simple and elegant class for creating thumbnails of images
   */
  Thumbnail: typeof H5PThumbnail;
};
