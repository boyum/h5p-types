import type { IH5PContentType, InferParamsFromSemantics } from "h5p-types";
import { H5P, H5PContentType, registerContentType } from "h5p-utils";
import library from "../library.json";
import semantics from "../semantics.json";

type Params = InferParamsFromSemantics<typeof semantics>;

class ContentType
  extends H5PContentType<Params>
  implements IH5PContentType<Params>
{
  attach($wrapper: JQuery<HTMLElement>): void {
    // `h5p-extensions.d.ts` extends `h5p-types-joubel-ui` which includes `H5P.JoubelUI`
    const button = H5P.JoubelUI.createButton({
      title: this.params.l10n.finish,
    });

    $wrapper.append(button);
  }
}

const contentTypeName = library.machineName.replace("H5P.", "");
registerContentType(contentTypeName, ContentType);
