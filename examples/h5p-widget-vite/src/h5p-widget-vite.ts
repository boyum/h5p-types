import type { H5PFieldGroup, IH5PWidget } from "h5p-types";
import { H5P, H5PEditor, H5PWidget, registerWidget } from "h5p-utils";
import library from "../library.json";

type Field = H5PFieldGroup;
type Params = {
  name: string;
  description: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
function arrayTest(_arr: Array<unknown>): void {}

class Widget extends H5PWidget<Field, Params> implements IH5PWidget {
  override appendTo($container: JQuery<HTMLElement>): void {
    // `h5p-extensions.d.ts` extends `h5p-types-joubel-ui` which includes `H5P.JoubelUI`
    const button = H5P.JoubelUI.createButton({
      title: "",
    });

    H5PEditor.processSemanticsChunk(
      [this.field],
      {},
      $(this.wrapper),
      this.parent,
    );

    // The field is a group
    arrayTest(this.field.fields);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.wrapper.append(button.get(0)!);
    $container.append(this.wrapper);
  }

  override validate(): boolean {
    return true;
  }

  override remove(): void {
    this.wrapper.remove();
  }
}

const widgetName = library.machineName.replace("H5P.", "");
registerWidget("widget", widgetName, Widget);
