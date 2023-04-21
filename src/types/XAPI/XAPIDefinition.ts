export type XAPIDefinition = {
  name: Record<string, string>;
  description: Record<string, string>;
  type: string;

  /**
   * @see https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#response-patterns
   */
  correctResponsesPattern?: string | Array<string>;
  choices?: unknown;
  scale?: unknown;
  source?: unknown;
  target?: unknown;
  steps?: unknown;
} & Record<string, unknown>;
