const React = require('react')
const PropTypes = require('prop-types')
const withProvider = require('../FormContext/withProvider/withProvider')
const ContextFormControl = require('../FormControl/FormControl')
const validators = require('../validators')
const { Button, Form } = require('../../UI')

function ContextForm({ isValid, onSubmit }) {
  return (
    <Form onSubmit={onSubmit}>
      <ContextFormControl label="Short Text" name="shortText" />

      <ContextFormControl label="Long Text" name="longText" />

      <div>
        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </div>
    </Form>
  )
}

ContextForm.propTypes = {
  isValid: PropTypes.bool,
  onSubmit: PropTypes.func
}

module.exports = withProvider(ContextForm, {
  defaults: {
    shortText: '',
    longText: ''
  },
  validators: {
    shortText: [validators.required(), validators.maxLength(3)],
    longText: [validators.required(), validators.minLength(3)]
  }
})

// for testing purposes only
module.exports.ContextForm = ContextForm
