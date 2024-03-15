const { browse, get, edit } = require('./operations')

module.exports = ({ app, api }) => {
  api.get(
    '/api/settings',
    {
      tags: ['Settings'],
      security: [{ jwt: [] }],
      parameters: [
        {
          name: 'page',
          in: 'query',
          schema: { type: 'number', default: 1 }
        },
        {
          name: 'limit',
          in: 'query',
          schema: { type: 'number', default: 10 }
        },
        {
          name: 'search',
          in: 'query',
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SettingList' }
            }
          }
        }
      }
    },
    async ({ req, res, store }) => {
      const { search, page, limit } = req.query
      try {
        res.send(await browse(store)({ search }, page, limit))
      } catch (error) {
        res.send({ message: error.message }, error.code || 500)
      }
    })

  api.get(
    '/api/settings/{id}',
    {
      tags: ['Settings'],
      security: [{ jwt: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          schema: { type: 'string' },
          required: true
        }
      ],
      responses: {
        200: { description: 'OK' },
        404: { description: 'Not found' }
      }
    },
    async ({ req, res, store }) => {
      try {
        res.send(await get(store)(req.params.id))
      } catch (error) {
        res.send({ message: error.message }, error.code || 500)
      }
    })

  api.post(
    '/api/settings',
    {
      tags: ['Settings'],
      security: [{ jwt: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EditSettings' }
          }
        }
      }
    },
    async ({ req, res, store }) => {
      try {
        const promises = req.body.settings.map((setting) => edit(store)(setting))
        res.send(await Promise.all(promises))
      } catch (error) {
        res.send({ message: error.message }, error.code || 500)
      }
    })
}
