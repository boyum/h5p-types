import { promises as fs } from "fs";
import { expect, test } from "@oclif/test";

describe("Integration tests", () => {
  describe("generate-semantics", () => {
    let tempDir: string = "";

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

    test
      .command([
        "h5p-generate-configs",
        "generate-semantics",
        `--type-definition ${tempDir}/semantics.ts`,
        `--out ${tempDir}/semantics.json`,
        `-t ${tempDir}/TranslationKey.ts`,
      ])
      .it(
        "should generate a semantics.json file and translation keys",
        async () => {
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

          expect(actualSemantics).to.be(expectedSemantics);
          expect(actualTranslationKey).to.be(expectedTranslationKey);
        },
      );
  });
});
