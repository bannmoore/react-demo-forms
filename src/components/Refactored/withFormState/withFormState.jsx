const React = require('react')
const PropTypes = require('prop-types')

module.exports = function withFormState(Component, { defaults, validators }) {
  return class WithFormState extends React.Component {
    static propTypes = {
      onSubmit: PropTypes.func
    }

    constructor(props) {
      super(props)

      this.state = {
        errors: {},
        isValid: true,
        touched: {},
        validators,
        values: defaults
      }

      this.handleBlur = this.handleBlur.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
      this.validate()
    }

    validate() {
      const errors = {}
      for (let control in this.state.validators) {
        errors[control] = []
        this.state.validators[control].forEach(validator => {
          if (validator.validate(this.state.values[control])) {
            errors[control].push(validator.message)
          }
        })
      }

      let isValid = true
      for (let control in errors) {
        isValid = isValid && !errors[control].length
      }

      this.setState({
        errors,
        isValid
      })
    }

    touchControl(name) {
      const { touched } = this.state
      touched[name] = true

      this.setState({
        touched
      })
    }

    updateControl(name, value) {
      const { values, touched } = this.state
      values[name] = value
      touched[name] = true

      this.setState({
        touched,
        values
      })

      this.validate()
    }

    handleBlur(name) {
      this.touchControl(name)
    }

    handleChange(name, value) {
      this.updateControl(name, value)
    }

    handleSubmit() {
      this.props.onSubmit(this.state.values)
    }

    render() {
      const { errors, isValid, touched, values } = this.state

      return (
        <Component
          {...this.props}
          errors={errors}
          isValid={isValid}
          touched={touched}
          values={values}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      )
    }
  }
}
