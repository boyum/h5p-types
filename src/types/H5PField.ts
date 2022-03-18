import { H5PEnterMode } from "./H5PEnterMode";
import { H5PFieldType } from "./H5PFieldType";
import { H5PImportance } from "./H5PImportance";
import { H5PShowWhenOptions } from "./H5PShowWhenOptions";
import { H5PTextTags } from "./H5PTextTags";

type H5PFieldWidgetExtension =
  | {
      widget?: string;
    }
  | {
      // To use the Show When or NDLA Show When widgets, first add them to the editorDependencies list in library.json
      widget: "showWhen" | "NDLAShowWhen";
      showWhen: H5PShowWhenOptions;
    };

type H5PTextFieldWidgetExtension =
  | H5PFieldWidgetExtension
  | {
      widget?: "html";
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
        type: H5PFieldType.Text;
        default?: string;
        widget?: string;
        maxLength?: number;
        regexp?: string;
        enterMode?: H5PEnterMode;
        tags?: Array<H5PTextTags>;
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
        type: H5PFieldType.Number;
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
        type: H5PFieldType.Boolean;
        default: boolean;
        widget?: string;
      };

export type H5PFieldGroup =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: H5PFieldType.Group;
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
        type: H5PFieldType.List;

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
        type: H5PFieldType.Select;
        default: string | number | boolean;
        widget?: string;
        options: Array<{ value: string | number | boolean; label: string }>;
      };

export type H5PFieldLibrary =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: H5PFieldType.Library;
        widget?: string;
        default: string;
        options: Array<string>;
      };

export type H5PFieldImage =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: H5PFieldType.Image;
        widget?: string;
      };

export type H5PFieldVideo =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: H5PFieldType.Video;
        widget?: string;
      };

export type H5PFieldAudio =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: H5PFieldType.Audio;
        widget?: string;
      };

export type H5PFieldFile =
  | H5PFieldCommon &
      H5PFieldWidgetExtension & {
        type: H5PFieldType.File;
        widget?: string;
      };
