// selectors
const shortTextInput = 'input[name=shortText]'
const longTextInput = 'input[name=longText]'
const textError = '.error'
const submitButton = 'button'

describe('Hooks Form', () => {
  beforeEach(() => {
    cy.visit('/hooks')
  })

  describe('shortText', () => {
    it('should accept input', () => {
      cy.get(shortTextInput)
        .as('shortTextInput')
        .type('abc')

      cy.get('@shortTextInput').should('have.value', 'abc')
    })

    it('should treat a field as touched on blur', () => {
      cy.get(shortTextInput)
        .focus()
        .blur()

      cy.get(textError)
    })

    it('should display required error', () => {
      cy.get(textError)
        .as('textError')
        .should('not.exist')

      cy.get(shortTextInput)
        .type('abc')
        .clear()

      cy.get(textError).should('contain', 'This field is required.')
    })

    it('should display max length error', () => {
      cy.get(textError)
        .as('textError')
        .should('not.exist')

      cy.get(shortTextInput).type('abcd')

      cy.get(textError).should(
        'contain',
        "This field's value must have a length less than 4."
      )
    })
  })

  describe('longText', () => {
    it('should accept input', () => {
      cy.get(longTextInput)
        .as('longTextInput')
        .type('abc')

      cy.get('@longTextInput').should('have.value', 'abc')
    })

    it('should treat a field as touched on blur', () => {
      cy.get(longTextInput)
        .focus()
        .blur()

      cy.get(textError)
    })

    it('should display required error', () => {
      cy.get(textError)
        .as('textError')
        .should('not.exist')

      cy.get(longTextInput)
        .type('abc')
        .clear()

      cy.get(textError).should('contain', 'This field is required.')
    })

    it('should display min length error', () => {
      cy.get(textError)
        .as('textError')
        .should('not.exist')

      cy.get(longTextInput).type('ab')

      cy.get(textError).should(
        'contain',
        "This field's value must have a length of at least 3."
      )
    })
  })

  it('should display both errors on blur', () => {
    cy.get(shortTextInput)
      .focus()
      .blur()

    cy.get(longTextInput)
      .focus()
      .blur()

    cy.get(textError).should('have.lengthOf', 2)
  })

  it('should disable the submit button when the form is invalid', () => {
    cy.get(submitButton)
      .as('submitButton')
      .should('be.disabled')
  })

  it('should enable the submit button when the form is valid', () => {
    cy.get(shortTextInput).type('abc')

    cy.get(longTextInput).type('abcde')

    cy.get(submitButton).should('not.be.disabled')
  })
})
