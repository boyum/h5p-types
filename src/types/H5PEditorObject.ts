import type { H5PField } from "./H5PField";
import type { H5PForm } from "./H5PForm";
import type { ParamTypeInferredFromFieldType } from "./ParamTypeInferredFromFieldType";

declare type H5PEditorObject = {
  // TODO: Improve typing of H5P.widgets.X
  widgets: Record<string, typeof Function>;
  $: typeof jQuery;
  contentId: string;

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
    library: `H5PEditor.${string}` | "core",
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
} & Record<string, typeof Function>;
