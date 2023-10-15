import { middyfy } from '@libs/lambda';
import * as mysql from 'mysql2';
import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const getProducts = (event, context) => {
  pool.query('SELECT * FROM product', (error, results) => {
    if (error) {  
        return formatJSONResponse(500, { error });
    }
    console.log(results);
    return formatJSONResponse(200, { results });
  });
};

// const getProducts = async (
//     event: APIGatewayProxyEvent,
//     context: any
//   ): Promise<APIGatewayProxyResult> => {
//     return new Promise<APIGatewayProxyResult>((resolve, reject) => {
//       pool.query('SELECT * FROM product', (error, results) => {
//         if (error) {
//           const response: APIGatewayProxyResult = {
//             statusCode: 500, // Internal Server Error
//             body: JSON.stringify({ message: 'Database error' }),
//             // headers: {
//             //   'Content-Type': 'application/json',
//             // },
//           };
//           reject(response);
//         } else {
//           const response: APIGatewayProxyResult = {
//             statusCode: 200, // OK
//             body: JSON.stringify(results),
//             // headers: {
//             //   'Content-Type': 'application/json',
//             // },
//           };
//           resolve(response);
//         }
//       });
//     });
//   };

export const main = getProducts