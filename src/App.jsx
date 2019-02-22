const React = require('react')
const { setConfig } = require('react-hot-loader')
const { hot } = require('react-hot-loader/root')
const Header = require('./components/UI/Header/Header')
const ScreensRoot = require('./screens/Root')

setConfig({
  ignoreSFC: true
})

const App = () => (
  <div className="container">
    <Header>Form</Header>
    <ScreensRoot />
  </div>
)

module.exports = process.env.NODE_ENV === 'production' ? App : hot(App)
