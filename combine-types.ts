import { promises as fs } from "fs";
import { join } from "path";

const typePath = "./src/types";

async function getTypeFileNames(): Promise<Array<string>> {
  return (await fs.readdir(typePath)).map(typeFile => join(typePath, typeFile));
}

async function readFile(fileName: string): Promise<string> {
  return fs.readFile(fileName, { encoding: "utf-8" });
}

function removeImportStatements(fileContents: string): string {
  return fileContents.replace(
    /import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*;$/gm,
    "",
  );
}

function removeTestNamespaces(fileContents: string): string {
  return fileContents.replace(/namespace Test_(.*\n)*?\}/g, "");
}

function removeTestTsIgnores(fileContents: string): string {
  return fileContents.replace(/ {0,}\/\/ @ts-ignore Test\n/g, "");
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
  const fileNames = ["./src/utility-types.ts", ...typeFileNames];

  let typeFiles = await Promise.all(fileNames.map(readFile));

  typeFiles = typeFiles
    .map(removeImportStatements)
    .map(removeTestNamespaces)
    .map(removeTestTsIgnores)
    .map(removeEmptyLines);

  const combinedFiles = combineFiles(typeFiles);

  await writeDeclarationFile(combinedFiles);
}

run();
