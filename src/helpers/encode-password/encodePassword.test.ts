import { encodePassword } from './encodePassword'

describe('encodePassword test suite', () => {
	// Unit Test for Successful Execution
	it('should hash a valid password', async () => {
		const validPassword = 'validPassword'
		const sut = encodePassword

		const actual = await sut(validPassword)

		expect(actual).toBeDefined()
		expect(typeof actual).toBe('string')
	})

	it('should reject with an error for an invalid password', async () => {
		const invalidPassword = ''
		const sut = encodePassword

		const actual = await sut(invalidPassword)

		await expect(sut(invalidPassword)).rejects.toThrowError()
	})
})
