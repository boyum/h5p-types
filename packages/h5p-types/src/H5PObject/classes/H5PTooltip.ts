type Options = {
  /**
   * Extra css classes for the tooltip
   */
  classes?: Array<string>;

  /**
   * Whether the hover should be read by screen readers or not (default: true)
   */
  ariaHidden?: boolean;

  /**
   * The text to be displayed in the tooltip
   * If not set, will attempt to set text equal to `aria-label` of `triggeringElement`
   */
  text?: string | null;

  /**
   * Where the tooltip should appear in relation to the triggeringElement.
   * Accepted positions are "top" (default), "left", "right" and "bottom"
   */
  position?: "top" | "left" | "bottom" | "right";
};

/**
 * Create an accessible tooltip
 */
export declare class H5PTooltip {
  static uniqueId: number;

  constructor(triggeringElement: HTMLElement, options?: Options);

  /**
   * Change the text displayed by the tooltip
   *
   * @param text The new text to be displayed.
   *             Set to null to use `aria-label` of `triggeringElement` instead
   */
  setText(text: string): void;

  /**
   * Retrieve tooltip element
   */
  getElement(): HTMLDivElement;
}
