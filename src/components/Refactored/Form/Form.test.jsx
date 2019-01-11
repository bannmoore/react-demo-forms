const React = require('react')
const { shallow } = require('enzyme')
const { RefactoredForm } = require('./Form')
const Form = require('../../UI/Form/Form')
const Button = require('../../UI/Button/Button')

describe('RefactoredForm', () => {
  it('shallow renders without crashing', () => {
    shallow(<RefactoredForm />)
  })

  it('should wire up submit handler', () => {
    const handleSubmit = td.func()
    const subject = shallow(<RefactoredForm onSubmit={handleSubmit} />)

    subject.find(Form).simulate('submit')

    td.verify(handleSubmit())
  })

  it('should disable submit button when form is invalid', () => {
    const subject = shallow(<RefactoredForm isValid={false} />)

    expect(subject.find(Button).props().disabled).toBe(true)
  })

  it('should enable submit button when form is valid', () => {
    const subject = shallow(<RefactoredForm isValid />)

    expect(subject.find(Button).props().disabled).toBe(false)
  })

  const controls = ['shortText', 'longText']
  controls.forEach(control => {
    describe(control, () => {
      it('should wire up blur handler', () => {
        const handleBlur = td.func()
        const subject = shallow(<RefactoredForm onBlur={handleBlur} />)

        subject.find({ name: control }).simulate('blur')

        td.verify(handleBlur())
      })

      it('should wire up change handler', () => {
        const handleChange = td.func()
        const subject = shallow(
          <RefactoredForm onChange={handleChange} />
        ).dive()

        subject.find({ name: control }).simulate('change')

        td.verify(handleChange())
      })
    })
  })
})
