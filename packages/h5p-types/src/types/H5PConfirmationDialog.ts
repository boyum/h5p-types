import type { EventDispatcher } from "./EventDispatcher";
import type { IH5PContentType } from "./Interfaces/IH5PContentType";

export declare class H5PConfirmationDialog extends EventDispatcher {
  constructor(options?: {
    instance?: IH5PContentType;
    headerText?: string;
    dialogText?: string;
    cancelText?: string;
    closeText?: string;
    confirmText?: string;
    hideCancel?: boolean;
    hideExit?: boolean;
    skipRestoreFocus?: boolean;
    classes?: Array<string>;
    /**
     * Whether to use the new theme (true) or the old design (false)
     */
    theme?: boolean;
  });

  /**
   * Set parent of confirmation dialog
   *
   * @param wrapper
   * @returns The confirmation dialog (chainable)
   */
  appendTo(wrapper: HTMLElement): H5PConfirmationDialog;

  show(offsetTop?: number): H5PConfirmationDialog;
  hide(): H5PConfirmationDialog;

  /**
   * @return The ConfirmationDialog HTML element
   */
  getElement(): HTMLElement;

  /**
   * @return The element that had focus before the ConfirmationDialog was opened
   */
  getPreviouslyFocused(): HTMLElement;

  setViewPortMinimumHeight(minimumHeight: number | null): void;
}
