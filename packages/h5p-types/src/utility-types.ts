export type Prettify<T> = {
  [P in keyof T]: T[P];
} & {};

export type StrictOmit<T extends object, U extends keyof T> = Omit<T, U>;
