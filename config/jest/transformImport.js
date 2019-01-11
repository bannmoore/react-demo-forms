/*
 * Transforms an import to a string (this can be used on CSS or files so Jest ignores them).
 * This is used by the `transform` property in the Jest configuration.
 * Docs: https://jestjs.io/docs/en/configuration.html#transform-object-string-string
 */

module.exports = {
  process() {
    return 'module.exports = {};'
  }
}
