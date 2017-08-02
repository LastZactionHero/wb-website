import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

if(process.env.PROD_ENV) {
  var config = module.exports = require('./webpack.conf');

  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true
    })
  );
}
