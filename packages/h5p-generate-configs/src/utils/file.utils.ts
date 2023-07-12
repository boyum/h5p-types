import { promises as fs } from "fs";

export async function createJsonFile<Type>(
  library: Type,
  outputPath: string,
): Promise<void> {
  const textContent = JSON.stringify(library, null, 2);
  await fs.writeFile(outputPath, `${textContent}\n`);
}
