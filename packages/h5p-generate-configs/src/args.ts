import { parseArgs } from "node:util";
import type { LogFn } from "./utils/log.utils.js";

export class UsageError extends Error {
  override readonly name = "UsageError";

  readonly exitCode = 2;
}

export type FlagDefinition = {
  name: string;
  alias: string;
  type: "string" | "boolean";
  description: string;
  required?: boolean;
  defaultValue?: string;
};

export type CommandFlags = {
  "type-definition": string;
  out: string;
  translations?: string;
  debug: boolean;
};

export type Command = {
  name: string;
  aliases: string[];
  description: string;
  usage: string;
  examples: string[];
  flags: FlagDefinition[];
  run: (flags: CommandFlags, log: LogFn) => Promise<void>;
};

export type ParseFlagsResult = {
  help: boolean;
  flags: CommandFlags;
};

export const helpFlag: FlagDefinition = {
  name: "help",
  alias: "h",
  type: "boolean",
  description: "Show help",
};

type OptionsConfig = Record<
  string,
  {
    type: "string" | "boolean";
    short?: string;
    default?: string | boolean;
  }
>;

const buildOptionsConfig = (flags: FlagDefinition[]): OptionsConfig => {
  const options: OptionsConfig = {};

  for (const flag of flags) {
    options[flag.name] =
      flag.defaultValue === undefined
        ? { type: flag.type, short: flag.alias }
        : { type: flag.type, short: flag.alias, default: flag.defaultValue };
  }

  return options;
};

const readString = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

export const parseFlags = (
  argv: string[],
  flags: FlagDefinition[],
): ParseFlagsResult => {
  let values: Record<string, unknown>;

  try {
    ({ values } = parseArgs({
      args: argv,
      options: buildOptionsConfig(flags),
      allowPositionals: false,
      strict: true,
    }));
  } catch (error) {
    throw new UsageError((error as Error).message);
  }

  if (values.help === true) {
    return {
      help: true,
      flags: { "type-definition": "", out: "", debug: false },
    };
  }

  const missingRequiredFlag = flags.find(
    (flag) => flag.required && !readString(values[flag.name])?.trim(),
  );

  if (missingRequiredFlag) {
    throw new UsageError(
      `Missing required flag --${missingRequiredFlag.name} (alias -${missingRequiredFlag.alias}).`,
    );
  }

  const translationsValue = readString(values.translations)?.trim();
  const translations = translationsValue ? translationsValue : undefined;

  return {
    help: false,
    flags: {
      "type-definition": readString(values["type-definition"]) as string,
      out: readString(values.out) ?? "",
      ...(translations === undefined ? {} : { translations }),
      debug: values.debug === true,
    },
  };
};
