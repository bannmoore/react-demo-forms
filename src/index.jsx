const React = require('react')
const ReactDOM = require('react-dom')
const App = require('./App')

require('normalize.css')
require('./styles.css')

ReactDOM.render(<App />, document.getElementById('root'))
