import type {
  H5PField,
  H5PForm,
  H5PSetValue,
  IH5PWidget,
  ParamTypeInferredFromFieldType,
} from "h5p-types";
import { H5P } from "../utils/H5P.utils.js";

export abstract class H5PWidget<
    TField extends H5PField = H5PField,
    TParams = ParamTypeInferredFromFieldType<TField>,
  >
  extends H5P.EventDispatcher
  implements IH5PWidget
{
  protected wrapper: HTMLElement;

  constructor(
    protected parent: H5PForm<TParams>,
    public field: TField,
    protected params: TParams | undefined,
    protected setValue: H5PSetValue<TParams>,
  ) {
    super();
    this.wrapper = document.createElement("div");
  }

  public abstract appendTo($container: JQuery<HTMLElement>): void;

  public abstract validate(): boolean;

  public abstract remove(): void;
}
