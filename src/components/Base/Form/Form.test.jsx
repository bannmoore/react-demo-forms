const React = require('react')
const { shallow } = require('enzyme')
const BaseForm = require('./Form')
const Form = require('../../UI/Form/Form')
const FormControl = require('../../UI/FormControl/FormControl')
const Button = require('../../UI/Button/Button')

describe('BaseForm', () => {
  it('shallow renders with form state', () => {
    shallow(<BaseForm />)
  })

  it('should disable button when form is invalid', () => {
    const subject = shallow(<BaseForm />)

    expect(subject.find(Button).props().disabled).toBe(true)
  })

  it('should enable button when form is valid', () => {
    const subject = shallow(<BaseForm />)

    subject
      .find(FormControl)
      .at(0)
      .simulate('change', 'shortText', 'abc')
    subject
      .find(FormControl)
      .at(1)
      .simulate('change', 'longText', 'abcd')

    expect(subject.find(Button).props().disabled).toBe(false)
  })

  it('should validate shortText as required', () => {
    const subject = shallow(<BaseForm />)

    expect(
      subject
        .find(FormControl)
        .at(0)
        .props().errors
    ).toEqual(['This field is required.'])
  })

  it('should validate shortText max length', () => {
    const subject = shallow(<BaseForm />)

    subject
      .find(FormControl)
      .at(0)
      .simulate('change', 'shortText', 'abcd')
    expect(
      subject
        .find(FormControl)
        .at(0)
        .props().errors
    ).toEqual(["This field's value must have a length less than 4."])
  })

  it('should validate longText as required', () => {
    const subject = shallow(<BaseForm />)

    expect(
      subject
        .find(FormControl)
        .at(1)
        .props().errors
    ).toEqual([
      'This field is required.',
      "This field's value must have a length of at least 3."
    ])
  })

  it('should validate longText as required', () => {
    const subject = shallow(<BaseForm />)

    subject
      .find(FormControl)
      .at(1)
      .simulate('change', 'longText', 'ab')
    expect(
      subject
        .find(FormControl)
        .at(1)
        .props().errors
    ).toEqual(["This field's value must have a length of at least 3."])
  })

  it('should wire up blur handler for shortText', () => {
    const subject = shallow(<BaseForm />)

    subject
      .find(FormControl)
      .at(0)
      .simulate('blur', 'shortText')

    expect(
      subject
        .find(FormControl)
        .at(0)
        .props().touched
    ).toBe(true)
  })

  it('should wire up blur handler for longText', () => {
    const subject = shallow(<BaseForm />)

    subject
      .find(FormControl)
      .at(1)
      .simulate('blur', 'longText')

    expect(
      subject
        .find(FormControl)
        .at(1)
        .props().touched
    ).toBe(true)
  })

  it('should wire up change handler for shortText', () => {
    const subject = shallow(<BaseForm />)

    subject
      .find(FormControl)
      .at(0)
      .simulate('change', 'shortText', 'abc')

    expect(
      subject
        .find(FormControl)
        .at(0)
        .props().value
    ).toBe('abc')
  })

  it('should wire up change handler for longText', () => {
    const subject = shallow(<BaseForm />)

    subject
      .find(FormControl)
      .at(1)
      .simulate('change', 'longText', 'abcd')

    expect(
      subject
        .find(FormControl)
        .at(1)
        .props().value
    ).toBe('abcd')
  })

  it('should wire up submit handler', () => {
    const handleSubmit = td.func()
    const subject = shallow(<BaseForm onSubmit={handleSubmit} />)

    subject
      .find(FormControl)
      .at(0)
      .simulate('change', 'shortText', 'abc')
    subject
      .find(FormControl)
      .at(1)
      .simulate('change', 'longText', 'abcd')
    subject.find(Form).simulate('submit')

    td.verify(
      handleSubmit({
        shortText: 'abc',
        longText: 'abcd'
      })
    )
  })

  it('should handle submit when no handler is provided', () => {
    const subject = shallow(<BaseForm />)

    subject
      .find(FormControl)
      .at(0)
      .simulate('change', 'shortText', 'abc')
    subject
      .find(FormControl)
      .at(1)
      .simulate('change', 'longText', 'abcd')
    subject.find(Form).simulate('submit')
  })
})
