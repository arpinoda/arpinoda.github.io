const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only',
  devServer: {
    host: '0.0.0.0',
    contentBase: '../client/src',
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: process.env.BACKEND_URL,
      },
    },
  },
});
