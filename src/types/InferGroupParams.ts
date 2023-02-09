import type { EmptyObject } from "type-fest";
import type { DeepReadonly } from "../utility-types";
import type { H5PFieldGroup } from "./H5PField";
import type { InferParamsFromSemantics } from "./InferParamsFromSemantics";
import type { InferParamTypeFromFieldType } from "./InferParamTypeFromFieldType";

/**
 * If there are no fields in the group, the group's inferred params is only `{}`
 */
type InferEmptyGroupParams = EmptyObject;

/**
 * If there is only one field in the group,
 * the group's inferred params is the type of that field
 */
type InferGroupWithOneFieldParams<
  TGroupField extends DeepReadonly<H5PFieldGroup>,
> = TGroupField["fields"][0] extends H5PFieldGroup
  ? InferGroupParams<DeepReadonly<TGroupField["fields"][0]>>
  : InferParamTypeFromFieldType<TGroupField["fields"][0]>;

/**
 * If there are two ore more fields in the group,
 * the group's params is an object where the field's name is the key,
 * then we infer the field's params for the value
 */
type InferGroupWithMultipleFieldsParams<
  TGroupField extends DeepReadonly<H5PFieldGroup>,
> = InferParamsFromSemantics<TGroupField["fields"]>;

export type InferGroupParams<TGroupField extends H5PFieldGroup | DeepReadonly<H5PFieldGroup>> =
  TGroupField["fields"]["length"] extends 0
    ? InferEmptyGroupParams
    : TGroupField["fields"]["length"] extends 1
    ? InferGroupWithOneFieldParams<TGroupField>
    : InferGroupWithMultipleFieldsParams<TGroupField>;
