import { promises as fs } from "node:fs";
// import { runCommand } from "@oclif/test";
// import {expect} from "chai";
import { expect, describe, it, beforeEach, afterEach } from "vitest";
import { GenerateLibrary } from "../../../src/commands/h5p-generate-configs/generate-library";

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

    it("should generate a library.json file", async () => {
      await GenerateLibrary.run(["--type-definition", `${tempDir}/library.ts`]);

      const expectedLibrary = (await fs.readFile("demo/library.json")).toString(
        "utf-8",
      );

      const actualLibrary = (
        await fs.readFile(`${tempDir}/library.json`)
      ).toString("utf-8");

      expect(actualLibrary).to.be(expectedLibrary);
    });
  });
});
