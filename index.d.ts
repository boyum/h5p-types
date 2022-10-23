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
   * Add new event listener
   *
   * @throws {TypeError} listener must be a function
   *
   * @param type Event type
   * @param listener Event listener
   * @param thisArg Optionally specify the this value when calling listener
   */
  on: <TData = unknown>(
    type: string,
    listener: (event: H5PEvent<TData>) => void,
    thisArg?: ThisType<unknown>,
  ) => void;
  /**
   * Add new event listener that will be fired only once
   *
   * @throws {TypeError} listener must be a function
   *
   * @param type Event type
   * @param listener Event listener
   * @param thisArg Optionally specify the `this` value when calling listener
   */
  once: <TData = unknown>(
    type: string,
    listener: (event: H5PEvent<TData>) => void,
    thisArg?: ThisType<unknown>,
  ) => void;
  /**
   * Remove event listener
   * If no listener is specified, all listeners will be removed
   *
   * @throws {TypeError} listener must be a function
   *
   * @param type Event type
   * @param listener Event listener
   */
  off: <TData = unknown>(
    type: string,
    listener?: (event: TData) => void,
  ) => void;
  /**
   * Dispatch event
   *
   * @param event Event object or event type as string
   * @param eventData Custom event data (used when event type as string is used as first argument)
   * @param extras
   */
  trigger: <TData = unknown>(
    event: string | unknown,
    eventData?: TData,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    },
  ) => void;
  triggerXAPI: (verb: XAPIVerb, extra: unknown) => void;
  createXAPIEventTemplate<TVerb extends XAPIVerb>(
    verb: TVerb,
    extra: unknown,
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

export declare class H5PClipboardItem<TParams extends Record<string, unknown>> {
  constructor(
    parameters: TParams,
    genericProperty?: keyof TParams,
    specificKey?: string,
  );
}

export declare class H5PCommunicator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  on(action: string, handler: Function): void;
  send(action: string, data?: Record<string, unknown>): void;
}

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

export declare class H5PContentCopyrights {
  /**
   * Set label
   *
   * @param newLabel
   */
  setLabel(newLabel: string): void;
  /**
   * Add sub content
   *
   * @param media
   */
  addMedia(media: H5PMediaCopyright): void;
  /**
   * Add sub content in front
   *
   * @param newMedia
   */
  addMediaInFront(newMedia: H5PMediaCopyright): void;
  /**
   * Add sub content
   *
   * @param newContent
   */
  addContent(newContent: H5PContentCopyrights): void;
  /**
   * Print content copyright
   *
   * @returns HTML
   */
  toString(): string;
}

export type H5PContentId = string | number;

export declare class H5PCoords {
  constructor(x: number, y: number, width: number, height: number);
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

export declare class H5PDefinitionList {
  constructor();
  /**
   * Add field to the list
   *
   * @param field
   */
  add(field: H5PFieldClass): void;
  /**
   * Get number of fields
   */
  size(): number;
  /**
   * Get field at given index
   *
   * @param index
   */
  get(index: number): H5PFieldClass | undefined;
  /**
   * Print definition list as HTML
   */
  toString(): string;
}

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
    $element: JQuery<HTMLElement>,
  );
  /**
   * @param scrollbar
   */
  open(scrollbar?: boolean): void;
  close(): void;
}

export type H5PDisplayOptions = {
  copy?: boolean;
  copyright?: boolean;
  embed?: boolean;
  export?: boolean;
  frame?: boolean;
  icon?: boolean;
};

/**
 * @param TWidgetMachineName Typically PascalCased - MyWidget
 * @param TWidgetName Typically camelCased - myWidget
 * @param TWidget The widget class
 *
 * @see https://h5p.org/node/2468
 */
export type H5PEditorObject<
  TWidgetMachineName extends string = never,
  TWidgetName extends string = never,
