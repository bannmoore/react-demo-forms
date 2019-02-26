const React = require('react')
const ContextForm = require('../Form/Form')

class ContextPage extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    console.log(values) // eslint-disable-line no-console
  }

  render() {
    return <ContextForm onSubmit={this.handleSubmit} />
  }
}

ContextPage.propTypes = {}

module.exports = ContextPage
