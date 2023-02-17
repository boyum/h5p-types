import type { XAPIDefinition } from "../..";
import type { XAPIEvent } from "./XAPI/XAPIEvent";

export interface IH5PQuestionType {
  /**
   * Checks if answers for this task has been given,
   * and the program can proceed to calculate scores.
   * Should return false if the user can not proceed yet.
   *
   * @see https://h5p.org/documentation/developers/contracts#guides-header-1
   *
   * @returns True if answers has been given
   */
  getAnswerGiven(): boolean;

  /**
   * Calculates the user's score for this task, for
   * example correct answers subtracted by wrong answers.
   *
   * @see https://h5p.org/documentation/developers/contracts#guides-header-2
   *
   * @example
   * If the task has 5 questions, and the user has answered 3 correctly,
   * the score is 3.
   *
   * @returns User's score for this task
   */
  getScore(): number;

  /**
   * Calculates the maximum score for this task.
   *
   * @see https://h5p.org/documentation/developers/contracts#guides-header-3
   *
   * @example
   * If the task has 5 questions, and each question is worth 1 point,
   * the maximum score is 5.
   *
   * @returns Maximum score for this task
   */
  getMaxScore(): number;

  /**
   * Shows the solution for this task. It should also hide all buttons
   *
   * @see https://h5p.org/documentation/developers/contracts#guides-header-4
   */
  showSolutions(): void;

  /**
   * Resets the task to its initial state, should also show buttons that were hidden by `showSolutions`
   *
   * @see https://h5p.org/documentation/developers/contracts#guides-header-5
   *
   */
  resetTask(): void;

  /**
   * Retrieves the xAPI data necessary for generating result reports.
   *
   * @see https://h5p.org/documentation/developers/contracts#guides-header-6
   */
  getXAPIData(): {
    statement: XAPIDefinition;
    children?: Array<XAPIEvent>;
  };
}
