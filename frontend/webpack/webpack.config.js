const path = require('path');
const { default: merge } = require('webpack-merge');

module.exports = (env) =>
  merge(
    {},
    {
      entry: ['@babel/polyfill', './src/index.js'],
      resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules'],
        alias: {},
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              query: {
                presets: [['@babel/preset-env'], ['@babel/preset-react']],
                plugins: ['@babel/plugin-proposal-class-properties'],
              },
            },
          },
          {
            test: /\.(jpe?g|png|gif|ico)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[sha512:hash:base64:6].[ext]',
                },
              },
            ],
          },
          {
            test: /\.html$/,
            use: {
              loader: 'html-loader',
            },
          },
          {
            test: /\.(sc|c)ss$/i,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  additionalData: `

              `,
                },
              },
            ],
          },
        ],
      },
    }
  );
