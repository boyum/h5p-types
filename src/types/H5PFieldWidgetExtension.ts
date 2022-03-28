import { H5PShowWhenOptions } from "./H5PShowWhenOptions";

export type H5PFieldWidgetExtension =
  | {
      widget?: string;
    }
  | {
      // To use the Show When or NDLA Show When widgets, first add them to the editorDependencies list in library.json
      widget: "showWhen" | "NDLAShowWhen";
      showWhen: H5PShowWhenOptions;
    }
  | {
      widget: "NDLATagsPicker";
      fieldNameToWatch: string;
    };
