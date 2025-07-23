import swaggerdocs from 'swagger-jsdoc';

import {Options} from 'swagger-jsdoc';

const swaggerconfig: Options = {
  swaggerDefinition: {
    info: {
      title: 'demoback',
      version: '1.1',
      description: 'Demo backend',
    },
    basePath: 'api',
  },
  apis: ['../routes/**/*.ts'],
};

const docs = swaggerdocs(swaggerconfig);

export {docs as swaggerDocs};