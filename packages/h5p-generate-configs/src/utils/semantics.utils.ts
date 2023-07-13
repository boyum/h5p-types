import { Command } from "@oclif/core";
import { existsSync, promises as fs } from "fs";
import type { H5PBehaviour, H5PField, H5PL10n } from "h5p-types";
import type { Semantics } from "../types/Semantics";
import { findDuplicates } from "./array.utils";
import { createJsonFile } from "./file.utils";

const isH5PL10n = (obj: H5PField | H5PBehaviour | H5PL10n): obj is H5PL10n => {
  return obj.name === "l10n";
};

async function readSemanticsTSFile(path: string): Promise<Semantics> {
  const { semantics }: { semantics: Semantics } = await import(path);

  return semantics;
}

async function deleteTranslationKeysFile(
  translationKeyOutputPath: string,
): Promise<void> {
  const fileExists = existsSync(translationKeyOutputPath);
  if (fileExists) {
    await fs.rm(translationKeyOutputPath);
  }
}

async function createTranslationKeys(
  semantics: Semantics,
  translationKeyOutputPath: string,
): Promise<void> {
  const translationField = semantics.find(field =>
    isH5PL10n(field),
  ) as H5PL10n | null;

  if (!translationField) {
    await deleteTranslationKeysFile(translationKeyOutputPath);
    return;
  }

  const translationKeys = translationField.fields.map(({ name }) => name);

  const duplicates = findDuplicates(translationKeys);
  const duplicateKeysExist = duplicates.length > 0;
  if (duplicateKeysExist) {
    throw new Error(
      `Duplicate translation keys exist:\n · ${duplicates.join("\n · ")}\n`,
    );
  }

  const translationKeysString = translationKeys.join(`"\n  | "`);

  const textContent = `// --------- ⚠️  WARNING  ⚠️ ---------
// This file is generated from the values within \`semantics.json\`'s l10n group. 
// Do not change it manually, but rather change \`semantics.ts\` and run
// \`npm run generate-semantics\`.
// -----------------------------------

export type TranslationKey =
  | "${translationKeysString}";
`;

  await fs.writeFile(translationKeyOutputPath, textContent);
}

export async function generateSemantics(
  semanticsTsPath: string,
  outputPath: string,
  translationKeyOutputPath: string | undefined,
  debug: boolean,
  log: Command["log"],
): Promise<void> {
  const path = semanticsTsPath.trim();
  const isTSFile = path.endsWith(".ts") || path.endsWith(".tsx");
  if (!isTSFile) {
    throw new Error(`${path} is not a TS or TSX file.`);
  }

  const semantics = await readSemanticsTSFile(path);
  log("Found semantics file.");

  if (translationKeyOutputPath) {
    if (debug) {
      log("Generating type file for translation keys.");
    }

    await createTranslationKeys(semantics, translationKeyOutputPath);
  } else {
    if (debug) {
      log("Path for translation key type output file was not provided.");
    }
  }

  log("Generating JSON file for semantics.");
  await createJsonFile(semantics, outputPath);

  const filename = outputPath.split("/").at(-1);
  log(`Finished generating ${filename}`);
}
