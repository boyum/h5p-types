import type { ReadonlyDeep } from "type-fest";
import type { H5PField } from "./H5PField";
import type { InferL10nType, L10nGroupWithoutLabel } from "./InferL10nType";
import type { InferOptionalWithDefault } from "./InferParamTypeFromFieldType";

type H5PFieldWithoutLabel = Omit<H5PField, "label">;

/**
 * @category H5PField
 *
 * @description
 *
 * Infer the params type from a semantics array.
 *
 * ⚠️ Use with caution - If the semantics form has very many fields, this might not work.
 *                      In that case, please create an issue to let us know.
 * ⚠️ Also, note that `label` is considered a required property of fields.
 *
 * @template TSemantics - The semantics array type.
 *
 * This type is recursive and should cover all cases of semantics arrays.
 * It is a nice way of inferring the type of all fields in a semantics array,
 * and will take care of weird cases like groups with only one field in them.
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
 *
 * @example
 *
 * If a group only has one field, it will be inferred as the type of the field:
 *
 * ```ts
 * const semantics = [
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
 *     ],
 *   },
 * ] as const;
 *
 * type Params = InferParamsFromSemantics<typeof semantics>;
 * //   ^^^^^^ { group: number };
 * ```
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