> = {
  // --- Properties ---
  constants: {
    otherLibraries: string;
  };
  contentId: H5PContentId;
  isIE: boolean;
  libraryCache: Record<string, unknown>;
  libraryLoaded: Record<string, unknown>;
  loadedCallbacks: Array<() => void>;
  renderableCommonFields: Record<string, unknown>;
  storage: {
    get: (key: string, next: (value: unknown) => void) => void;
    set: (key: string, value: unknown) => void;
  };
  supportedLanguages: Record<string, string>;
  widgets: Record<string, unknown> & Record<TWidgetName, unknown>;
  // --- Methods ---
  /**
   * Adds a field to the Common Fields container. Used internally by `H5PEditor.processSemanticsChunk`.
   *
   * @param field
   * @param parent
   * @param params
   * @param ancestor
   * @param skipAppendTo Skips appending the common field if set
   */
  addCommonField: <TField extends H5PField>(
    field: TField,
    parent: H5PForm,
    params: ParamTypeInferredFromFieldType<TField>,
    ancestor: H5PForm,
    skipAppendTo?: boolean,
  ) => void;
  /**
   * Bind events to important description
   */
  bindImportantDescriptionEvents: (
    widget: IH5PWidget,
    fieldName: string,
    parent: H5PForm,
  ) => void;
  /**
   * Check if clipboard can be pasted
   */
  canPaste: (
    clipboard: {
      generic?: unknown;
    } & Record<string, unknown>,
    libs: Record<string, unknown>,
  ) => boolean;
  /**
   * Check if clipboard can be pasted and give reason if not.
   *
   * @param clipboard Clipboard data.
   * @param libs Libraries to compare against.
   * @return Results. {canPaste: boolean, reason: string, description: string}.
   */
  canPastePlus: (
    clipboard: {
      generic?: unknown;
    } & Record<string, unknown>,
    libs: Record<string, unknown>,
  ) =>
    | { canPaste: true }
    | {
        canPaste: false;
        reason: string;
        description: string;
      };
  /**
   * Check if any errors have been set. Blocks tab-key on $input if $errors is not empty.
   *
   * @param $errors
   * @param $input
   * @param value
   */
  checkErrors: <
    TValue extends string | boolean | number | Record<string, unknown>,
  >(
    $errors: JQuery,
    $input: JQuery,
    value: TValue,
  ) => TValue | false;
  /**
   * Confirm replace if there is content selected
   */
  confirmReplace: (library: string, top: number, next: () => void) => void;
  /**
   * Create HTML wrapper for a boolean field item.
   *
   * @param field
   * @param content
   * @param inputId
   */
  createBooleanFieldMarkup: (
    field: H5PField,
    content: string,
    inputId?: string,
  ) => string;
  /**
   * Makes it easier to add consistent buttons across the editor widget
   *
   * @param id Typical CSS class format
   * @param title Human readable format
   * @param handler Action handler when triggered
   * @param displayTitle Show button with text. Default: `false`
   */
  createButon: (
    id: string,
    title: string,
    handler: () => void,
    displayTitle?: boolean,
  ) => JQuery<HTMLDivElement>;
  /**
   * Generate markup for the copy and paste buttons
   */
  createCopyPasteButtons: () => string;
  /**
   * Create a description
   */
  createDescription: (description: string, inputId?: string) => string;
  /**
   * Create an error paragraph with the given message
   *
   * @param message Error message to display
   *
   * @returns Message wrapped in <p>-tags
   */
  createError: (message: string) => string;
  /**
   * Create HTML wrapper for a field item.
   * Replacement for createItem()
   *
   * @since 1.12
   *
   * @param field
   * @param content
   * @param inputId
   */
  createFieldMarkup: (
    field: H5PField,
    content: string,
    inputId?: string,
  ) => string;
  /**
   * Create an important description
   */
  createImportantDescription: (
    importantDescription: H5PFieldText["importance"],
  ) => string;
  /**
   * Create the HTML wrapper for field items.
   *
   * @deprecated since version 1.12 (Jan. 2017, will be removed Jan. 2018). Use `createFieldMarkup` instead.
   *
   * @param type Field type as string (ie. "text", "image", "number")
   * @param label Label text. Can be HTML
   * @param description  Optional description text for the field. If set, it will be included beneath the field edit form
   * @param content HTML content for the field as a string. Inserted in the wrapper
   */
  createItem: (
    type: H5PField["type"],
    label: string | undefined,
    description: string | undefined,
    content: string,
  ) => string;
  /**
   * Create a label to wrap content in.
   *
   * @param field Semantics object for the field
   * @param content HTML string for content field
   *
   * @returns Label as string of HTML
   */
  createLabel: (field: H5PField, content: string) => string;
  /**
   * Create HTML for select options.
   *
   * @param value The value of the option
   * @param text The text for the option
   * @param selected If set, the option is set as selected
   *
   * @returns Option as string of HTML
   */
  createOption: (value: string, text: string, selected?: boolean) => string;
  createImportance: <TImportance extends H5PImportance | undefined | null>(
    importance: H5PImportance | undefined | null,
  ) => TImportance extends H5PImportance ? `importance-${TImportance}` : "";
  /**
   *
   * @param value Initial value for the text input
   * @param maxLength Maximum number of characters
   * @param placeholder Placeholder string shown if no value is entered
   * @param id The input field's id
   * @param describedby `aria-describedby` id
   *
   * @returns Input field as string of HTML
   */
  createText: (
    value?: string,
    maxLength?: number,
    placeholder?: string,
    id?: string,
    describedby?: string,
  ) => string;
  /**
   * Check if the current library is entitled for the metadata button. True by default.
   *
   * @param library - Current library.
   * @return True, if form should have the metadata button.
   */
  enableMetadata: (library: string) => boolean;
  /**
   * Find the nearest ancestor which handles `commonFields`.
   *
   * @param parent
   */
  findAncestor: (parent: H5PForm) => H5PForm | undefined;
  /**
   * Find field from a path
   *
   * @param path
   * @param parent
   */
  findField: <
    TField extends H5PForm = IH5PFieldInstance,
    TParent extends H5PForm = H5PForm,
  >(
    path: string | Array<string>,
    parent: TParent,
  ) => TField | false;
  /**
   * Find the nearest library ancestor. Used when adding common fields.
   *
   * @param parent
   */
  findLibraryAncestor: (parent: H5PForm) => H5PForm | undefined;
  /**
   * Search for a field or a set of fields. Returns `null` if the field isn't found.
   *
   * @param fieldName
   * @param semanticsStructure
   */
  findSemanticsField: (
    fieldName: string,
    semanticsStructure: H5PField | Array<H5PField>,
  ) => H5PField | Array<H5PField> | null;
  /**
   * Observe a field to get changes to its params.This is used to track changes
   * within an object during editing in case the change needs to be reflected visually.
   *
   * An example from H5PEditor.DragQuestion. This observes the "settings/background"
   * property and changes the background of the editor if changed.
   *
   * @example
   *
   * ```ts
   * H5PEditor.followField(parent, 'settings/background', function (params) {
   *   setBackground(params);
   * });
   * ```
   *
   * @param parent The parent object of the field
   * @param path Relative to the parent object
   * @param callback Gets called for params changes
   */
  followField: <TField extends H5PField = H5PField>(
    parent: H5PForm,
    path: string,
    callback: (params: ParamTypeInferredFromFieldType<TField>) => void,
  ) => void;
  /**
   * Helps generating a consistent description ID across fields
   */
  getDescriptionId: (id: string) => string;
  /**
   * Generates a consistent and unique field ID for the given field
   */
  getNextFieldId: (field: H5PField) => string;
  /**
   * Recursively traverse parents to find the library our field belongs to
   *
   * @param parent
   */
  getParentLibrary: (parent: H5PForm) => H5PForm | null;
  /**
   * Alternate the background color of fields
   *
   * @param parent
   * @returns `odd` or `even` to determine background color of callee
   */
  getParentZebra: (parent: H5PForm) => H5PForm["zebra"];
  /**
   * Helper function for detecting field widget
   */
  getWidgetName: (field: H5PField) => string;
  /**
   * Mimics a simple version of PHP htmlspecialchars. Basically replaces brackets
   * and quotes with corresponding HTML entities.
   *
   * @param escapedHtml String to replace special chars
   *
   * @example
   * ```ts
   * const unescapedHtml = "<h1>"Hello world"</h1>";
   * const escapedHtml = H5PEditor.htmlspecialchars(unescapedHtml);
   * // &lt;h1&gt;&quot;Hello world&quot;&lt;/h1&gt;
   * ```
   */
  htmlspecialchars: (escapedHtml: string) => string;
  /**
   * Joins an array of strings if they are defined and non empty
   *
   * @param arr
   * @param separator Default: `" "`
   */
  joinNonEmptyStrings: (
    strings: Array<string | undefined>,
    separator?: string,
  ) => string;
  /**
   * @deprecated Use `H5P.libraryFromString` instead
   */
  libraryFromString: <
    TLibraryName extends string,
    TMajorVersion extends number,
    TMinorVersion extends number,
  >(
    library: `${TLibraryName} ${TMajorVersion}.${TMinorVersion}`,
  ) =>
    | {
        machineName: TLibraryName;
        majorVersion: TMajorVersion;
        minorVersion: TMinorVersion;
      }
    | false;
  /**
   * Helper function invoked when a library is requested. Will add CSS and eval JS
   * if not already done.
   *
   * @private
   *
   * @param libraryName On the form "machineName majorVersion.minorVersion"
   * @param callback
   */
  libraryRequested: <TSemantics = unknown>(
    libraryName: `${string} ${number}.${number}`,
    callback: (semantics: TSemantics) => void,
  ) => void;
  /**
   * Translates a library object to a library string.
   *
   * @param library Library object with machineName, majorVersion and minorVersion set
   */
  libraryToString: <TLib extends Library>(
    library: TLib,
  ) => `${TLib["machineName"]} ${TLib["majorVersion"]}.${TLib["minorVersion"]}`;
  /**
   * Help load JavaScripts, prevents double loading
   */
  loadJs: (src: string, doneCallback: () => void) => void;
  /**
   * Loads a complete library, with semantics, scripts and CSS from the server.
   * Injects the javascript and stylesheets then returns the semantics object in the callback.
   *
   * @param libraryName
   * @param callback Callback that will be called with the library's semantics when loaded
   */
  loadLibrary: <TSemantics = unknown>(
    libraryName: `${string} ${number}.${number}`,
    callback: (semantics: TSemantics) => void,
  ) => void;
  /**
   * Recursive processing of the semantics chunks.
   *
   * @param semanticsChunk
   * @param params
   * @param $wrapper
   * @param parent
   * @param machineName Machine name of library that is being processed
   */
  processSemanticsChunk: <TFields extends Array<H5PField> = Array<H5PField>>(
    semanticsChunk: TFields,
    params: Record<
      TFields[number]["name"],
      ParamTypeInferredFromFieldType<TFields[number]>
    >,
    $wrapper: JQuery<HTMLElement>,
    parent: H5PForm,
    machineName?: string,
  ) => void;
  /**
   * Call remove on the given children
   *
   * @param children
   */
  removeChildren: (children: Array<IH5PWidget>) => void;
  /**
   * Render common fields of content type with given machine name.
   *
   * @param machineName Machine name of content type with common fields
   * @param libraries Library data for machine name
   */
  renderCommonField: (machineName: string, libraries?: Array<Library>) => void;
  /**
   * Reset loaded libraries - i.e removes CSS added previously
   */
  resetLoadedLibraries: () => void;
  /**
   * Attach ancestor of parent's common fields to a new wrapper
   *
   * @param parent Parent content type instance that common fields should be attached to
   * @param wrapper New wrapper of common fields
   */
  setCommonFieldsWrapper: (parent: H5PForm, wrapper: HTMLElement) => void;
  /**
   * Translate text strings
   *
   * @param library The library name(machineName), or "core"
   * @param key Translation string identifier
   * @param vars Placeholders and values to replace in the text
   *
   * @returns Translated string, or a default text if the translation is missing
   */
  t: (
    library: "core" | `H5PEditor.${string}` | `H5PEditor.${TWidgetMachineName}`,
    key: string,
    vars?: Record<`:${string}`, string>,
  ) => string;
  /**
   * Update common fields default values for the given semantics.
   * Works by reference.
   *
   * @param semantics
   * @param translation
   * @param parentIsCommon Used to indicated that one of the ancestors is a common field
   */
  updateCommonFieldsDefault: (
    semantics: Array<H5PField>,
    translation: Array<H5PField>,
    parentIsCommon?: boolean,
  ) => void;
  /**
   * Wraps a field with some metadata classes, and adds error field.
   *
   * @param field
   * @param markup
   */
  wrapFieldMarkup: (field: H5PField, markup: string) => string;
  // --- Classes ---
  $: typeof jQuery;
} & Record<string, unknown> &
  Record<`${TWidgetMachineName}`, unknown>;

