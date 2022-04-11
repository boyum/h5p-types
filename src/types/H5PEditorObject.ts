import type { EventDispatcher } from "./EventDispatcher";
import type { H5PField } from "./H5PField";
import type { H5PForm } from "./H5PForm";
import type { IH5PWidget } from "./IH5PWidget";
import type { ParamTypeInferredFromFieldType } from "./ParamTypeInferredFromFieldType";

type WidgetType = IH5PWidget & EventDispatcher;

/**
 * @param TWidgetMachineName Typically PascalCased - MyWidget
 * @param TWidgetName Typically camelCased - myWidget
 * @param TWidget The widget class
 */
export type H5PEditorObject<
  TWidgetMachineName extends string = never,
  TWidgetName extends string = never,
  TWidget extends WidgetType = never
> = {
  $: typeof jQuery;
  contentId: string;
  widgets: Record<string, WidgetType> &
    (TWidgetMachineName extends never
      ? never
      : TWidgetName extends never
      ? never
      : TWidget extends never
      ? never
      : Record<TWidgetName, TWidget>);

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
    library:
      | `H5PEditor.${TWidgetName extends string ? TWidgetName : string}`
      | "core",
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
} & Record<string, WidgetType> &
  Record<`${TWidgetMachineName}`, TWidget>;
