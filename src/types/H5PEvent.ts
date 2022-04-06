declare class H5PEvent<TData = unknown> {
  type: string;

  data: {
    statement: {
      actor: {
        name: string;
        mbox: string;
        objectType: string;
      };
      contentId: number;
      context: {
        contextActivities: {
          category: Array<{ id: string; objectType: string }>;
        };
      };
      object: {
        id: string;
        objectType: string;
        definition: import("./XApiDefinition").XAPIDefinition;
      };
    } & TData;
  };

  extras?: {
    bubbles?: boolean;
    external?: boolean;
  };

  constructor(
    type: string,
    data: TData,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    }
  );

  /**
   * Prevent this event from bubbling up to parent
   */
  preventBubbling(): void;

  /**
   * Get bubbling status
   *
   * @returns
   *   true if bubbling false otherwise
   */
  getBubbles(): boolean;

  /**
   * Try to schedule an event for externalDispatcher
   *
   * @returns
   *   true if external and not already scheduled, otherwise false
   */
  scheduleForExternal(): boolean;
}
