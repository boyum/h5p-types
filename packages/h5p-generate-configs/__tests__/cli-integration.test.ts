import { promises as fs } from "fs";
import { filesystem, system } from "gluegun";

const src = filesystem.path(__dirname, "..");

const cli = async (cmd: string) =>
  system.run(
    "node " + filesystem.path(src, "bin", "h5p-generate-configs") + ` ${cmd}`,
  );

describe("Integration tests", () => {
  describe("generate-semantics", () => {
    let tempDir: string;

    beforeEach(async () => {
      tempDir = await fs.mkdtemp("semantics-test_");

      await fs.copyFile("demo/semantics.ts", `${tempDir}/semantics.ts`);
      await fs.copyFile(
        "demo/semantics-helper.ts",
        `${tempDir}/semantics-helper.ts`,
      );
    });

    afterEach(async () => {
      await fs.rm(tempDir, { recursive: true });
    });

    it("should generate a semantics.json file and translation keys", async () => {
      const testCommand = [
        `generate-semantics`,
        `--type-definition ${tempDir}/semantics.ts`,
        `--out ${tempDir}/semantics.json`,
        `-t ${tempDir}/TranslationKey.ts`,
      ].join(" ");

      await cli(testCommand);

      const expectedSemantics = (
        await fs.readFile("demo/semantics.json")
      ).toString("utf-8");
      const actualSemantics = (
        await fs.readFile(`${tempDir}/semantics.json`)
      ).toString("utf-8");

      const expectedTranslationKey = (
        await fs.readFile("demo/TranslationKey.ts")
      ).toString("utf-8");
      const actualTranslationKey = (
        await fs.readFile(`${tempDir}/TranslationKey.ts`)
      ).toString("utf-8");

      expect(actualSemantics).toBe(expectedSemantics);
      expect(actualTranslationKey).toBe(expectedTranslationKey);
    });
  });

  describe("generate-library", () => {
    let tempDir: string;

    beforeEach(async () => {
      tempDir = await fs.mkdtemp("library-test_");

      await fs.copyFile("demo/library.ts", `${tempDir}/library.ts`);
    });

    afterEach(async () => {
      await fs.rm(tempDir, { recursive: true });
    });

    it("should generate a library.json file", async () => {
      const testCommand = [
        `generate-library`,
        `--type-definition ${tempDir}/library.ts`,
        `--out ${tempDir}/library.json`,
      ].join(" ");

      await cli(testCommand);

      const expectedLibrary = (await fs.readFile("demo/library.json")).toString(
        "utf-8",
      );
      const actualLibrary = (
        await fs.readFile(`${tempDir}/library.json`)
      ).toString("utf-8");

      expect(actualLibrary).toBe(expectedLibrary);
    });
  });
});
