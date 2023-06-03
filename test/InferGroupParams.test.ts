/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-namespace */

import type { EmptyObject, ReadonlyDeep } from "type-fest";
import type { H5PFieldGroup, InferGroupParams } from "..";
import type { AreEqual, Expect } from "../src/test-utility-types";
import type { H5PFieldWithOptionalLabel } from "../src/types/InferParamsFromSemantics";

// @ts-ignore Test
namespace Test_EmptyGroup {
  const emptyGroup = {
    label: "Group",
    name: "group",
    type: "group",
    fields: [],
  } as const satisfies ReadonlyDeep<H5PFieldGroup>;

  type Group = typeof emptyGroup;

  type Expected = EmptyObject;
  type Actual = InferGroupParams<Group>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_GroupWithOneField {
  const groupWithOneField = {
    label: "Group",
    name: "group",
    type: "group",
    fields: [
      {
        label: "Text",
        name: "text",
        type: "text",
      },
    ],
  } as const satisfies ReadonlyDeep<H5PFieldGroup>;

  type Group = typeof groupWithOneField;

  type Expected = string;
  type Actual = InferGroupParams<Group>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_GroupWithMultipleFields {
  const groupWithMultipleFields = {
    label: "Group",
    name: "group",
    type: "group",
    fields: [
      {
        label: "Text",
        name: "text",
        type: "text",
      },
      {
        label: "Number",
        name: "number",
        type: "number",
      },
    ],
  } as const satisfies ReadonlyDeep<H5PFieldGroup>;

  type Group = typeof groupWithMultipleFields;

  type Expected = {
    text: string;
    number: number;
  };
  type Actual = InferGroupParams<Group>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_GroupWithMultipleFields_GroupNoLabel {
  const groupWithMultipleFields = {
    name: "group",
    type: "group",
    fields: [
      {
        label: "Text",
        name: "text",
        type: "text",
      },
      {
        label: "Number",
        name: "number",
        type: "number",
      },
    ],
  } as const satisfies ReadonlyDeep<H5PFieldWithOptionalLabel<H5PFieldGroup>>;

  type Group = typeof groupWithMultipleFields;

  type Expected = {
    text: string;
    number: number;
  };
  type Actual = InferGroupParams<Group>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_GroupWithMultipleFields_GroupFieldsNoLabel {
  const groupWithMultipleFields = {
    label: "Group",
    name: "group",
    type: "group",
    fields: [
      {
        name: "text",
        type: "text",
      },
      {
        name: "number",
        type: "number",
      },
    ],
  } as const satisfies ReadonlyDeep<H5PFieldWithOptionalLabel<H5PFieldGroup>>;

  type Group = typeof groupWithMultipleFields;

  type Expected = {
    text: string;
    number: number;
  };
  type Actual = InferGroupParams<Group>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}
