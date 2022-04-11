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
import type { Audio } from "./Audio";
import type { Image } from "./Image";
import type { Media } from "./Media";
import type { Video } from "./Video";

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
