import { existsSync, promises as fs } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { generateSemantics } from "./semantics.utils.js";

const withTempDir = async (
  run: (dir: string) => Promise<void>,
): Promise<void> => {
  const dir = await fs.mkdtemp(join(tmpdir(), "h5p-semantics-utils-"));

  try {
    await run(dir);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
};

const semanticsWithL10n = (): string =>
  [
    "export const semantics = [",
    "  {",
    '    label: "Position",',
    '    name: "position",',
    '    type: "group",',
    "    fields: [],",
    "  },",
    "  {",
    '    label: "L10n",',
    '    name: "l10n",',
    '    type: "group",',
    "    fields: [",
    "      {",
    '        label: "Open",',
    '        name: "open",',
    '        type: "text",',
    "      },",
    "      {",
    '        label: "Close",',
    '        name: "close",',
    '        type: "text",',
    "      },",
    "    ],",
    "  },",
    "];",
    "",
  ].join("\n");

const semanticsWithoutL10n = (): string =>
  [
    "export const semantics = [",
    "  {",
    '    label: "Position",',
    '    name: "position",',
    '    type: "group",',
    "    fields: [],",
    "  },",
    "];",
    "",
  ].join("\n");

const writeSemanticsFixture = async (
  dir: string,
  contents = semanticsWithL10n(),
  fileName = "semantics.ts",
): Promise<string> => {
  const filePath = join(dir, fileName);
  await fs.writeFile(filePath, contents);

  return filePath;
};

describe("generateSemantics", () => {
  it("writes semantics.json from a TypeScript definition", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(dir);
      const outputPath = join(dir, "semantics.json");

      await generateSemantics(
        inputPath,
        outputPath,
        undefined,
        false,
        jest.fn(),
      );

      expect(JSON.parse(await fs.readFile(outputPath, "utf8"))).toEqual([
        {
          label: "Position",
          name: "position",
          type: "group",
          fields: [],
        },
        {
          label: "L10n",
          name: "l10n",
          type: "group",
          fields: [
            { label: "Open", name: "open", type: "text" },
            { label: "Close", name: "close", type: "text" },
          ],
        },
      ]);
    });
  });

  it("writes 2-space indented JSON with a trailing newline", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(
        dir,
        "export const semantics = [{ name: 'a' }];\n",
      );
      const outputPath = join(dir, "semantics.json");

      await generateSemantics(
        inputPath,
        outputPath,
        undefined,
        false,
        jest.fn(),
      );

      expect(await fs.readFile(outputPath, "utf8")).toBe(
        '[\n  {\n    "name": "a"\n  }\n]\n',
      );
    });
  });

  it("accepts a .tsx file", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(
        dir,
        "export const semantics = [{ name: 'from-tsx' }];\n",
        "semantics.tsx",
      );
      const outputPath = join(dir, "semantics.json");

      await generateSemantics(
        inputPath,
        outputPath,
        undefined,
        false,
        jest.fn(),
      );

      expect(JSON.parse(await fs.readFile(outputPath, "utf8"))).toEqual([
        { name: "from-tsx" },
      ]);
    });
  });

  it("trims surrounding whitespace from the input path", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(dir);
      const outputPath = join(dir, "semantics.json");

      await generateSemantics(
        `  ${inputPath}  `,
        outputPath,
        undefined,
        false,
        jest.fn(),
      );

      await expect(fs.access(outputPath)).resolves.toBeUndefined();
    });
  });

  it("writes a TranslationKey union type when a path is provided", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(dir);
      const translationPath = join(dir, "TranslationKey.ts");

      await generateSemantics(
        inputPath,
        join(dir, "semantics.json"),
        translationPath,
        false,
        jest.fn(),
      );

      const translationKeyFile = await fs.readFile(translationPath, "utf8");

      expect(translationKeyFile).toContain("⚠️  WARNING  ⚠️");
      expect(translationKeyFile).toContain(
        ["export type TranslationKey =", '  | "open"', '  | "close";'].join(
          "\n",
        ),
      );
      expect(translationKeyFile.endsWith(";\n")).toBe(true);
    });
  });

  it("lists the l10n field names in declaration order", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(
        dir,
        [
          "export const semantics = [",
          "  {",
          '    name: "l10n",',
          '    type: "group",',
          "    fields: [",
          "      { name: 'zulu' },",
          "      { name: 'alpha' },",
          "      { name: 'mike' },",
          "    ],",
          "  },",
          "];",
          "",
        ].join("\n"),
      );
      const translationPath = join(dir, "TranslationKey.ts");

      await generateSemantics(
        inputPath,
        join(dir, "semantics.json"),
        translationPath,
        false,
        jest.fn(),
      );

      expect(await fs.readFile(translationPath, "utf8")).toContain(
        ['  | "zulu"', '  | "alpha"', '  | "mike";'].join("\n"),
      );
    });
  });

  it("throws when the l10n group contains duplicate keys", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(
        dir,
        [
          "export const semantics = [",
          "  {",
          '    name: "l10n",',
          '    type: "group",',
          "    fields: [",
          "      { name: 'open' },",
          "      { name: 'close' },",
          "      { name: 'open' },",
          "      { name: 'close' },",
          "    ],",
          "  },",
          "];",
          "",
        ].join("\n"),
      );

      await expect(
        generateSemantics(
          inputPath,
          join(dir, "semantics.json"),
          join(dir, "TranslationKey.ts"),
          false,
          jest.fn(),
        ),
      ).rejects.toThrow(
        "Duplicate translation keys exist:\n · open\n · close\n",
      );
    });
  });

  it("names every duplicate key only once", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(
        dir,
        [
          "export const semantics = [",
          "  {",
          '    name: "l10n",',
          '    type: "group",',
          "    fields: [",
          "      { name: 'open' },",
          "      { name: 'open' },",
          "      { name: 'close' },",
          "      { name: 'close' },",
          "    ],",
          "  },",
          "];",
          "",
        ].join("\n"),
      );
      const log = jest.fn();

      const error = await generateSemantics(
        inputPath,
        join(dir, "semantics.json"),
        join(dir, "TranslationKey.ts"),
        false,
        log,
      ).catch((caught: Error) => caught);

      expect((error as Error).message.match(/·/g)).toHaveLength(2);
    });
  });

  it("writes neither file when duplicate l10n keys exist", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(
        dir,
        [
          "export const semantics = [",
          "  {",
          '    name: "l10n",',
          '    type: "group",',
          "    fields: [{ name: 'open' }, { name: 'open' }],",
          "  },",
          "];",
          "",
        ].join("\n"),
      );
      const outputPath = join(dir, "semantics.json");
      const translationPath = join(dir, "TranslationKey.ts");

      await expect(
        generateSemantics(
          inputPath,
          outputPath,
          translationPath,
          false,
          jest.fn(),
        ),
      ).rejects.toThrow("Duplicate translation keys exist");

      expect(existsSync(outputPath)).toBe(false);
      expect(existsSync(translationPath)).toBe(false);
    });
  });

  it("deletes a pre-existing translation file when there is no l10n group", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(
        dir,
        semanticsWithoutL10n(),
      );
      const translationPath = join(dir, "TranslationKey.ts");
      await fs.writeFile(translationPath, "// stale\n");

      await generateSemantics(
        inputPath,
        join(dir, "semantics.json"),
        translationPath,
        false,
        jest.fn(),
      );

      expect(existsSync(translationPath)).toBe(false);
    });
  });

  it("does not create a translation file when there is no l10n group", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(
        dir,
        semanticsWithoutL10n(),
      );
      const translationPath = join(dir, "TranslationKey.ts");
      const log = jest.fn();

      await generateSemantics(
        inputPath,
        join(dir, "semantics.json"),
        translationPath,
        false,
        log,
      );

      expect(existsSync(translationPath)).toBe(false);
      expect(log).toHaveBeenCalledWith("Finished generating semantics.json");
    });
  });

  it("treats empty semantics as having no l10n group", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(
        dir,
        "export const semantics = [];\n",
      );
      const translationPath = join(dir, "TranslationKey.ts");
      await fs.writeFile(translationPath, "// stale\n");

      await generateSemantics(
        inputPath,
        join(dir, "semantics.json"),
        translationPath,
        false,
        jest.fn(),
      );

      expect(existsSync(translationPath)).toBe(false);
    });
  });

  it("leaves the translation file alone when no path is provided", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(dir);
      const translationPath = join(dir, "TranslationKey.ts");
      await fs.writeFile(translationPath, "// untouched\n");

      await generateSemantics(
        inputPath,
        join(dir, "semantics.json"),
        undefined,
        false,
        jest.fn(),
      );

      expect(await fs.readFile(translationPath, "utf8")).toBe("// untouched\n");
      await expect(
        fs.access(join(dir, "semantics.json")),
      ).resolves.toBeUndefined();
    });
  });

  it.each([
    ["semantics.txt", "not a TS file at all"],
    ["semantics.js", "a JavaScript file"],
    ["semantics.mts", "an ES module TypeScript file"],
    ["semantics.cts", "a CommonJS TypeScript file"],
    ["semantics", "a file without an extension"],
  ])("rejects %s because it is %s", async (fileName) => {
    await withTempDir(async (dir) => {
      const inputPath = join(dir, fileName);
      await fs.writeFile(inputPath, semanticsWithL10n());

      await expect(
        generateSemantics(
          inputPath,
          join(dir, "semantics.json"),
          undefined,
          false,
          jest.fn(),
        ),
      ).rejects.toThrow(`${inputPath} is not a TS or TSX file.`);
    });
  });

  it("throws when the file does not exist", async () => {
    await withTempDir(async (dir) => {
      await expect(
        generateSemantics(
          join(dir, "missing.ts"),
          join(dir, "semantics.json"),
          undefined,
          false,
          jest.fn(),
        ),
      ).rejects.toThrow(join(dir, "missing.ts"));
    });
  });

  it("writes nothing when the file does not exist", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "semantics.json");
      const log = jest.fn();

      await expect(
        generateSemantics(
          join(dir, "missing.ts"),
          outputPath,
          undefined,
          false,
          log,
        ),
      ).rejects.toThrow();

      expect(existsSync(outputPath)).toBe(false);
      expect(log).not.toHaveBeenCalled();
    });
  });

  it("logs the found and finished lines but no debug lines when debug is false", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(dir);
      const log = jest.fn();

      await generateSemantics(
        inputPath,
        join(dir, "semantics.json"),
        join(dir, "TranslationKey.ts"),
        false,
        log,
      );

      const messages = log.mock.calls.map(([message]) => message);

      expect(messages).toEqual([
        "Found semantics file.",
        "Generating JSON file for semantics.",
        "Finished generating semantics.json",
      ]);
    });
  });

  it("emits the debug lines when debug is true", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(dir);
      const log = jest.fn();

      await generateSemantics(
        inputPath,
        join(dir, "semantics.json"),
        join(dir, "TranslationKey.ts"),
        true,
        log,
      );

      const messages = log.mock.calls.map(([message]) => message);

      expect(messages).toEqual([
        "Found semantics file.",
        "Generating type file for translation keys.",
        "Generating JSON file for semantics.",
        "Finished generating semantics.json",
      ]);
    });
  });

  it("explains that no translation path was given when debug is true", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(dir);
      const log = jest.fn();

      await generateSemantics(
        inputPath,
        join(dir, "semantics.json"),
        undefined,
        true,
        log,
      );

      expect(log).toHaveBeenCalledWith(
        "Path for translation key type output file was not provided.",
      );
    });
  });

  it("names the output file in the finished line", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeSemanticsFixture(dir);
      const log = jest.fn();

      await generateSemantics(
        inputPath,
        join(dir, "nested-name.json"),
        undefined,
        false,
        log,
      );

      expect(log).toHaveBeenCalledWith("Finished generating nested-name.json");
    });
  });
});
