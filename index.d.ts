// Structs
export {
  H5PAudio,
  /** @obsolete Use {@link H5PAudio} */ H5PAudio as Audio,
} from "./src/types/H5PAudio";
export { H5PBehaviour } from "./src/types/H5PBehaviour";
export { H5PCCVersions } from "./src/types/H5PCCVersions";
export { H5PContentId } from "./src/types/H5PContentId";
export {
  H5PCopyright,
  /** @obsolete Use {@link H5PCopyright} */ H5PCopyright as Copyright,
} from "./src/types/H5PCopyright";
export { H5PCopyrightLicenses } from "./src/types/H5PCopyrightLicenses";
export { H5PDisplayOptions } from "./src/types/H5PDisplayOptions";
export { H5PEnterMode } from "./src/types/H5PEnterMode";
export { H5PExtras } from "./src/types/H5PExtras";
export { H5PField } from "./src/types/H5PField";
export { H5PFieldWidgetExtension } from "./src/types/H5PFieldWidgetExtension";
// export {H5PFont} from "./src/types/H5PFont";
export { H5PForm } from "./src/types/H5PForm";
export { H5PGroup } from "./src/types/H5PGroup";
export {
  H5PImage,
  /** @obsolete Use {@link H5PImage} */ H5PImage as Image,
} from "./src/types/H5PImage";
export { H5PImportance } from "./src/types/H5PImportance";
export { H5PL10n } from "./src/types/H5PL10n";
export {
  H5PLibrary,
  /** @obsolete Use {@link H5PLibrary} */ H5PLibrary as Library,
} from "./src/types/H5PLibrary";
export { H5PLibraryInfo } from "./src/types/H5PLibraryInfo";
export {
  H5PMedia,
  H5PMedia as /** @obsolete Use {@link H5PMedia} */ Media,
} from "./src/types/H5PMedia";
export { H5PMediaCopyright } from "./src/types/H5PMediaCopyright";
export { H5PMetadata } from "./src/types/H5PMetadata";
export { H5PMetadataForm } from "./src/types/H5PMetadataForm";
export { H5PNewRunnableLibraryParam } from "./src/types/H5PNewRunnableLibraryParam";
export { H5PSetValue } from "./src/types/H5PSetValue";

// Object structs
export { H5PEditorObject } from "./src/types/H5PEditorObject";
export { H5PIntegrationObject } from "./src/types/H5PIntegrationObject";
export { H5PObject } from "./src/types/H5PObject";

// Classes
export { H5PClipboardItem } from "./src/types/H5PClipboardItem";
export { H5PCommunicator } from "./src/types/H5PCommunicator";
export { H5PConfirmationDialog } from "./src/types/H5PConfirmationDialog";
export { H5PContentCopyrights } from "./src/types/H5PContentCopyrights";
export { H5PCoords } from "./src/types/H5PCoords";
export { H5PDefinitionList } from "./src/types/H5PDefinitionList";
export { H5PDialog } from "./src/types/H5PDialog";
export { H5PEditorContentType } from "./src/types/H5PEditorContentType";
export { H5PEvent } from "./src/types/H5PEvent";
export { H5PFieldClass } from "./src/types/H5PFieldClass";
export { H5PThumbnail } from "./src/types/H5PThumbnail";
export {
  H5PVideo,
  /** @obsolete Use {@link H5PVideo} */ H5PVideo as Video,
} from "./src/types/H5PVideo";

// Enums
export { H5PFieldType } from "./src/types/H5PFieldType";

// Widget helpers
export { H5PShowWhenOptions } from "./src/types/H5PShowWhenOptions";
export { H5PShowWhenRule } from "./src/types/H5PShowWhenRule";
export { H5PTextFieldWidgetExtension } from "./src/types/H5PTextFieldWidgetExtension";
export { H5PTextTags } from "./src/types/H5PTextTags";

// Interfaces
export { IH5PContentType } from "./src/types/IH5PContentType";
export { IH5PEditorImageField } from "./src/types/IH5PEditorImageField";
export { IH5PFieldInstance } from "./src/types/IH5PFieldInstance";
export { IH5PWidget } from "./src/types/IH5PWidget";

// Infer utils
export { InferGroupParams } from "./src/types/InferGroupParams";
export { InferParamsFromSemantics } from "./src/types/InferParamsFromSemantics";
export { InferParamTypeFromFieldType } from "./src/types/InferParamTypeFromFieldType";

// XAPI
export { XAPIDefinition } from "./src/types/XAPIDefinition";
export { XAPIEvent } from "./src/types/XAPIEvent";
export { XAPIVerb } from "./src/types/XAPIVerb";

// Type-fest
// We re-export type-fest types to avoid having to install it as a dependency
// Until TS 5, the ReadonlyDeep type is needed when inputting types to `InferParamsFromSemantics`
export {
  ReadonlyDeep,
  /** @obsolete Use {@link ReadonlyDeep} */ ReadonlyDeep as DeepReadonly,
} from "type-fest";
