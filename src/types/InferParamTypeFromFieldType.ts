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
import type { DeepReadonly, Prettify } from "../utility-types";
import type { InferParamsType } from "./InferParamsType";

export type InferParamTypeFromFieldType<TField extends DeepReadonly<H5PField>> =
  Prettify<
    TField extends DeepReadonly<H5PFieldAudio>
      ? TField["optional"] extends true
        ? Audio | undefined
        : Audio
      : TField extends DeepReadonly<H5PFieldBoolean>
      ? TField["optional"] extends true
        ? TField extends { default: boolean }
          ? boolean
          : boolean | undefined
        : boolean
      : TField extends DeepReadonly<H5PFieldFile>
      ? TField["optional"] extends true
        ? Media | undefined
        : Media
      : TField extends DeepReadonly<H5PFieldGroup>
      ? TField["optional"] extends true
        ? InferParamsType<TField> | undefined
        : InferParamsType<TField>
      : TField extends DeepReadonly<H5PFieldImage>
      ? TField["optional"] extends true
        ? Image | undefined
        : Image
      : TField extends DeepReadonly<H5PFieldLibrary>
      ? TField["optional"] extends true
        ? TField extends { default: unknown }
          ? unknown
          : unknown | undefined
        : unknown
      : TField extends DeepReadonly<H5PFieldList>
      ? TField["optional"] extends true
        ? Array<InferParamsType<TField["field"]>> | undefined
        : Array<InferParamsType<TField["field"]>>
      : TField extends DeepReadonly<H5PFieldNumber>
      ? TField["optional"] extends true
        ? TField extends { default: number }
          ? number
          : number | undefined
        : number
      : TField extends DeepReadonly<H5PFieldSelect>
      ? TField["optional"] extends true
        ? TField extends { default: string | number | boolean }
          ? TField["options"][number]["value"]
          : TField["options"][number]["value"] | undefined
        : TField["options"][number]["value"]
      : TField extends DeepReadonly<H5PFieldText>
      ? TField["optional"] extends true
        ? TField extends { default: string }
          ? string
          : string | undefined
        : string
      : TField extends DeepReadonly<H5PFieldVideo>
      ? TField["optional"] extends true
        ? Video | undefined
        : Video
      : never
  >;

/**
 * @deprecated Use InferParamTypeFromFieldType instead
 */
export type ParamTypeInferredFromFieldType<
  TField extends DeepReadonly<H5PField>,
> = InferParamTypeFromFieldType<TField>;
