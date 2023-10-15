import { handlerPath } from '@libs/handler-resolver'

export const createStore = {
  handler: `${handlerPath(__dirname)}/handler.createStore`,
  events: [
    {
      http: {
        method: 'POST',
        path: '/store/createStore',
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

export const getStores = {
  handler: `${handlerPath(__dirname)}/handler.getStores`,
  events: [
    {
      http: {
        method: 'GET',
        path: '/store/getStores',
        cors: {
          origin: '*',
          allowCredentials: true,
        },
      },
    },
  ],
}
