import { EventDispatcher } from "./EventDispatcher";
import { H5PConfirmationDialog } from "./H5PConfirmationDialog";
import { H5PCopyrightLicenses } from "./H5PCopyrightLicenses";
import { H5PDialog } from "./H5PDialog";

export type H5PObject = {
  // Constants
  copyrightLicenses: H5PCopyrightLicenses;

  // Functions
  getPath: (path: string, contentId: string) => string;
  createUUID: () => string;
  newRunnable: (
    library: { library: string; params: unknown },
    contentId: string,
    $attachTo: JQuery,
    skipResize?: boolean,
    extras?: unknown
  ) => void;

  // Classes
  jQuery: typeof jQuery;
  ConfirmationDialog: typeof H5PConfirmationDialog;
  Dialog: typeof H5PDialog;
  EventDispatcher: typeof EventDispatcher;
};
