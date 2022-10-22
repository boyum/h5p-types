import { promises as fs } from "fs";
import { join } from "path";

const typePath = "./src/types";

async function getTypeFileNames(): Promise<Array<string>> {
  return fs.readdir(typePath);
}

async function readFile(fileName: string): Promise<string> {
  return fs.readFile(join(typePath, fileName), { encoding: "utf-8" });
}

function removeImportStatements(fileContents: string): string {
  return fileContents.replace(
    /import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*;$/gm,
    "",
  );
}

function removeEmptyLines(fileContents: string): string {
  const lines = fileContents.split("\n");
  return lines.filter(Boolean).join("\n");
}

function combineFiles(files: Array<string>): string {
  return files.join("\n\n");
}

async function writeDeclarationFile(contents: string): Promise<void> {
  fs.writeFile("./index.d.ts", contents);
}

async function run() {
  const typeFileNames = await getTypeFileNames();
  const typeFiles = await Promise.all(typeFileNames.map(readFile));
  const typeFilesWithoutImportStatements = typeFiles.map(
    removeImportStatements,
  );
  const filesWithoutHoles =
    typeFilesWithoutImportStatements.map(removeEmptyLines);
  const combinedFiles = combineFiles(filesWithoutHoles);

  await writeDeclarationFile(combinedFiles);
}

run();
