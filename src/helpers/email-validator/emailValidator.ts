export const isValidEmail = (email: string) => {
	const emailRegex =
		/^(?=.{1,256}$)(?=.{1,64}@.{1,255}$)(?!.*[ ])[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.?)+\w{2,14}$/
	return emailRegex.test(email)
}
