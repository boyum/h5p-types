import { type Command, helpFlag } from "../args.js";
import { resolveInputPath, resolveOutputPath } from "../utils/path.utils.js";
import { generateSemantics } from "../utils/semantics.utils.js";

export const generateSemanticsCommand = {
  name: "generate-semantics",
  aliases: ["s"],
  description: "Create semantics.json out of a TypeScript definition",
  usage:
    "$ h5p-generate-configs generate-semantics --type-definition <path> [--out <path>] [--translations <path>] [--debug]",
  examples: [
    "$ h5p-generate-configs generate-semantics --type-definition src/semantics.ts",
    "$ h5p-generate-configs s -d src/semantics.ts -o dist/semantics.json -t src/TranslationKey.ts",
  ],
  flags: [
    {
      name: "type-definition",
      alias: "d",
      type: "string",
      description: "Path to semantics TypeScript file",
      required: true,
    },
    {
      name: "out",
      alias: "o",
      type: "string",
      description: "Path to JSON output",
      defaultValue: "semantics.json",
    },
    {
      name: "translations",
      alias: "t",
      type: "string",
      description:
        "Path to Translation Key file output. The file won't be created if not provided",
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
    const semanticsTsPath = resolveInputPath(flags["type-definition"]);
    const outputPath = resolveOutputPath(flags.out);
    const translationsPath = flags.translations
      ? resolveOutputPath(flags.translations)
      : undefined;

    log("Creating semantics file");
    log(`
Input: '${semanticsTsPath}'
Output: '${outputPath}'
${translationsPath ? `Translations output: '${translationsPath}'` : ""}
`);

    await generateSemantics(
      semanticsTsPath,
      outputPath,
      translationsPath,
      flags.debug,
      log,
    );
  },
} satisfies Command;
