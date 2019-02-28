const React = require('react')
const { useState, useEffect } = React

module.exports = function useFormState({
  validators = {},
  defaults = {}
} = {}) {
  const [isValid, setIsValid] = useState(true)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [values, setValues] = useState(defaults)

  function validate(validators, values) {
    const errors = {}
    for (let control in validators) {
      errors[control] = []
      validators[control].forEach(validator => {
        if (validator.validate(values[control])) {
          errors[control].push(validator.message)
        }
      })
    }

    let isValid = true
    for (let control in errors) {
      isValid = isValid && !errors[control].length
    }

    setErrors(errors)
    setIsValid(isValid)
  }

  function touchControl(touched, name) {
    touched[name] = true
    setTouched(touched)
  }

  function updateControl(values, touched, name, value) {
    touchControl(touched, name)
    values[name] = value
    setValues(values)
  }

  function handleBlur(name) {
    touchControl(touched, name)
    validate(validators, values)
  }

  function handleChange(name, value) {
    updateControl(values, touched, name, value)
    validate(validators, values)
  }

  useEffect(() => {
    validate(validators, values)
  }, [values])

  return {
    isValid,
    errors,
    touched,
    values,
    onBlur: handleBlur,
    onChange: handleChange
  }
}
