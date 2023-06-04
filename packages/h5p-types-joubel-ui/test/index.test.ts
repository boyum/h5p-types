import { H5PObject } from "h5p-types";
import { Expect, AreEqual } from "./test-utility-types";

declare const H5P: H5PObject;
H5P.$body;
H5P.JoubelUI.createScoreBar(1, "", "", "").appendTo("");

const button1 = H5P.JoubelUI.createButton({ class: "foo" });
const button2 = H5P.JoubelUI.createButton({});

// prettier-ignore
// @ts-expect-error
type Test1 = 
  Expect<AreEqual<typeof button1, JQuery<HTMLButtonElement>>>;

// prettier-ignore
// @ts-expect-error
type Test2 = 
  Expect<AreEqual<typeof button2, JQuery<HTMLButtonElement>>>;

const link1 = H5P.JoubelUI.createButton({ class: "foo", href: "abc" });
const link2 = H5P.JoubelUI.createButton({ href: "abc" });

// prettier-ignore
// @ts-expect-error
type Test3 =
  Expect<AreEqual<typeof link1, JQuery<HTMLAnchorElement>>>;

// prettier-ignore
// @ts-expect-error
type Test4 = 
  Expect<AreEqual<typeof link2, JQuery<HTMLAnchorElement>>>;
