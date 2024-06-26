import type { ReadonlyDeep } from "type-fest";
import type { H5PField, H5PFieldGroup } from "./H5PField";
import type { InferL10nType, L10nGroupWithoutLabel } from "./InferL10nType";
import type {
  FieldToParamType,
  InferOptionalWithDefault,
} from "./InferParamTypeFromFieldType";

type H5PFieldWithoutLabel = Omit<H5PField, "label">;
type H5PFieldGroupWithoutLabel = Omit<H5PFieldGroup, "label">;

/**
 * @category H5PField
 *
 * @description
 *
 * Infer the params type from a semantics array.
 *
 * ⚠️ Use with caution - If the semantics form has very many fields, this might not work.
 *                      In that case, please create an issue to let us know.
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
      : TField extends { optional: true }
        ? TField extends { default: FieldToParamType<TField> }
          ? Record<TField["name"], InferOptionalWithDefault<TField>>
          : // If the field is optional but does not have a default value, we infer it as `FieldToParamType<TField> | undefined`
            Partial<Record<TField["name"], InferOptionalWithDefault<TField>>>
        : TField extends ReadonlyDeep<
              Omit<H5PFieldGroupWithoutLabel, "fields"> & {
                fields: [
                  infer InnerField extends ReadonlyDeep<H5PFieldWithoutLabel>,
                ];
              }
            >
          ? // In case the field is a group with only one field, we do the check
            // once more to see if the inner field is optional
            InnerField extends { optional: true }
            ? InnerField extends { default: FieldToParamType<TField> }
              ? Record<TField["name"], InferOptionalWithDefault<TField>>
              : // If the field is optional but does not have a default value, we infer it as `FieldToParamType<TField2> | undefined`
                Partial<
                  Record<TField["name"], InferOptionalWithDefault<TField>>
                >
            : Record<TField["name"], InferOptionalWithDefault<TField>>
          : Record<TField["name"], InferOptionalWithDefault<TField>>) &
      InferParamsFromSemantics<TRestFields>
  : unknown;
