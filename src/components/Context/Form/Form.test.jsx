const React = require('react')
const { shallow } = require('enzyme')
const { ContextForm } = require('./Form')
const Form = require('../../UI/Form/Form')
const Button = require('../../UI/Button/Button')

describe('ContextForm', () => {
  it('shallow renders without crashing', () => {
    shallow(<ContextForm />)
  })

  it('should wire up submit handler', () => {
    const handleSubmit = td.func()
    const subject = shallow(<ContextForm onSubmit={handleSubmit} />)

    subject.find(Form).simulate('submit')

    td.verify(handleSubmit())
  })

  it('should disable submit button when form is invalid', () => {
    const subject = shallow(<ContextForm isValid={false} />)

    expect(subject.find(Button).props().disabled).toBe(true)
  })

  it('should enable submit button when form is valid', () => {
    const subject = shallow(<ContextForm isValid />)

    expect(subject.find(Button).props().disabled).toBe(false)
  })
})
