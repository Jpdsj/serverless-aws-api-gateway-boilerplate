import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  // Your code here...

  const { name } = event.body

  return formatJSONResponse({
    message: `Hello ${name}, welcome to the exciting Serverless world!`,
  });
};

export const main = middyfy(hello);
