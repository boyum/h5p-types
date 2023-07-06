// @ts-check

const path = require("path");

const config = {
  entry: {
    "h5p-resumable-content-type": path.join(
      __dirname,
      "src",
      "h5p-resumable-content-type.ts",
    ),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    // @ts-expect-error
    require("unplugin-json-dts/webpack")(),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [{ loader: "ts-loader" }],
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
