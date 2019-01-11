const React = require('react')
const { shallow } = require('enzyme')
const withFormState = require('./withFormState')

let SimpleComponent = () => <div />

describe('withFormState', () => {
  it('shallow renders without crashing', () => {
    const WithFormState = withFormState(SimpleComponent, {
      defaults: {},
      validators: {}
    })
    shallow(<WithFormState />)
  })

  it('should wire up blur handler', () => {
    const WithFormState = withFormState(SimpleComponent, {
      defaults: {},
      validators: {}
    })
    const subject = shallow(<WithFormState />)

    subject.find(SimpleComponent).simulate('blur', 'field')

    expect(subject.find(SimpleComponent).props().touched).toEqual({
      field: true
    })
  })

  it('should wire up change handler', () => {
    const WithFormState = withFormState(SimpleComponent, {
      defaults: {},
      validators: {}
    })
    const subject = shallow(<WithFormState />)

    subject.find(SimpleComponent).simulate('change', 'field', 'value')

    expect(subject.find(SimpleComponent).props().touched).toEqual({
      field: true
    })
    expect(subject.find(SimpleComponent).props().values).toEqual({
      field: 'value'
    })
  })

  it('should wire up submit handler', () => {
    const handleSubmit = td.func()
    const WithFormState = withFormState(SimpleComponent, {
      defaults: {},
      validators: {}
    })
    const subject = shallow(<WithFormState onSubmit={handleSubmit} />)

    subject.find(SimpleComponent).simulate('submit')

    td.verify(handleSubmit({}))
  })

  it('should validate the form on load', () => {
    const WithFormState = withFormState(SimpleComponent, {
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
    const subject = shallow(<WithFormState />)

    expect(subject.find(SimpleComponent).props().errors).toEqual({
      test: ['message']
    })
  })

  it('should validate the form on change', () => {
    const controlIsValid = td.func()
    const WithFormState = withFormState(SimpleComponent, {
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
    const subject = shallow(<WithFormState />)

    td.when(controlIsValid('value')).thenReturn(false)

    subject.find(SimpleComponent).simulate('change', 'field', 'value')

    expect(subject.find(SimpleComponent).props().errors).toEqual({
      test: []
    })
  })
})
