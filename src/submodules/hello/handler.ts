// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

// import schema from './schema';

const hello = async (event) => {
  return formatJSONResponse(200, {
    message: `Hello ${event.body?.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = hello;
