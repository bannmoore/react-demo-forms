const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.jsx',

  output: {
    publicPath: '/'
  },

  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(eot|svg)$/,
        use: 'file-loader?name=assets/[name].[hash:20].[ext]'
      },
      {
        test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        use: 'url-loader?name=assets/[name].[hash:20].[ext]&limit=10000'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './config/index.template.html'
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, './../node_modules')]
  },

  stats: {
    all: false,
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true
  }
}
