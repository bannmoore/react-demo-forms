const React = require('react')
const PropTypes = require('prop-types')
const Form = require('react-bootstrap/Form')
const Input = require('../Input/Input')

module.exports = class FormControl extends React.Component {
  static propTypes = {
    errors: PropTypes.array,
    label: PropTypes.string,
    name: PropTypes.string,
    touched: PropTypes.bool,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    errors: [],
    touched: false,
    value: ''
  }

  isInvalid(error, touched) {
    return error && touched
  }

  renderError(isInvalid, error) {
    if (isInvalid) {
      return (
        <Form.Control.Feedback type="invalid" className="error">
          {error}
        </Form.Control.Feedback>
      )
    }
    return ''
  }

  render() {
    const { errors, label, name, touched, value, onBlur, onChange } = this.props
    const error = errors && errors.length ? errors[0] : null
    const isInvalid = this.isInvalid(error, touched)

    return (
      <Form.Group>
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Input
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          isInvalid={isInvalid}
        />
        {this.renderError(isInvalid, error)}
      </Form.Group>
    )
  }
}