export type H5PEnterMode = "p" | "div";

export declare class H5PEvent<TData = unknown> {
  type: string;
  data: TData;
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
    },
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
  subContentId?: H5PContentId;
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
        type: "text" | H5PFieldType.Text;
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
        type: "number" | H5PFieldType.Number;
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
        type: "boolean" | H5PFieldType.Boolean;
        default: boolean;
        widget?: string;
      };
export type H5PFieldGroup =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "group" | H5PFieldType.Group;
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
        type: "list" | H5PFieldType.List;
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
        type: "select" | H5PFieldType.Select;
        default: string | number | boolean;
        widget?: string;
        options: Array<{ value: string | number | boolean; label: string }>;
      };
export type H5PFieldLibrary =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "library" | H5PFieldType.Library;
        widget?: string;
        default: string;
        options: Array<string>;
      };
export type H5PFieldImage =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "image" | H5PFieldType.Image;
        widget?: string;
      };
export type H5PFieldVideo =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "video" | H5PFieldType.Video;
        widget?: string;
      };
export type H5PFieldAudio =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "audio" | H5PFieldType.Audio;
        widget?: string;
      };
export type H5PFieldFile =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: "file" | H5PFieldType.File;
        widget?: string;
      };

export declare class H5PFieldClass {
  constructor(label: string, value: string);
  /**
   * Get field label
   */
  getLabel(): string;
  /**
   * Get field value
   */
  getValue(): string;
}

