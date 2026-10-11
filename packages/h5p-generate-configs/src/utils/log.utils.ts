export type LogFn = (message: string) => void;

export const createLogger =
  (stream: NodeJS.WriteStream): LogFn =>
  (message: string): void => {
    stream.write(`${message}\n`);
  };
