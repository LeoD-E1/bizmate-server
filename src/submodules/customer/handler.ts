import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { Handler } from 'aws-lambda'
import { getConnection } from '@resources/db'

export const deleteCustomerByID: Handler = middyfy(async event => {
	try {
		const connection = await getConnection()
		await connection.query('DELETE FROM customer WHERE id = ?', [
			event.pathParameters.id,
		])

		return formatJSONResponse(200, { message: 'Customer deleted successfully' })
	} catch (error) {
		console.error('Error deleting customer:', error)
		return formatJSONResponse(500, { message: 'Internal Server Error' })
	}
})

export const getCustomerByEmail: Handler = async event => {
	try {
		const connection = await getConnection()
		const email = event.pathParameters.email
		const [rows] = await connection.query(
			'SELECT * FROM customer WHERE email = ?',
			[email]
		)
		console.log('🚀 ~ file: handler.ts:70 ~ rows:', rows)

		return formatJSONResponse(200, { customer: rows })
	} catch (error) {
		console.error('Error deleting customer:', error)
		return formatJSONResponse(500, { message: 'Internal Server Error' })
	}
}

export const getAllCustomers: Handler = async () => {
	try {
		const connection = await getConnection()
		const [customer] = await connection.query('SELECT * FROM customer')
		console.log('🚀 ~ file: handler.ts:70 ~ rows:', customer)

		return formatJSONResponse(200, { customer })
	} catch (error) {
		console.error('Error retrieving customers:', error)
		return formatJSONResponse(500, { message: 'Internal Server Error' })
	}
}

export const getCustomerByTenantID = async (tenant_id: string) => {
	try {
		const connection = await getConnection()

		const [result] = await connection.query(
			'SELECT * FROM customer WHERE tenant_id = ?',
			[tenant_id]
		)

		return result[0]
	} catch (error) {
		console.error('Error retrieving customer:', error)
		return { message: 'Internal Server Error' }
	}
}
