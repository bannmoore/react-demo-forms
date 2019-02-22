const React = require('react')
const PropTypes = require('prop-types')
const PageHeader = require('react-bootstrap/lib/PageHeader')

const Header = function({ children }) {
  return <PageHeader>{children}</PageHeader>
}

Header.propTypes = {
  children: PropTypes.any
}

module.exports = Header
