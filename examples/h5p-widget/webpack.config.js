// @ts-check
import { join, resolve } from "path";
import jsonDts from "unplugin-json-dts/webpack";

const __dirname = resolve();

const config = {
  entry: {
    "h5p-widget": join(__dirname, "src", "h5p-widget.ts"),
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
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
