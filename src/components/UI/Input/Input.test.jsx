const React = require('react')
const { shallow } = require('enzyme')
const Input = require('./Input')

const FormControl = require('react-bootstrap/lib/FormControl')

describe('Input', () => {
  it('shallow renders without crashing', () => {
    const handleChange = td.func()
    shallow(<Input name="field" value="" onChange={handleChange} />)
  })

  it('should wire up blur event', () => {
    const handleBlur = td.func()
    const subject = shallow(
      <Input name="field" value="" onChange={td.func()} onBlur={handleBlur} />
    )

    subject.find(FormControl).simulate('blur', {
      target: {
        name: 'field'
      }
    })

    td.verify(handleBlur('field'))
  })

  it('should wire up change event', () => {
    const handleChange = td.func()
    const subject = shallow(
      <Input name="field" value="" onChange={handleChange} />
    )

    subject.find(FormControl).simulate('change', {
      target: {
        name: 'field',
        value: 'value'
      }
    })

    td.verify(handleChange('field', 'value'))
  })
})
