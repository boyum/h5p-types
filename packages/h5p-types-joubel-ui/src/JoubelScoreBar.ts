export declare class JoubelScoreBar {
  /**
   * @param maxScore Maximum score
   * @param label Makes it easier for readspeakers to identify the scorebar
   * @param helpText Score explanation
   * @param scoreExplanationButtonLabel Label for score explanation button
   */
  constructor(
    maxScore: number,
    label?: string,
    helpText?: string,
    scoreExplanationButtonLabel?: string,
  );

  appendTo: JQuery<HTMLDivElement>["appendTo"];

  setScore(score: number): void;

  /**
   * @param incrementBy Defaults to 1 if value is not provided or falsy
   */
  incrementScore(incrementBy?: number): void;

  setMaxScore(maxScore: number): void;

  /**
   * Update the visuals of the score bar.
   */
  updateVisuals(): void;

  /**
   * Removes all classes
   */
  reset(): void;
}
