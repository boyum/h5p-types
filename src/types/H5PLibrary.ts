export type Library = {
  title: string;
  machineName: string;
  majorVersion: number;
  minorVersion: number;
  patchVersion: number;
  runnable?: number;
  preloadedJs?: { path: string }[];
  preloadedCss?: { path: string }[];
  preloadedDependencies?: {
    machineName: string;
    majorVersion: number;
    minorVersion: number;
  }[];
};
