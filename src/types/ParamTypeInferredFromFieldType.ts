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
import type { DeepReadonly } from "../utility-types";

export type ParamTypeInferredFromFieldType<
  TField extends DeepReadonly<H5PField>,
> = TField extends DeepReadonly<H5PFieldAudio>
  ? Audio
  : TField extends DeepReadonly<H5PFieldBoolean>
  ? boolean
  : TField extends DeepReadonly<H5PFieldFile>
  ? Media
  : TField extends DeepReadonly<H5PFieldGroup>
  ? unknown | Record<string, unknown>
  : TField extends DeepReadonly<H5PFieldImage>
  ? Image
  : TField extends DeepReadonly<H5PFieldLibrary>
  ? unknown
  : TField extends DeepReadonly<H5PFieldList>
  ? Array<unknown>
  : TField extends DeepReadonly<H5PFieldNumber>
  ? number
  : TField extends DeepReadonly<H5PFieldSelect>
  ? string | boolean | number
  : TField extends DeepReadonly<H5PFieldText>
  ? string
  : TField extends DeepReadonly<H5PFieldVideo>
  ? Video
  : never;
