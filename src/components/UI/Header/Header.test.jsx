const React = require('react')
const { shallow } = require('enzyme')
const Header = require('./Header')

describe('Header', () => {
  it('shallow renders without crashing', () => {
    shallow(<Header />)
  })
})
