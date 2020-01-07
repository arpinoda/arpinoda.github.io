const path = require('path');

const { CleanWebpackPlugin } = require('../client/src/node_modules/clean-webpack-plugin');
const HtmlWebpackPlugin = require('../client/src/node_modules/html-webpack-plugin');
const webpack = require('../client/src/node_modules/webpack');
const dotenv = require('../node_modules/dotenv');

const env = dotenv.config({ 
  path: path.resolve(__dirname, '../config/.env'),
}).parsed || process.env;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: ['whatwg-fetch', 'babel-polyfill', path.resolve(__dirname, '../client/src/index.js')],
  context: path.join(__dirname, '../client/src'),
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../client/src/index.html'),
      inject: 'body',
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  output: {
    path: path.resolve(__dirname, '../client/dist'),
    filename: './bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: '../../config/',
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpeg|jpg|gif|mp4|ico|svg|webmanifest)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
};
