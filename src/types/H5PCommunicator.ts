export declare class H5PCommunicator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  on(action: string, handler: Function): void;
  send(action: string, data?: Record<string, unknown>): void;
}
