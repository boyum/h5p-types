# h5p-generate-configs

A tool for creating common H5P config files out of a TypeScript definition.

## Generate semantics

To run the program that generates semantics, run `h5p-generate-configs generate-semantics` or `h5p-generate-configs s`.

To generate `semantics.json` from `semantics.ts`, provide the path to `semantics.ts`. The JSON will by default be outputted to the current directory:

```shell
$ h5p-generate-configs s --type-definition src/semantics.ts
```

The tool can also create a TypeScript `type` file for the translation keys found in `semantics.ts`. Provide an output path as such:

```shell
$ h5p-generate-configs s -i src/semantics.ts -t src/TranslationKey.ts
```

### Options

| Name                | Alias | Description                                                                | Required | Default          |
| ------------------- | ----- | -------------------------------------------------------------------------- | -------- | ---------------- |
| `--type-definition` | `-d`  | Path to the TypeScript definition of semantics                             | `true`   | -                |
| `--out`             | `-o`  | Path to JSON output                                                        | `false`  | `semantics.json` |
| `--translations`    | `-t`  | Path to translation type output. The file won't be created if not provided | `false`  | -                |

## Generate library

To run the program that generates library.json, run `h5p-generate-configs generate-library` or `h5p-generate-configs l`.

To generate `library.json` from `library.ts`, provide the path to `library.ts`. The JSON will by default be outputted to the current directory:

```shell
$ h5p-generate-configs l --type-definition src/library.ts
```

### Options

| Name                | Alias | Description                                  | Required | Default        |
| ------------------- | ----- | -------------------------------------------- | -------- | -------------- |
| `--type-definition` | `-d`  | Path to the TypeScript definition of library | `true`   | -              |
| `--out`             | `-o`  | Path to JSON output                          | `false`  | `library.json` |

## Publishing to NPM

To package the CLI up for NPM, do this:

```shell
$ npm run publish-to-npm
```
