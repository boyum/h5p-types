import type { ReadonlyDeep } from "type-fest";
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
import type { H5PMedia } from "./H5PMedia";
import type { H5PVideo } from "./H5PVideo";
import type { InferGroupParams } from "./InferGroupParams";
import type { IH5PContentType } from "./Interfaces/IH5PContentType";

type H5PFieldWithoutLabel = Omit<H5PField, "label">;

type H5PFieldAudioWithoutLabel = Omit<H5PFieldAudio, "label">;
type H5PFieldBooleanWithoutLabel = Omit<H5PFieldBoolean, "label">;
type H5PFieldFileWithoutLabel = Omit<H5PFieldFile, "label">;
type H5PFieldGroupWithoutLabel = Omit<H5PFieldGroup, "label">;
type H5PFieldImageWithoutLabel = Omit<H5PFieldImage, "label">;
type H5PFieldLibraryWithoutLabel = Omit<H5PFieldLibrary, "label">;
type H5PFieldListWithoutLabel = Omit<H5PFieldList, "label">;
type H5PFieldNumberWithoutLabel = Omit<H5PFieldNumber, "label">;
type H5PFieldSelectWithoutLabel = Omit<H5PFieldSelect, "label">;
type H5PFieldTextWithoutLabel = Omit<H5PFieldText, "label">;
type H5PFieldVideoWithoutLabel = Omit<H5PFieldVideo, "label">;

type FieldToParamType<TField extends ReadonlyDeep<H5PFieldWithoutLabel>> =
  TField extends ReadonlyDeep<H5PFieldAudioWithoutLabel>
    ? H5PAudio
    : TField extends ReadonlyDeep<H5PFieldBooleanWithoutLabel>
    ? boolean
    : TField extends ReadonlyDeep<H5PFieldFileWithoutLabel>
    ? H5PMedia
    : TField extends ReadonlyDeep<H5PFieldGroupWithoutLabel>
    ? InferGroupParams<TField>
    : TField extends ReadonlyDeep<H5PFieldImageWithoutLabel>
    ? H5PImage
    : TField extends ReadonlyDeep<H5PFieldLibraryWithoutLabel>
    ? IH5PContentType
    : TField extends ReadonlyDeep<H5PFieldListWithoutLabel>
    ? Array<FieldToParamType<TField["field"]>>
    : TField extends ReadonlyDeep<H5PFieldNumberWithoutLabel>
    ? number
    : TField extends ReadonlyDeep<H5PFieldSelectWithoutLabel>
    ? TField["options"][number]["value"]
    : TField extends ReadonlyDeep<H5PFieldTextWithoutLabel>
    ? string
    : TField extends ReadonlyDeep<H5PFieldVideoWithoutLabel>
    ? H5PVideo
    : never;

type InferOptional<TField extends ReadonlyDeep<H5PFieldWithoutLabel>> =
  TField["optional"] extends true
    ? FieldToParamType<TField> | undefined
    : FieldToParamType<TField>;

export type InferOptionalWithDefault<
  TField extends ReadonlyDeep<H5PFieldWithoutLabel>,
  TType = FieldToParamType<TField>,
> = TField["optional"] extends true
  ? TField extends { default: TType }
    ? TType
    : TType | undefined
  : TType;

type FieldTypesThatSupportsOnlyOptional =
  | H5PFieldAudioWithoutLabel
  | H5PFieldFileWithoutLabel
  | H5PFieldGroupWithoutLabel
  | H5PFieldImageWithoutLabel
  | H5PFieldListWithoutLabel
  | H5PFieldVideoWithoutLabel;

type FieldTypesThatSupportsOptionalAndDefault =
  | H5PFieldBooleanWithoutLabel
  | H5PFieldLibraryWithoutLabel
  | H5PFieldNumberWithoutLabel
  | H5PFieldSelectWithoutLabel
  | H5PFieldTextWithoutLabel;

export type InferParamTypeFromFieldType<
  TField extends ReadonlyDeep<H5PFieldWithoutLabel>,
> = TField extends ReadonlyDeep<FieldTypesThatSupportsOnlyOptional>
  ? InferOptional<TField>
  : TField extends ReadonlyDeep<FieldTypesThatSupportsOptionalAndDefault>
  ? InferOptionalWithDefault<TField>
  : never;
