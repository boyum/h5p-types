# Upgrading H5P content types

When updating the major or minor version of a content type, it's possible to run a script to upgrade/migrate existing content.
Create a `upgrades.js` file in the root directory, and it will be run _in the browser_ when the content type is upgraded in the editor.

The script itself should extend the global `H5PUpgrades` object with a new field which has the library's name as key.
The value should be an object which has each major versions as keys, and an object with the minor versions as the value.
The minor versions should be functions which take the content type's params (from semantics) as the first argument, and a `finished` callback as the second.

It's advised to add thorough comments on each upgrade function, so it's easy to understand what's happening, since the scripts might be run years after they were written.

`upgrades.js`:

```js
// `H5PUpgrades` might not be defined yet, so we need to create it.
window.H5PUpgrades = window.H5PUpgrades || {};

// Add the content type's name as a key, and the upgrade script as the value.
window.H5PUpgrades.MyContentType = {
  1: {
    0: (params, finished) => {
      // Upgrade from 0.x to 1.0

      // The `text` field is new, we need to add it to existing content.
      params.text = params.text ?? "";

      finished(null, params);
    },
    1: (params, finished) => {
      // Upgrade from 1.0 to 1.1

      // The `text` field will be trimmed in the new version, so we need to trim previous values.
      params.text = params.text.trim();

      finished(null, params);
    },
  },
  2: {
    0: (params, finished) => {
      // Upgrade from 1.x to 2.0

      // The `text` field will be removed in the new version, so we need to remove it from existing content.
      delete params.text;

      finished(null, params);
    },
  },
};
```

When adding a new version number to the script, be sure _not_ to change the existing ones.
This is because the script will be run for each version, and the content type might be upgraded from any version to the latest.

## Typing the upgrade script

The upgrade script is run in the browser, so it's not possible to use TypeScript to type it.
However, it's possible to use JSDoc to type the script, and get _some_ type checking in the editor.

Because of the nature of the script, it's hard to type the `params` argument, since it can change between versions.
However, it's possible to type the `finished` callback, which is the same for all versions.

```ts
type H5PUpgradeError =
  | {
      type: "errorTooHighVersion";
      used: string;
      supported: string;
    }
  | {
      type: "errorNotSupported";
      used: string;
    }
  | {
      type: "errorParamsBroken";
      id: number | string;
    }
  | {
      type: "libraryMissing";
      library: string;
    }
  | {
      type: "scriptMissing";
      library: string;
    }
  | string;

type H5PUpgradeFinished =
  | ((error: null, params: unknown) => void)
  | ((error: H5PUpgradeError, params?: unknown) => void);

type H5PUpgrades = {
  [libraryName: string]: {
    [majorVersion: number]: {
      [minorVersion: number]: (
        params: any,
        finished: H5PUpgradeFinished,
      ) => void;
    };
  };
};
```

The types above are defined in `H5PUpgrades.ts` in this package, and is exported as `H5PUpgrades`.
We can use them with the `@ts-check` comment at the top of the file to get type checking in the editor.

`upgrades.js`:

```js
// Turn on type checking for this JavaScript file.
// @ts-check

/** @type {import('h5p-types').H5PUpgrades} */
window.H5PUpgrades = window.H5PUpgrades || {};

window.H5PUpgrades.MyContentType = {
  1: {
    0: (/** @type {Record<string, unknown>} */ params, finished) => {
      if (typeof params.text !== "string") {
        finished(
          `The \`text\` field was expected to be a string, but was a ${typeof params.text}"`,
        );

        return;
      }

      // Trim params.text
      params.text = params.text.trim();

      finished(null, params);
    },
  },
};
```
