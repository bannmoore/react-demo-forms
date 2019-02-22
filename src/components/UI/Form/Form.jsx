const React = require('react')
const PropTypes = require('prop-types')
const UIForm = require('react-bootstrap/Form')

module.exports = class Form extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    return this.props.onSubmit()
  }

  render() {
    const { children } = this.props

    return <UIForm onSubmit={this.handleSubmit}>{children}</UIForm>
  }
}
