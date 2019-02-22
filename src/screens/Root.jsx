const React = require('react')
const PropTypes = require('prop-types')
const { BrowserRouter, Route, Switch } = require('react-router-dom')

const BaseForm = require('../components/Base/Form/Form')
const RefactoredForm = require('../components/Refactored/Form/Form')

const ScreensRoot = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/base" component={BaseForm} />
      <Route exact path="/refactored" component={RefactoredForm} />
    </Switch>
  </BrowserRouter>
)

ScreensRoot.propTypes = {
  children: PropTypes.any
}

module.exports = ScreensRoot
