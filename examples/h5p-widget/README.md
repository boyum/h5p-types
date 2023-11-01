# H5P Widget with webpack

This is a boilerplate for creating H5P widgets with [webpack](https://webpack.js.org/).
The code itself is very simplistic and only serves as a starting point for your own widget.
The project uses webpack as build tool.
This is the most common way of building H5P widgets.
If you want to opt for something that is quicker to build, you can check out the [Vite template](../h5p-widget-vite/).

## Parts

Each widget is built up by two parts: The widget class and registration of the widget.

### The widget class

The widget class needs to implement a few methods:

- `appendTo($container: JQuery<HTMLElement>): void` — Bootstraps the widget and is run when the widget is added to the editor
- `validate(): boolean` — Validates the widget and returns `true` if the widget is valid. This is run when the editor is saved.
- `remove(): void` — Is run when the widget is removed from the editor. This is where you should clean up any event listeners.

The simplest widget class would look like this:

```ts
import { H5PWidget } from "h5p-utils";

class NameWidget extends H5PWidget {
  override appendTo($container: JQuery<HTMLElement>): void {
    // Create a simple text input
    const label = document.createElement("label");
    label.innerText = "✨ What's your name? ✨";

    const input = document.createElement("input");
    input.type = "text";

    // If the user is editing the content type and the widget already has a value,
    // we want to show that value in the input.
    if (this.params) {
      input.value = this.params;
    }

    input.addEventListener("input", () => {
      // Update the value of the field with H5P's `setValue` method
      this.setValue(this.field, input.value);
    });

    label.append(input);

    // Add the input to the widget. `H5PWidget` has a property called `wrapper`
    // that is a HTMLDivElement which can be used for wrapping the widget.
    this.wrapper.append(label);

    // Add the widget to the editor
    $container.append(this.wrapper);
  }

  override validate(): boolean {
    // Always return true, as this widget is always valid
    return true;
  }

  override remove(): void {
    // Nothing to clean up
  }
}
```

#### The IH5PWidget interface

One can also add the `IH5PWidget` interface to the class to get some type safety:

```ts
import { type IH5PWidget } from "h5p-types";
import { H5PWidget } from "h5p-utils";

class Widget extends H5PWidget implements IH5PWidget {
  override appendTo($container: JQuery<HTMLElement>): void {
    // ...
  }

  override validate(): boolean {
    // ...
  }

  override remove(): void {
    // ...
  }
}
```

This enforces the widget to implement `appendTo`, `validate` and `remove`, which all are required for a widget to work.

#### Field and params

Each widget is tied to a field in `semantics.json`.
That field has a type, and it's important that the widget returns that type.
We can enforce that by using `H5PWidget`'s generic type.
Let's say our widget is used like this in `semantics.json`:

```json
{
  "label": "Name",
  "name": "name",
  "type": "text",
  "widget": "name-widget"
}
```

```ts
import { H5PFieldText } from "h5p-types";
import { H5PWidget } from "h5p-utils";

type Field = H5PFieldText;
type Params = string;

class NameWidget extends H5PWidget<Field, Params> {
  override appendTo($container: JQuery<HTMLElement>): void {
    // Create a simple text input
    const label = document.createElement("label");
    label.innerText = "✨ What's your name? ✨";

    const input = document.createElement("input");
    input.type = "text";

    // `this.params` is now typed as a string and not `unknown` ✨
    if (this.params) {
      input.value = this.params;
    }

    input.addEventListener("input", () => {
      // Now `setValue` will be typesafe and only accept strings
      this.setValue(this.field, input.value);
    });

    // ...
  }
}
```

### Registration

When the widget class is ready, it needs to be registered with the editor.
This is done with the `registerWidget` function:

```ts
import { registerWidget } from "h5p-utils";

// The short name is what you'll use in `semantics.json` when using the widget.
// The field would typically look something like this:
// {
//   "label": "Name",
//   "name": "name",
//   "type": "text",
//   "widget": "name-widget"
// }
const shortName = "name-widget";
const widgetName = "NameWidget";

registerWidget(shortName, widgetName, NameWidget);
```
