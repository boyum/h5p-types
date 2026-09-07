import type { H5PEditorObject, H5PObject } from "h5p-types";
import { EventDispatcher } from "./EventDispatcher.js";

type MockGlobals = {
  H5P: Omit<Partial<H5PObject>, "EventDispatcher"> & {
    EventDispatcher?: typeof EventDispatcher;
  };
  H5PEditor: Partial<H5PEditorObject> & {
    widgets: Record<string, unknown>;
  };
};

let installed = false;

/**
 * Installs the global H5P/H5PEditor mocks needed to instantiate H5P content
 * types and widgets outside of a real H5P host.
 *
 * Must be called *before* any module reading `window.H5P` or
 * `window.H5PEditor` is evaluated. `h5p-utils` captures the global objects at
 * import time, which means the mocks need to be in place before the content
 * type sources are imported. In Storybook this is handled by calling this
 * function from `.storybook/preview.ts`.
 *
 * The installation is idempotent and never overwrites an existing H5P global.
 */
export function installH5PMocks(): void {
  if (installed) {
    return;
  }

  installed = true;

  const globals = globalThis as unknown as MockGlobals;

  if (globals.H5P === undefined) {
    globals.H5P = {};
  }

  if (globals.H5P.EventDispatcher === undefined) {
    globals.H5P.EventDispatcher = EventDispatcher;
  }

  if (globals.H5PEditor === undefined) {
    globals.H5PEditor = { widgets: {} };
  } else if (globals.H5PEditor.widgets === undefined) {
    globals.H5PEditor.widgets = {};
  }
}
