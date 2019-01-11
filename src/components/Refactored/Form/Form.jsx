const React = require('react')
const PropTypes = require('prop-types')
const validators = require('../validators')
const withFormState = require('../withFormState/withFormState')
const { Button, Form, FormControl } = require('../../UI')

const RefactoredForm = function({
  errors,
  touched,
  values,
  isValid,
  onBlur,
  onChange,
  onSubmit
}) {
  return (
    <Form onSubmit={onSubmit}>
      <FormControl
        errors={errors.shortText}
        label="Short Text"
        name="shortText"
        touched={touched.shortText}
        value={values.shortText}
        onBlur={onBlur}
        onChange={onChange}
      />

      <FormControl
        errors={errors.longText}
        label="Long Text"
        name="longText"
        touched={touched.longText}
        value={values.longText}
        onBlur={onBlur}
        onChange={onChange}
      />

      <div>
        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </div>
    </Form>
  )
}

RefactoredForm.propTypes = {
  errors: PropTypes.object,
  isValid: PropTypes.bool,
  touched: PropTypes.object,
  values: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

RefactoredForm.defaultProps = {
  errors: {},
  isValid: true,
  touched: {},
  values: {
    shortText: '',
    longText: ''
  }
}

module.exports = withFormState(RefactoredForm, {
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
module.exports.RefactoredForm = RefactoredForm
