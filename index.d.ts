export type Audio = Media;

export type Copyright = {
  author?: string;
  license?: string;
  source?: string;
  title?: string;
  version?: string;
  year?: string;
};

export declare class EventDispatcher {
  /**
   * Add new event listener.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param type
   *   Event type
   * @param listener
   *   Event listener
   * @param [thisArg]
   *   Optionally specify the this value when calling listener.
   */
  on: (
    type: string,
    listener: (event: unknown) => void,
    thisArg?: ThisType<unknown>
  ) => void;
  /**
   * Add new event listener that will be fired only once.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param type
   *   Event type
   * @param listener
   *   Event listener
   * @param thisArg
   *   Optionally specify the this value when calling listener.
   */
  once: (
    type: string,
    listener: (event: unknown) => void,
    thisArg?: ThisType<unknown>
  ) => void;
  /**
   * Remove event listener.
   * If no listener is specified, all listeners will be removed.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param  type
   *   Event type
   * @param listener
   *   Event listener
   */
  off: (type: string, listener: (event: unknown) => void) => void;
  /**
   * Dispatch event.
   *
   * @param event
   *   Event object or event type as string
   * @param [eventData]
   *   Custom event data(used when event type as string is used as first
   *   argument).
   * @param [extras]
   */
  trigger: (
    event: string | unknown,
    eventData?: unknown,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    }
  ) => void;
  triggerXAPI: (verb: XAPIVerb, extra: unknown) => void;
  createXAPIEventTemplate<TVerb extends XAPIVerb>(
    verb: TVerb,
    extra: unknown
  ): XAPIEvent;
}

export type H5PBehaviour =
  | H5PFieldGroup
  | {
      name: "behaviour";
    };

export type H5PCCVersions = {
  default: string;
  "4.0": string;
  "3.0": string;
  "2.5": string;
  "2.0": string;
  "1.0": string;
};

export declare class H5PConfirmationDialog extends EventDispatcher {
  constructor(options: {
    instance: IH5PContentType;
    headerText?: string;
    dialogText?: string;
    cancelText?: string;
    confirmText?: string;
    hideCancel?: boolean;
    hideExit?: boolean;
    skipRestoreFocus?: boolean;
    classes?: Array<string>;
  });
  show(offsetTop: number): ThisType<H5PConfirmationDialog>;
  hide(): ThisType<H5PConfirmationDialog>;
  /**
   * @return The ConfirmationDialog HTML element
   */
  getElement(): HTMLElement;
  /**
   * @return The element that had focus before the ConfirmationDialog was opened
   */
  getPreviouslyFocused(): HTMLElement;
  setViewPortMinimumHeight(minimumHeight: number | null): void;
}

export type H5PCopyrightLicenses = {
  U: string;
  "CC BY": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };
  "CC BY-SA": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };
  "CC BY-ND": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };
  "CC BY-NC": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };
  "CC BY-NC-SA": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };
  "CC BY-NC-ND": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };
  "CC0 1.0": {
    label: string;
    link: string;
  };
  "GNU GPL": {
    label: string;
    link: string;
    linkVersions: {
      v3: string;
      v2: string;
      v1: string;
    };
    versions: {
      default: string;
      v3: string;
      v2: string;
      v1: string;
    };
  };
  PD: {
    label: string;
    versions: {
      "CC0 1.0": {
        label: string;
        link: string;
      };
      "CC PDM": {
        label: string;
        link: string;
      };
    };
  };
  "ODC PDDL": string;
  "CC PDM": {
    label: string;
    link: string;
  };
  C: string;
};

export declare class H5PDialog {
  /**
   * @param name Used for the Dialog's HTML class
   * @param title Inserted as the title in the Dialog
   * @param content HTML content in the Dialog
   * @param $element Which element to insert the Dialog _after_
   */
  constructor(
    name: string,
    title: string,
    content: string,
    $element: JQuery<HTMLElement>
  );
  /**
   * @param scrollbar
   */
  open(scrollbar?: boolean): void;
  close(): void;
}

/**
 * @param TWidgetMachineName Typically PascalCased - MyWidget
 * @param TWidgetName Typically camelCased - myWidget
 * @param TWidget The widget class
 */
export type H5PEditorObject<
  TWidgetMachineName extends string = never,
  TWidgetName extends string = never
