const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config');

module.exports = (env) =>
  merge(common(env), {
    mode: 'production',
    stats: {
      warnings: true,
    },
    cache: true,
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new HtmlWebpackPlugin({
        hash: true,
        inject: true,
        template: './templates/frontend/index.html',
        minify: {
          collapseWhitespace: true,
          conservativeCollapse: false,
        },
      }),
    ],
  });
