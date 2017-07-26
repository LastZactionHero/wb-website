const path = require("path");
const webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      {
        test: /\.json$/, loader: "json-loader"
      },
      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: { cacheDirectory: true }
      }
    ]
  },

  resolve: {
    modules: [__dirname, "js", "node_modules"],
    extensions: ["*", ".js"]
  },

  plugins: [
    new webpack.ProvidePlugin({
      "fetch": "imports-loader?this=>global!exports?global.fetch!whatwg-fetch"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.ProvidePlugin({
      Tether: "tether",
    }),
    new CopyWebpackPlugin([
      { from: 'dist/404/index.html', to: '../404.html' }, // Copy the 404 page to the root directory
    ])
  ],

  context: __dirname,
  entry: {
    site: ["babel-polyfill", "./js/site"],
    pardot: ["babel-polyfill", "./js/pardot"]
  },
  output: {
    path: path.resolve(__dirname, "dist/js"),
    publicPath: "/js",
    filename: "[name].js"
  },
  externals:  [/^vendor\/.+\.js$/]
};
