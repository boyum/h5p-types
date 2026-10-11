# h5p-generate-configs

A tool for creating common H5P config files out of a TypeScript definition.

The CLI reads a TypeScript file that exports an H5P library or semantics definition and writes the corresponding JSON config file. It ships as an ESM-only package with no runtime dependencies, so it is invoked through `npx` or installed as a dev dependency:

```shell
$ npm install --save-dev h5p-generate-configs
```

**Requires Node.js 22 or later.** The CLI uses built-in argument parsing and Node's native TypeScript type stripping to load your `.ts` files.

## Generate semantics

To run the program that generates semantics, run `h5p-generate-configs generate-semantics` or `h5p-generate-configs s`.

To generate `semantics.json` from `semantics.ts`, provide the path to `semantics.ts`. The JSON will by default be outputted to the current directory:

```shell
$ h5p-generate-configs s --type-definition src/semantics.ts
```

The tool can also create a TypeScript `type` file for the translation keys found in `semantics.ts`. Provide an output path as such:

```shell
$ h5p-generate-configs s -d src/semantics.ts -t src/TranslationKey.ts
```

The generated file exports a `TranslationKey` union type built from the `name` of every field in the `l10n` group of your semantics definition, so you can reference the keys without repeating string literals:

```ts
import type { TranslationKey } from "./TranslationKey.ts";

const label: TranslationKey = "open";
```

If your semantics definition has no `l10n` group, no file is created. If a file already exists at the path you passed to `--translations`, it is deleted, since there are no translation keys to generate.

### Options

| Name                | Alias | Description                                                                | Required | Default          |
| ------------------- | ----- | -------------------------------------------------------------------------- | -------- | ---------------- |
| `--type-definition` | `-d`  | Path to the TypeScript definition of semantics                             | `true`   | -                |
| `--out`             | `-o`  | Path to JSON output                                                        | `false`  | `semantics.json` |
| `--translations`    | `-t`  | Path to translation type output. The file won't be created if not provided | `false`  | -                |
| `--debug`           | `-D`  | Show verbose debug logs, including the stack trace on failure              | `false`  | `false`          |
| `--help`            | `-h`  | Show help for this command                                                 | `false`  | -                |

## Generate library

To run the program that generates library.json, run `h5p-generate-configs generate-library` or `h5p-generate-configs l`.

To generate `library.json` from `library.ts`, provide the path to `library.ts`. The JSON will by default be outputted to the current directory:

```shell
$ h5p-generate-configs l --type-definition src/library.ts
```

### Options

| Name                | Alias | Description                                                   | Required | Default        |
| ------------------- | ----- | ------------------------------------------------------------- | -------- | -------------- |
| `--type-definition` | `-d`  | Path to the TypeScript definition of library                  | `true`   | -              |
| `--out`             | `-o`  | Path to JSON output                                           | `false`  | `library.json` |
| `--debug`           | `-D`  | Show verbose debug logs, including the stack trace on failure | `false`  | `false`        |
| `--help`            | `-h`  | Show help for this command                                    | `false`  | -              |

## Help

`--help` and `-h` are available on the CLI itself and on each command. The bare `help` command prints the same overview:

```shell
$ h5p-generate-configs --help
$ h5p-generate-configs help
$ h5p-generate-configs generate-semantics --help
```

## Exit codes

| Code | Meaning                                                                                              |
| ---- | ---------------------------------------------------------------------------------------------------- |
| `0`  | The config file was generated                                                                        |
| `1`  | Something failed while generating, for example the type definition file could not be found or parsed |
| `2`  | The command was used incorrectly, for example an unknown command or flag, or a missing required flag |

Errors are written to stderr, so you can separate them from the progress logs on stdout.

## Troubleshooting

**`Cannot find module '...'`**

Make sure the path you passed to `--type-definition` exists, and that every import inside the definition file resolves.

Relative imports do not need a file extension. `./my-helper`, `./my-helper.ts` and `./my-helpers` (a directory with an `index.ts`) all work. What does not work is a relative import that carries the wrong extension. If your project follows the TypeScript convention of writing `./my-helper.js` to refer to `my-helper.ts`, the CLI looks for a `my-helper.js` file and does not find one:

```ts
// Fails — there is no my-helper.js on disk
import { myField } from "./my-helper.js";

// Works
import { myField } from "./my-helper.ts";
```

**`Cannot find package '...'`**

Non-relative imports are resolved by Node rather than by your build setup, so the package has to be installed in the project you run the command from. Path aliases from your `tsconfig.json` (`compilerOptions.paths`) are not applied. Use relative imports inside the definition file instead.

**`ERR_UNKNOWN_FILE_EXTENSION`**

Only `.ts` and `.tsx` files are supported. Pass the path to the TypeScript definition, not to a `.js` file or to a directory.

**You need more detail about a failure**

Re-run with `-D` (`--debug`) to get verbose logs. If the command fails, the full stack trace is printed to stderr.

## Publishing to NPM

To package the CLI up for NPM, do this:

```shell
$ npm run publish-to-npm
```