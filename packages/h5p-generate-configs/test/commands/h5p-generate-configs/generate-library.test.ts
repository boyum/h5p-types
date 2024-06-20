import { promises as fs } from "node:fs";
import { expect, test } from "@oclif/test";

describe("Integration tests", () => {
  describe("generate-library", () => {
    let tempDir = "";

    beforeEach(async () => {
      tempDir = await fs.mkdtemp("library-test_");

      await fs.copyFile("demo/library.ts", `${tempDir}/library.ts`);
    });

    afterEach(async () => {
      await fs.rm(tempDir, { recursive: true });
    });

    test
      .command([
        "h5p-generate-configs",
        "generate-library",
        `--type-definition ${tempDir}/library.ts`,
        `--out ${tempDir}/library.json`,
      ])
      .it("should generate a library.json file", async () => {
        const expectedLibrary = (
          await fs.readFile("demo/library.json")
        ).toString("utf-8");

        const actualLibrary = (
          await fs.readFile(`${tempDir}/library.json`)
        ).toString("utf-8");

        expect(actualLibrary).to.be(expectedLibrary);
      });
  });
});
