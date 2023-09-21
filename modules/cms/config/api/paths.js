const apiConfigurator= require('../.././../../src/shared/api/config-generator')

apiConfigurator.addPath('/pages/{id}', {
  operationId: 'api:pages:read',
  method: 'get',
  tags: ['CMS'],
  parameters: [
    {
      name: 'id',
      in: 'path',
      schema: {
        type: 'string'
      },
      required: true
    }
  ],
  responses: {
    200: {
      description: 'OK'
    },

    404: {
      description: 'Not found'
    }
  }
})

apiConfigurator.addPath('/pages', {
  operationId: 'api:pages:browse',
  method: 'get',
  tags: ['CMS'],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Page'
            }
          }
        }
      }
    }
  }
})

apiConfigurator.addPath('/pages', {
  operationId: 'api:pages:create',
  method: 'post',
  tags: ['CMS'],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CreatePage'
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Created'
    },

    400: {
      description: 'Bad request'
    }
  }
})

apiConfigurator.addPath('/pages/{id}', {
  operationId: 'api:pages:edit',
  method: 'patch',
  tags: ['CMS'],
  /*security: [
    { jwt: [] }
  ],*/
  parameters: [
    {
      name: 'id',
      in: 'path',
      schema: {
        type: 'string'
      },
      required: true
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/EditPage'
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Edited'
    },

    404: {
      description: 'Not found'
    }
  }
})


apiConfigurator.addPath('/pages/{id}', {
  operationId: 'api:pages:delete',
  method: 'delete',
  tags: ['CMS'],
  /*security: [
    { jwt: [] }
  ],*/
  parameters: [
    {
      name: 'id',
      in: 'path',
      schema: {
        type: 'string'
      },
      required: true
    }
  ],
  responses: {
    204: {
      description: 'Deleted'
    },

    404: {
      description: 'Not found'
    }
  }
})
