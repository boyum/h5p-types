import type { OneOf, Prettify } from "../utility-types";
import type { H5PTextTags } from "./H5PTextTags";

type NoWidget = { widget?: never };

type UnknownWidget = {
  widget: string;
};

type HtmlWidget = {
  widget: "html";
  tags: ReadonlyArray<H5PTextTags>;
};

type ColorSelectorWidget = {
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
    palette?: ReadonlyArray<ReadonlyArray<string>>;
  };
};

export type H5PTextFieldWidgetExtension2 = Prettify<
  UnknownWidget | NoWidget | HtmlWidget | ColorSelectorWidget
>;

export type H5PTextFieldWidgetExtension = OneOf<
  [UnknownWidget,NoWidget, HtmlWidget, ColorSelectorWidget]>
