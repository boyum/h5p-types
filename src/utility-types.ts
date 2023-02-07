export type AreEqual<T, U> = T extends U ? (U extends T ? true : false) : false;
export type Expect<T extends true> = T;

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Prettify<T> = {
  [P in keyof T]: T[P];
} & // eslint-disable-next-line @typescript-eslint/ban-types
{};
