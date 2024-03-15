module.exports = ({ api }) => {
  api.addSchemas('EditSettings', {
    type: 'object',
    properties: {
      settings: {
        type: 'array',
        items: { $ref: '#/components/schemas/Setting' }
      }
    }
  })

  api.addSchemas('Setting', {
    type: 'object',
    required: ['key', 'value'],
    properties: {
      _id: { type: 'string' },
      key: { type: 'string' },
      value: { type: 'string' },
    }
  })

  api.addSchemas('SettingList', {
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
        items: { $ref: '#/components/schemas/Setting' }
      }
    }
  })
}
