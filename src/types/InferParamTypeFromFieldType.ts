import type { DeepReadonly, Prettify } from "../utility-types";
import type { Audio } from "./Audio";
import type {
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
import type { Image } from "./Image";
import type { InferGroupParams } from "./InferGroupParams";
import type { Media } from "./Media";
import type { Video } from "./Video";

type FieldToParamType<TField extends DeepReadonly<H5PField>> =
  TField extends DeepReadonly<H5PFieldAudio>
    ? Audio
    : TField extends DeepReadonly<H5PFieldBoolean>
    ? boolean
    : TField extends DeepReadonly<H5PFieldFile>
    ? Media
    : TField extends DeepReadonly<H5PFieldGroup>
    ? InferGroupParams<TField>
    : TField extends DeepReadonly<H5PFieldImage>
    ? Image
    : TField extends DeepReadonly<H5PFieldLibrary>
    ? unknown
    : TField extends DeepReadonly<H5PFieldList>
    ? Array<FieldToParamType<TField["field"]>>
    : TField extends DeepReadonly<H5PFieldNumber>
    ? number
    : TField extends DeepReadonly<H5PFieldSelect>
    ? TField["options"][number]["value"]
    : TField extends DeepReadonly<H5PFieldText>
    ? string
    : TField extends DeepReadonly<H5PFieldVideo>
    ? Video
    : never;

type InferOptional<TField extends DeepReadonly<H5PField>> =
  TField["optional"] extends true
    ? FieldToParamType<TField> | undefined
    : FieldToParamType<TField>;

type InferOptionalWithDefault<
  TField extends DeepReadonly<H5PField>,
  TType = FieldToParamType<TField>,
> = TField["optional"] extends true
  ? TField extends { default: TType }
    ? TType
    : TType | undefined
  : TType;

type FieldTypesThatSupportsOnlyOptional =
  | H5PFieldAudio
  | H5PFieldFile
  | H5PFieldGroup
  | H5PFieldImage
  | H5PFieldList
  | H5PFieldVideo;

type FieldTypesThatSupportsOptionalAndDefault =
  | H5PFieldBoolean
  | H5PFieldLibrary
  | H5PFieldNumber
  | H5PFieldText;

export type InferParamTypeFromFieldType<TField extends DeepReadonly<H5PField>> =
  Prettify<
    TField extends DeepReadonly<FieldTypesThatSupportsOnlyOptional>
      ? InferOptional<TField>
      : TField extends DeepReadonly<FieldTypesThatSupportsOptionalAndDefault>
      ? InferOptionalWithDefault<TField>
      : TField extends DeepReadonly<H5PFieldSelect>
      ? TField["optional"] extends true
        ? TField extends FieldToParamType<TField>
          ? FieldToParamType<TField>
          : FieldToParamType<TField> | undefined
        : FieldToParamType<TField>
      : never
  >;

/**
 * @deprecated Use InferParamTypeFromFieldType instead
 */
export type ParamTypeInferredFromFieldType<
  TField extends DeepReadonly<H5PField>,
> = InferParamTypeFromFieldType<TField>;
