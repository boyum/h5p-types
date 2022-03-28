import { H5PFieldWidgetExtension } from "./H5PFieldWidgetExtension";
import { H5PTextTags } from "./H5PTextTags";

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
        showOnlyPalette?: boolean;
        palette?: Array<Array<string>>;
      };
    };
