import type { H5PExtras, InferParamsFromSemantics } from "h5p-types";
import { H5PResumableContentType, registerContentType } from "h5p-utils";
import library from "../library.json";
import semantics from "../semantics.json";

type Params = InferParamsFromSemantics<typeof semantics>;

type State = {
  isActive: boolean;
};

/**
 * A resumable content type extends the H5PResumableContentType class.
 * Each resumable content type needs to implement the getCurrentState method,
 * which returns the current state of the content type, and in turn
 * is used by the H5P framework to save the state of the content type.
 */
export class ResumableContentType extends H5PResumableContentType<
  Params,
  State
> {
  constructor(params: Params, contentId: string, extras?: H5PExtras) {
    super(params, contentId, extras);

    const { person } = this.params;

    const div = document.createElement("div");
    div.innerText = `Hello ${person ?? "World"}`;

    this.wrapper.appendChild(div);
  }

  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-resumable-content-type` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-resumable-content-type");
  }

  getCurrentState(): State {
    return (
      this.state ?? {
        isActive: false,
      }
    );
  }
}

const contentTypeName = library.machineName.replace("H5P.", "");
registerContentType(contentTypeName, ResumableContentType);
