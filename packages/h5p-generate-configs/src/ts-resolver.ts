import * as nodeModule from "node:module";

type ResolveContext = {
  conditions: string[];
  importAttributes: Record<string, string>;
  parentURL?: string;
};

type ResolveResult = {
  url: string;
  format?: string | null;
  shortCircuit?: boolean;
};

type ResolveHook = (
  specifier: string,
  context: ResolveContext,
  nextResolve: (
    specifier: string,
    context?: Partial<ResolveContext>,
  ) => ResolveResult,
) => ResolveResult;

type RegisterHooks = (hooks: { resolve: ResolveHook }) => {
  deregister: () => void;
};

const sourceExtensions = [".ts", ".tsx", ".mts", ".cts"];

const hasExtension = (specifier: string): boolean =>
  /\.[cm]?[jt]sx?$/.test(specifier);

const candidateSpecifiers = (specifier: string): string[] => {
  const isRelative = specifier.startsWith("./") || specifier.startsWith("../");
  if (!isRelative || hasExtension(specifier)) {
    return [];
  }

  return [
    ...sourceExtensions.map((extension) => `${specifier}${extension}`),
    ...sourceExtensions.map((extension) => `${specifier}/index${extension}`),
  ];
};

const isModuleNotFound = (error: unknown): boolean =>
  (error as NodeJS.ErrnoException | undefined)?.code === "ERR_MODULE_NOT_FOUND";

export const registerTypeScriptResolutionHooks = (): void => {
  const registerHooks = (
    nodeModule as unknown as { registerHooks?: RegisterHooks }
  ).registerHooks;

  if (typeof registerHooks !== "function") {
    return;
  }

  registerHooks({
    resolve(specifier, context, nextResolve) {
      try {
        return nextResolve(specifier, context);
      } catch (error) {
        if (!isModuleNotFound(error)) {
          throw error;
        }

        for (const candidate of candidateSpecifiers(specifier)) {
          try {
            return nextResolve(candidate, context);
          } catch (candidateError) {
            if (!isModuleNotFound(candidateError)) {
              throw candidateError;
            }
          }
        }

        throw error;
      }
    },
  });
};
