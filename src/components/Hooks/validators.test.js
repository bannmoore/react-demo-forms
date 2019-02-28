const validators = require('./validators')

describe('Validators', function() {
  describe('required', () => {
    it('should return true if value is falsy', () => {
      const subject = validators.required()

      expect(subject.validate()).toBe(true)
      expect(subject.validate('')).toBe(true)
      expect(subject.validate(undefined)).toBe(true)
      expect(subject.validate(null)).toBe(true)

      expect(subject.validate('0')).toBe(false)
      expect(subject.validate('false')).toBe(false)
      expect(subject.validate('null')).toBe(false)
    })
  })

  describe('minLength', () => {
    it('should return true if value length is less than the expected length', () => {
      const subject = validators.minLength(5)

      expect(subject.validate('a')).toBe(true)
      expect(subject.validate('ab')).toBe(true)
      expect(subject.validate('abc')).toBe(true)
      expect(subject.validate('abcd')).toBe(true)

      expect(subject.validate('abcde')).toBe(false)
      expect(subject.validate('ab de')).toBe(false)
      expect(subject.validate('abcdef')).toBe(false)
    })
  })

  describe('maxLength', () => {
    it('should return true if value length is greater than the expected length', () => {
      const subject = validators.maxLength(5)

      expect(subject.validate('abcdef')).toBe(true)

      expect(subject.validate('a')).toBe(false)
      expect(subject.validate('ab')).toBe(false)
      expect(subject.validate('abc')).toBe(false)
      expect(subject.validate('abcd')).toBe(false)
      expect(subject.validate('abcde')).toBe(false)
      expect(subject.validate('ab de')).toBe(false)
    })
  })
})
