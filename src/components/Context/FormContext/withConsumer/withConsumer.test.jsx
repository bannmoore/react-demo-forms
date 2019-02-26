const React = require('react')
const { shallow } = require('enzyme')
const withConsumer = require('./withConsumer')

let SimpleComponent = () => <div />

describe('withConsumer', () => {
  it('shallow renders without crashing', () => {
    const WithConsumer = withConsumer(SimpleComponent)
    shallow(<WithConsumer />)
  })
})
