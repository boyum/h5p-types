import { EventDispatcher } from "h5p-types";

export declare class JoubelProgressbar extends EventDispatcher {
  /**
   * @param totalNumberOfSteps
   * @param options
   * @param options.disableAria Disable readspeaker assistance
   * @param options.progressText
   *          A progress text for describing current progress out of total progress for readspeakers.
   *          Special options `:num` and `:total` will be replaced with current and total progress.
   *          Default: "Slide :num of :total"
   */
  constructor(
    totalNumberOfSteps: number,
    options: {
      disableAria?: boolean;
      progressText?: string;
    },
  );

  /**
   * If `options.disableAria` is not set to true, inserts an element
   * with `aria-live` that notifies screen readers of the current progress.
   */
  updateAria(): void;

  appendTo: JQuery<HTMLElement>["appendTo"];

  setProgress(step: number): void;

  /**
   * Increments progress by 1.
   */
  next(): void;

  /**
   * Reset progress bar.
   * Alias of `setProgress(0)`.
   */
  reset(): void;

  isLastStep(): boolean;
}
