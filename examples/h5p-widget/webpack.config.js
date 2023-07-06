// @ts-check

const path = require("path");

const config = {
  entry: {
    "h5p-widget": path.join(__dirname, "src", "h5p-widget.ts"),
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
        test: /\.ts$/,
        use: [{ loader: "ts-loader" }],
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
