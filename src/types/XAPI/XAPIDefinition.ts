import type { XAPIInteractionType } from "./XAPIInteractionType";

export type XAPIDefinition = {
  name: Record<string, string>;
  description: Record<string, string>;
  type: string;
  interactionType: XAPIInteractionType;

  /**
   * @see https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#response-patterns
   */
  correctResponsesPattern: string | Array<string>;
} & Record<string, unknown>;
