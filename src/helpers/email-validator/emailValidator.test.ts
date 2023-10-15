import { isValidEmail } from './emailValidator'

describe('Email validator Test suite', () => {
	it('should return true of a valid email', () => {
		const sut = isValidEmail
		const expected = true
		const actual = sut('leodangeli12@gmail.com')
		expect(actual).toBe(expected)
	})

	it('should return false with an invalid email', () => {
		const sut = isValidEmail
		const expected = false
		const actual = sut('leodangeli12gmail.com')
		expect(actual).toBe(expected)
	})
})
