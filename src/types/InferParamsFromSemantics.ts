import type { ReadonlyDeep } from "type-fest";
import type { Prettify } from "../utility-types";
import type { H5PField, H5PFieldGroup, H5PFieldList } from "./H5PField";
import type { InferL10nType } from "./InferL10nType";
import type { InferOptionalWithDefault } from "./InferParamTypeFromFieldType";

export type H5PFieldWithOptionalLabel<TField extends H5PField = H5PField> =
  Prettify<
    Omit<TField, "label"> & { label?: string } & (TField extends H5PFieldGroup
        ? Omit<TField, "fields"> & {
            fields: Array<
              H5PFieldGroup["fields"][number] & {
                label?: H5PFieldGroup["fields"][number]["label"];
              }
            >;
          }
        : TField extends H5PFieldList
        ? Omit<TField, "field"> & {
            field?: H5PFieldList["field"];
          }
        : unknown)
  >;

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
  TSemantics extends ReadonlyArray<
    ReadonlyDeep<H5PField | H5PFieldWithOptionalLabel>
  >,
> = Prettify<
  TSemantics extends readonly [infer TField, ...infer TRestFields]
    ? TField extends ReadonlyDeep<H5PFieldWithOptionalLabel>
      ? TRestFields extends ReadonlyArray<
          ReadonlyDeep<H5PFieldWithOptionalLabel>
        >
        ? (TField extends ReadonlyDeep<H5PFieldGroup & { name: "l10n" }>
            ? InferL10nType<TField>
            : Record<TField["name"], InferOptionalWithDefault<TField>>) &
            InferParamsFromSemantics<TRestFields>
        : unknown
      : unknown
    : unknown
>;
