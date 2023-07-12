import type { GluegunPrint } from "gluegun";
import type { Library } from "h5p-types";
import { createJsonFile } from "./file.utils";

async function readLibraryTSFile(path: string): Promise<Library> {
  const { library }: { library: Library } = await import(path);

  return library;
}

export async function generateLibrary(
  libraryTsPath: string,
  outputPath: string,
  print: GluegunPrint,
): Promise<void> {
  const path = libraryTsPath.trim();
  const isTSFile = path.endsWith(".ts") || path.endsWith(".tsx");
  if (!isTSFile) {
    throw new Error(`${path} is not a TS or TSX file.`);
  }

  const library = await readLibraryTSFile(path);
  print.info("Found library file.");

  print.info("Generating JSON file for library.");
  await createJsonFile(library, outputPath);
}
