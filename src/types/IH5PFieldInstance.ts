import type { EventDispatcher } from "./EventDispatcher";
import type { H5PField } from "./H5PField";
import type { H5PForm } from "./H5PForm";
import type { IH5PWidget } from "./IH5PWidget";

export interface IH5PFieldInstance<
  TParams = unknown,
  TField extends H5PField = H5PField
> extends H5PForm<TParams>,
    IH5PWidget,
    EventDispatcher {
  field: TField;
  parent: H5PForm | IH5PFieldInstance;
}
