const React = require('react')
const { shallow } = require('enzyme')
const { ContextFormControl } = require('./FormControl')
const { FormControl } = require('../../UI')

describe('ContextFormControl', () => {
  it('shallow renders without crashing', () => {
    shallow(<ContextFormControl />)
  })

  it('should pass down properties', () => {
    const subject = shallow(<ContextFormControl name="name" label="label" />)

    expect(subject.find(FormControl).props().name).toEqual('name')
    expect(subject.find(FormControl).props().label).toEqual('label')
  })

  it('should pass down correct error', () => {
    const errors = { field: ['error'] }
    const subject = shallow(<ContextFormControl name="field" errors={errors} />)

    expect(subject.find(FormControl).props().errors).toEqual(['error'])
  })

  it('should pass down correct touched', () => {
    const touched = { field: true }
    const subject = shallow(
      <ContextFormControl name="field" touched={touched} />
    )

    expect(subject.find(FormControl).props().touched).toEqual(true)
  })

  it('should pass down correct value', () => {
    const values = { field: 'value' }
    const subject = shallow(<ContextFormControl name="field" values={values} />)

    expect(subject.find(FormControl).props().value).toEqual('value')
  })

  it('should wire up blur handler', () => {
    const handleBlur = td.func()
    const subject = shallow(
      <ContextFormControl name="name" onBlur={handleBlur} />
    )

    subject.find({ name: 'name' }).simulate('blur')

    td.verify(handleBlur())
  })

  it('should wire up change handler', () => {
    const handleChange = td.func()
    const subject = shallow(
      <ContextFormControl name="name" onChange={handleChange} />
    )

    subject.find({ name: 'name' }).simulate('change')

    td.verify(handleChange())
  })
})
