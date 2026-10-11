import {
  type Command,
  type CommandFlags,
  helpFlag,
  parseFlags,
  UsageError,
} from "./args.js";

const flags = [
  {
    name: "type-definition",
    alias: "d",
    type: "string",
    description: "Path to TypeScript file",
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
    description: "Path to translation key output",
  },
  {
    name: "debug",
    alias: "D",
    type: "boolean",
    description: "Show verbose debug logs",
  },
  helpFlag,
] satisfies Command["flags"];

const parse = (argv: string[]): CommandFlags => parseFlags(argv, flags).flags;

describe("parseFlags", () => {
  it("parses long flags", () => {
    expect(
      parse(["--type-definition", "src/semantics.ts", "--out", "out.json"]),
    ).toEqual({
      "type-definition": "src/semantics.ts",
      out: "out.json",
      debug: false,
    });
  });

  it("parses short flags", () => {
    expect(
      parse(["-d", "src/semantics.ts", "-o", "out.json", "-t", "keys.ts"]),
    ).toEqual({
      "type-definition": "src/semantics.ts",
      out: "out.json",
      translations: "keys.ts",
      debug: false,
    });
  });

  it("parses --flag=value", () => {
    expect(parse(["--type-definition=src/semantics.ts"])).toEqual({
      "type-definition": "src/semantics.ts",
      out: "semantics.json",
      debug: false,
    });
  });

  it("applies the default for --out", () => {
    expect(parse(["-d", "src/semantics.ts"]).out).toBe("semantics.json");
  });

  it("parses boolean flags", () => {
    expect(parse(["-d", "src/semantics.ts", "-D"]).debug).toBe(true);
  });

  it("defaults debug to false", () => {
    expect(parse(["-d", "src/semantics.ts"]).debug).toBe(false);
  });

  it("treats a blank translations value as absent", () => {
    expect(parse(["-d", "src/semantics.ts", "-t", "   "])).not.toHaveProperty(
      "translations",
    );
  });

  it("reports help without requiring required flags", () => {
    expect(parseFlags(["--help"], flags).help).toBe(true);
    expect(parseFlags(["-h"], flags).help).toBe(true);
  });

  it("throws a UsageError for unknown flags", () => {
    expect(() => parse(["-d", "src/semantics.ts", "--nope"])).toThrow(
      UsageError,
    );
  });

  it("throws a UsageError for positional arguments", () => {
    expect(() => parse(["-d", "src/semantics.ts", "extra"])).toThrow(
      UsageError,
    );
  });

  it("throws a UsageError when a required flag is missing", () => {
    expect(() => parse(["--out", "out.json"])).toThrow(
      "Missing required flag --type-definition (alias -d).",
    );
  });

  it("throws a UsageError when a required flag is blank", () => {
    expect(() => parse(["-d", "   "])).toThrow(UsageError);
  });

  it("throws a UsageError when a string flag is missing its value", () => {
    expect(() => parse(["-d"])).toThrow(UsageError);
  });

  it("exposes exit code 2 on usage errors", () => {
    try {
      parse(["--nope"]);
      throw new Error("Expected a UsageError");
    } catch (error) {
      expect(error).toBeInstanceOf(UsageError);
      expect((error as UsageError).exitCode).toBe(2);
    }
  });
});
