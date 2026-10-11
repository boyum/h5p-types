import { resolve } from "node:path";
import { resolveInputPath, resolveOutputPath } from "./path.utils.js";

describe("resolveInputPath", () => {
  it("leaves absolute paths untouched", () => {
    const absolutePath = resolve("/tmp", "library.ts");

    expect(resolveInputPath(absolutePath)).toBe(absolutePath);
  });

  it("resolves relative paths against the current working directory", () => {
    expect(resolveInputPath("demo/library.ts")).toBe(
      resolve(process.cwd(), "demo/library.ts"),
    );
  });

  it("trims surrounding whitespace", () => {
    expect(resolveInputPath("  demo/library.ts  ")).toBe(
      resolve(process.cwd(), "demo/library.ts"),
    );
  });

  it("normalizes parent directory traversal", () => {
    expect(resolveInputPath("./a/../b/library.ts")).toBe(
      resolve(process.cwd(), "b/library.ts"),
    );
  });
});

describe("resolveOutputPath", () => {
  it("resolves relative paths against the current working directory", () => {
    expect(resolveOutputPath("out/library.json")).toBe(
      resolve(process.cwd(), "out/library.json"),
    );
  });
});
