// @ts-check

const path = require("path");

const config = {
  entry: {
    "h5p-content-type-react": path.join(
      __dirname,
      "src",
      "h5p-content-type-react.tsx",
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
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }],
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
