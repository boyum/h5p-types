import type { H5PField, H5PBehaviour, H5PL10n } from "h5p-types";
import { getPosition } from "./semantics-helper";


type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

export const semantics = [
  {
    label: "Position",
    name: "position",
    type: "group",
    fields: [getPosition("x"), getPosition("y")],
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    widget: "html",
    tags: ["a", "p", "br"],
  },
  {
    label: "Image",
    name: "image",
    type: "image",
  },
  {
    label: "Behaviour",
    name: "behaviour",
    type: "group",
    fields: [
      {
        label: "Theme color",
        name: "themeColor",
        type: "text",
        default: "#22bbff",
      },
    ],
  },
  {
    label: "L10n",
    name: "l10n",
    type: "group",
    fields: [
      {
        label: "Open",
        name: "open",
        type: "text",
        default: "Open",
      },
      {
        label: "Close",
        name: "close",
        type: "text",
        default: "Close",
      },
    ],
  },
] as const satisfies ReadonlyDeep<Array<H5PField| H5PBehaviour | H5PL10n>>;
