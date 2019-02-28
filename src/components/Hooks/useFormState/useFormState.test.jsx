const React = require('react')
const { shallow, mount } = require('enzyme')
const useFormState = require('./useFormState')

function getComponentWithHook({ validators, defaults } = {}) {
  return function SimpleComponent() {
    const formState = useFormState({ validators, defaults })

    function handleBlur(event) {
      formState.onBlur(event.name)
    }

    function handleChange(event) {
      formState.onChange(event.name, event.value)
    }

    return (
      <div onBlur={handleBlur} onChange={handleChange}>
        <span id="is-valid" data-is-valid={formState.isValid} />
        <span id="errors" data-errors={formState.errors} />
        <span id="touched" data-touched={formState.touched} />
        <span id="values" data-values={formState.values} />
      </div>
    )
  }
}

describe('useFormState', function() {
  it('should initialize component without crashing', function() {
    const Component = getComponentWithHook()
    shallow(<Component />)
  })

  it('should initialize correct default isValid', function() {
    const Component = getComponentWithHook()
    const subject = shallow(<Component />)

    expect(subject.find('#is-valid').props()['data-is-valid']).toEqual(true)
  })

  it('should initialize correct default errors', function() {
    const Component = getComponentWithHook()
    const subject = shallow(<Component />)

    expect(subject.find('#errors').props()['data-errors']).toEqual({})
  })

  it('should initialize correct default touched', function() {
    const Component = getComponentWithHook()
    const subject = shallow(<Component />)

    expect(subject.find('#touched').props()['data-touched']).toEqual({})
  })

  it('should initialize correct default values', function() {
    const Component = getComponentWithHook()
    const subject = shallow(<Component />)

    expect(subject.find('#values').props()['data-values']).toEqual({})
  })

  it('should set touched on blur', function() {
    const Component = getComponentWithHook()
    const subject = shallow(<Component />)

    subject.find('div').simulate('blur', {
      name: 'field'
    })

    expect(subject.find('#touched').props()['data-touched']).toEqual({
      field: true
    })
  })

  it('should update form values on change', () => {
    const Component = getComponentWithHook()
    const subject = mount(<Component />)

    subject.find('div').simulate('change', {
      name: 'field',
      value: 'value'
    })

    expect(subject.find('#values').props()['data-values']).toEqual({
      field: 'value'
    })
    expect(subject.find('#touched').props()['data-touched']).toEqual({
      field: true
    })
    expect(subject.find('#errors').props()['data-errors']).toEqual({})
  })

  it.skip('should initialize invalid component', () => {
    // TODO: enzyme doesn't currently support useEffect
    // reactjs enzyme issue: https://github.com/reactjs/rfcs/issues/71

    const Component = getComponentWithHook({
      validators: {
        field: [
          {
            validate: () => true,
            message: 'invalid'
          }
        ]
      }
    })
    const subject = mount(<Component />)

    expect(subject.find('#is-valid').props()['data-is-valid']).toEqual(false)
    expect(subject.find('#errors').props()['data-errors']).toEqual({
      field: ['invalid']
    })
  })

  it('should update invalid component on change', () => {
    const Component = getComponentWithHook({
      validators: {
        field: [
          {
            validate: () => true,
            message: 'invalid'
          }
        ]
      }
    })
    const subject = mount(<Component />)

    subject.find('div').simulate('change', {
      name: 'field',
      value: 'value'
    })

    expect(subject.find('#is-valid').props()['data-is-valid']).toEqual(false)
    expect(subject.find('#errors').props()['data-errors']).toEqual({
      field: ['invalid']
    })
  })
})
