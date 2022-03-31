const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackNodeExternals = require("webpack-node-externals");

function getConfig(isServer, name) {
  return {
    entry: { [name]: `./src/${name}` },
    output: {
      filename: isServer ? "[name].bundle.js" : "[name].[chunkhash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/dist/",
    },
    target: isServer ? "node" : "web",
    externals: isServer ? [webpackNodeExternals()] : [],
    optimization: isServer
      ? { splitChunks: false, minimize: false }
      : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              configFile: path.resolve(
                __dirname,
                isServer ? ".babelrc.server.js" : ".babelrc.client.js"
              ),
            },
          },
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: {
            loader: "file-loader",
            options: {
              emitFile: isServer ? false : true,
            },
          },
        },
      ],
    },
    plugins: isServer
      ? []
      : [
          new HtmlWebpackPlugin({
            template: "./template/index.html",
          }),
        ],
    mode: "production",
  };
}

// console.log(JSON.stringify(getConfig(true)));
module.exports = [
  getConfig(false, "index"),
  getConfig(true, "server"),
  getConfig(true, "prerender"),
];
