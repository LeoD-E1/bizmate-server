import type { AWS } from '@serverless/typescript'
import hello from '@submodules/hello'
import products from '@submodules/products'
import migrateDB from '@submodules/migrate'
import {
  createCustomer,
  getCustomerByEmail,
  deleteCustomerByID,
  getAllCustomers,
} from '@submodules/customer/functions'
import { createStore, getStores } from '@submodules/store/functions'

const serverlessConfiguration: AWS = {
  service: 'biz-mate',
  org: 'leoda',
  app: 'biz-mate',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_HOST: "${file(./config/${opt:stage, 'dev'}.json):DB_HOST}",
      DB_USER: "${file(./config/${opt:stage, 'dev'}.json):DB_USER}",
      DB_PASSWORD: "${file(./config/${opt:stage, 'dev'}.json):DB_PASSWORD}",
      DB_NAME: "${file(./config/${opt:stage, 'dev'}.json):DB_NAME}",
    },
  },
  resources: {
    Resources: {
      GatewayResponseDefault4XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: {
            Ref: 'ApiGatewayRestApi',
          },
        },
      },
    },
  },
  functions: {
    hello,
    products,
    migrateDB,

    // Customer functions
    createCustomer,
    getCustomerByEmail,
    deleteCustomerByID,
    getAllCustomers,

    // Store Functions
    createStore,
    getStores,
  },
  package: { individually: true },
  custom: {
    stage: "${opt:stage, 'dev'}",
    migrateDatabase: {
      beforeDeploy: {
        handler: './src/functions/migrate/migrate-db.ts',
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
}

module.exports = serverlessConfiguration
