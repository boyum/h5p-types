/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-namespace */
import type { EmptyObject, ReadonlyDeep } from "type-fest";
import type { H5PFieldGroup, InferGroupParams } from "..";
import type { AreEqual, Expect } from "../src/test-utility-types";

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
namespace Test_GroupWithFields_NoLabel {
  const group = {
    name: "group",
    type: "group",
    fields: [
      {
        name: "text",
        type: "text",
      },
      {
        name: "age",
        type: "number",
      },
    ],
  } as const satisfies ReadonlyDeep<H5PFieldGroup>;

  type Expected = {
    text: string;
    age: number;
  };
  type Actual = InferGroupParams<typeof group>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}

// @ts-ignore Test
namespace Test_OverallFeedback {
  const group = {
    name: "overallFeedback",
    type: "group",
    label: "Overall Feedback",
    importance: "low",
    expanded: true,
    fields: [
      {
        name: "overallFeedback",
        type: "list",
        widgets: [
          {
            name: "RangeList",
            label: "Default",
          },
        ],
        importance: "high",
        label: "Define custom feedback for any score range",
        description:
          'Click the "Add range" button to add as many ranges as you need. Example: 0-20% Bad score, 21-91% Average Score, 91-100% Great Score!',
        entity: "range",
        min: 1,

        optional: true,
        field: {
          label: "Overall Feedback",
          name: "overallFeedback",
          type: "group",
          importance: "low",
          fields: [
            {
              name: "from",
              type: "number",
              label: "Score Range",
              min: 0,
              max: 100,
              default: 0,
            },
            {
              name: "to",
              type: "number",
              min: 0,
              max: 100,
              default: 100,
            },
            {
              name: "feedback",
              type: "text",
              label: "Feedback for defined score range",
              importance: "low",
              placeholder: "Fill in the feedback",
              optional: true,
            },
          ],
        },
      },
    ],
  } as const satisfies ReadonlyDeep<H5PFieldGroup>;

  type Expected =
    | {
        from: number;
        to: number;
        feedback?: string | undefined;
      }[]
    | undefined;

  type Actual = InferGroupParams<typeof group>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}
