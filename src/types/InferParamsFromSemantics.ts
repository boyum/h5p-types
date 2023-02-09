import type { DeepReadonly, Prettify } from "../utility-types";
import type { H5PField, H5PFieldGroup } from "./H5PField";
import type { InferL10nType } from "./InferL10nType";
import type { InferParamsType } from "./InferParamsType";

/**
 * ⚠️ Use with caution - if the semantics form has many fields, this might not work ⚠️
 * Infer the params type from a semantics array.
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
  TSemantics extends Array<H5PField> | ReadonlyArray<DeepReadonly<H5PField>>,
> = Prettify<
  TSemantics extends
    | [infer TField, ...infer TRestFields]
    | readonly [infer TField, ...infer TRestFields]
    ? TField extends H5PField | DeepReadonly<H5PField>
      ? TRestFields extends
          | Array<H5PField>
          | ReadonlyArray<DeepReadonly<H5PField>>
        ? (TField extends
            | (H5PFieldGroup & { name: "l10n" })
            | DeepReadonly<H5PFieldGroup & { name: "l10n" }>
            ? InferL10nType<TField>
            : Record<
                TField["name"],
                TField["optional"] extends true
                  ? TField extends { default: InferParamsType<TField> }
                    ? InferParamsType<TField>
                    : InferParamsType<TField> | undefined
                  : InferParamsType<TField>
              >) &
            InferParamsFromSemantics<TRestFields>
        : unknown
      : unknown
    : unknown
>;
