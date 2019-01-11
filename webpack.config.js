/*
 * Webpack looks for a webpack.config.js file in the root directory.
 * Using the environment variable MODE, this file loads the correct configuration
 * from the `config` directory.
 */

const mode = process.env.MODE || 'production';
module.exports = require(`./config/webpack.${mode}.js`);
