import type { H5PEnterMode } from "./H5PEnterMode";
import type { H5PFieldType } from "./H5PFieldType";
import type { H5PImportance } from "./H5PImportance";

/**
 * @category H5PField
 */
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

/**
 * @category H5PField
 *
 * @see https://h5p.org/semantics
 *
 * The H5PField type contains all the different types of fields that
 * H5P's `semantics.json` describes.
 *
 * When defining fields in semantics, the type property is used to mark
 * what type of field it is. Each field type has its own set of properties
 * and each field type is described in its own H5PField type.
 *
 * H5P fields can be one of the following types:
 *
 * - `H5PFieldAudio`
 * - `H5PFieldBoolean`
 * - `H5PFieldFile`
 * - `H5PFieldGroup`
 * - `H5PFieldImage`
 * - `H5PFieldLibrary`
 * - `H5PFieldList`
 * - `H5PFieldNumber`
 * - `H5PFieldSelect`
 * - `H5PFieldText`
 * - `H5PFieldVideo`
 *
 * The `InferParamTypeFromFieldType` utility type can be used to infer
 * the type of a field based on its type property:
 *
 * @example
 * ```ts
 * // semantics.json:
 * [{
 *   "label": "Name",
 *   "name": "myName",
 *   "type": "text"
 * }]
 *
 * // content-type.ts:
 * import type { InferParamTypeFromFieldType } from "h5p-types";
 * import semantics from "./semantics.json"
 *
 * type NameField = InferParamTypeFromFieldType<typeof semantics[0]>;
 * // `string`
 * ```
 *
 * The `InferParamsFromSemantics` utility type is a more advanced version
 * which will infer the type of all fields in a `semantics.json` file:
 *
 * @example
 * ```ts
 * // semantics.json:
 * [{
 *   "label": "Name",
 *   "name": "myName",
 *   "type": "text"
 * },
 * {
 *   "label": "Age",
 *   "name": "myAge",
 *   "type": "number"
 * }]
 *
 * // content-type.ts:
 * import type { InferParamsFromSemantics } from "h5p-types";
 * import semantics from "./semantics.json"
 *
 * type Params = InferParamsFromSemantics<typeof semantics>;
 * // {
 * //   myName: string;
 * //   myAge: number;
 * // }
 */
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

export interface H5PFieldText extends H5PFieldCommon {
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
}

export interface H5PFieldNumber extends H5PFieldCommon {
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
}

export interface H5PFieldBoolean extends H5PFieldCommon {
  type: "boolean" | H5PFieldType.Boolean;
  default: boolean;
  widget?: string;
}

export interface H5PFieldGroup extends H5PFieldCommon {
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
}

export interface H5PFieldList extends H5PFieldCommon {
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
}

export interface H5PFieldSelect extends H5PFieldCommon {
  type: "select" | H5PFieldType.Select;
  default: string | number | boolean;
  options: Array<{
    value: string | number | boolean;
    label: string;
  }>;
  widget?: string;
}

export interface H5PFieldLibrary extends H5PFieldCommon {
  type: "library" | H5PFieldType.Library;
  options: Array<string>;
  default?: string;
  widget?: string;
}

export interface H5PFieldImage extends H5PFieldCommon {
  type: "image" | H5PFieldType.Image;
  widget?: string;
}

export interface H5PFieldVideo extends H5PFieldCommon {
  type: "video" | H5PFieldType.Video;
  widget?: string;
}

export interface H5PFieldAudio extends H5PFieldCommon {
  type: "audio" | H5PFieldType.Audio;
  widget?: string;
}

export interface H5PFieldFile extends H5PFieldCommon {
  type: "file" | H5PFieldType.File;
  widget?: string;
}
