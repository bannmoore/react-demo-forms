const React = require('react')
const { hot } = require('react-hot-loader')
const PageHeader = require('react-bootstrap/lib/PageHeader')
const ScreensRoot = require('./screens/Root')

const App = () => (
  <div className="container">
    <PageHeader>Form</PageHeader>
    <ScreensRoot />
  </div>
)

module.exports = process.env.NODE_ENV === 'production' ? App : hot(module)(App)
