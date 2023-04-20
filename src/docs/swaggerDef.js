const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  // openapi: '2.0.0',
  info: {
    title: 'Tourist area API Docs V1',
    version: '1.0.0',
    description: 'Tourist area API Docs V1',
  },
  host: 'localhost:3000',
  basePath: '/v1',
  produces: ['application/json'],
  consumes: ['application/json'],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ jwt: [] }],
  // servers: [
  //   {
  //     url: `http://localhost:${config.port}/v1`,
  //   },
  // ],
};

module.exports = swaggerDef;
