const path = require('path')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.common')

module.exports = webpackMerge(commonConfig, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, './../dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        include: [/node_modules/],
        exclude: [/src\/styles.css/]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { config: { path: './config/postcss/production/' } }
          }
        ],
        include: [/src\/styles.css/],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: { config: { path: './config/postcss/production/' } }
          }
        ],
        exclude: [/node_modules/, /src\/styles.css/]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[hash].css'
    })
  ]
})
