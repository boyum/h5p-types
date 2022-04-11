import type { EventDispatcher } from "./EventDispatcher";
import type { IH5PContentType } from "./IH5PContentType";

export declare class H5PConfirmationDialog extends EventDispatcher {
  constructor(options: {
    instance: IH5PContentType;
    headerText?: string;
    dialogText?: string;
    cancelText?: string;
    confirmText?: string;
    hideCancel?: boolean;
    hideExit?: boolean;
    skipRestoreFocus?: boolean;
    classes?: Array<string>;
  });

  show(offsetTop: number): ThisType<H5PConfirmationDialog>;
  hide(): ThisType<H5PConfirmationDialog>;

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
