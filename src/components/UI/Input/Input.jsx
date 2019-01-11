const React = require('react')
const PropTypes = require('prop-types')
const FormControl = require('react-bootstrap/lib/FormControl')

module.exports = class Input extends React.Component {
  static propTypes = {
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
    const { name, value } = this.props

    return (
      <FormControl
        type="text"
        name={name}
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    )
  }
}
