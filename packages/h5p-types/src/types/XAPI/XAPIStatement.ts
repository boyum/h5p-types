import type { H5PContentId } from "../H5PContentId";
import type { XAPIDefinition } from "./XAPIDefinition";

export type XAPIStatement = {
  actor: {
    name: string;
    mbox: string;
    objectType: string;
  };
  contentId: H5PContentId;
  context: {
    contextActivities: {
      category: Array<{ id: string; objectType: string }>;
    };
  };
  object: {
    id: string;
    objectType: string;
    definition: XAPIDefinition;
  };
};
