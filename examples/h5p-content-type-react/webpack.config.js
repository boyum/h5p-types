// @ts-check
import { join, resolve } from "node:path";
import jsonDts from "unplugin-json-dts/webpack";

const __dirname = resolve();

const config = {
  entry: {
    "h5p-content-type-react": join(
      __dirname,
      "src",
      "h5p-content-type-react.tsx",
    ),
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [jsonDts()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }],
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;
