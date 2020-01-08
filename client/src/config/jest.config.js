module.exports = {
  testPathIgnorePatterns: ['../../dist/', '/node_modules/'],
  testRegex: '../.*?(Spec)\\.js$',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/util/FileMock.js',
  },
  rootDir: '../',
};
