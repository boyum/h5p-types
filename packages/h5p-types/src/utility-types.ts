export type Prettify<T> = {
  [P in keyof T]: T[P];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type StrictOmit<T extends object, U extends keyof T> = Omit<T, U>;
