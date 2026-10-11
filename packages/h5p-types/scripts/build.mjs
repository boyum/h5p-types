import { spawnSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const distDir = path.join(packageRoot, "dist");

rmSync(distDir, { force: true, recursive: true });

const typescriptDir = path.dirname(
  createRequire(import.meta.url).resolve("typescript/package.json"),
);
const tsc = spawnSync(
  process.execPath,
  [path.join(typescriptDir, "lib", "tsc.js"), "-p", "tsconfig.build.json"],
  { cwd: packageRoot, stdio: "inherit" },
);

if (tsc.status !== 0) {
  process.exit(tsc.status ?? 1);
}

const declarationFiles = readdirSync(distDir, { recursive: true })
  .map((entry) => path.join(distDir, entry))
  .filter((entry) => entry.endsWith(".d.ts"));

const specifierPattern = /(\bfrom\s+|\bimport\s*\(\s*)(["'])(\.[^"']*)\2/g;

function resolveSpecifier(fromFile, specifier) {
  const target = path.resolve(path.dirname(fromFile), specifier);
  if (existsSync(`${target}.d.ts`)) {
    return `${specifier}.js`;
  }
  if (existsSync(path.join(target, "index.d.ts"))) {
    return `${specifier}/index.js`;
  }
  return null;
}

for (const file of declarationFiles) {
  const source = readFileSync(file, "utf8");
  const rewritten = source.replace(
    specifierPattern,
    (match, prefix, quote, specifier) => {
      if (path.extname(specifier) !== "") {
        return match;
      }
      const resolved = resolveSpecifier(file, specifier);
      if (resolved === null) {
        throw new Error(
          `Cannot resolve "${specifier}" from ${path.relative(packageRoot, file)}`,
        );
      }
      return `${prefix}${quote}${resolved}${quote}`;
    },
  );
  if (rewritten !== source) {
    writeFileSync(file, rewritten);
  }
}

const entry = readFileSync(
  path.join(packageRoot, "index.d.ts"),
  "utf8",
).replace(
  /(\bfrom\s+|\bimport\s*\(\s*)(["'])\.\/src\/([^"']*)\2/g,
  (_match, prefix, quote, rest) => `${prefix}${quote}./${rest}.js${quote}`,
);

writeFileSync(path.join(distDir, "index.d.ts"), entry);
