import { EventDispatcher } from "./EventDispatcher";

export type H5PObject = {
  EventDispatcher: typeof EventDispatcher;
  getPath: (path: string, contentId: string) => string;
  createUUID: () => string;
};