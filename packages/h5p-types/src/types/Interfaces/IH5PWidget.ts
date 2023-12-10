/**
 * Any class that implements this interface can be used as a widget in H5P.
 * It defines the methods that are required for a widget to work: `appendTo`,
 * `validate` and `remove`.
 *
 * `appendTo` is called when the widget is added to the DOM.
 * It provides the container element as a jQuery object.
 * It is crucial to add the widget to the container element.
 *
 * `validate` is called in certain cases by the H5P framework to check if the
 * widget is valid, for instance when the user collapses the dropdown that the
 * widget belongs in. If the widget is not valid, the dropdown will not collapse.
 *
 * `remove` is called when the widget is removed from the DOM.
 * Here you should remove any global event listeners that you have added to avoid
 * memory leaks.
 *
 * It is recommended to use the `H5PWidget` class from `h5p-utils` as a base class
 * for your widget. It sets up the widget and adds the constructor parameters as
 * properties on the class. It also extends the `H5P.EventDispatcher` class, which
 * allows you to use the `trigger` and `on` methods to trigger and listen to events.
 *
 * ⚠️ If you decide not to extend the `H5PWidget` class, you will have to extend
 * `H5P.EventDispatcher` yourself.
 *
 * @example
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
 *```
 */
export interface IH5PWidget {
  // TODO: Add constructor interface
  appendTo($container: JQuery<HTMLElement>): void;
  validate(): boolean;
  remove(): void;
}
