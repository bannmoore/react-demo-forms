const React = require('react')
const { shallow } = require('enzyme')
const HooksForm = require('./Form')

describe('HooksForm', () => {
  it('shallow renders without crashing', () => {
    shallow(<HooksForm />)
  })
})
