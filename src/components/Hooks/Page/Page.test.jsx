const React = require('react')
const { shallow } = require('enzyme')
const HooksPage = require('./Page')

describe('HooksPage', () => {
  it('shallow renders without crashing', () => {
    shallow(<HooksPage />)
  })
})
