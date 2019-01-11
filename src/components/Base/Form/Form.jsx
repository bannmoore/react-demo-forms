const React = require('react')
const PropTypes = require('prop-types')
const { Button, Form, FormControl } = require('../../UI')

module.exports = class BaseForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      touched: {},
      values: {
        shortText: '',
        longText: ''
      }
    }

    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const errors = this.validate(this.state.values)

    this.setState({
      errors
    })
  }

  isValid() {
    const { errors } = this.state
    let valid = true
    for (let control in errors) {
      valid = valid && !errors[control].length
    }
    return valid
  }

  validate(values) {
    const errors = {
      shortText: [],
      longText: []
    }

    if (!values.shortText) {
      errors.shortText.push('This field is required.')
    }
    if (values.shortText.length > 3) {
      errors.shortText.push(
        "This field's value must have a length less than 4."
      )
    }

    if (!values.longText) {
      errors.longText.push('This field is required.')
    }
    if (values.longText.length < 3) {
      errors.longText.push(
        "This field's value must have a length of at least 3."
      )
    }

    return errors
  }

  handleBlur(name) {
    const touched = Object.assign({}, this.state.touched)
    touched[name] = true

    this.setState({
      touched
    })
  }

  handleChange(name, value) {
    const values = Object.assign({}, this.state.values)
    const touched = Object.assign({}, this.state.touched)

    values[name] = value
    touched[name] = true
    const errors = this.validate(values)

    this.setState({
      values,
      touched,
      errors
    })
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.values)
    }
  }

  render() {
    const { errors, touched, values } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormControl
          errors={errors.shortText}
          label="Short Text"
          name="shortText"
          touched={touched.shortText}
          value={values.shortText}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />

        <FormControl
          errors={errors.longText}
          label="Long Text"
          name="longText"
          touched={touched.longText}
          value={values.longText}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />

        <div>
          <Button type="submit" disabled={!this.isValid()}>
            Submit
          </Button>
        </div>
      </Form>
    )
  }
}
