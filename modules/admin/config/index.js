module.exports = ({ api }) => {
  api.addSchemas('CreateAdmin', {
    type: 'object',
    required: ['username', 'password', 'email'],
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string' },
      enabled: { type: 'boolean', default: true }
    }
  })

  api.addSchemas('EditAdmin', {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string' },
      enabled: { type: 'boolean', default: false }
    }
  })

  api.addSchemas('Admin', {
    type: 'object',
    required: ['_id', 'slug', 'title', 'description', 'content'],
    properties: {
      _id: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string' },
      enabled: { type: 'boolean', default: false }
    }
  })

  api.addSchemas('AdminList', {
    type: 'object',
    properties: {
      pagination: {
        type: 'object',
        properties: {
          page: { type: 'number' },
          limit: { type: 'number' },
          total: { type: 'number' }
        }
      },
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/Admin' }
      }
    }
  })
}
