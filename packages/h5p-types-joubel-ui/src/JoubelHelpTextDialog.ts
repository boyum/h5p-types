import { EventDispatcher } from "h5p-types";

export declare class JoubelHelpTextDialog extends EventDispatcher {
  /**
   * @param header HTML for the header
   * @param message HTML for the body
   * @param closeButtonTitle The title for the close button
   */
  constructor(header: string, message: string, closeButtonTitle: string);

  getElement(): JQuery<HTMLDivElement>;

  focus(): void;
}
