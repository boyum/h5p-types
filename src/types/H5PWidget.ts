import { H5P } from "../utils/H5P.utils";
import { Audio } from "./Audio";
import {
  H5PField,
  H5PFieldAudio,
  H5PFieldBoolean,
  H5PFieldFile,
  H5PFieldGroup,
  H5PFieldImage,
  H5PFieldLibrary,
  H5PFieldList,
  H5PFieldNumber,
  H5PFieldSelect,
  H5PFieldText,
  H5PFieldVideo,
} from "./H5PField";
import { H5PForm } from "./H5PForm";
import { H5PSetValue } from "./H5PSetValue";
import { Image } from "./Image";
import { Media } from "./Media";
import { Video } from "./Video";

export type ParamTypeInferredFromFieldType<TField extends H5PField> =
  TField extends H5PFieldAudio
    ? Audio
    : TField extends H5PFieldBoolean
    ? boolean
    : TField extends H5PFieldFile
    ? Media
    : TField extends H5PFieldGroup
    ? unknown | Record<string, unknown>
    : TField extends H5PFieldImage
    ? Image
    : TField extends H5PFieldLibrary
    ? unknown
    : TField extends H5PFieldList
    ? Array<unknown>
    : TField extends H5PFieldNumber
    ? number
    : TField extends H5PFieldSelect
    ? string | boolean | number
    : TField extends H5PFieldText
    ? string
    : TField extends H5PFieldVideo
    ? Video
    : never;

export class H5PWidget<
  TField extends H5PField = H5PField,
  TParams = ParamTypeInferredFromFieldType<TField>
> extends H5P.EventDispatcher {
  public field: TField;

  protected parent: H5PForm;

  protected params: TParams | undefined;

  protected setValue: H5PSetValue<TParams>;

  protected wrapper: HTMLElement;

  constructor(
    parent: H5PForm,
    field: TField,
    params: TParams | undefined,
    setValue: H5PSetValue<TParams>
  ) {
    super();
    this.wrapper = H5PWidget.createWrapperElement();

    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
