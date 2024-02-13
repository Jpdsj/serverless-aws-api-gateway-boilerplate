import type { AWS } from '@serverless/typescript';

import * as functions from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'aws-api-gateway-boilerplate',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-esbuild','serverless-dotenv-plugin','serverless-offline', 'serverless-iam-roles-per-function'],
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
    },
  },
  // import the function via paths
  functions: functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    stages: ['production', 'staging', 'dev'],
    
    // Here you should register a domain with Route53 and after you put the information below on domains object

    // domains: {
    //   production: 'your-production-domain.com',
    //   staging: 'your-staging-domain.com',
    // },
    // customDomain: {
    //   domainName: '${self:custom.domains.${opt:stage}}',
    //   basePath: '',
    //   createRoute53Record: true,
    //   endpointType: 'regional',
    // },
  },
};

module.exports = serverlessConfiguration;
