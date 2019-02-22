const React = require('react')
const PropTypes = require('prop-types')
const Form = require('react-bootstrap/Form')

module.exports = class Input extends React.Component {
  static propTypes = {
    isInvalid: PropTypes.bool,
    isValid: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleBlur(event) {
    return this.props.onBlur(event.target.name)
  }

  handleChange(event) {
    return this.props.onChange(event.target.name, event.target.value)
  }

  render() {
    const { isInvalid, isValid, name, value } = this.props

    return (
      <Form.Control
        isInvalid={isInvalid}
        isValid={isValid}
        type="text"
        name={name}
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    )
  }
}
