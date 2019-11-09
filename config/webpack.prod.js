const merge = require('../client/src/node_modules/webpack-merge');
const TerserPlugin = require('../client/src/node_modules/terser-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});
