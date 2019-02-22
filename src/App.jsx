const React = require('react')
const { hot } = require('react-hot-loader')
const Header = require('./components/UI/Header/Header')
const ScreensRoot = require('./screens/Root')

const App = () => (
  <div className="container">
    <Header>Form</Header>
    <ScreensRoot />
  </div>
)

module.exports = process.env.NODE_ENV === 'production' ? App : hot(module)(App)
