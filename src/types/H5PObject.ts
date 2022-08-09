import type { EventDispatcher } from "./EventDispatcher";
import type { H5PConfirmationDialog } from "./H5PConfirmationDialog";
import type { H5PCopyrightLicenses } from "./H5PCopyrightLicenses";
import type { H5PDialog } from "./H5PDialog";
import type { H5PExtras } from "./H5PExtras";
import type { H5PMediaCopyright } from "./H5PMediaCopyright";
import type { H5PMetadata } from "./H5PMetadata";
import type { IH5PContentType } from "./IH5PContentType";

export type H5PObject = {
  // Constants
  copyrightLicenses: H5PCopyrightLicenses;

  /** H5P content is rendered inside an iframe */
  isFramed: boolean;

  /** H5P content is in fullscreen mode */
  isFullscreen: boolean;

  // Functions
  buildMetadataCopyrights(metadata: H5PMetadata): H5PMediaCopyright;
  createUUID: () => string;
  getCopyrights(instance: IH5PContentType): string;
  getPath: (path: string, contentId: string) => string;
  newRunnable: (
    library: { library: string; params: unknown },
    contentId: string,
    $attachTo?: JQuery,
    skipResize?: boolean,
    extras?: H5PExtras
  ) => IH5PContentType;
  exitFullScreen: () => void;
  fullScreen: (
    $element: JQuery,
    instance: IH5PContentType,
    exitCallback?: () => void,
    body?: JQuery,
    forceSemiFullScreen?: boolean
  ) => void;

  // Classes
  jQuery: typeof jQuery;
  ConfirmationDialog: typeof H5PConfirmationDialog;
  Dialog: typeof H5PDialog;
  EventDispatcher: typeof EventDispatcher;
};
