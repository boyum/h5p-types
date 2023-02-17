/**
 * @see https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types
 */
export type XAPIInteractionType =
  | "true-false"
  | "choice"
  | "fill-in"
  | "long-fill-in"
  | "matching"
  | "performance"
  | "sequencing"
  | "likert"
  | "numeric"
  | "other";
