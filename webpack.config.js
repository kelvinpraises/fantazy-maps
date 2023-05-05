const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const buildPath = path.resolve(__dirname, "dist");

module.exports = (env, argv) => ({
  mode: argv.mode === "production" ? "production" : "development",
  devtool: argv.mode === "production" ? false : "inline-source-map",
  entry: {
    ui: path.resolve("./src/ui.tsx"),
    code: path.resolve("./src/code.ts"),
  },
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === "code"
        ? "[name].js"
        : "[name].[contenthash:20].js";
    },
    path: buildPath,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "./ui.html"),
      filename: "ui.html",
      inlineSource: ".(js)$",
      chunks: ["ui"],
    }),
    new HtmlInlineScriptPlugin({
      scriptMatchPattern: [/ui.[a-zA-Z0-9]+.js/],
      htmlMatchPattern: [/ui.html$/],
    }),
  ],
});
