import type {
  H5PField,
  H5PForm,
  H5PSetValue,
  IH5PWidget,
  InferParamTypeFromFieldType,
} from "h5p-types";
import { H5P } from "../utils/H5P.utils.js";

/**
 * Sets up everything you'll need to create a widget for H5P. Behind the scenes,
 * it extends the `H5P.EventDispatcher` class, which allows you to use the `trigger`
 * and `on` methods to trigger and listen to events.
 *
 * It will also add the constructor parameters as properties on the class.
 *
 * Use it in combination with the `IH5PWidget` interface from `h5p-types` to create
 * a widget for H5P.
 *
 * @example
 *
 * To create a basic widget, extend the `H5PWidget` class and implement the `IH5PWidget`
 * interface.
 *
 * ```typescript
 * import { H5PWidget } from "h5p-utils";
 * import type { IH5PWidget } from "h5p-types";
 *
 * class MyWidget extends H5PWidget implements IH5PWidget {
 *   appendTo($container: JQuery<HTMLElement>) {
 *     const containerElement = $container.get(0);
 *
 *     if (!containerElement) {
 *       throw new Error("Could not find container element for `MyWidget`");
 *     }
 *
 *     const input = document.createElement("input");
 *     input.addEventListener("change", () =>
 *       this.setValue(this.field, input.value),
 *     );
 *
 *     containerElement.appendChild(input);
 *   }
 *
 *   validate() {
 *     return true;
 *   }
 *
 *   remove() {}
 * }
 * ```
 *
 * @example
 *
 * The `H5PWidget` class infers its `Params` type field based on the type of the first Field type argument.
 * By setting `H5PWidget<H5PFieldText>`, `this.params` is now of type `string`.
 * If it was set to `H5PFieldBoolean` it would be `boolean`, and so on.
 *
 * ```typescript
 * class MyWidget extends H5PWidget<H5PFieldText> implements IH5PWidget {
 *   appendTo($container: JQuery<HTMLElement>) {
 *     const containerElement = $container.get(0);
 *
 *     if (!containerElement) {
 *       throw new Error("Could not find container element for `MyWidget`");
 *     }
 *
 *     const input = document.createElement("input");
 *     input.addEventListener("change", () =>
 *       this.setValue(this.field, input.value),
 *     );
 *
 *     containerElement.appendChild(input);
 *   }
 *
 *   validate() {
 *     return true;
 *   }
 *
 *   remove() {}
 * }
 * ```
 *
 * @example
 *
 * If the field type is `H5PFieldGroup`, the type of `this.params` can be anything.
 * Therefore, its type will be resolved to `unknown | Record<string, unknown>` for now.
 * We can override the Params type to handle this.
 *
 * ⚠️ Beware: If the group only has one field in it, the param type is the type of the field, not an object with one key value pair.
 *
 * ```typescript
 * type Field = H5PFieldGroup;
 *
 * type Params = {
 *   name: string;
 *   age: number;
 * };
 *
 * class MyWidget extends H5PWidget<Field, Params> implements IH5PWidget {
 *   appendTo($container: JQuery<HTMLElement>) {
 *     const containerElement = $container.get(0);
 *
 *     if (!containerElement) {
 *       throw new Error("Could not find container element for `MyWidget`");
 *     }
 *
 *     const nameInput = document.createElement("input");
 *     nameInput.addEventListener("change", () =>
 *       this.setValue(this.field, {
 *         ...this.params,
 *         name: input.value,
 *       }),
 *     );
 *
 *     const ageInput = document.createElement("input");
 *     ageInput.addEventListener("change", () =>
 *       this.setValue(this.field, {
 *         ...this.params,
 *         age: Number.parseInt(input.value),
 *       }),
 *     );
 *
 *     containerElement.appendChild(nameInput);
 *     containerElement.appendChild(ageInput);
 *   }
 *
 *   validate() {
 *     return true;
 *   }
 *
 *   remove() {}
 * }
 * ```
 */
export abstract class H5PWidget<
    TField extends H5PField = H5PField,
    TParams = InferParamTypeFromFieldType<TField>,
  >
  extends H5P.EventDispatcher
  implements IH5PWidget
{
  protected wrapper: HTMLElement;

  constructor(
    protected parent: H5PForm<TParams>,
    public field: TField,
    protected params: TParams | undefined,
    protected setValue: H5PSetValue<TParams>,
  ) {
    super();
    this.wrapper = document.createElement("div");
  }

  public abstract appendTo($container: JQuery<HTMLElement>): void;

  public abstract validate(): boolean;

  public abstract remove(): void;
}
