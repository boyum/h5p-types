import type { EventDispatcher } from "../../types/EventDispatcher";
import type { H5PDisplayOptions } from "../../types/H5PDisplayOptions";

/**
 * Action bar for H5P content, shown below the content by the player.
 * Displays buttons for e.g. "Download", "Copyright" and "Embed",
 * based on the display options.
 *
 * Triggers the events `reuse`, `copyrights` and `embed` on user action.
 */
export declare class H5PActionBar extends EventDispatcher {
  constructor(displayOptions: H5PDisplayOptions);

  /**
   * Returns a reference to the DOM element
   */
  getDOMElement(): JQuery<HTMLUListElement>;

  /**
   * Does the actionbar contain actions?
   */
  hasActions(): boolean;
}
