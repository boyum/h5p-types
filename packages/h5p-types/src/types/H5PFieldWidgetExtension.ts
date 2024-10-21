import type { OneOf } from "../utility-types";
import type { H5PShowWhenOptions } from "./H5PShowWhenOptions";

type NoWidget = { widget?: never };

type UnknownWidget = {
  widget: string;
};


type AnyWidget = {
  widget?: string;
};

type ShowWhenWidget = {
  widget: "showWhen" | "NDLAShowWhen";
  showWhen: H5PShowWhenOptions;
};

type NDLATagsPickerWidget = {
  widget: "NDLATagsPicker";
  fieldNameToWatch: string;
};

export type H5PFieldWidgetExtension = OneOf<
  [NoWidget, AnyWidget, ShowWhenWidget, NDLATagsPickerWidget]
>;