> = {
  $: typeof jQuery;
  contentId: string;
  widgets: Record<string, unknown> & Record<TWidgetName, unknown>;
  /**
   * Translate text strings.
   *
   * @param library The library name(machineName), or "core".
   * @param key Translation string identifier.
   * @param vars Placeholders and values to replace in the text.
   *
   * @returns Translated string, or a default text if the translation is missing.
   */
  t: (
    library: "core" | `H5PEditor.${string}` | `H5PEditor.${TWidgetMachineName}`,
    key: string,
    vars?: Record<string, string>
  ) => string;
  /**
   * Recursive processing of the semantics chunks.
   *
   * @param semanticsChunk
   * @param params
   * @param $wrapper
   * @param parent
   * @param [machineName] Machine name of library that is being processed
   */
  processSemanticsChunk: <TField extends Array<H5PField> = Array<H5PField>>(
    semanticsChunk: TField,
    params: Record<
      TField[number]["name"],
      ParamTypeInferredFromFieldType<TField[number]>
    >,
    $wrapper: JQuery<HTMLElement>,
    parent: H5PForm,
    machineName?: string
  ) => void;
  /**
   * Search for a field or a set of fields. Returns `null` if the field isn't found.
   *
   * @param fieldName
   * @param semanticsStructure
   */
  findSemanticsField: (
    fieldName: string,
    semanticsStructure: H5PField | Array<H5PField>
  ) => H5PField | Array<H5PField> | null;
} & Record<string, unknown> &
  Record<`${TWidgetMachineName}`, unknown>;

export type H5PEnterMode = "p" | "div";

export declare class H5PEvent<TData = unknown> {
  type: string;
  data: {
    statement: {
      actor: {
        name: string;
        mbox: string;
        objectType: string;
      };
      contentId: number;
      context: {
        contextActivities: {
          category: Array<{ id: string; objectType: string }>;
        };
      };
      object: {
        id: string;
        objectType: string;
        definition: XAPIDefinition;
      };
    } & TData;
  };
  extras?: {
    bubbles?: boolean;
    external?: boolean;
  };
  constructor(
    type: string,
    data: TData,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    }
  );
  /**
   * Prevent this event from bubbling up to parent
   */
  preventBubbling(): void;
  /**
   * Get bubbling status
   *
   * @returns
   *   true if bubbling false otherwise
   */
  getBubbles(): boolean;
  /**
   * Try to schedule an event for externalDispatcher
   *
   * @returns
   *   true if external and not already scheduled, otherwise false
   */
  scheduleForExternal(): boolean;
}

export type H5PExtras = {
  metadata: H5PMetadata;
  standalone: boolean;
};

type H5PFieldCommon = {
  /**
   * Internal name of the field. Must be a valid JavaScript identifier string.
   *
   * @see https://h5p.org/semantics#attribute-name
   */
  name: string;
  /**
   * The field's label in the editor.
   *
   * @see https://h5p.org/semantics#attribute-label
   */
  label: string;
  /**
   * Description displayed with the field in the editor.
   *
   * @see https://h5p.org/semantics#attribute-description
   */
  description?: string;
  /**
   * Set to true for optional fields.
   *
   * @default false
   *
   * @see https://h5p.org/semantics#attribute-optional
   */
  optional?: boolean;
  /**
   *  An indication of the field's importance.
   *  Is typically used by the editor giving a
   *  more prominent style on the more important
   *  fields, but could e.g. also be used to
   *  generate weighted input to a search engine.
   *
   *  @default "medium"
   *
   *  @see https://h5p.org/semantics#attribute-importance
   */
  importance?: H5PImportance;
  /**
   * If set to true, all instances of this
   * library will use the same value for this
   * field. The editor will display the input
   * for this field in a "Common fields"
   * container at the end of the editor form.
   *
   * @default false
   *
   * @see https://h5p.org/semantics#attribute-common
   */
  common?: boolean;
};
export type H5PField =
  | H5PFieldAudio
  | H5PFieldBoolean
  | H5PFieldFile
  | H5PFieldGroup
  | H5PFieldImage
  | H5PFieldLibrary
  | H5PFieldList
  | H5PFieldNumber
  | H5PFieldSelect
  | H5PFieldText
  | H5PFieldVideo;
