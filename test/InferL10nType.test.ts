/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-namespace */

import type { AreEqual, Expect } from "../src/test-utility-types";
import type { H5PFieldGroup } from "../src/types/H5PField";
import type { InferL10nType } from "../src/types/InferL10nType";

// @ts-ignore Test
namespace Test_InferL10nType {
  const l10nGroup = {
    label: "Group",
    name: "l10n",
    type: "group",
    fields: [
      {
        label: "Text",
        name: "text" as const,
        type: "text",
      },
    ],
  } satisfies H5PFieldGroup & { name: "l10n" };

  type Group = typeof l10nGroup;

  type Expected = {
    l10n: {
      text: string;
    };
  };
  type Actual = InferL10nType<Group>;

  // @ts-ignore Test
  type Test =
    // prettier-ignore
    Expect<AreEqual<Actual, Expected>>;
}
