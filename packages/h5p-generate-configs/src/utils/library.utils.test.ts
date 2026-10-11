import { promises as fs } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { generateLibrary } from "./library.utils.js";

const withTempDir = async (
  run: (dir: string) => Promise<void>,
): Promise<void> => {
  const dir = await fs.mkdtemp(join(tmpdir(), "h5p-library-utils-"));

  try {
    await run(dir);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
};

const libraryFixture = (): string =>
  [
    "export const library = {",
    '  title: "Test library",',
    "  majorVersion: 1,",
    "  minorVersion: 2,",
    "  patchVersion: 3,",
    "  runnable: 0,",
    "};",
    "",
  ].join("\n");

const writeLibraryFixture = async (
  dir: string,
  fileName = "library.ts",
): Promise<string> => {
  const filePath = join(dir, fileName);
  await fs.writeFile(filePath, libraryFixture());

  return filePath;
};

describe("generateLibrary", () => {
  it("writes library.json from a TypeScript definition", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeLibraryFixture(dir);
      const outputPath = join(dir, "library.json");

      await generateLibrary(inputPath, outputPath, false, jest.fn());

      expect(await fs.readFile(outputPath, "utf8")).toBe(
        [
          "{",
          '  "title": "Test library",',
          '  "majorVersion": 1,',
          '  "minorVersion": 2,',
          '  "patchVersion": 3,',
          '  "runnable": 0',
          "}",
          "",
        ].join("\n"),
      );
    });
  });

  it("accepts a .tsx file", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeLibraryFixture(dir, "library.tsx");
      const outputPath = join(dir, "library.json");

      await generateLibrary(inputPath, outputPath, false, jest.fn());

      expect(JSON.parse(await fs.readFile(outputPath, "utf8"))).toEqual({
        title: "Test library",
        majorVersion: 1,
        minorVersion: 2,
        patchVersion: 3,
        runnable: 0,
      });
    });
  });

  it("trims surrounding whitespace from the input path", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeLibraryFixture(dir);
      const outputPath = join(dir, "library.json");

      await generateLibrary(`  ${inputPath}  `, outputPath, false, jest.fn());

      expect(JSON.parse(await fs.readFile(outputPath, "utf8"))).toHaveProperty(
        "title",
        "Test library",
      );
    });
  });

  it.each([
    ["foo.txt", "not a TS file at all"],
    ["foo.js", "a JavaScript file"],
    ["foo.mts", "an ES module TypeScript file"],
    ["foo.cts", "a CommonJS TypeScript file"],
    ["foo.json", "a JSON file"],
    ["foo", "a file without an extension"],
  ])("rejects %s because it is %s", async (fileName) => {
    await withTempDir(async (dir) => {
      const inputPath = join(dir, fileName);
      await fs.writeFile(inputPath, libraryFixture());
      const outputPath = join(dir, "library.json");

      await expect(
        generateLibrary(inputPath, outputPath, false, jest.fn()),
      ).rejects.toThrow(`${inputPath} is not a TS or TSX file.`);
    });
  });

  it("writes nothing when the input is not a TS file", async () => {
    await withTempDir(async (dir) => {
      const inputPath = join(dir, "foo.txt");
      await fs.writeFile(inputPath, libraryFixture());
      const outputPath = join(dir, "library.json");
      const log = jest.fn();

      await expect(
        generateLibrary(inputPath, outputPath, false, log),
      ).rejects.toThrow();

      await expect(fs.access(outputPath)).rejects.toThrow();
      expect(log).not.toHaveBeenCalled();
    });
  });

  it("throws when the file does not exist", async () => {
    await withTempDir(async (dir) => {
      const inputPath = join(dir, "missing.ts");
      const outputPath = join(dir, "library.json");

      await expect(
        generateLibrary(inputPath, outputPath, false, jest.fn()),
      ).rejects.toThrow(inputPath);
    });
  });

  it("writes nothing when the file does not exist", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "library.json");

      await expect(
        generateLibrary(join(dir, "missing.ts"), outputPath, false, jest.fn()),
      ).rejects.toThrow();

      await expect(fs.access(outputPath)).rejects.toThrow();
    });
  });

  it("throws when the definition does not export a library", async () => {
    await withTempDir(async (dir) => {
      const inputPath = join(dir, "library.ts");
      await fs.writeFile(inputPath, "export const somethingElse = 1;\n");
      const outputPath = join(dir, "library.json");

      await generateLibrary(inputPath, outputPath, false, jest.fn());

      expect(await fs.readFile(outputPath, "utf8")).toBe("undefined\n");
    });
  });

  it("logs the finished line but no debug lines when verbose is false", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeLibraryFixture(dir);
      const outputPath = join(dir, "library.json");
      const log = jest.fn();

      await generateLibrary(inputPath, outputPath, false, log);

      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith("Finished generating library.json");
      await expect(fs.access(outputPath)).resolves.toBeUndefined();
    });
  });

  it("emits the debug lines when verbose is true", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeLibraryFixture(dir);
      const outputPath = join(dir, "library.json");
      const log = jest.fn();

      await generateLibrary(inputPath, outputPath, true, log);

      const messages = log.mock.calls.map(([message]) => message);

      expect(messages).toEqual([
        `Found library file. Path: ${inputPath}`,
        "Generating JSON file for library.",
        "Finished generating library.json",
      ]);
      await expect(fs.access(outputPath)).resolves.toBeUndefined();
    });
  });

  it("names the output file in the finished line", async () => {
    await withTempDir(async (dir) => {
      const inputPath = await writeLibraryFixture(dir);
      const log = jest.fn();

      await generateLibrary(
        inputPath,
        join(dir, "nested-name.json"),
        false,
        log,
      );

      expect(log).toHaveBeenCalledWith("Finished generating nested-name.json");
    });
  });
});
