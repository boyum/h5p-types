# h5p-types

This is a collection of TypeScript type definitions for H5P.
Each package contains type definitions for a specific H5P content type or library.
This project aims to provide examples on how to use the type definitions in a TypeScript project.
Check out the [examples](./examples) folder for more information.

| Package                                                                          | Description                                                           |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [`h5p-types`](https://www.npmjs.com/package/boyum/h5p-types)                     | Type definitions for H5P Core                                         |
| [`h5p-types-joubel-ui`](https://www.npmjs.com/package/boyum/h5p-types-joubel-ui) | Type definitions for [JoubelUI](https://github.com/h5p/h5p-joubel-ui) |

## Contributing

Are there missing type definitions, or are the types wrong?
Feel free to open an issue or a pull request.

## Development

If updating `turbo` on an arm64 machine, you need to install both the arm64 and x64 versions of `turbo` for it to work in CI as well.

```sh
npm install -D --arch=x64 --platform=linux turbo
npm install -D --arch=arm64 --platform=darwin turbo
```
