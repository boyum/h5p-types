import type { H5PField } from "./H5PField";
import type { H5PForm } from "./H5PForm";
import type { Library } from "./H5PLibrary";
import type { IH5PFieldInstance } from "./IH5PFieldInstance";
import type { IH5PWidget } from "./IH5PWidget";
import type { ParamTypeInferredFromFieldType } from "./ParamTypeInferredFromFieldType";

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
  $: typeof jQuery;
  contentId: string;
  widgets: Record<string, unknown> & Record<TWidgetName, unknown>;
  isIE: boolean;
  supportedLanguages: Record<string, string>;

  /**
   * Translate text strings.
   *
   * @param library The library name(machineName), or "core".
   * @param key Translation string identifier.
   * @param vars Placeholders and values to replace in the text.
   *
   * @returns Translated string, or a default text if the translation is missing.
   */
  t(
    library: "core" | `H5PEditor.${string}` | `H5PEditor.${TWidgetMachineName}`,
    key: string,
    vars?: Record<`:${string}`, string>,
  ): string;

  /**
   * Loads a complete library, with semantics, scripts and CSS from the server.
   * Injects the javascript and stylesheets then returns the semantics object in the callback.
   *
   * @param libraryName
   * @param callback Callback that will be called with the library's semantics when loaded
   */
  loadLibrary<TSemantics = unknown>(
    libraryName: `${string} ${number}.${number}`,
    callback: (semantics: TSemantics) => void,
  ): void;

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
   * Adds a field to the Common Fields container. Used internally by `H5PEditor.processSemanticsChunk`.
   *
   * @param field
   * @param parent
   * @param params
   * @param ancestor
   * @param skipAppendTo Skips appending the common field if set
   */
  addCommonField<TField extends H5PField>(
    field: TField,
    parent: H5PForm,
    params: ParamTypeInferredFromFieldType<TField>,
    ancestor: H5PForm,
    skipAppendTo?: boolean,
  ): void;

  /**
   * Render common fields of content type with given machine name.
   *
   * @param machineName Machine name of content type with common fields
   * @param libraries Library data for machine name
   */
  renderCommonField(machineName: string, libraries?: Array<Library>): void;

  /**
   * Recursively traverse parents to find the library our field belongs to
   *
   * @param parent
   */
  getParentLibrary(parent: H5PForm): H5PForm | null;

  /**
   * Find the nearest library ancestor. Used when adding common fields.
   *
   * @param parent
   */
  findLibraryAncestor(parent: H5PForm): H5PForm | undefined;

  /**
   * Find the nearest ancestor which handles `commonFields`.
   *
   * @param parent
   */
  findAncestor(parent: H5PForm): H5PForm | undefined;

  /**
   * Call remove on the given children
   *
   * @param children
   */
  removeChildren(children: Array<IH5PWidget>): void;

  /**
   * Find field from a path
   *
   * @param path
   * @param parent
   */
  findField<
    TField extends H5PForm = IH5PFieldInstance,
    TParent extends H5PForm = H5PForm,
  >(
    path: string | Array<string>,
    parent: TParent,
  ): TField | false;

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
  followField<TField extends H5PField = H5PField>(
    parent: H5PForm,
    path: string,
    callback: (params: ParamTypeInferredFromFieldType<TField>) => void,
  ): void;

  /**
   * Create an error paragraph with the given message
   *
   * @param message Error message to display
   *
   * @returns Message wrapped in <p>-tags
   */
  createError(message: string): string;

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
  createItem(
    type: H5PField["type"],
    label: string | undefined,
    description: string | undefined,
    content: string,
  ): string;

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
  createFieldMarkup(field: H5PField, content: string, inputId?: string): string;

  /**
   * Create HTML for select options.
   *
   * @param value The value of the option
   * @param text The text for the option
   * @param selected If set, the option is set as selected
   *
   * @returns Option as string of HTML
   */
  createOption(value: string, text: string, selected?: boolean): string;

  /**
   * Create HTML wrapper for a boolean field item.
   *
   * @param field
   * @param content
   * @param inputId
   */
  createBooleanFieldMarkup(
    field: H5PField,
    content: string,
    inputId?: string,
  ): string;

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
  createText(
    value?: string,
    maxLength?: number,
    placeholder?: string,
    id?: string,
    describedby?: string,
  ): string;

  /**
   * Create a label to wrap content in.
   *
   * @param field Semantics object for the field
   * @param content HTML string for content field
   *
   * @returns Label as string of HTML
   */
  createLabel(field: H5PField, content: string): string;

  /**
   * Wraps a field with some metadata classes, and adds error field.
   *
   * @param field
   * @param markup
   */
  wrapFieldMarkup(field: H5PField, markup: string): string;

  /**
   * Check if any errors have been set. Blocks tab-key on $input if $errors is not empty.
   *
   * @param $errors
   * @param $input
   * @param value
   */
  checkErrors<
    TValue extends string | boolean | number | Record<string, unknown>,
  >(
    $errors: JQuery,
    $input: JQuery,
    value: TValue,
  ): TValue | false;

  /**
   * Translates a library object to a library string.
   *
   * @param library Library object with machineName, majorVersion and minorVersion set
   */
  libraryToString<TLib extends Library>(
    library: TLib,
  ): `${TLib["machineName"]} ${TLib["majorVersion"]}.${TLib["minorVersion"]}`;

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
  htmlspecialchars(escapedHtml: string): string;
} & Record<string, unknown> &
  Record<`${TWidgetMachineName}`, unknown>;
