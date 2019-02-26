const React = require('react')
const FormContext = require('../FormContext')

module.exports = function withConsumer(Component) {
  return class WithConsumer extends React.Component {
    static contextType = FormContext

    constructor(props) {
      super(props)
    }

    render() {
      return <Component {...this.props} {...this.context} />
    }
  }
}
