import type { ReadonlyDeep } from "type-fest";
import type { H5PField } from "./H5PField";
import type { InferL10nType, L10nGroupWithoutLabel } from "./InferL10nType";
import type { InferOptionalWithDefault } from "./InferParamTypeFromFieldType";

type H5PFieldWithoutLabel = Omit<H5PField, "label">;

/**
 * Infer the params type from a semantics array.
 *
 * ⚠️ Use with caution - if the semantics form has very many fields, this might not work. ⚠️
 * Also, note that `label` is considered a required property of fields.
 *
 * Is your semantics definition not deep readonly? Try to wrap it in {@link ReadonlyDeep} to fix this.
 *
 * @example
 *
 *  ```ts
 *  const semantics = [
 *  {
 *    label: "Group",
 *    name: "group",
 *    type: "group",
 *    fields: [
 *      {
 *         label: "Field",
 *         name: "field1",
 *         type: "number",
 *       },
 *       {
 *         label: "Field",
 *         name: "field2",
 *         type: "boolean",
 *         default: false,
 *       },
 *     ],
 *   },
 * ] as const;
 *
 *  type Params = InferParamsFromSemantics<typeof semantics>;
 *  //   ^^^^^^ { group: { field1: number; field2: boolean } };
 *  ```
 */
export type InferParamsFromSemantics<
  TSemantics extends ReadonlyArray<ReadonlyDeep<H5PFieldWithoutLabel>>,
> = TSemantics extends readonly [
  infer TField extends ReadonlyDeep<H5PFieldWithoutLabel>,
  ...infer TRestFields extends ReadonlyArray<
    ReadonlyDeep<H5PFieldWithoutLabel>
  >,
]
  ? (TField extends ReadonlyDeep<L10nGroupWithoutLabel>
      ? InferL10nType<TField>
      : Record<TField["name"], InferOptionalWithDefault<TField>>) &
      InferParamsFromSemantics<TRestFields>
  : unknown;
