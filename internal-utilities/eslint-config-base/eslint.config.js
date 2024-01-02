// @ts-check
import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import * as importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').ESLint.ConfigData[]} */
export default [
  js.configs.recommended,
  typescriptPlugin.configs,
  {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: typescriptParser,
    plugins: [],
    root: true,
  },
];
