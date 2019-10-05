const merge = require('webpack-merge');
const webpack = require('webpack');
const dotenv = require('dotenv');
const common = require('./webpack.common.js');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only',
  devServer: {
    contentBase: './src',
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: process.env.BACKEND_URL,
      },
    },
  },
  plugins: [new webpack.DefinePlugin(envKeys)],
});
