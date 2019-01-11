const React = require('react')
const { hot } = require('react-hot-loader')
const PageHeader = require('react-bootstrap/lib/PageHeader')
// const BaseForm = require('./Base/Form/Form')
const RefactoredForm = require('./Refactored/Form/Form')

function handleSubmit(values) {
  console.log(values) // eslint-disable-line no-console
}

const App = () => (
  <div className="container">
    <PageHeader>Form</PageHeader>
    <RefactoredForm onSubmit={handleSubmit} />
  </div>
)

module.exports = process.env.NODE_ENV === 'production' ? App : hot(module)(App)
