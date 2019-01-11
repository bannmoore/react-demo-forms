/*
 * Configuration passed to the postcss-loader in Webpack.
 * Docs: https://github.com/postcss/postcss-loader#configuration
 */

module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-preset-env': {},
    'cssnano': {},
  }
}
