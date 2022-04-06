import { EventDispatcher } from "./EventDispatcher";

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
};
