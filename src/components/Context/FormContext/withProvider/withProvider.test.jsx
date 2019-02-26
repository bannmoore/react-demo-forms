const React = require('react')
const { shallow } = require('enzyme')
const withProvider = require('./withProvider')
const FormContext = require('../FormContext')

let SimpleComponent = () => <div />

describe('withProvider', () => {
  it('shallow renders without crashing', () => {
    const WithProvider = withProvider(SimpleComponent, {
      defaults: {},
      validators: {}
    })
    shallow(<WithProvider />)
  })

  it('should wire up blur handler', () => {
    const WithProvider = withProvider(SimpleComponent, {
      defaults: {},
      validators: {}
    })
    const subject = shallow(<WithProvider />)
    const getContext = () => subject.find(FormContext.Provider).props().value

    getContext().onBlur('field')

    expect(getContext().touched).toEqual({
      field: true
    })
  })

  it('should wire up change handler', () => {
    const WithProvider = withProvider(SimpleComponent, {
      defaults: {},
      validators: {}
    })
    const subject = shallow(<WithProvider />)
    const getContext = () => subject.find(FormContext.Provider).props().value

    getContext().onChange('field', 'value')

    expect(getContext().touched).toEqual({
      field: true
    })
    expect(getContext().values).toEqual({
      field: 'value'
    })
  })

  it('should wire up submit handler', () => {
    const handleSubmit = td.func()
    const WithProvider = withProvider(SimpleComponent, {
      defaults: {},
      validators: {}
    })
    const subject = shallow(<WithProvider onSubmit={handleSubmit} />)
    const getContext = () => subject.find(FormContext.Provider).props().value

    getContext().onSubmit()

    td.verify(handleSubmit({}))
  })

  it('should validate the form on load', () => {
    const WithProvider = withProvider(SimpleComponent, {
      defaults: {
        test: ''
      },
      validators: {
        test: [
          {
            validate: () => true,
            message: 'message'
          }
        ]
      }
    })
    const subject = shallow(<WithProvider />)
    const getContext = () => subject.find(FormContext.Provider).props().value

    expect(getContext().errors).toEqual({
      test: ['message']
    })
  })

  it('should validate the form on change', () => {
    const controlIsValid = td.func()
    const WithProvider = withProvider(SimpleComponent, {
      defaults: {
        test: ''
      },
      validators: {
        test: [
          {
            validate: controlIsValid,
            message: 'message'
          }
        ]
      }
    })
    const subject = shallow(<WithProvider />)
    const getContext = () => subject.find(FormContext.Provider).props().value

    td.when(controlIsValid('value')).thenReturn(false)

    getContext().onChange('field', 'value')

    expect(getContext().errors).toEqual({
      test: []
    })
  })
})
