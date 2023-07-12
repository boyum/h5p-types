import type { GluegunCommand, GluegunToolbox } from "gluegun";
import { join } from "path";
import { getOption } from "../utils/cli.utils";
import { generateSemantics } from "../utils/semantics.utils";

const optionTypes = {
  input: {
    name: "type-definition",
    alias: "d",
  },
  output: {
    name: "out",
    alias: "o",
  },
  translations: {
    name: "translations",
    alias: "t",
  },
} as const;

const command: GluegunCommand = {
  name: "generate-semantics",
  description: "Create semantics.json out of a TypeScript definition",
  alias: ["s"],
  run: async (toolbox: GluegunToolbox): Promise<number> => {
    const { print, parameters } = toolbox;
    const { options } = parameters;

    const inputParam = getOption<string>(options, optionTypes.input);
    const outputParam =
      getOption<string>(options, optionTypes.output) || "semantics.json";
    const translationsParam = getOption<string>(
      options,
      optionTypes.translations,
    );

    if (!inputParam) {
      print.error(
        `Missing path to TypeScript definition of semantics. Please provide one with the \`${options.input.name}\` flag (-${options.input.alias}|--${options.input.name} 'path/to/semantics.ts')`,
      );

      return 1;
    }

    const semanticsTsPath = join(process.cwd(), inputParam);
    const outputPath = join(process.cwd(), outputParam);
    const translationKeyOutputPath = translationsParam
      ? join(process.cwd(), translationsParam)
      : undefined;

    print.info("Creating semantics file");
    print.info(
      `
  Inputs: 
  Input: '${semanticsTsPath}'
  Output: '${outputPath}'
  ${
    translationKeyOutputPath
      ? `Translations output: '${translationKeyOutputPath}'`
      : ""
  }
`,
    );

    generateSemantics(
      semanticsTsPath,
      outputPath,
      translationKeyOutputPath,
      print,
    );

    return 0;
  },
};

export default command;
