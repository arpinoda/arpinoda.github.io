const postcssCssNext = require('../client/src/node_modules/postcss-cssnext');
const postcssImport = require('../client/src/node_modules/postcss-import');

module.exports = {
  plugins: [postcssCssNext, postcssImport],
};
