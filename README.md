# h5p-types

This is a collection of TypeScript type definitions for H5P.
Each package contains type definitions for a specific H5P content type or library.
This project aims to provide examples on how to use the type definitions in a TypeScript project.
Check out the [examples](./examples) folder for more information.

| Package                                                            | Description                                                                                                                                                 |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`h5p-json-schemas`](./packages/h5p-json-schemas/)                 | Schemas for JSON files related to H5P [(link to schemas)](https://h5p-schema.sindre.is/)                                                                    |
| [`h5p-qol-vscode-extension`](./packages/h5p-qol-vscode-extension/) | Quality of life improvements for H5P development in VSCode [(link to marketplace)](https://marketplace.visualstudio.com/items?itemName=sindreboyum.h5p-qol) |
| [`h5p-types`](./packages/h5p-types/)                               | Type definitions for H5P Core                                                                                                                               |
| [`h5p-types-joubel-ui`](./packages/h5p-types-joubel-ui/)           | Type definitions for [H5P JoubelUI](https://github.com/h5p/h5p-joubel-ui)                                                                                   |
| [`h5p-utils`](./packages/h5p-utils/)                               | Abstractions and utilities for creating H5P Widgets and Content Types                                                                                       |
| [`use-h5p`](./packages/use-h5p/)                                   | React Hooks to be used with H5P Widgets and Content Types                                                                                                   |

## Contributing

Are there missing type definitions, or are the types wrong?
Feel free to open an issue or a pull request.

## Development

### Adding a new package

Follow these steps to add a new package that will be released to npm:

1. Create a new folder in the `packages` folder
1. Add a note about the package to the table above
1. If that project should be published to npm, add it to the `project` array in the [check-npm-packages workflow](./.github/workflows/check-npm-packages.yml)
1. If that project is a dependency of another project, add it to that project's npm dependencies and use the version `"*"`

### Adding a new example

Follow these steps to add a new example:

1. Create a new folder in the `examples` folder
1. Add the new example to the `project` array in the [examples workflow](./.github/workflows/examples.yml)

### Turborepo

If updating `turbo` on an arm64 machine, you need to install both the arm64 and x64 versions of `turbo` for it to work in CI as well.

```sh
npm install -D --arch=x64 --platform=linux turbo
npm install -D --arch=arm64 --platform=darwin turbo
```