export enum H5PFieldType {
  Number = "number",
  Boolean = "boolean",
  Audio = "audio",
  File = "file",
  Group = "group",
  Image = "image",
  Library = "library",
  List = "list",
  Select = "select",
  Text = "text",
  Video = "video",
}

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
    languageCodes: Array<string | undefined>,
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
  currentLibrary?: UberName;
  metadata: H5PMetadata;
  metadataForm: H5PMetadataForm | null;
  offset: { top: number; left: number };
  params: TParams;
  passReadies: boolean;
  readies: Array<unknown>;
  removeLanguages: (
    libraryName: string,
    languageCodes: Array<string | undefined>,
  ) => void;
  zebra: "odd" | "even";
  ready: (callback: () => void) => void;
};

export type H5PGroup<TParams = unknown> = IH5PFieldInstance<
  TParams,
  H5PFieldGroup
>;

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

type Dependency = {
  machineName: string;
  majorVersion: number;
  minorVersion: number;
};
export type Library = {
  /**
   * Textual library name
   *
   * @see https://h5p.org/library-definition#libtitle
   */
  title: string;
  /** @see https://h5p.org/library-definition#libmachinename */
  machineName: string;
  /** @see https://h5p.org/library-definition#libmajorversion */
  majorVersion: number;
  /** @see https://h5p.org/library-definition#libminorversion */
  minorVersion: number;
  /** @see https://h5p.org/library-definition#libpatchversion */
  patchVersion: number;
  /**
   * Whether or not this library is runnable. If it is
   * runnable the authoring tool will enable authors to
   * create new instances of content using this library.
   * Values are 0 for not runnable and 1 for runnable.
   *
   * @default 0
   *
   * @see https://h5p.org/library-definition#librunnable
   */
  runnable?: 0 | 1;
  /**
   * Specifies the required version of H5P Core API. If
   * not set, v1.0 is assumed, and the library must not
   * use any functionality added in newer versions of
   * H5P Core.
   *
   * @see https://h5p.org/library-definition#libcoreApi
   */
  coreApi?: {
    /** @default 1 */
    majorVersion: number;
    /** @default 0 */
    minorVersion: number;
  };
  /** @see https://h5p.org/library-definition#libauthor */
  author?: string;
  /** @see https://h5p.org/library-definition#liblicense */
  license?: string;
  /** @see https://h5p.org/library-definition#libdescription */
  description?: string;
  /** @see https://h5p.org/library-definition#libpreload */
  preloadedDependencies?: Dependency[];
  /** @see https://h5p.org/library-definition#libdynamic */
  dynamicDependencies?: Dependency[];
  /** Undocumented but important feature to load widgets when editing H5Ps */
  editorDependencies?: Dependency[];
  /** @see https://h5p.org/library-definition#libpreloadjs */
  preloadedJs?: { path: string }[];
  /** @see https://h5p.org/library-definition#libpreloadcss */
  preloadedCss?: { path: string }[];
  /**
   * List of possible ways to embed the package in the page
   *
   * @default ["div"]
   *
   * @see https://h5p.org/library-definition#libembedtypes
   */
  embedTypes?: ("div" | "iframe")[];
  /**
   * Enables the integrated full-screen button
   *
   * @default 0
   *
   * @see https://h5p.org/library-definition#fullscreen
   */
  fullscreen?: 0 | 1;
  /**
   * Disable metadata completely or just hide title field from content type's form.
   *
   * @see https://h5p.org/library-definition#metadata-settings
   */
  metadataSettings?: {
    /** @default 0 */
    disable: 0 | 1;
    /** @default 1 */
    disableExtraTitleField: 0 | 1;
  };
};

