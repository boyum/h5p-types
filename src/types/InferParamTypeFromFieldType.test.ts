/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars, @typescript-eslint/no-namespace */

import type { EmptyObject } from "type-fest";
import type { AreEqual, Expect } from "../test-utility-types";
import type { DeepReadonly } from "../utility-types";
import type { Audio } from "./Audio";
import type {
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
import type { InferParamTypeFromFieldType } from "./InferParamTypeFromFieldType";
import type { Media } from "./Media";
import type { Video } from "./Video";

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

  type Expected = EmptyObject;
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

  type Expected = EmptyObject;
  type Actual = InferParamTypeFromFieldType<FieldType>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_ListField_Text {
  const field = {
    label: "List",
    name: "list",
    type: "list",
    entity: "Field",
    field: {
      label: "Text",
      name: "text",
      type: "text",
    },
  } as const satisfies H5PFieldList;

  type FieldType = typeof field;

  type Expected = Array<string>;
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
        } as const satisfies H5PFieldText,
        {
          label: "Age",
          name: "age",
          type: "number",
          optional: true,
        } as const satisfies H5PFieldNumber,
      ],
    } as const satisfies DeepReadonly<H5PFieldGroup>,
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
