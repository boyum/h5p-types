# H5P Content Type with Vite

This is a boilerplate for creating H5P content types with [Vite](https://vitejs.dev/).
The code is the same as in the [template that uses webpack](../h5p-content-type/), but the build process is different.

## Key differences from webpack

The code in the projects is the same, but not representative for all projects.
Still, these numbers tell a story about the differences between webpack and Vite.

| Tool    | Compile time |  Output size |
| ------- | ------------ | ------------ |
| webpack | ~4s          | 2.69 kB      |
| Vite    | ~80ms        | ~1.12 kB     |

Vite is generally _much_ quicker and will output a smaller bundle, and its config is by some regarded as simpler.

## Drawbacks

If you decide to go with Vite in a TypeScript project, remember to check types manually, as Vite (and esbuild) does not do this for you to save time when compiling.
This can be done by running `tsc --noEmit`.
