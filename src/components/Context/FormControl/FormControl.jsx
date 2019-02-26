const React = require('react')
const PropTypes = require('prop-types')
const { FormControl } = require('../../UI')
const withConsumer = require('../FormContext/withConsumer/withConsumer')

function ContextFormControl({
  errors,
  touched,
  values,
  onBlur,
  onChange,
  name,
  label
}) {
  return (
    <FormControl
      label={label}
      name={name}
      errors={errors[name]}
      touched={touched[name]}
      value={values[name]}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}

ContextFormControl.propTypes = {
  // context
  errors: PropTypes.object,
  touched: PropTypes.object,
  values: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  // props
  name: PropTypes.string,
  label: PropTypes.string
}

ContextFormControl.defaultProps = {
  errors: {},
  touched: {},
  values: {}
}

module.exports = withConsumer(ContextFormControl)

module.exports.ContextFormControl = ContextFormControl
