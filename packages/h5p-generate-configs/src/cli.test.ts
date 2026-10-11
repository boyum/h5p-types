import { jest } from "@jest/globals";
import { run } from "./cli.js";

let stdout: string[] = [];
let stderr: string[] = [];

const stdoutSpy = jest
  .spyOn(process.stdout, "write")
  .mockImplementation((chunk: unknown) => {
    stdout.push(String(chunk));
    return true;
  });

const stderrSpy = jest
  .spyOn(process.stderr, "write")
  .mockImplementation((chunk: unknown) => {
    stderr.push(String(chunk));
    return true;
  });

const stdoutText = (): string => stdout.join("");

const stderrText = (): string => stderr.join("");

beforeEach(() => {
  stdout = [];
  stderr = [];
});

afterAll(() => {
  stdoutSpy.mockRestore();
  stderrSpy.mockRestore();
});

describe("run", () => {
  it("prints global help with no arguments", async () => {
    expect(await run([])).toBe(0);
    expect(stdoutText()).toContain("h5p-generate-configs <command> [flags]");
    expect(stdoutText()).toContain("generate-library");
    expect(stdoutText()).toContain("generate-semantics");
  });

  it("prints global help for --help", async () => {
    expect(await run(["--help"])).toBe(0);
    expect(stdoutText()).toContain("COMMANDS");
  });

  it("prints global help for help", async () => {
    expect(await run(["help"])).toBe(0);
    expect(stdoutText()).toContain("COMMANDS");
  });

  it("prints command help for help <command>", async () => {
    expect(await run(["help", "generate-semantics"])).toBe(0);
    expect(stdoutText()).toContain(
      "generate-semantics --type-definition <path>",
    );
  });

  it("prints command help for <command> --help", async () => {
    expect(await run(["generate-library", "--help"])).toBe(0);
    expect(stdoutText()).toContain("--type-definition");
  });

  it("prints command help for an alias", async () => {
    expect(await run(["s", "--help"])).toBe(0);
    expect(stdoutText()).toContain("--translations");
  });

  it("documents semantics.json as the semantics default output", async () => {
    expect(await run(["s", "--help"])).toBe(0);
    expect(stdoutText()).toContain("(default: semantics.json)");
  });

  it("exits 2 for an unknown command", async () => {
    expect(await run(["frobnicate"])).toBe(2);
    expect(stderrText()).toContain("command frobnicate not found");
  });

  it("exits 2 for an unknown flag", async () => {
    expect(await run(["l", "-d", "a.ts", "--nope"])).toBe(2);
    expect(stderrText()).toContain("Unknown option '--nope'");
  });

  it("exits 2 when the required flag is missing", async () => {
    expect(await run(["l"])).toBe(2);
    expect(stderrText()).toContain("Missing required flag --type-definition");
  });

  it("exits 2 for an unexpected top level option", async () => {
    expect(await run(["--version"])).toBe(2);
    expect(stderrText()).toContain("Unexpected option '--version'");
  });

  it("writes nothing to stdout for usage errors", async () => {
    await run(["frobnicate"]);
    expect(stdoutText()).toBe("");
  });
});
