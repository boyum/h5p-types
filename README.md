# h5p-types

This is a collection of TypeScript type definitions for H5P.
Each package contains type definitions for a specific H5P content type or library.
This project aims to provide examples on how to use the type definitions in a TypeScript project.
Check out the [examples](./examples) folder for more information.

| Package                                                  | Description                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------- |
| [`h5p-types`](./packages/h5p-types/)                     | Type definitions for H5P Core                                             |
| [`h5p-types-joubel-ui`](./packages/h5p-types-joubel-ui/) | Type definitions for [H5P JoubelUI](https://github.com/h5p/h5p-joubel-ui) |
| [`h5p-utils`](./packages/h5p-utils/)                     | Abstractions and utilities for creating H5P Widgets and Content Types     |
| [`use-h5p`](./packages/use-h5p/)                         | React Hooks to be used with H5P Widgets and Content Types                 |

## Contributing

Are there missing type definitions, or are the types wrong?
Feel free to open an issue or a pull request.

## Development

If updating `turbo` on an arm64 machine, you need to install both the arm64 and x64 versions of `turbo` for it to work in CI as well.

```sh
npm install -D --arch=x64 --platform=linux turbo
npm install -D --arch=arm64 --platform=darwin turbo
```
