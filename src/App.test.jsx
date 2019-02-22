import React from 'react' // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme'
import App from './App'

describe('App', () => {
  it('shallow renders without crashing', () => {
    shallow(<App />)
  })
})
