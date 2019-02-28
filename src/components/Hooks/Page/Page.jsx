const React = require('react')
const HooksForm = require('../Form/Form')

class HooksPage extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    console.log(values) // eslint-disable-line no-console
  }

  render() {
    return <HooksForm onSubmit={this.handleSubmit} />
  }
}

HooksPage.propTypes = {}

module.exports = HooksPage
