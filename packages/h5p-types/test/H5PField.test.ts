import type { ReadonlyDeep } from "type-fest";
import type { H5PField } from "../src/types/H5PField";

// @ts-ignore Test
namespace Test_Widget_Html {
  // @ts-ignore Ignore unused variable
  const field = {
    label: "Description",
    name: "description",
    type: "text",
    widget: "html",

    // tags is a custom property for the html widget
    tags: ["a", "p", "br"],
  } as const satisfies ReadonlyDeep<H5PField>;
}

// @ts-ignore Test
namespace Test_ListFieldSupportsWidgetProperty {
  // @ts-ignore Ignore unused variable
  const field = {
    label: "Description",
    name: "description",
    type: "list",
    widget: "",
    entity: "",
    field: {
      label: "Title",
      name: "title",
      type: "text",
    },
  } as const satisfies ReadonlyDeep<H5PField>;
}
