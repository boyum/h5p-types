import type { DeepReadonly } from "../utility-types";
import type { H5PField, H5PFieldGroup, H5PFieldList } from "./H5PField";
import type { InferGroupParams } from "./InferGroupParams";
import type { InferParamTypeFromFieldType } from "./InferParamTypeFromFieldType";

export type InferParamsType<TField extends DeepReadonly<H5PField>> =
  TField extends DeepReadonly<H5PFieldGroup>
    ? InferGroupParams<TField>
    : TField extends DeepReadonly<H5PFieldList>
    ? Array<InferParamsType<TField["field"]>>
    : InferParamTypeFromFieldType<TField>;
