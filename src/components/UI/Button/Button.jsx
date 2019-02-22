const React = require('react')
const PropTypes = require('prop-types')
const UIButton = require('react-bootstrap/Button')

const Button = function({ children, disabled, type }) {
  return (
    <UIButton type={type} disabled={disabled}>
      {children}
    </UIButton>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  type: PropTypes.string
}

module.exports = Button
