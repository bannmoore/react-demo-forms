const React = require('react')
const PropTypes = require('prop-types')
const ControlLabel = require('react-bootstrap/lib/ControlLabel')
const FormGroup = require('react-bootstrap/lib/FormGroup')
const HelpBlock = require('react-bootstrap/lib/HelpBlock')
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

  getValidationState(error, touched) {
    return error && touched ? 'error' : null
  }

  renderError(error, touched) {
    if (error && touched) {
      return <HelpBlock className="error">{error}</HelpBlock>
    }
    return ''
  }

  render() {
    const { errors, label, name, touched, value, onBlur, onChange } = this.props
    const error = errors && errors.length ? errors[0] : null

    return (
      <FormGroup
        controlId={name}
        validationState={this.getValidationState(error, touched)}
      >
        <ControlLabel htmlFor={name}>{label}</ControlLabel>
        <Input name={name} value={value} onBlur={onBlur} onChange={onChange} />
        {this.renderError(error, touched)}
      </FormGroup>
    )
  }
}
