import type { ReadonlyDeep } from "type-fest";
import type { H5PField } from "../src/types/H5PField";

// @ts-ignore Test
namespace Test_Widget_Html {
  // @ts-ignore
  const field = {
    label: "Description",
    name: "description",
    type: "text",
    widget: "html",

    // tags is a custom property for the html widget
    tags: ["a", "p", "br"],
  } as const satisfies ReadonlyDeep<H5PField>;
}