export type H5PFieldText =
  | H5PFieldCommon &
      H5PTextFieldWidgetExtension & {
        type: "text";
        default?: string;
        widget?: string;
        maxLength?: number;
        regexp?: string;
        enterMode?: H5PEnterMode;
        font?: string;
        /**
         * This attribute is used to give more detailed instructions and contains two parts, i.e description and example.
         *
         * @example
         * ```
         * important: {
         *   description: "<ul><li>Marked words are added with an asterisk (*).</li><li>Asterisks can be added within marked words by adding another asterisk, *correctword*** => correctword*.</li></ul>",
         *   example: "The correct words are marked with like this: *correctword*, an asterisk is written like this: *correctword***."
         * }
         * ```
         *
         * @see https://h5p.org/semantics#attribute-important
         */
        important?: {
          description?: string;
          example?: string;
        };
      };
export type H5PFieldNumber =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "number";
        default?: number;
        widget?: string;
        min?: number;
        max?: number;
        steps?: number;
        /**
         * The number of decimal digits allowed. Use 0 for integer values.
         *
         * @default 0
         *
         * @see https://h5p.org/semantics#attribute-decimals
         */
        decimals?: number;
      };
export type H5PFieldBoolean =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "boolean";
        default: boolean;
        widget?: string;
      };
export type H5PFieldGroup =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "group";
        widget?: string;
        fields: Array<H5PField>;
        isSubContent?: boolean;
        /**
         * If set to true, group will be expanded. If set to false or not set at all, group will be collapsed. An exception is for groups in lists - they will be expanded except if this value is false.
         *
         * @default false
         *
         * @see https://h5p.org/semantics#attribute-expanded
         */
        expanded?: boolean;
      };
export type H5PFieldList =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "list";
        /**
         * List containing widget(s). A widget is defined as
         * an object with the name of the widget and a label.
         * Currently no widgets are provided by the core system,
         * but the H5PEditor.VerticalTabs library provides
         * `verticalTabs` as an option.
         *
         * @example
         * ```
         * widgets: [
         *  {
         *    "name": "ListEditor",
         *    "label": "Default"
         *  },
         *  {
         *    "name": "SummaryTextualEditor",
         *    "label": "Textual"
         *  }
         * ]
         * ```
         *
         * @see https://h5p.org/semantics#attribute-widgets
         */
        widgets?: Array<{ name: string; label: string }>;
        field: H5PField;
        min?: number;
        max?: number;
        /**
         * Name for a single entity in the list.
         *
         * @see https://h5p.org/semantics#attribute-entity
         */
        entity: string;
      };
export type H5PFieldSelect =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "select";
        default: string | number | boolean;
        widget?: string;
        options: Array<{ value: string | number | boolean; label: string }>;
      };
export type H5PFieldLibrary =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "library";
        widget?: string;
        default: string;
        options: Array<string>;
      };
export type H5PFieldImage =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "image";
        widget?: string;
      };
export type H5PFieldVideo =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "video";
        widget?: string;
      };
export type H5PFieldAudio =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "audio";
        widget?: string;
      };
export type H5PFieldFile =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "file";
        widget?: string;
      };

export type H5PFieldWidgetExtension =
  | {
      widget?: string;
    }
  | {
      // To use the Show When or NDLA Show When widgets, first add them to the editorDependencies list in library.json
      widget: "showWhen" | "NDLAShowWhen";
      showWhen: H5PShowWhenOptions;
    }
  | {
      widget: "NDLATagsPicker";
      fieldNameToWatch: string;
    };

export type H5PFont = {
  size:
    | boolean
    | Array<{
        label: string;
        /** Applied to `font-size` */
        css: string;
        default?: boolean;
      }>;
  family:
    | boolean
    | Array<{
        label: string;
        /** Applied to `font-family */
        css: string;
      }>;
  color:
    | boolean
    | Array<{
        label: string;
        /** Applied to `color` */
        css: string;
      }>;
  background: boolean;
};

