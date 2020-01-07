const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

const env =
  dotenv.config({
    path: path.resolve(__dirname, '../../../config/.env'),
  }).parsed || process.env;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    path.resolve(__dirname, '../index.js'),
  ],
  context: path.join(__dirname, '../'),
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: 'body',
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  output: {
    path: path.resolve(__dirname, '../../dist'),
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
                path: './config',
              },
            },
          },
        ],
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