export type H5PLibraryInfo = {
  versionedName: string;
  versionedNameNoSpaces: string;
  machineName: string;
  majorVersion: string;
  minorVersion: string;
};

export declare class H5PMediaCopyright {
  constructor(
    copyright: Record<string, string> & {
      license: string;
      version?: string;
    },
    labels?: Record<string, string>,
    order?: Array<string>,
    extraFields?: Record<string, string>,
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

export type H5PNewRunnableLibraryParam = {
  library: string;
  params: Record<string | number | symbol, unknown>;
  subContentId?: H5PContentId;
  userDatas?: { state?: unknown };
  metadata?: H5PMetadata;
};

export type H5PObject = {
  // --- Properties ---
  $body: JQuery<HTMLBodyElement>;
  $window: JQuery<Window>;
  /** @deprecated Use `fullscreenSupported` instead */
  canHasFullscreen: boolean;
  /** When embedded, the communicator helps talk to the parent page. */
  communicator: H5PCommunicator | undefined;
  copyrightLicenses: H5PCopyrightLicenses;
  externalEmbed?: boolean;
  fullScreenBrowserPrefix: "webkit" | "moz" | "ms";
  fullscreenSupported: boolean;
  instances: Array<IH5PContentType>;
  /** H5P content is rendered inside an iframe */
  isFramed: boolean;
  /** H5P content is in fullscreen mode */
  isFullscreen: boolean;
  /** Prevent H5P Core from initializing. Must be overriden before document ready. */
  preventInit?: boolean;
  safariBrowser: number;
  // --- Methods ---
  /**
   * Helper for adding a query parameter to an existing path that may already
   * contain one or a hash.
   *
   * @param path
   * @param parameter
   */
  addQueryParameter: (path: string, parameter: string) => string;
  /**
   * Show a toast message.
   *
   * The reference element could be dom elements the toast should be attached to,
   * or e.g. the document body for general toast messages.
   *
   * @param element Reference element to show toast message for.
   * @param message Message to show.
   * @param config Configuration.
   * @param config.style Style name for the tooltip. Default: `h5p-toast`
   * @param config.duration Toast message length in ms. Default: `3000`
   * @param config.position Relative positioning of the toast.
   * @param config.position.horizontal Default: `centered`
   * @param config.position.vertical Default: `below`
   * @param config.position.offsetHorizontal Extra horizontal offset. Default: `0`
   * @param config.position.offsetVertical Extra vertical offset. Default: `0`
   * @param config.position.noOverflowLeft True to prevent overflow left. Default: `false`
   * @param config.position.noOverflowRight True to prevent overflow right. Default: `false`
   * @param config.position.noOverflowTop True to prevent overflow top. Default: `false`
   * @param config.position.noOverflowBottom True to prevent overflow bottom. Default: `false`
   * @param config.position.noOverflowX True to prevent overflow left and right. Default: `false`
   * @param config.position.noOverflowY True to prevent overflow top and bottom. Default: `false`
   * @param config.position.overflowReference DOM reference for overflow. Default: `document.body`
   */
  attachToastTo: (
    element: HTMLElement,
    message: string,
    config?: {
      style?: string;
      duration?: number;
      position: {
        horizontal?: "before" | "left" | "centered" | "right" | "after";
        vertical?: "above" | "top" | "centered" | "bottom" | "below";
        offsetHorizontal?: number;
        offsetVertical?: number;
        noOverflowLeft?: boolean;
        noOverflowRight?: boolean;
        noOverflowTop?: boolean;
        noOverflowBottom?: boolean;
        noOverflowX?: boolean;
        noOverflowY?: boolean;
        overflowReference?: HTMLElement;
      };
    },
  ) => void;
  buildMetadataCopyrights(metadata: H5PMetadata): H5PMediaCopyright;
  classFromName: (name: `H5P.${string}`) => IH5PContentType;
  /**
   * Store item in the H5P Clipboard
   */
  clipboardify: <
    TParams extends Record<string, unknown> = Record<string, unknown>,
  >(
    clipboardItem: H5PClipboardItem<TParams> | TParams,
  ) => void;
  /**
   * Recursively clone the given object
   *
   * @param object Object to clone
   * @param recursive
   * @returns A clone of object
   */
  cloneObject: <T>(object: T, recursive?: boolean) => T;
  /**
   * Create title as an HTML string
   *
   * @param rawTitle
   * @param maxLength Default: 60
   */
  createTitle: (rawTitle: string, maxLength?: number) => string;
  createUUID: () => string;
  /**
   * Check if styles path/key is loaded
   */
  cssLoaded: (path: string) => boolean;
  /**
   * @private
   *
   * Delete user data for given content
   *
   * @param contentId
   *   What content to remove data for
   * @param dataId Identifies the set of data for this content
   * @param subContentId Identifies which data belongs to sub content
   */
  deleteUserData: (
    contentId: H5PContentId,
    dataId: string,
    subContentId?: H5PContentId,
  ) => void;
  error: (error: Error | string) => void;
  exitFullScreen: () => void;
  /**
   * Gather a flat list of copyright information from the given parameters.
   *
   * @param info Used to collect all information in.
   * @param parameters To search for file objects in.
   * @param contentId  Used to insert thumbnails for images.
   * @param extras - Extras.
   * @param extras.metadata - Metadata
   * @param extras.machineName - Library name of some kind.
   *   Metadata of the content instance.
   */
  findCopyrights: (
    info: H5PContentCopyrights,
    parameters:
      | Record<
          string,
          | ({
              library?: string | { library: string };
            } & Partial<Media>)
          | Array<
              {
                library?: string | { library: string };
              } & Partial<Media>
            >
        >
      | Array<
          {
            library?: string | { library: string };
          } & Partial<Media>
        >,
    contentId: H5PContentId,
    extras?: { metadata: H5PMetadata; machineName: string },
  ) => void;
  fullScreen: (
    $element: JQuery,
    instance: IH5PContentType,
    exitCallback?: () => void,
    body?: JQuery,
    forceSemiFullScreen?: boolean,
  ) => void;
  getClipboard: () =>
    | ({
        generic?: unknown;
      } & Record<string, unknown>)
    | undefined;
  /**
   * Function for getting content for a certain ID
   *
   * @param {number} contentId
   * @return {Object}
   */
  getContentForInstance: (contentId?: H5PContentId) =>
    | {
        contentUserData?: Array<unknown> | undefined;
        displayOptions?: H5PDisplayOptions;
        embedCode?: string;
        exportUrl: string;
        fullScreen: "0" | "1";
        jsonContent?: string;
        library: string;
        metadata: H5PMetadata;
        resizeCode: string;
        scripts: Array<string> | undefined;
        styles: Array<string> | undefined;
        title: string;
        url: string;
      }
    | undefined;
  /**
   * @deprecated Use `getPath` instead
   */
  getContentPath: (contentId: H5PContentId) => string;
  /**
   * Gather copyright information for the given content.
   *
   * @param instance H5P instance to get copyright information for.
   * @param parameters Parameters of the content instance.
   * @param contentId Identifies the H5P content
   * @param metadata Metadata of the content instance.
   *
   * @returns Copyright information.
   */
  getCopyrights<TContentType extends IH5PContentType>(
    instance: TContentType,
    parameters: TContentType["params"],
    contentId: H5PContentId,
    metadata: H5PMetadata,
  ): string | undefined;
  /**
   * Get the crossOrigin policy to use for img, video and audio tags on the current site.
   *
   * @param source File object from parameters/json_content - Can also be URL(deprecated usage)
   *
   * @returns crossOrigin attribute value required by the source
   */
  getCrossOrigin:
    | ((source: string) => string | null)
    | ((source: Media) => string | undefined);
  /**
   * Get config for a library
   *
   * @param string machineName
   */
  getLibraryConfig: (machineName: string) => unknown | Record<string, never>;
  /**
   * Get the path to the library
   *
   * @param library The library identifier in the format "machineName-majorVersion.minorVersion".
   * @returns The full path to the library
   */
  getLibraryPath: (library: `${string}-${number}.${number}`) => string;
  /**
   * Find the path to the content files based on the id of the content.
   * Also identifies and returns absolute paths
   *
   * @param path Relative to content folder or absolute
   * @param contentId ID of the content requesting the path
   *
   * @returns Complete URL to path
   */
  getPath: (path: string, contentId: H5PContentId) => string;
  /**
   * @private
   *
   * Get user data for given content
   *
   * @param contentId What content to get data for
   * @param dataId Identifies the set of data for this content
   * @param done Callback with error and data parameters
   * @param subContentId Identifies which data belongs to sub content
   */
  getUserData: (
    contentId: H5PContentId,
    dataId: string,
    done: (error?: Error, data?: Record<string, unknown> | null) => void,
    subContentId?: H5PContentId,
  ) => void;
  /**
   * Initialize H5P content.
   * Scans for ".h5p-content" in the document and initializes H5P instances where found.
   *
   * @param target DOM Element
   */
  init: (target: HTMLElement) => void;
  /**
   * Check if JavaScript path/key is loaded
   */
  jsLoaded: (path: string) => boolean;
  /**
   * Parse library string into values.
   *
   * @param library library in the format "machineName majorVersion.minorVersion"
   * @returns library as an object with machineName, majorVersion and minorVersion properties,
   *          or false if the library parameter is invalid
   */
  libraryFromString: <
    TLibraryName extends string,
    TMajorVersion extends number,
    TMinorVersion extends number,
  >(
    library: `${TLibraryName} ${TMajorVersion}.${TMinorVersion}`,
  ) =>
    | {
        machineName: TLibraryName;
        majorVersion: TMajorVersion;
        minorVersion: TMinorVersion;
      }
    | false;
  /**
   * A safe way of creating a new instance of a runnable H5P.
   *
   * @param library Library/action object form params.
   * @param contentId Identifies the content.
   * @param $attachTo Element to attach the instance to.
   * @param skipResize Skip triggering of the resize event after attaching.
   * @param extras Extra parameters for the H5P content constructor
   *
   * @returns Instance
   */
  newRunnable: <TLibraryParam extends H5PNewRunnableLibraryParam>(
    library: TLibraryParam,
    contentId: H5PContentId,
    $attachTo?: JQuery,
    skipResize?: boolean,
    extras?: H5PExtras,
  ) => IH5PContentType & {
    $: typeof jQuery;
    libraryInfo: H5PLibraryInfo;
    subContentId: TLibraryParam["subContentId"];
  };
  on: <TData = unknown>(
    instance: EventDispatcher,
    eventType: string,
    handler: (event: H5PEvent<TData>) => void,
  ) => void;
  /**
   * Display a dialog containing the embed code
   *
   * @param $element Element to insert dialog after
   * @param embedCode The embed code
   * @param resizeCode The advanced resize code
   * @param size The content's size
   */
  openEmbedDialog: (
    $element: JQuery<HTMLElement>,
    embedCode: string,
    resizeCode: string,
    size: {
      width: number;
      height: number;
    },
  ) => void;
  /**
   * Display a dialog containing the download button and copy button
   */
  openReuseDialog: (
    $element: JQuery<HTMLElement>,
    contentData: {
      displayOptions: H5PDisplayOptions;
    },
    library: ConstructorParameters<typeof H5PClipboardItem>[0],
    instance: IH5PContentType,
    contentId: H5PContentId,
  ) => void;
  /**
   * Enter semi fullscreen for the given H5P instance
   *
   * @param $element Content container.
   * @param instance
   * @param exitCallback Callback function called when user exits fullscreen.
   * @param $body For internal use. Gives the body of the iframe.
   */
  semiFullScreen: (
    $element: Parameters<H5PObject["fullScreen"]>[0],
    instance: Parameters<H5PObject["fullScreen"]>[1],
    exitCallback: Parameters<H5PObject["fullScreen"]>[2],
    $body: Parameters<H5PObject["fullScreen"]>[3],
  ) => void;
  /**
   * Set item in the H5P Clipboard
   *
   * @param clipboardItem Data to be set
   */
  setClipboard: <TParams extends Record<string, unknown>>(
    clipboardItem: H5PClipboardItem<TParams> | TParams,
  ) => void;
  /**
   * Post finished results for user
   *
   * @deprecated Do not use this function directly, trigger the finish event instead
   *
   * @param contentId Identifies the content
   * @param score Achieved score/points
   * @param maxScore The maximum score/points that can be achieved
   * @param time Reported time consumption/usage
   */
  setFinished: (
    contentId: H5PContentId,
    score: number,
    maxScore: number,
    time?: number,
  ) => void;
  /**
   * Helper for setting the crossOrigin attribute + the complete correct source.
   * Note: This will start loading the resource.
   *
   * @param element DOM element, typically img, video or audio
   * @param source File object from parameters/json_content (created by H5PEditor)
   * @param contentId Needed to determine the complete correct file path
   */
  setSource: (
    element: HTMLImageElement | HTMLVideoElement | HTMLAudioElement,
    source: Media,
    contentId: H5PContentId,
  ) => void;
  /**
   * @private
   *
   * Set user data for given content
   *
   * @param contentId What content to get data for
   * @param dataId Identifies the set of data for this content
   * @param data The data that is to be stored
   * @param extras Extra properties
   * @param extras.subContentId Identifies which data belongs to sub content
   * @param extras.preloaded If the data should be loaded when content is loaded. Default: `true`
   * @param extras.deleteOnChange If the data should be invalidated when the content changes. Default: `false`
   * @param extras.errorCallback Callback with error as parameters
   * @param extras.async Default: `true`
   */
  setUserData: (
    contentId: H5PContentId,
    dataId: string,
    data: unknown,
    extras?: {
      subContentId?: H5PContentId;
      preloaded?: boolean;
      deleteOnChange?: boolean;
      errorCallback?: (error: Error) => void;
      async?: boolean;
    },
  ) => void;
  /**
   * Shuffle an array in place
   *
   * @deprecated Use [Array#sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) instead
   */
  shuffleArray: <T>(array: Array<T>) => Array<T>;
  /**
   * Translate text strings.
   *
   * @param key
   *   Translation identifier, may only contain a-zA-Z0-9. No spaces or special chars.
   * @param placeholderVars Data for placeholders.
   * @param namespace Translation namespace. Defaults to H5P.
   *
   * @returns Translated text
   */
  t: (
    key: string,
    placeholderVars?: Record<string, string>,
    namespace?: string,
  ) => string;
  /**
   * Trigger an event on an instance
   *
   * Helper function that triggers an event if the instance supports event handling
   *
   * @param instance Instance of H5P content
   * @param eventType Type of event to trigger
   * @param data
   * @param extras
   */
  trigger: <TData = unknown>(
    instance: EventDispatcher,
    eventType: Parameters<EventDispatcher["trigger"]>[0],
    data: TData,
    extras: Parameters<EventDispatcher["trigger"]>[2],
  ) => void;
  /**
   * Remove all empty spaces before and after the value
   *
   * @deprecated Use [`String#trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) instead
   */
  trim: (value: string) => string;
  // --- Classes ---
  jQuery: typeof jQuery;
  ClipboardItem: typeof H5PClipboardItem;
  ConfirmationDialog: typeof H5PConfirmationDialog;
  /**
   * Copyrights for an H5P Content Library
   */
  ContentCopyrights: typeof H5PContentCopyrights;
  /**
   * @deprecated
   *
   * Helper object for keeping coordinates in the same format all over.
   */
  Coords: typeof H5PCoords;
  DefinitionList: typeof H5PDefinitionList;
  Dialog: typeof H5PDialog;
  EventDispatcher: typeof EventDispatcher;
  /**
   * Simple data structure class for storing a single field
   */
  Field: typeof H5PFieldClass;
  /**
   * An ordered list of copyright fields for media
   */
  MediaCopyright: typeof H5PMediaCopyright;
  /**
   * A simple and elegant class for creating thumbnails of images
   */
  Thumbnail: typeof H5PThumbnail;
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

/**
 * A simple and elegant class for creating thumbnails of images
 */
export declare class H5PThumbnail {
  constructor(source: string, width: number, height: number, alt: string);
  /**
   * @return HTML representation of thumbnail
   */
  toString(): string;
}

export interface IH5PContentType<TParams = unknown> extends EventDispatcher {
  attach($wrapper: JQuery<HTMLElement>): void;
  params?: TParams;
}

export interface IH5PEditorImageField
  extends IH5PFieldInstance<Image, H5PFieldImage> {
  changes: Array<unknown>;
  copyright: Copyright;
  confirmRemovalDialog: H5PConfirmationDialog;
  confirmationDialog: H5PConfirmationDialog;
  id: string;
  isEditing: boolean;
  isOriginalImage: boolean;
  openFileSelector(): void;
  setValue: H5PSetValue<Image>;
  upload(file: File, filename: string): void;
  /** ⚠️ Only uploads the first file in the list ⚠️ */
  uploadFiles(files: Array<File>): void;
}

export interface IH5PFieldInstance<
  TParams = unknown,
  TField extends H5PField = H5PField,
> extends H5PForm<TParams>,
    IH5PWidget,
    EventDispatcher {
  field: TField;
  parent: H5PForm | IH5PFieldInstance;
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

export declare class XAPIEvent extends H5PEvent<{
  statement: {
    actor: {
      name: string;
      mbox: string;
      objectType: string;
    };
    contentId: H5PContentId;
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
  };
}> {
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
    success: number,
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