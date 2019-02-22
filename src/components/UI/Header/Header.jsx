const React = require('react')
const PropTypes = require('prop-types')

const Header = function({ children }) {
  return <h1>{children}</h1>
}

Header.propTypes = {
  children: PropTypes.any
}

module.exports = Header
