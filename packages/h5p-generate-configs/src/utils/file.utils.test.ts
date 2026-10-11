import { promises as fs } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createJsonFile } from "./file.utils.js";

const withTempDir = async (
  run: (dir: string) => Promise<void>,
): Promise<void> => {
  const dir = await fs.mkdtemp(join(tmpdir(), "h5p-file-utils-"));

  try {
    await run(dir);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
};

describe("createJsonFile", () => {
  it("writes 2-space indented JSON with a trailing newline", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "library.json");

      await createJsonFile(
        { title: "My library", majorVersion: 1 },
        outputPath,
      );

      expect(await fs.readFile(outputPath, "utf8")).toBe(
        '{\n  "title": "My library",\n  "majorVersion": 1\n}\n',
      );
    });
  });

  it("ends the file with exactly one trailing newline", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "library.json");

      await createJsonFile({ a: 1 }, outputPath);

      const content = await fs.readFile(outputPath, "utf8");

      expect(content.endsWith("}\n")).toBe(true);
      expect(content.endsWith("}\n\n")).toBe(false);
    });
  });

  it("uses no trailing whitespace on any line", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "library.json");

      await createJsonFile({ first: 1, second: 2, third: 3 }, outputPath);

      const lines = (await fs.readFile(outputPath, "utf8")).split("\n");

      for (const line of lines) {
        expect(line).toBe(line.replace(/\s+$/, ""));
      }
    });
  });

  it("preserves key insertion order", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "library.json");

      await createJsonFile({ zeta: 1, alpha: 2, mu: 3 }, outputPath);

      expect(await fs.readFile(outputPath, "utf8")).toBe(
        '{\n  "zeta": 1,\n  "alpha": 2,\n  "mu": 3\n}\n',
      );
    });
  });

  it("indents nested objects and arrays", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "semantics.json");

      await createJsonFile(
        { name: "l10n", fields: [{ name: "open" }, { name: "close" }] },
        outputPath,
      );

      expect(await fs.readFile(outputPath, "utf8")).toBe(
        [
          "{",
          '  "name": "l10n",',
          '  "fields": [',
          "    {",
          '      "name": "open"',
          "    },",
          "    {",
          '      "name": "close"',
          "    }",
          "  ]",
          "}",
          "",
        ].join("\n"),
      );
    });
  });

  it("round-trips back to the original value", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "library.json");
      const input = {
        title: "My library",
        majorVersion: 1,
        minorVersion: 2,
        patchVersion: 3,
        runnable: 0,
      };

      await createJsonFile(input, outputPath);

      expect(JSON.parse(await fs.readFile(outputPath, "utf8"))).toEqual(input);
    });
  });

  it("accepts a non-object value", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "value.json");

      await createJsonFile("just a string", outputPath);

      expect(await fs.readFile(outputPath, "utf8")).toBe('"just a string"\n');
    });
  });

  it("accepts a top-level array", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "list.json");

      await createJsonFile([{ name: "open" }, { name: "close" }], outputPath);

      expect(await fs.readFile(outputPath, "utf8")).toBe(
        '[\n  {\n    "name": "open"\n  },\n  {\n    "name": "close"\n  }\n]\n',
      );
    });
  });

  it("overwrites an existing file", async () => {
    await withTempDir(async (dir) => {
      const outputPath = join(dir, "library.json");
      await fs.writeFile(outputPath, "stale contents that are much longer");

      await createJsonFile({ fresh: true }, outputPath);

      expect(await fs.readFile(outputPath, "utf8")).toBe(
        '{\n  "fresh": true\n}\n',
      );
    });
  });

  it("rejects when the output directory does not exist", async () => {
    await withTempDir(async (dir) => {
      await expect(
        createJsonFile({ a: 1 }, join(dir, "missing", "out.json")),
      ).rejects.toMatchObject({ code: "ENOENT" });
    });
  });
});
