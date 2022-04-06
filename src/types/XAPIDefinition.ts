export type XAPIDefinition = {
  name: Record<string, string>;
  description: Record<string, string>;
  type: string;
  interactionType: string;
  correctResponsesPattern: string;
};
