export declare class JoubelProgressCircle {
  /**
   * @param progress The progress (0 to 100)
   * @param progressColor The color of the progress bar as a hex value
   * @param fillColor The color of the fill as a hex value
   * @param backgroundColor The color of the background as a hex value
   */
  constructor(
    progress: number,
    progressColor: string,
    fillColor: string,
    backgroundColor: string,
  );

  /**
   * Initializes resize functionality for the progress circle
   */
  initResizeFunctionality(): void;

  /**
   * Resize function makes progress circle grow or shrink relative to parent container
   */
  resize(): void;
}
