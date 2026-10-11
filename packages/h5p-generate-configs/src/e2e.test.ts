import { spawn } from "node:child_process";
import { existsSync, promises as fs } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const findPackageRoot = (): string => {
  let dir = process.cwd();
  let parent = dirname(dir);

  while (parent !== dir) {
    if (existsSync(join(dir, "bin", "run.js"))) {
      return dir;
    }
    dir = parent;
    parent = dirname(dir);
  }

  return process.cwd();
};

const packageRoot = findPackageRoot();
const binPath = join(packageRoot, "bin", "run.js");
const builtCliPath = join(packageRoot, "dist", "cli.js");
const isBuilt = existsSync(builtCliPath);

type CliResult = {
  code: number | null;
  stdout: string;
  stderr: string;
};

const runCli = (args: string[]): Promise<CliResult> =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [binPath, ...args], {
      cwd: packageRoot,
    });
    let stdout = "";
    let stderr = "";

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk: string) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      resolve({ code, stdout, stderr });
    });
  });

const withTempDir = async (
  run: (dir: string) => Promise<void>,
): Promise<void> => {
  const dir = await fs.mkdtemp(join(tmpdir(), "h5p-cli-e2e-"));

  try {
    await run(dir);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
};

const libraryFixture = (): string =>
  [
    "export const library = {",
    '  title: "E2E library",',
    "  majorVersion: 1,",
    "  minorVersion: 0,",
    "  patchVersion: 0,",
    "  runnable: 0,",
    "};",
    "",
  ].join("\n");

const semanticsFixture = (): string =>
  [
    "export const semantics = [",
    "  {",
    '    name: "l10n",',
    '    type: "group",',
    "    fields: [{ name: 'open' }, { name: 'close' }],",
    "  },",
    "];",
    "",
  ].join("\n");

const describeE2E = isBuilt ? describe : describe.skip;

describeE2E("h5p-generate-configs bin/run.js", () => {
  it("generates library.json and exits 0", async () => {
    await withTempDir(async (dir) => {
      const inputPath = join(dir, "library.ts");
      const outputPath = join(dir, "library.json");
      await fs.writeFile(inputPath, libraryFixture());

      const result = await runCli([
        "generate-library",
        "--type-definition",
        inputPath,
        "--out",
        outputPath,
      ]);

      expect(result.stderr).toBe("");
      expect(result.code).toBe(0);
      expect(JSON.parse(await fs.readFile(outputPath, "utf8"))).toEqual({
        title: "E2E library",
        majorVersion: 1,
        minorVersion: 0,
        patchVersion: 0,
        runnable: 0,
      });
      expect(result.stdout).toContain("Finished generating library.json");
    });
  }, 30_000);

  it("generates semantics.json and TranslationKey.ts and exits 0", async () => {
    await withTempDir(async (dir) => {
      const inputPath = join(dir, "semantics.ts");
      const outputPath = join(dir, "semantics.json");
      const translationPath = join(dir, "TranslationKey.ts");
      await fs.writeFile(inputPath, semanticsFixture());

      const result = await runCli([
        "s",
        "-d",
        inputPath,
        "-o",
        outputPath,
        "-t",
        translationPath,
      ]);

      expect(result.stderr).toBe("");
      expect(result.code).toBe(0);
      expect(JSON.parse(await fs.readFile(outputPath, "utf8"))).toEqual([
        {
          name: "l10n",
          type: "group",
          fields: [{ name: "open" }, { name: "close" }],
        },
      ]);
      expect(await fs.readFile(translationPath, "utf8")).toContain(
        ["export type TranslationKey =", '  | "open"', '  | "close";'].join(
          "\n",
        ),
      );
      expect(result.stdout).toContain("Finished generating semantics.json");
    });
  }, 30_000);

  it("prints debug output with --debug", async () => {
    await withTempDir(async (dir) => {
      const inputPath = join(dir, "semantics.ts");
      await fs.writeFile(inputPath, semanticsFixture());

      const result = await runCli([
        "s",
        "-d",
        inputPath,
        "-o",
        join(dir, "semantics.json"),
        "-t",
        join(dir, "TranslationKey.ts"),
        "--debug",
      ]);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain("Found semantics file.");
      expect(result.stdout).toContain(
        "Generating type file for translation keys.",
      );
    });
  }, 30_000);

  it("exits 1 and writes nothing for a non-TypeScript input", async () => {
    await withTempDir(async (dir) => {
      const inputPath = join(dir, "semantics.txt");
      const outputPath = join(dir, "semantics.json");
      await fs.writeFile(inputPath, semanticsFixture());

      const result = await runCli(["s", "-d", inputPath, "-o", outputPath]);

      expect(result.code).toBe(1);
      expect(result.stderr).toContain("is not a TS or TSX file.");
      expect(existsSync(outputPath)).toBe(false);
    });
  }, 30_000);

  it("exits 1 for a missing input file", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "library.json");

      const result = await runCli([
        "l",
        "-d",
        join(dir, "missing.ts"),
        "-o",
        outputPath,
      ]);

      expect(result.code).toBe(1);
      expect(existsSync(outputPath)).toBe(false);
    });
  }, 30_000);

  it("exits 1 for duplicate translation keys", async () => {
    await withTempDir(async (dir) => {
      const inputPath = join(dir, "semantics.ts");
      await fs.writeFile(
        inputPath,
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

      const result = await runCli([
        "s",
        "-d",
        inputPath,
        "-o",
        join(dir, "semantics.json"),
        "-t",
        join(dir, "TranslationKey.ts"),
      ]);

      expect(result.code).toBe(1);
      expect(result.stderr).toContain("Duplicate translation keys exist");
      expect(result.stderr).toContain("· open");
      expect(existsSync(join(dir, "semantics.json"))).toBe(false);
    });
  }, 30_000);

  it("resolves relative paths against the working directory", async () => {
    await withTempDir(async (dir) => {
      await fs.writeFile(join(dir, "library.ts"), libraryFixture());

      const result = await new Promise<CliResult>((resolve, reject) => {
        const child = spawn(
          process.execPath,
          [binPath, "l", "-d", "library.ts"],
          {
            cwd: dir,
          },
        );
        let stdout = "";
        let stderr = "";
        child.stdout.setEncoding("utf8");
        child.stderr.setEncoding("utf8");
        child.stdout.on("data", (chunk: string) => {
          stdout += chunk;
        });
        child.stderr.on("data", (chunk: string) => {
          stderr += chunk;
        });
        child.on("error", reject);
        child.on("close", (code) => {
          resolve({ code, stdout, stderr });
        });
      });

      expect(result.code).toBe(0);
      expect(
        JSON.parse(await fs.readFile(join(dir, "library.json"), "utf8")),
      ).toHaveProperty("title", "E2E library");
    });
  }, 30_000);
});
