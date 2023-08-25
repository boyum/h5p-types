# H5P Types

TypeScript types for H5P. This project might one day become @types/h5p.

These H5P types, with the exception of `Params` are copies of models found in the H5P Core, and are no more than declarations, except from two classes used for creating content types and widgets.

`Params` is the type of the `params` parameter in the `H5PWrapper` and is structured after `semantics.json`.

## Usage

Install the package:

```bash
npm install h5p-types --save-dev
```

`h5p-types` depends on TypeScript and requires TypeScript version 5.0.4 or higher to be installed.
If you need support for TypeScript 4.7, install `h5p-types@2.0.1`.

## Creating a new widget

A new H5P widget is a class that has certain properties and is found on the global `window.H5P` object.

### Example widget

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

### Example widget with specified field type

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

### Example group widget

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
