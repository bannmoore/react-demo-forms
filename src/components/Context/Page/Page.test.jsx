const React = require('react')
const { shallow } = require('enzyme')
const ContextPage = require('./Page')

describe('ContextPage', () => {
  it('shallow renders without crashing', () => {
    shallow(<ContextPage />)
  })
})
