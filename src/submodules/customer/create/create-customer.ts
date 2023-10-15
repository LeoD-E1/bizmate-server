import { isValidEmail } from '@helpers/email-validator/emailValidator'
import { encodePassword } from '@helpers/encode-password/encodePassword'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { getConnection } from '@resources/db'
import { Handler } from 'aws-lambda'
import { uuid } from 'uuidv4'

export const createCustomer: Handler = middyfy(async event => {
	const { email, password, role, ...otherFields } = event.body

	if (!email || !password)
		return formatJSONResponse(400, {
			message: 'email and password must be provided',
		})

	if (!isValidEmail(email))
		return formatJSONResponse(400, { message: 'Invalid email address' })

	try {
		const connection = await getConnection()
		const hashedPass = await encodePassword(password)

		const [rows] = (await connection.query(
			'SELECT * FROM customer WHERE email = ?',
			[email]
		)) as any[][]

		if (rows.length)
			return formatJSONResponse(400, { message: 'User already registered' })

		const id = uuid()
		const tenant_id = uuid()

		const [result] = await connection.query(
			`INSERT INTO customer (id, email, password, tenant_id) VALUES (?, ?, ?, ?)`,
			[id, email, hashedPass, tenant_id]
		)

		console.log(result)
		connection.release()

		return formatJSONResponse(200, { message: 'Customer created successfully' })
	} catch (error) {
		console.error('Error creating customer:', error)
		return formatJSONResponse(500, { message: 'Internal Server Error' })
	}
})