type UberName = `H5P.${string} ${number}.${number}`;
export type H5PForm<TParams = unknown> = {
  parent: H5PForm | null;
  $common: JQuery<HTMLElement> | null;
  $commonButton: JQuery<HTMLElement> | null;
  $form: JQuery<HTMLElement> | null;
  /**
   * Add new languages for content type.
   *
   * @param {string} libraryName
   * @param {Array} langs
   */
  addLanguages: (
    libraryName: string,
    languageCodes: Array<string | undefined>
  ) => void;
  children: Array<H5PGroup>;
  commonFields: Record<
    UberName,
    {
      l10n: {
        instance: H5PGroup;
        params: unknown;
        parents: H5PForm;
        setValues: H5PSetValue<unknown>;
      };
    }
  >;
  currentLibrary: UberName;
  metadata: H5PMetadata;
  metadataForm: H5PMetadataForm | null;
  offset: { top: number; left: number };
  params: TParams;
  passReadies: boolean;
  readies: Array<unknown>;
  removeLanguages: (
    libraryName: string,
    languageCodes: Array<string | undefined>
  ) => void;
  zebra: "odd" | "even";
  ready: (callback: () => void) => void;
};

export type H5PGroup = EventDispatcher & {
  parent: H5PForm;
};

export type H5PImportance = "low" | "medium" | "high";

export type H5PIntegrationObject = {
  baseUrl: string;
  url: string;
  postUserStatistics: boolean;
  ajax: {
    setFinished: string;
    contentUserData: string;
  };
  saveFreq: false | number;
  /** True if `Enable LRS dependent content types` is set to true, else false */
  reportingIsEnabled: boolean;
  l10n: {
    H5P: Record<string, string>;
  };
  hubIsEnabled: boolean;
  crossorigin: unknown;
  crossoriginCacheBuster: unknown;
  libraryConfig: unknown;
  pluginCacheBuster: string;
  libraryUrl: string;
  user: {
    name: string;
    mail: string;
  };
  contents: Record<string, unknown>;
  core: {
    scripts: Array<string>;
    styles: Array<string>;
  };
};

export type H5PL10n =
  | H5PFieldGroup & {
      name: "l10n";
      fields: Array<H5PFieldText | { default: string }>;
      common: boolean;
    };

export type Library = {
  title: string;
  machineName: string;
  majorVersion: number;
  minorVersion: number;
  patchVersion: number;
  runnable?: number;
  preloadedJs?: { path: string }[];
  preloadedCss?: { path: string }[];
  preloadedDependencies?: {
    machineName: string;
    majorVersion: number;
    minorVersion: number;
  }[];
};

export declare class H5PMediaCopyright {
  constructor(
    copyright: Record<string, string> & {
      license: string;
      version?: string;
    },
    labels?: Record<string, string>,
    order?: Array<string>,
    extraFields?: Record<string, string>
  );
  setThumbnail(newThumbnail: H5PThumbnail): void;
  /**
   * Checks if this copyright is undisclosed.
   * I.e. only has the license attribute set, and it's undisclosed.
   */
  undisclosed(): boolean;
  /**
   * @return HTML representation of Copyright
   */
  toString(): string;
}

export type H5PMetadata = {
  license: string;
  title: string;
  extraTitle: string;
  authors: Array<unknown>;
  changes: Array<unknown>;
};

export type H5PMetadataForm = EventDispatcher & {
  passReadies: boolean;
  appendTo($wrapper: JQuery<HTMLElement>): void;
  appendButtonTo($wrapper: JQuery<HTMLElement>): void;
  children: Array<H5PGroup>;
  getExtraTitleField: () => H5PField;
  ready: (callback: () => void) => void;
};

export type H5PObject = {
  // Constants
  copyrightLicenses: H5PCopyrightLicenses;
  // Functions
  buildMetadataCopyrights(metadata: H5PMetadata): H5PMediaCopyright;
  createUUID: () => string;
  getCopyrights(instance: IH5PContentType): string;
  getPath: (path: string, contentId: string) => string;
  newRunnable: (
    library: { library: string; params: unknown },
    contentId: string,
    $attachTo: JQuery,
    skipResize?: boolean,
    extras?: unknown
  ) => void;
  // Classes
  jQuery: typeof jQuery;
  ConfirmationDialog: typeof H5PConfirmationDialog;
  Dialog: typeof H5PDialog;
  EventDispatcher: typeof EventDispatcher;
};

export type H5PSetValue<Params> = (field: H5PField, params: Params) => void;

export type H5PShowWhenOptions = {
  rules: Array<H5PShowWhenRule>;
  /**
   * True means field is removed from DOM when hidden.
   * Default behaviour is hiding it using CSS (display: none).
   */
  detach?: boolean;
  /**
   * @default "or"
   */
  type?: "and" | "or";
  widget?: string;
};

