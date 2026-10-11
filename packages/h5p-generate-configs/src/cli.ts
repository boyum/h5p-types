import {
  type Command,
  type FlagDefinition,
  parseFlags,
  UsageError,
} from "./args.js";
import { generateLibraryCommand } from "./commands/generate-library.js";
import { generateSemanticsCommand } from "./commands/generate-semantics.js";
import { registerTypeScriptResolutionHooks } from "./ts-resolver.js";
import { createLogger } from "./utils/log.utils.js";

const binaryName = "h5p-generate-configs";

const commands: Command[] = [generateLibraryCommand, generateSemanticsCommand];

const log = createLogger(process.stdout);
const logError = createLogger(process.stderr);

const renderColumns = (rows: [string, string][]): string =>
  rows.map(([left, right]) => `  ${left.padEnd(30)}${right}`).join("\n");

const renderFlags = (flags: FlagDefinition[]): string =>
  renderColumns(
    flags.map((flag) => {
      const alias = flag.alias ? `-${flag.alias}, ` : "    ";
      const value = flag.type === "string" ? " <value>" : "";
      const details = [
        flag.description,
        flag.required ? " (required)" : "",
        flag.defaultValue === undefined
          ? ""
          : ` (default: ${flag.defaultValue})`,
      ].join("");

      return [`${alias}--${flag.name}${value}`, details];
    }),
  );

const renderCommandHelp = (command: Command): string =>
  [
    `${binaryName} ${command.name}`,
    "",
    command.description,
    "",
    "USAGE",
    `  ${command.usage}`,
    "",
    ...(command.aliases.length
      ? [
          "ALIASES",
          `  ${command.aliases.map((alias) => `${binaryName} ${alias}`).join("\n  ")}`,
          "",
        ]
      : []),
    "FLAGS",
    renderFlags(command.flags),
    "",
    "EXAMPLES",
    ...command.examples.map((example) => `  ${example}`),
    "",
  ].join("\n");

const renderHelp = (): string =>
  [
    binaryName,
    "",
    "Generate TS and JSON definitions for H5P",
    "",
    "USAGE",
    `  $ ${binaryName} <command> [flags]`,
    "",
    "COMMANDS",
    renderColumns(
      commands.map((command) => [
        command.name,
        `${command.description} (alias: ${command.aliases.join(", ")})`,
      ]),
    ),
    "",
    "FLAGS",
    renderColumns([["-h, --help", "Show help"]]),
    "",
    "EXAMPLES",
    `  $ ${binaryName} generate-library --type-definition src/library.ts`,
    `  $ ${binaryName} generate-semantics --type-definition src/semantics.ts --translations src/TranslationKey.ts`,
    "",
    `Run \`${binaryName} <command> --help\` for more information about a command.`,
    "",
  ].join("\n");

const findCommand = (name: string): Command => {
  const command = commands.find(
    (candidate) => candidate.name === name || candidate.aliases.includes(name),
  );

  if (!command) {
    const knownCommands = commands
      .flatMap((candidate) => [candidate.name, ...candidate.aliases])
      .join(", ");
    throw new UsageError(
      `command ${name} not found. Available commands: ${knownCommands}`,
    );
  }

  return command;
};

const errorHint = (error: NodeJS.ErrnoException): string | undefined => {
  if (error.code === "ERR_MODULE_NOT_FOUND") {
    return "Make sure the file exists, and that relative imports inside it include the file extension, e.g. `./my-helper.ts`.";
  }

  if (error.code === "ERR_UNKNOWN_FILE_EXTENSION") {
    return "Only `.ts` and `.tsx` files are supported.";
  }

  return undefined;
};

export const run = async (argv: string[]): Promise<number> => {
  const [commandName, ...commandArgv] = argv;
  let debug = false;

  try {
    if (!commandName || commandName === "-h" || commandName === "--help") {
      log(renderHelp());
      return 0;
    }

    if (commandName === "help") {
      const [helpTarget] = commandArgv;
      log(
        helpTarget ? renderCommandHelp(findCommand(helpTarget)) : renderHelp(),
      );
      return 0;
    }

    if (commandName.startsWith("-")) {
      throw new UsageError(`Unexpected option '${commandName}'.`);
    }

    const command = findCommand(commandName);
    const parsed = parseFlags(commandArgv, command.flags);

    if (parsed.help) {
      log(renderCommandHelp(command));
      return 0;
    }

    debug = parsed.flags.debug;
    registerTypeScriptResolutionHooks();
    await command.run(parsed.flags, log);

    return 0;
  } catch (error) {
    if (error instanceof UsageError) {
      logError(`Error: ${error.message}`);
      return error.exitCode;
    }

    const runtimeError = error as Error & NodeJS.ErrnoException;
    logError(`Error: ${runtimeError.message}`);

    const hint = errorHint(runtimeError);
    if (hint) {
      logError(hint);
    }

    if (debug && runtimeError.stack) {
      logError(runtimeError.stack);
    }

    return 1;
  }
};
