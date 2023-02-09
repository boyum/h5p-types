import type { DeepReadonly } from "../utility-types";
import type { H5PField, H5PFieldGroup, H5PFieldList } from "./H5PField";
import type { InferGroupParams } from "./InferGroupParams";
import type { InferParamTypeFromFieldType } from "./InferParamTypeFromFieldType";

export type InferParamsType<TField extends H5PField | DeepReadonly<H5PField>> =
  TField extends H5PFieldGroup
    ? InferGroupParams<TField>
    : TField extends H5PFieldList
    ? Array<InferParamsType<TField["field"]>>
    : InferParamTypeFromFieldType<TField>;
