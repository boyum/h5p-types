import { EventDispatcher } from "./EventDispatcher";
import { H5PConfirmationDialog } from "./H5PConfirmationDialog";
import { H5PDialog } from "./H5PDialog";

export type H5PObject = {
  jQuery: typeof jQuery;
  EventDispatcher: typeof EventDispatcher;
  getPath: (path: string, contentId: string) => string;
  createUUID: () => string;
  newRunnable: (
    library: { library: string; params: unknown },
    contentId: string,
    $attachTo: JQuery,
    skipResize?: boolean,
    extras?: unknown
  ) => void;
  Dialog: typeof H5PDialog;
  ConfirmationDialog: typeof H5PConfirmationDialog;
};
