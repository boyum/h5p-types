// Structs
export {
  H5PAudio,
  /** @deprecated Use {@link H5PAudio} */ H5PAudio as Audio,
} from "./packages/h5p-types/src/types/H5PAudio";
export { H5PBehaviour } from "./packages/h5p-types/src/types/H5PBehaviour";
export { H5PCCVersions } from "./packages/h5p-types/src/types/H5PCCVersions";
export { H5PContentId } from "./packages/h5p-types/src/types/H5PContentId";
export {
  H5PCopyright,
  /** @deprecated Use {@link H5PCopyright} */ H5PCopyright as Copyright,
} from "./packages/h5p-types/src/types/H5PCopyright";
export { H5PCopyrightLicenses } from "./packages/h5p-types/src/types/H5PCopyrightLicenses";
export { H5PDisplayOptions } from "./packages/h5p-types/src/types/H5PDisplayOptions";
export { H5PEnterMode } from "./packages/h5p-types/src/types/H5PEnterMode";
export { H5PExtras } from "./packages/h5p-types/src/types/H5PExtras";
export { H5PExtrasWithState } from "./packages/h5p-types/src/types/H5PExtrasWithState";
export {
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
} from "./packages/h5p-types/src/types/H5PField";
export { H5PFieldWidgetExtension } from "./packages/h5p-types/src/types/H5PFieldWidgetExtension";
// export {H5PFont} from "./src/types/H5PFont";
export { H5PForm } from "./packages/h5p-types/src/types/H5PForm";
export { H5PGroup } from "./packages/h5p-types/src/types/H5PGroup";
export {
  H5PImage,
  /** @deprecated Use {@link H5PImage} */ H5PImage as Image,
} from "./packages/h5p-types/src/types/H5PImage";
export { H5PImportance } from "./packages/h5p-types/src/types/H5PImportance";
export { H5PL10n } from "./packages/h5p-types/src/types/H5PL10n";
export {
  H5PLibrary,
  /** @deprecated Use {@link H5PLibrary} */ H5PLibrary as Library,
} from "./packages/h5p-types/src/types/H5PLibrary";
export { H5PLibraryInfo } from "./packages/h5p-types/src/types/H5PLibraryInfo";
export {
  H5PMedia,
  H5PMedia as /** @deprecated Use {@link H5PMedia} */ Media,
} from "./packages/h5p-types/src/types/H5PMedia";
export { H5PMediaCopyright } from "./packages/h5p-types/src/types/H5PMediaCopyright";
export { H5PMetadata } from "./packages/h5p-types/src/types/H5PMetadata";
export { H5PMetadataForm } from "./packages/h5p-types/src/types/H5PMetadataForm";
export { H5PNewRunnableLibraryParam } from "./packages/h5p-types/src/types/H5PNewRunnableLibraryParam";
export { H5PSetValue } from "./packages/h5p-types/src/types/H5PSetValue";

// Object structs
export { H5PEditorObject } from "./packages/h5p-types/src/types/H5PEditorObject";
export { H5PIntegrationObject } from "./packages/h5p-types/src/types/H5PIntegrationObject";
export { H5PObject } from "./packages/h5p-types/src/types/H5PObject";

// Classes
export { EventDispatcher } from "./packages/h5p-types/src/types/EventDispatcher";
export { H5PClipboardItem } from "./packages/h5p-types/src/types/H5PClipboardItem";
export { H5PCommunicator } from "./packages/h5p-types/src/types/H5PCommunicator";
export { H5PConfirmationDialog } from "./packages/h5p-types/src/types/H5PConfirmationDialog";
export { H5PContentCopyrights } from "./packages/h5p-types/src/types/H5PContentCopyrights";
export { H5PCoords } from "./packages/h5p-types/src/types/H5PCoords";
export { H5PDefinitionList } from "./packages/h5p-types/src/types/H5PDefinitionList";
export { H5PDialog } from "./packages/h5p-types/src/types/H5PDialog";
export { H5PEditorContentType } from "./packages/h5p-types/src/types/H5PEditorContentType";
export { H5PEvent } from "./packages/h5p-types/src/types/H5PEvent";
export { H5PFieldClass } from "./packages/h5p-types/src/types/H5PFieldClass";
export { H5PThumbnail } from "./packages/h5p-types/src/types/H5PThumbnail";
export {
  H5PVideo,
  /** @deprecated Use {@link H5PVideo} */ H5PVideo as Video,
} from "./packages/h5p-types/src/types/H5PVideo";

// Enums
export { H5PFieldType } from "./packages/h5p-types/src/types/H5PFieldType";

// Widget helpers
export { H5PShowWhenOptions } from "./packages/h5p-types/src/types/H5PShowWhenOptions";
export { H5PShowWhenRule } from "./packages/h5p-types/src/types/H5PShowWhenRule";
export { H5PTextFieldWidgetExtension } from "./packages/h5p-types/src/types/H5PTextFieldWidgetExtension";
export { H5PTextTags } from "./packages/h5p-types/src/types/H5PTextTags";

// Interfaces
export { IH5PContentType } from "./packages/h5p-types/src/types/Interfaces/IH5PContentType";
export { IH5PEditorImageField } from "./packages/h5p-types/src/types/Interfaces/IH5PEditorImageField";
export { IH5PFieldInstance } from "./packages/h5p-types/src/types/Interfaces/IH5PFieldInstance";
export { IH5PQuestionType } from "./packages/h5p-types/src/types/Interfaces/IH5PQuestionType";
export { IH5PResumableType } from "./packages/h5p-types/src/types/Interfaces/IH5PResumableType";
export { IH5PWidget } from "./packages/h5p-types/src/types/Interfaces/IH5PWidget";

// Infer utils
export { InferGroupParams } from "./packages/h5p-types/src/types/InferGroupParams";
export { InferL10nType } from "./packages/h5p-types/src/types/InferL10nType";
export { InferParamsFromSemantics } from "./packages/h5p-types/src/types/InferParamsFromSemantics";
export {
  InferParamTypeFromFieldType,
  /** @deprecated Use {@link InferParamTypeFromFieldType} */ InferParamTypeFromFieldType as ParamTypeInferredFromFieldType,
} from "./packages/h5p-types/src/types/InferParamTypeFromFieldType";
export {
  TranslationHasParams,
  TranslationParams,
} from "./packages/h5p-types/src/types/InferTranslationParams";

// XAPI
export { XAPIData } from "./packages/h5p-types/src/types/XAPI/XAPIData";
export { XAPIDefinition } from "./packages/h5p-types/src/types/XAPI/XAPIDefinition";
export { XAPIEvent } from "./packages/h5p-types/src/types/XAPI/XAPIEvent";
export { XAPIInteractionType } from "./packages/h5p-types/src/types/XAPI/XAPIInteractionType";
export { XAPIStatement } from "./packages/h5p-types/src/types/XAPI/XAPIStatement";
export { XAPIVerb } from "./packages/h5p-types/src/types/XAPI/XAPIVerb";

// Type-fest
// We re-export type-fest types to avoid having to install it as a dependency
// Until TS 5, the ReadonlyDeep type is needed when inputting types to `InferParamsFromSemantics`
export {
  ReadonlyDeep,
  /** @deprecated Use {@link ReadonlyDeep} */ ReadonlyDeep as DeepReadonly,
} from "type-fest";
