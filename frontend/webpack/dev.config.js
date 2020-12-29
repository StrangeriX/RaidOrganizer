const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { default: merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'development',
    cache: false,
    devtool: 'inline-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './templates/frontend/index.html',
        filename: './index.html',
      }),
    ],
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: 'app.bundle.js',
      publicPath: '/',
      chunkFilename: '[name].chunk.js',
    },
    devServer: {
      stats: 'errors-only',
      watchOptions: { ignored: /node_modules/ },
      historyApiFallback: true,
      contentBase: '/',
      hot: true,
    },
  });
};
