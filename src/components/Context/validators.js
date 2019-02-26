module.exports = {
  required: () => ({
    validate: value => !value || value.length === 0,
    message: 'This field is required.'
  }),
  minLength: min => ({
    validate: value => value && value.length < min,
    message: `This field's value must have a length of at least ${min}.`
  }),
  maxLength: max => ({
    validate: value => value && value.length > max,
    message: `This field's value must have a length less than ${max + 1}.`
  })
}
