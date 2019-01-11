const React = require('react')
const { shallow } = require('enzyme')

const HelpBlock = require('react-bootstrap/lib/HelpBlock')

const FormControl = require('./FormControl')

describe('FormControl', () => {
  it('shallow renders without crashing', () => {
    shallow(<FormControl />)
  })

  it('should not render errors', () => {
    const subject = shallow(<FormControl />)

    expect(subject.find(HelpBlock).length).toBe(0)
  })

  it('should not render error while form is untouched', () => {
    const errors = ['error']
    const touched = false
    const subject = shallow(<FormControl errors={errors} touched={touched} />)

    expect(subject.find(HelpBlock).length).toBe(0)
  })

  it('should render error', () => {
    const errors = ['error']
    const touched = true
    const subject = shallow(<FormControl errors={errors} touched={touched} />)

    expect(subject.find(HelpBlock).length).toBe(1)
    expect(subject.find(HelpBlock).props().children).toBe('error')
  })
})
