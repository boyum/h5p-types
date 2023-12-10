# h5p-utils

A set of utility classes and functions to be used when creating H5P widgets and content types.

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

An H5P widget is a class that has certain properties and is found on the global `window.H5P` object.
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


#### Example widget

```typescript
class MyWidget extends H5PWidget implements IH5PWidget {
  appendTo($container: JQuery<HTMLElement>) {
    const containerElement = $container.get(0);

    if (!containerElement) {
      throw new Error("Could not find container element for `MyWidget`");
    }

    const input = document.createElement("input");
    input.addEventListener("change", () =>
      this.setValue(this.field, input.value),
    );

    containerElement.appendChild(input);
  }

  validate() {
    return true;
  }

  remove() {}
}
```

#### Example widget with specified field type

The `H5PWidget` class infers its `Params` type field based on the type of the first Field type argument. By setting `H5PWidget<H5PFieldText>`, `this.params` is now of type `string`. If it was set to `H5PFieldBoolean` it would be `boolean`, and so on.

```typescript
class MyWidget extends H5PWidget<H5PFieldText> implements IH5PWidget {
  appendTo($container: JQuery<HTMLElement>) {
    const containerElement = $container.get(0);

    if (!containerElement) {
      throw new Error("Could not find container element for `MyWidget`");
    }

    const input = document.createElement("input");
    input.addEventListener("change", () =>
      this.setValue(this.field, input.value),
    );

    containerElement.appendChild(input);
  }

  validate() {
    return true;
  }

  remove() {}
}
```

#### Example group widget

If the field type is `H5PFieldGroup`, the type of `this.params` can be anything. Therefore, its type is `unknown | Record<string, unknown>` for now. We can override the Params type to handle this.

⚠️ Beware: If the group only has one field in it, the param type is the type of the field, not an object with one key value pair.

```typescript
type Field = H5PFieldGroup;

type Params = {
  name: string;
  age: number;
};

class MyWidget extends H5PWidget<Field, Params> implements IH5PWidget {
  appendTo($container: JQuery<HTMLElement>) {
    const containerElement = $container.get(0);

    if (!containerElement) {
      throw new Error("Could not find container element for `MyWidget`");
    }

    const nameInput = document.createElement("input");
    nameInput.addEventListener("change", () =>
      this.setValue(this.field, {
        ...this.params,
        name: input.value,
      }),
    );

    const ageInput = document.createElement("input");
    ageInput.addEventListener("change", () =>
      this.setValue(this.field, {
        ...this.params,
        age: Number.parseInt(input.value),
      }),
    );

    containerElement.appendChild(nameInput);
    containerElement.appendChild(ageInput);
  }

  validate() {
    return true;
  }

  remove() {}
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
