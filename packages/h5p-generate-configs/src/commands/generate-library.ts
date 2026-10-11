import { type Command, helpFlag } from "../args.js";
import { generateLibrary } from "../utils/library.utils.js";
import { resolveInputPath, resolveOutputPath } from "../utils/path.utils.js";

export const generateLibraryCommand = {
  name: "generate-library",
  aliases: ["l"],
  description: "Create library.json out of a TypeScript definition",
  usage:
    "$ h5p-generate-configs generate-library --type-definition <path> [--out <path>] [--debug]",
  examples: [
    "$ h5p-generate-configs generate-library --type-definition src/library.ts",
    "$ h5p-generate-configs l -d src/library.ts -o dist/library.json",
  ],
  flags: [
    {
      name: "type-definition",
      alias: "d",
      type: "string",
      description: "Path to library TypeScript file",
      required: true,
    },
    {
      name: "out",
      alias: "o",
      type: "string",
      description: "Path to JSON output",
      defaultValue: "library.json",
    },
    {
      name: "debug",
      alias: "D",
      type: "boolean",
      description: "Show verbose debug logs",
    },
    helpFlag,
  ],
  run: async (flags, log) => {
    const libraryTsPath = resolveInputPath(flags["type-definition"]);
    const outputPath = resolveOutputPath(flags.out);

    log("Creating library file");
    log(`
Inputs:
Input: '${libraryTsPath}'
Output: '${outputPath}'
`);

    await generateLibrary(libraryTsPath, outputPath, flags.debug, log);
  },
} satisfies Command;
