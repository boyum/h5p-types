# h5p-utils

A set of utility classes and functions to be used when creaintg H5P widgets and content types.

## Global objects

This library provides the global `H5P` and `H5PEditor` objects. These are directly transferred from `window` and will only have a value if the objects exist on `window`. This means that even if it seems available from `h5p-utils`, `H5PEditor` will not be available if not in a Widget/Editor context.

```ts
import { H5P, H5PEditor } from "h5p-utils";

const $myDiv = H5P.jQuery("div");

const contentId = H5PEditor.contentId;
```

## Content types

### Content type construction

To create a valid content type, extend `H5PContentType<TParams>` as such:

```ts
import { H5PContentType } from "h5p-utils";

type Params = {
  person: string;
};

export class MyContentType extends H5PContentType<Params> {
  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-content-type` to.",
      );
      return;
    }

    const { person } = this.params;

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-content-type");

    const div = document.createElement("div");
    div.innerText = `Hello ${person ?? "World"}`;
    this.wrapper.appendChild(div);
  }
}
```

### Content type registration

This content type needs to be registered to be used by H5P. The `registerContentType` utility function helps us with that:

```ts
import { registerContentType } from "h5p-utils";

// The first parameter in `registerContentType` is what will become
// the content type's name, i. e. the name of the constructor's
// property under `window.H5P`. In this case `H5P.MyContentType`.
registerContentType("MyContentType", MyContentType);
```

## Widgets

### Widget construction

Custom widgets should extend `H5PWidget<TField, TParams>`:

```ts
import { H5PWidget } from "h5p-types";

type Field = H5PFieldText;

// If the `TField` type parameter is a simple field (text, number,
// boolean, i. e. not group or list), then the `TParam` type
// parameter will be inferred. If it can't be inferred, it will
// default to `unknown`, but it can be overridden.
export class MyWidget extends H5PWidget<Field> {
  appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error("Found no containing element to attach `MyWidget` to.");
      return;
    }

    const { field, params: name, setValue, wrapper } = this;

    wrapper.classList.add("field", `field-name-${field.name}`);
    containerElement.appendChild(wrapper);

    H5PEditor.processSemanticsChunk(
      [this.field],
      {},
      $(this.wrapper),
      this.parent,
    );

    const labelElement = document.createElement("label");
    labelElement.innerText = "Insert name";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.onchange = () => setValue(field, nameInput.value);

    if (name) {
      nameInput.value = name;
    }

    labelElement.appendChild(nameInput);
    wrapper.appendChild(labelElement);
  }

  validate(): boolean {
    return true;
  }

  remove(): void {}
}
```

### Widget registration

To register widgets, use `registerWidget`:

```ts
import { registerWidget } from "h5p-utils";

// The first parameter is, similar to content types, the name of the widget.
// The second parameter is the name that will be used when using the widget
// in semantics.json.
registerWidget("MyWidget", "my-widget", MyWidget);
```
