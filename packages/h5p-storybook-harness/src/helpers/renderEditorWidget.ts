import type { H5PField, H5PForm, H5PSetValue, IH5PWidget } from "h5p-types";
import { installH5PMocks } from "../mock/h5pGlobals.js";
import { createJQueryLike } from "./dom.js";

export type EditorWidgetConstructor<TField extends H5PField, TParams> = new (
  parent: H5PForm<TParams>,
  field: TField,
  params: TParams | undefined,
  setValue: H5PSetValue<TParams>,
) => IH5PWidget;

export type RenderedEditorWidget<TParams> = {
  container: HTMLElement;
  widget: IH5PWidget;
  /** Returns the params collected via the widget's `setValue` calls. */
  getParams: () => TParams | undefined;
};

export type RenderEditorWidgetOptions<TField extends H5PField, TParams> = {
  field: TField;
  params?: TParams;
  parent?: H5PForm<TParams>;
};

/**
 * Instantiates an H5P editor widget against a mock form, appends it to a fresh
 * container element and returns the container, the widget instance and a
 * `getParams` accessor.
 *
 * Every time the widget calls `setValue`, the value is captured and returned by
 * `getParams()`.
 */
export function renderEditorWidget<TField extends H5PField, TParams>(
  Widget: EditorWidgetConstructor<TField, TParams>,
  options: RenderEditorWidgetOptions<TField, TParams>,
): RenderedEditorWidget<TParams> {
  installH5PMocks();

  const { field, params, parent } = options;

  let currentParams = params;
  const setValue: H5PSetValue<TParams> = (_field, nextParams) => {
    currentParams = nextParams;
  };

  const form =
    parent ??
    ({
      parent: null,
      $common: null,
      $commonButton: null,
      $form: null,
      children: [],
      commonFields: {},
      currentLibrary: undefined,
      metadata: {},
      metadataForm: null,
      offset: { top: 0, left: 0 },
      addLanguages: () => {},
    } as unknown as H5PForm<TParams>);

  const container = document.createElement("div");
  const widget = new Widget(form, field, params, setValue);
  widget.appendTo(createJQueryLike(container));

  return {
    container,
    widget,
    getParams: () => currentParams,
  };
}
