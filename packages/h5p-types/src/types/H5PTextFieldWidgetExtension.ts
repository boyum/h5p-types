import type { H5PFieldWidgetExtension } from "./H5PFieldWidgetExtension";
import type { H5PTextTags } from "./H5PTextTags";

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
