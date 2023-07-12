import type { H5PField, H5PBehaviour, H5PL10n } from "h5p-types";
import { getPosition } from "./semantics-helper";

export const semantics: Readonly<Array<H5PField | H5PBehaviour | H5PL10n>> = [
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
];
