import type { H5PObject } from "h5p-types";
import type { AreEqual, Expect } from "./test-utility-types.js";

declare const H5P: H5PObject;
H5P.$body;
H5P.JoubelUI.createScoreBar(1, "", "", "").appendTo("");

const button1 = H5P.JoubelUI.createButton({ class: "foo" });
const button2 = H5P.JoubelUI.createButton({});

// biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
// @ts-expect-error
// biome-ignore lint/correctness/noUnusedVariables: Type testing
type Test1 =
  Expect<AreEqual<typeof button1, JQuery<HTMLButtonElement>>>;

// biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
// @ts-expect-error
// biome-ignore lint/correctness/noUnusedVariables: Type testing
type Test2 =
  Expect<AreEqual<typeof button2, JQuery<HTMLButtonElement>>>;

const link1 = H5P.JoubelUI.createButton({ class: "foo", href: "abc" });
const link2 = H5P.JoubelUI.createButton({ href: "abc" });

// biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
// @ts-expect-error
// biome-ignore lint/correctness/noUnusedVariables: Type testing
type Test3 =
  Expect<AreEqual<typeof link1, JQuery<HTMLAnchorElement>>>;

// biome-ignore format: Avoid `@ts-expect-error` from ignoring test assertion
// @ts-expect-error
// biome-ignore lint/correctness/noUnusedVariables: Type testing
type Test4 =
  Expect<AreEqual<typeof link2, JQuery<HTMLAnchorElement>>>;
