const React = require('react')
const PropTypes = require('prop-types')
const { BrowserRouter, Route, Switch } = require('react-router-dom')

const BaseForm = require('../components/Base/Form/Form')
const RefactoredForm = require('../components/Refactored/Form/Form')
const ContextPage = require('../components/Context/Page/Page')
const HooksPage = require('../components/Hooks/Page/Page')

const ScreensRoot = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/base" component={BaseForm} />
      <Route exact path="/refactored" component={RefactoredForm} />
      <Route exact path="/context" component={ContextPage} />
      <Route exact path="/hooks" component={HooksPage} />
    </Switch>
  </BrowserRouter>
)

ScreensRoot.propTypes = {
  children: PropTypes.any
}

module.exports = ScreensRoot
