import { H5PShowWhenRule } from "./H5PShowWhenRule";

export type H5PShowWhenOptions = {
  rules: Array<H5PShowWhenRule>;

  /**
   * True means field is removed from DOM when hidden.
   * Default behaviour is hiding it using CSS (display: none).
   */
  detach?: boolean;

  /**
   * @default "or"
   */
  type?: "and" | "or";

  widget?: string;
};
