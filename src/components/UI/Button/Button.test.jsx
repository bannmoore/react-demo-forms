const React = require('react')
const { shallow } = require('enzyme')
const Button = require('./Button')

describe('Button', () => {
  it('shallow renders without crashing', () => {
    shallow(<Button />)
  })
})
