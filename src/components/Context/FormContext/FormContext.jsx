const React = require('react')

const FormContext = React.createContext({
  errors: {},
  isValid: true,
  touched: {},
  validators: {},
  values: {}
})

module.exports = FormContext
