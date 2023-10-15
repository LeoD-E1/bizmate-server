import { handlerPath } from '@libs/handler-resolver'

export const createCustomer = {
	handler: `${handlerPath(__dirname)}/create/create-customer.createCustomer`,
	events: [
		{
			http: {
				method: 'POST',
				path: '/customer/createCustomer',
				cors: {
					origin: '*',
					allowCredentials: true,
				},
				// request: {
				//   schemas: {
				//     'application/json': schema,
				//   },
				// },
			},
		},
	],
}

export const deleteCustomerByID = {
	handler: `${handlerPath(__dirname)}/handler.deleteCustomerByID`,
	events: [
		{
			http: {
				method: 'DELETE',
				path: '/customer/deleteCustomer/{id}',
				cors: {
					origin: '*',
					allowCredentials: true,
				},
			},
		},
	],
}

export const getCustomerByEmail = {
	handler: `${handlerPath(__dirname)}/handler.getCustomerByEmail`,
	events: [
		{
			http: {
				method: 'GET',
				path: '/customer/getCustomerByEmail/{email}',
				cors: {
					origin: '*',
					allowCredentials: true,
				},
			},
		},
	],
}

export const getAllCustomers = {
	handler: `${handlerPath(__dirname)}/handler.getAllCustomers`,
	events: [
		{
			http: {
				method: 'GET',
				path: '/customer/getAllCustomers',
				cors: {
					origin: '*',
					allowCredentials: true,
				},
			},
		},
	],
}

// export const getCustomerByTenantID = {
//   handler: `${handlerPath(__dirname)}/handler.getCustomerByTenantID`,
//   events: [
//     {
//       http: {
//         method: 'GET',
//         path: '/customer/getCustomerByTenantID/{tenant_id}',
//         cors: {
//           origin: '*',
//           allowCredentials: true,
//         },
//       },
//     },
//   ],
// }
