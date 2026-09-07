import type { EventDispatcher } from "../../types/EventDispatcher";

type StoredRequest = {
  url: string;
  data: unknown;
};

/**
 * A queue for requests, will be automatically processed when regaining connection
 */
export declare class H5PRequestQueue extends EventDispatcher {
  processingQueue: boolean;

  constructor(options?: {
    /**
     * Show toast when losing or regaining connection
     */
    showToast?: boolean;
  });

  /**
   * Add request to queue. Only supports posts currently.
   */
  add(url: string, data: unknown): boolean;

  /**
   * Get stored requests
   *
   * @returns Stored requests, or `false` if localStorage is unavailable
   */
  getStoredRequests(): Array<StoredRequest> | false;

  /**
   * Clear stored requests
   *
   * @returns True if the storage was successfully cleared
   */
  clearQueue(): boolean;

  /**
   * Start processing of requests queue
   *
   * @returns False if it was not possible to resume processing queue
   */
  resumeQueue(): boolean;

  /**
   * Process first item in the request queue
   */
  processQueue(queue: Array<StoredRequest>): void;

  /**
   * Display toast message on the first content of current page
   *
   * @param msg Message to display
   * @param forceShow Force override showing the toast
   * @param configOverride Override toast message config
   */
  displayToastMessage(
    msg: string,
    forceShow?: boolean,
    configOverride?: unknown,
  ): void;
}
