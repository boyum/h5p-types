import type { H5PLibrary } from "h5p-types";

type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

export const library = {
  machineName: "Demo",
  majorVersion: 1,
  minorVersion: 2,
  patchVersion: 3,
  title: "Demo",
  preloadedCss: [],
  preloadedDependencies: [],
  preloadedJs: [],
  runnable: 0,
  author: "",
  coreApi: {
    majorVersion: 1,
    minorVersion: 2,
  },
  dynamicDependencies: [],
} as const satisfies ReadonlyDeep<H5PLibrary>;
