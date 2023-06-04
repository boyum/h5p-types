import type { IsEqual } from "type-fest";

export type AreEqual<A, B> = IsEqual<A, B> extends true
  ? true
  : A extends B
  ? B extends A
    ? true
    : false
  : false;

export type Expect<T extends true> = T;
