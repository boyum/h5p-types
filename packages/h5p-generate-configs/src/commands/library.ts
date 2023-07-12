import type { GluegunToolbox } from "gluegun";
import { join } from "path";
import { getOption } from "../utils/cli.utils";
import { generateLibrary } from "../utils/library.utils";

const optionTypes = {
  input: {
    name: "type-definition",
    alias: "d",
  },
  output: {
    name: "out",
    alias: "o",
  },
} as const;

export default {
  name: "generate-library",
  description: "Create library.json out of a TypeScript definition",
  alias: ["l"],
  run: async (toolbox: GluegunToolbox): Promise<number> => {
    const { print, parameters } = toolbox;
    const { options } = parameters;

    const inputParam = getOption<string>(options, optionTypes.input);
    const outputParam =
      getOption<string>(options, optionTypes.output) || "library.json";

    if (!inputParam) {
      print.error(
        `Missing path to TypeScript definition of library. Please provide one with the \`${options.input.name}\` flag (-${options.input.alias}|--${options.input.name} 'path/to/library.ts')`,
      );

      return 1;
    }

    const libraryTsPath = join(process.cwd(), inputParam);
    const outputPath = join(process.cwd(), outputParam);

    print.info("Creating library file");
    print.info(
      `
  Inputs: 
  Input: '${libraryTsPath}'
  Output: '${outputPath}'
`,
    );

    generateLibrary(libraryTsPath, outputPath, print);

    return 0;
  },
};
