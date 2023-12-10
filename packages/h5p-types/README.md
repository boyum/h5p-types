# H5P Types

This package provides TypeScript types for H5P.
This project might one day become `@types/h5p`.

Most of these types are copies of models found in the H5P Core, and are no more than declarations.
They describe the structure of models that are found in the H5P Core and is especially helpful for APIs like the `H5P` and `H5PEditor` global objects.

## Usage

Install the package:

```bash
npm install h5p-types --save-dev
```

`h5p-types` depends on TypeScript and requires TypeScript version 5.0.4 or higher to be installed.
If you need support for TypeScript 4.7, install `h5p-types@2.0.1`.

## Docs

Go to the [documentation site](https://h5p-types-docs.vercel.app/) to see each type, interface and class in detail.

Featured types and interfaces:

- [`H5PObject`](https://h5p-types-docs.vercel.app/interfaces/H5PObject.html) - The global `H5P` object.
- [`H5PEditor`](https://h5p-types-docs.vercel.app/interfaces/H5PEditorObject.html) - The global `H5PEditor` object.
- [`IH5PContentType`](https://h5p-types-docs.vercel.app/interfaces/IH5PContentType.html) - The interface for content types.
- [`IH5PWidget`](https://h5p-types-docs.vercel.app/interfaces/IH5PWidget.html) - The interface for widgets.
- [`InferParamsFromSemantics`](https://h5p-types-docs.vercel.app/types/InferParamsFromSemantics.html) - A utility type that infers the params type from a semantics object.
