import type { EmptyObject, ReadonlyDeep } from "type-fest";
import type { H5PFieldGroup } from "./H5PField";
import type { InferParamTypeFromFieldType } from "./InferParamTypeFromFieldType";
import type { InferParamsFromSemantics } from "./InferParamsFromSemantics";
import type { Prettify } from "../utility-types";

type H5PFieldGroupWithoutLabel = Omit<H5PFieldGroup, "label">;

/**
 * If there are no fields in the group, the group's inferred params is only `{}`
 */
type InferEmptyGroupParams = EmptyObject;

/**
 * If there is only one field in the group,
 * the group's inferred params is the type of that field
 */
type InferGroupWithOneFieldParams<
  TGroupField extends ReadonlyDeep<H5PFieldGroupWithoutLabel>,
> = TGroupField["fields"][0] extends H5PFieldGroupWithoutLabel
  ? InferGroupParams<ReadonlyDeep<TGroupField["fields"][0]>>
  : InferParamTypeFromFieldType<TGroupField["fields"][0]>;

/**
 * If there are two ore more fields in the group,
 * the group's params is an object where the field's name is the key,
 * then we infer the field's params for the value
 */
type InferGroupWithMultipleFieldsParams<
  TGroupField extends ReadonlyDeep<H5PFieldGroupWithoutLabel>,
> = Prettify<InferParamsFromSemantics<TGroupField["fields"]>>;

export type InferGroupParams<
  TGroupField extends ReadonlyDeep<H5PFieldGroupWithoutLabel>,
  TNumberOfFields = TGroupField["fields"]["length"],
> = TNumberOfFields extends 0
  ? InferEmptyGroupParams
  : TNumberOfFields extends 1
  ? InferGroupWithOneFieldParams<TGroupField>
  : InferGroupWithMultipleFieldsParams<TGroupField>;
