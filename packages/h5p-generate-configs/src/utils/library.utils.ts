import type { Command } from "@oclif/core";
import type { H5PLibrary } from "h5p-types";
import { createJsonFile } from "./file.utils.js";

async function readLibraryTSFile(path: string): Promise<H5PLibrary> {
  const { library }: { library: H5PLibrary } = await import(path);

  return library;
}

export async function generateLibrary(
  libraryTsPath: string,
  outputPath: string,
  verbose: boolean,
  log: Command["log"],
): Promise<void> {
  const path = libraryTsPath.trim();
  const isTSFile = path.endsWith(".ts") || path.endsWith(".tsx");
  if (!isTSFile) {
    throw new Error(`${path} is not a TS or TSX file.`);
  }

  const library = await readLibraryTSFile(path);

  if (verbose) {
    log(`Found library file. Path: ${libraryTsPath}`);
    log("Generating JSON file for library.");
  }

  await createJsonFile(library, outputPath);

  const filename = outputPath.split("/").at(-1);
  log(`Finished generating ${filename}`);
}
