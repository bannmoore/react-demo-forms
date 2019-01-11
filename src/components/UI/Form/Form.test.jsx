const React = require('react')
const { shallow } = require('enzyme')
const Form = require('./Form')

const UIForm = require('react-bootstrap/lib/Form')

describe('Form', () => {
  it('shallow renders without crashing', () => {
    shallow(<Form />)
  })

  it('should wire up submit handler', () => {
    const handleSubmit = td.func()
    const subject = shallow(<Form onSubmit={handleSubmit} />)

    subject.find(UIForm).simulate('submit', {
      preventDefault: td.func()
    })

    td.verify(handleSubmit())
  })
})
