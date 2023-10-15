import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { getConnection } from '@resources/db'
import { Handler } from 'aws-lambda'
import { getCustomerByTenantID } from '@submodules/customer/handler'
import { uuid } from 'uuidv4'

export const createStore: Handler = middyfy(async event => {
  const { name, tenant_id, ...otherFields } = event.body
  try {
    const connection = await getConnection()
    // Verify if all required field are provided
    if (!tenant_id || !name)
      return formatJSONResponse(400, { message: 'All fields are required' })

    // Verify if customer already created in the DB
    const customer = await getCustomerByTenantID(tenant_id)
    console.log('🚀 ~ file: handler.ts:17 ~ customer:', customer)

    if (!customer)
      return formatJSONResponse(403, { massage: 'User does not exist' })

    const store_id = uuid()
    // Store creation
    const [rows] = await connection.query(
      `INSERT INTO store (id, name, tenant_id) VALUES (?, ?, ?)`,
      [store_id, name, tenant_id]
    )
    console.log('🚀 ~ file: handler.ts:24 ~ rows:', rows)

    await connection.query(
      'INSERT INTO customer_roles (tenant_id, customer_id, store_id, role) VALUES (?, ?, ?, ?)',
      [tenant_id, customer.id, store_id, 'owner']
    )

    return formatJSONResponse(200, { message: 'Store created successfully' })
  } catch (error) {
    console.log('ERROR creating store', error)
    return formatJSONResponse(500, { message: 'Internal Server Error' })
  }
})

export const getStores: Handler = async () => {
  try {
    const connection = await getConnection()
    const [rows] = await connection.query('SELECT * FROM store')
    return formatJSONResponse(200, { rows })
  } catch (error) {
    console.log('ERROR getting stores', error)
    return formatJSONResponse(500, { message: 'Internal Server Error' })
  }
}
