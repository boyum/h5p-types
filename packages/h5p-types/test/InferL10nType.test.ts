import type { H5PFieldGroup, InferL10nType } from "..";
import type { AreEqual, Expect } from "../src/test-utility-types";

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
    // biome-ignore format: Avoid `@ts-ignore` from ignoring test assertion
    Expect<AreEqual<Actual, Expected>>;
}
