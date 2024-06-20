import { join } from "node:path";
import { Command, Flags } from "@oclif/core";
import { generateLibrary } from "../../utils/library.utils.js";

const getPath = (path: string): string => {
  const isAbsolute = path.startsWith("/");
  if (isAbsolute) {
    return path;
  }

  return join(process.cwd(), path);
};

export class GenerateLibrary extends Command {
  static override description =
    "Create library.json out of a TypeScript definition";

  static override aliases = ["l"];

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

    debug: Flags.boolean({
      char: "D",
      description: "Show verbose debug logs",
    }),
  };

  override async run(): Promise<void> {
    const { flags } = await this.parse(GenerateLibrary);
    const { "type-definition": typeDefinition, out, debug } = flags;

    const libraryTsPath = getPath(typeDefinition);
    const outputPath = getPath(out);

    this.log("Creating library file");
    this.log(`
Inputs: 
Input: '${libraryTsPath}'
Output: '${outputPath}'
`);

    generateLibrary(libraryTsPath, outputPath, debug, this.log.bind(this));
  }
}