export type H5PShowWhenRule = {
  field: string;
  equals?: string | Array<string> | boolean;
};

export type H5PTextFieldWidgetExtension =
  | H5PFieldWidgetExtension
  | {
      widget: "html";
      tags: Array<H5PTextTags>;
    }
  | {
      widget: "colorSelector";
      /**
       * @see http://bgrins.github.io/spectrum/#options
       */
      spectrum?: {
        showPalette: boolean;
        /**
         * Hides the custom color picker.
         * Requires `showPalette` to be set to `true`.
         *
         * @see http://bgrins.github.io/spectrum/#options-showPaletteOnly
         */
        showPaletteOnly?: boolean;
        palette?: Array<Array<string>>;
      };
    };

export type H5PTextTags =
  | "a"
  | "blockquote"
  | "br"
  | "em"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "hr"
  | "ol"
  | "p"
  | "strike"
  | "strong"
  | "sub"
  | "sup"
  | "table"
  | "u"
  | "ul";

export declare class H5PThumbnail {
  constructor(source: string, width: number, height: number);
  /**
   * @return HTML representation of thumbnail
   */
  toString(): string;
}

export interface IH5PContentType {
  attach($wrapper: JQuery<HTMLElement>): void;
}

export interface IH5PWidget {
  // TODO: Add constructor interface
  appendTo($container: JQuery<HTMLElement>): void;
  validate(): boolean;
  remove(): void;
}

export type Image = Media & {
  alt?: string;
  height?: number;
  width?: number;
};

export type Media = {
  path: string;
  mime?: string;
  copyright?: Copyright;
};

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

export type Video = Media;

export type XAPIDefinition = {
  name: Record<string, string>;
  description: Record<string, string>;
  type: string;
  interactionType: string;
  correctResponsesPattern: string;
};

export declare class XAPIEvent extends H5PEvent {
  type: "xAPI";
  constructor();
  /**
   * Set scored result statements.
   */
  setScoredResult(
    score: number,
    maxScore: number,
    instance: H5PObject,
    completion: number,
    success: number
  ): void;
  /**
   * Set a verb.
   *
   * @param verb
   *   Verb in short form, one of the verbs defined at
   *   {@link https://help.csod.com/help/csod_0/Content/Catalog/xAPI_Package_Support/xAPI_Appendix.htm?TocPath=Learning%7CContent%7CxAPI%7C_____6}
   *
   */
  setVerb(verb: XAPIVerb): void;
  /**
   * Get the statements verb id.
   *
   * @param full
   *   if true the full verb id prefixed by http://adlnet.gov/expapi/verbs/
   *   will be returned
   * @returns
   *   Verb or null if no verb with an id has been defined
   */
  getVerb(full: boolean): `http://adlnet.gov/expapi/verbs/${XAPIVerb}` | null;
  /**
   * Set the object part of the statement.
   *
   * The id is found automatically (the url to the content)
   *
   * @param instance
   *   The H5P instance
   */
  setObject(instance: IH5PContentType): void;
  /**
   * Set the context part of the statement.
   *
   * @param instance
   *   The H5P instance
   */
  setContext(instance: IH5PContentType): void;
  /**
   * Set the actor. Email and name will be added automatically.
   */
  setActor(): void;
  /**
   * Figure out if a property exists in the statement and return it
   *
   * @param keys
   *   List describing the property we're looking for. For instance
   *   ['result', 'score', 'raw'] for result.score.raw
   * @returns
   *   The value of the property if it is set, null otherwise.
   */
  getVerifiedStatementValue(keys: Array<string>): unknown;
}

export type XAPIVerb =
  | "answered"
  | "asked"
  | "attempted"
  | "attended"
  | "commented"
  | "completed"
  | "exited"
  | "experienced"
  | "failed"
  | "imported"
  | "initialized"
  | "interacted"
  | "launched"
  | "mastered"
  | "passed"
  | "preferred"
  | "progressed"
  | "registered"
  | "responded"
  | "resumed"
  | "scored"
  | "shared"
  | "suspended"
  | "terminated"
  | "voided"
  | "downloaded"
  | "copied"
  | "accessed-reuse"
  | "accessed-embed"
  | "accessed-copyright";