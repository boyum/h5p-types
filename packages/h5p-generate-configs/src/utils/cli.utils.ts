import type { OptionType } from "../types/OptionType";

export const getOption = <Type = unknown>(
  parameters: Record<string, Type>,
  { name, alias }: OptionType,
): Type | undefined => {
  const nameParam = parameters[name];
  if (nameParam) {
    return nameParam;
  }

  if (alias) {
    const aliasParam = parameters[alias];

    if (aliasParam) {
      return aliasParam;
    }
  }

  return undefined;
};
