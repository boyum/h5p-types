/**
 * Request queue for retrying failing requests, will automatically retry them
 * when you come online
 */
export declare class H5POfflineRequestQueue {
  constructor(options?: {
    /**
     * The H5P instance which UI components are placed within
     */
    instance?: unknown;
  });

  /**
   * Add request to offline request queue. Only supports posts for now.
   */
  add(url: string, data: unknown): void;
}
