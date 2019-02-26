const React = require('react')
const PropTypes = require('prop-types')
const FormContext = require('../FormContext')

module.exports = function withProvider(Component, { defaults, validators }) {
  return class WithProvider extends React.Component {
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
      const context = {
        errors: this.state.errors,
        isValid: this.state.isValid,
        touched: this.state.touched,
        values: this.state.values,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onSubmit: this.handleSubmit
      }

      return (
        <FormContext.Provider value={context}>
          <Component
            isValid={this.state.isValid}
            onSubmit={this.handleSubmit}
          />
        </FormContext.Provider>
      )
    }
  }
}
