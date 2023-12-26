export declare class H5PCommunicator {
  on(action: string, handler: () => void): void;
  send(action: string, data?: Record<string, unknown>): void;
}
