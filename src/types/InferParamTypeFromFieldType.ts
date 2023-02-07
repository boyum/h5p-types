/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars, @typescript-eslint/no-namespace */

import type {
  AreEqual,
  DeepReadonly,
  Expect,
  Prettify,
} from "../utility-types";
import type { Audio } from "./Audio";
import type {
  H5PField,
  H5PFieldAudio,
  H5PFieldBoolean,
  H5PFieldFile,
  H5PFieldGroup,
  H5PFieldImage,
  H5PFieldLibrary,
  H5PFieldList,
  H5PFieldNumber,
  H5PFieldSelect,
  H5PFieldText,
  H5PFieldVideo,
} from "./H5PField";
import type { Image } from "./Image";
import type { InferParamsType } from "./InferParamsType";
import type { Media } from "./Media";
import type { Video } from "./Video";

export type InferParamTypeFromFieldType<TField extends DeepReadonly<H5PField>> =
  Prettify<
    TField extends DeepReadonly<H5PFieldAudio>
      ? TField["optional"] extends true
        ? Audio | undefined
        : Audio
      : TField extends DeepReadonly<H5PFieldBoolean>
      ? TField["optional"] extends true
        ? TField extends { default: boolean }
          ? boolean
          : boolean | undefined
        : boolean
      : TField extends DeepReadonly<H5PFieldFile>
      ? TField["optional"] extends true
        ? Media | undefined
        : Media
      : TField extends DeepReadonly<H5PFieldGroup>
      ? TField["optional"] extends true
        ? InferParamsType<TField> | undefined
        : InferParamsType<TField>
      : TField extends DeepReadonly<H5PFieldImage>
      ? TField["optional"] extends true
        ? Image | undefined
        : Image
      : TField extends DeepReadonly<H5PFieldLibrary>
      ? TField["optional"] extends true
        ? TField extends { default: unknown }
          ? unknown
          : unknown | undefined
        : unknown
      : TField extends DeepReadonly<H5PFieldList>
      ? TField["optional"] extends true
        ? Array<InferParamsType<TField["field"]>> | undefined
        : Array<InferParamsType<TField["field"]>>
      : TField extends DeepReadonly<H5PFieldNumber>
      ? TField["optional"] extends true
        ? TField extends { default: number }
          ? number
          : number | undefined
        : number
      : TField extends DeepReadonly<H5PFieldSelect>
      ? TField["optional"] extends true
        ? TField extends { default: string | number | boolean }
          ? TField["options"][number]["value"]
          : TField["options"][number]["value"] | undefined
        : TField["options"][number]["value"]
      : TField extends DeepReadonly<H5PFieldText>
      ? TField["optional"] extends true
        ? TField extends { default: string }
          ? string
          : string | undefined
        : string
      : TField extends DeepReadonly<H5PFieldVideo>
      ? TField["optional"] extends true
        ? Video | undefined
        : Video
      : never
  >;

/**
 * @deprecated Use InferParamTypeFromFieldType instead
 */
export type ParamTypeInferredFromFieldType<
  TField extends DeepReadonly<H5PField>,
> = InferParamTypeFromFieldType<TField>;

// @ts-ignore Test
namespace Test_AudioField {
  type FieldType = H5PFieldAudio;

  type Expected = Audio;
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_BooleanField {
  type FieldType = H5PFieldBoolean;

  type Expected = boolean;
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_FileField {
  type FieldType = H5PFieldFile;

  type Expected = Media;
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_GroupField {
  type FieldType = H5PFieldGroup;

  // eslint-disable-next-line @typescript-eslint/ban-types
  type Expected = {};
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_ImageField {
  type FieldType = H5PFieldImage;

  type Expected = Image;
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_LibraryField {
  type FieldType = H5PFieldLibrary;

  // eslint-disable-next-line @typescript-eslint/ban-types
  type Expected = {};
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_ListField {
  type FieldType = H5PFieldList;

  type Expected = InferParamTypeFromFieldType<H5PField>[];
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_ListField_Group {
  const field = {
    label: "List",
    name: "list",
    type: "list",
    entity: "Field",
    field: {
      label: "Group",
      name: "group",
      type: "group",
      fields: [
        {
          label: "Name",
          name: "name",
          type: "text",
        },
        {
          label: "Age",
          name: "age",
          type: "number",
          optional: true,
        },
      ],
    },
  } as const satisfies DeepReadonly<H5PFieldList>;

  type FieldType = typeof field;

  type Expected = Array<{
    name: string;
    age: number | undefined;
  }>;
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_NumberField {
  type FieldType = H5PFieldNumber;

  type Expected = number;
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_SelectField {
  const field = {
    label: "Select",
    name: "select",
    type: "select",
    default: "a",
    options: [
      { value: "a", label: "A" },
      { value: "b", label: "B" },
      { value: "c", label: "C" },
    ],
  } as const satisfies DeepReadonly<H5PFieldSelect>;

  type FieldType = typeof field;

  type Expected = "a" | "b" | "c";
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_TextField {
  type FieldType = H5PFieldText;

  type Expected = string;
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_TextField {
  type FieldType = H5PFieldVideo;

  type Expected = Video;
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}
