import * as bcrypt from 'bcryptjs'

export const encodePassword = async (password: string): Promise<string> => {
	if (password === '') throw new Error('invalid password')
	const salt = await bcrypt.genSalt(10)
	const passwordHashed = await bcrypt.hash(password, salt)
	return passwordHashed
}
