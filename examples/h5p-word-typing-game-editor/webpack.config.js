// @ts-check
import { join, resolve } from "node:path";
import jsonDts from "unplugin-json-dts/webpack";

const __dirname = resolve();

const config = {
  entry: {
    "h5p-word-typing-game-editor": join(
      __dirname,
      "src",
      "h5p-word-typing-game-editor.ts",
    ),
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensionAlias: {
      ".js": [".ts", ".tsx"],
    },
  },
  plugins: [jsonDts()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: "ts-loader" }],
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;
