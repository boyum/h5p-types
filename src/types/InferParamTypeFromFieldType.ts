import type { ReadonlyDeep } from "type-fest";
import type { Prettify } from "../utility-types";
import type { H5PAudio } from "./H5PAudio";
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
import type { H5PImage } from "./H5PImage";
import type { InferGroupParams } from "./InferGroupParams";
import type { H5PMedia } from "./H5PMedia";
import type { H5PVideo } from "./H5PVideo";
import type { IH5PContentType } from "./Interfaces/IH5PContentType";
import { H5PFieldWithOptionalLabel } from "./InferParamsFromSemantics";

type FieldToParamType<TField extends ReadonlyDeep<H5PFieldWithOptionalLabel>> =
  TField extends ReadonlyDeep<H5PFieldWithOptionalLabel<H5PFieldAudio>>
    ? H5PAudio
    : TField extends ReadonlyDeep<
        H5PFieldBoolean | H5PFieldWithOptionalLabel<H5PFieldBoolean>
      >
    ? boolean
    : TField extends ReadonlyDeep<
        H5PFieldFile | H5PFieldWithOptionalLabel<H5PFieldFile>
      >
    ? H5PMedia
    : TField extends ReadonlyDeep<
        H5PFieldGroup | H5PFieldWithOptionalLabel<H5PFieldGroup>
      >
    ? InferGroupParams<TField>
    : TField extends ReadonlyDeep<
        H5PFieldImage | H5PFieldWithOptionalLabel<H5PFieldImage>
      >
    ? H5PImage
    : TField extends ReadonlyDeep<
        H5PFieldLibrary | H5PFieldWithOptionalLabel<H5PFieldLibrary>
      >
    ? IH5PContentType
    : TField extends ReadonlyDeep<
        H5PFieldList | H5PFieldWithOptionalLabel<H5PFieldList>
      >
    ? Array<FieldToParamType<TField["field"]>>
    : TField extends ReadonlyDeep<
        H5PFieldNumber | H5PFieldWithOptionalLabel<H5PFieldNumber>
      >
    ? number
    : TField extends ReadonlyDeep<
        H5PFieldSelect | H5PFieldWithOptionalLabel<H5PFieldSelect>
      >
    ? TField["options"][number]["value"]
    : TField extends ReadonlyDeep<
        H5PFieldText | H5PFieldWithOptionalLabel<H5PFieldText>
      >
    ? string
    : TField extends ReadonlyDeep<
        H5PFieldVideo | H5PFieldWithOptionalLabel<H5PFieldVideo>
      >
    ? H5PVideo
    : never;

type InferOptional<TField extends ReadonlyDeep<H5PField>> =
  TField["optional"] extends true
    ? FieldToParamType<TField> | undefined
    : FieldToParamType<TField>;

export type InferOptionalWithDefault<
  TField extends ReadonlyDeep<H5PFieldWithOptionalLabel>,
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
  | H5PFieldSelect
  | H5PFieldText;

export type InferParamTypeFromFieldType<
  TField extends ReadonlyDeep<H5PField | H5PFieldWithOptionalLabel>,
> = Prettify<
  TField extends ReadonlyDeep<FieldTypesThatSupportsOnlyOptional>
    ? InferOptional<TField>
    : TField extends ReadonlyDeep<FieldTypesThatSupportsOptionalAndDefault>
    ? InferOptionalWithDefault<TField>
    : never
>;
