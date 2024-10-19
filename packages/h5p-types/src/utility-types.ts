export type Prettify<T> = {
  [P in keyof T]: T[P];
} & {};

export type StrictOmit<T extends object, U extends keyof T> = Omit<T, U>;

// Original source: https://github.com/typed-rocks/typescript/blob/main/one_of.ts
type MergeTypes<TypesArray extends any[], Res = {}> = TypesArray extends [
  infer Head,
  ...infer Rem,
]
  ? MergeTypes<Rem, Res & Head>
  : Res;

export type OneOf<
  TypesArray extends any[],
  Res = never,
  AllProperties = MergeTypes<TypesArray>,
> = Prettify<
  TypesArray extends [infer Head, ...infer Rem]
    ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties>
    : Res
>;

type SimpleOneOf<F, S> = OnlyFirst<F, S> | OnlyFirst<S, F>;

type OnlyFirst<F, S> = F & { [Key in keyof Omit<S, keyof F>]?: never };
