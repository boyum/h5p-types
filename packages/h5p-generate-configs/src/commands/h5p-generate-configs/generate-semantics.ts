import { join } from "node:path";
import { Command, Flags } from "@oclif/core";
import { generateSemantics } from "../../utils/semantics.utils.js";

const getPath = (path: string): string => {
  const isAbsolute = path.startsWith("/");
  if (isAbsolute) {
    return path;
  }

  return join(process.cwd(), path);
};

export class GenerateSemantics extends Command {
  static override description =
    "Create library.json out of a TypeScript definition";

  static override aliases = ["s"];

  static override examples = [];

  static override flags = {
    "type-definition": Flags.string({
      char: "d",
      description: "Path to library TypeScript file",
      required: true,
    }),

    out: Flags.string({
      char: "o",
      description: "Path to JSON output. Default: library.json",
      default: "library.json",
    }),

    translations: Flags.string({
      char: "t",
      description: "Path to Translation Key file output.",
    }),

    debug: Flags.boolean({
      char: "D",
      description: "Show verbose debug logs",
    }),
  };

  override async run(): Promise<void> {
    const { flags } = await this.parse(GenerateSemantics);
    const {
      "type-definition": typeDefinition,
      out,
      translations,
      debug,
    } = flags;

    const semanticsTsPath = getPath(typeDefinition);
    const outputPath = getPath(out);
    const translationsPath = translations?.trim()
      ? getPath(translations)
      : undefined;

    this.log("Creating semantics file");
    this.log(`
Input: '${semanticsTsPath}'
Output: '${outputPath}'
${translationsPath ? `Translations output: '${translationsPath}'` : ""}
`);

    generateSemantics(
      semanticsTsPath,
      outputPath,
      translationsPath,
      debug,
      this.log.bind(this),
    );
  }
}
