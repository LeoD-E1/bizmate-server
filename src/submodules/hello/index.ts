import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        cors: {
          origin: "*",
          allowCredentials: true,
          headers: [
            "Content-Type",
            "X-Amz-Date",
            "X-Api-Key",
            "X-Amz-Security-Token",
            "X-Amz-User-Agent",
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Origin",
          ]
        },
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
