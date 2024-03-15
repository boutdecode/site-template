const path = require('node:path')
const { get, create, edit, remove, browse } = require('./operations')

module.exports = ({ api, app }) => {
  api.get(
    '/api/admins',
    {
      tags: ['Admin'],
      security: [{ jwt: [] }],
      parameters: [
        {
          in: 'query',
          name: 'search',
          schema: { type: 'string' }
        },
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer' }
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer' }
        }
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AdminList' }
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
    }
  )

  api.get(
    '/api/admins/{id}',
    {
      tags: ['Admin'],
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
    '/api/admins',
    {
      tags: ['Admin'],
      security: [{ jwt: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateAdmin' }
          }
        }
      }
    },
    async ({ req, res, store }) => {
      try {
        res.send(await create(store)(req.body))
      } catch (error) {
        res.send({ message: error.message }, error.code || 500)
      }
    })

  api.patch(
    '/api/admins/{id}',
    {
      tags: ['Admin'],
      security: [{ jwt: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          schema: { type: 'string' },
          required: true
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EditAdmin' }
          }
        }
      }
    },
    async ({ req, res, store }) => {
      try {
        res.send(await edit(store)(req.params.id, req.body))
      } catch (error) {
        res.send({ message: error.message }, error.code || 500)
      }
    })

  api.delete(
    '/api/admins/{id}',
    {
      tags: ['Admin'],
      security: [{ jwt: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          schema: { type: 'string' },
          required: true
        }
      ]
    },
    async ({ req, res, store }) => {
      try {
        res.send(await remove(store)(req.params.id))
      } catch (error) {
        res.send({ message: error.message }, error.code || 500)
      }
    })

  app.get('/admin', ({ view }) => {
    view.render('admin/dashboard')
  })

  app.get('/admin/changelog', ({ res }) => {
    res.sendFile(path.resolve(process.cwd(), 'CHANGELOG.md'), 'CHANGELOG.md', 'text/markdown', false)
  })
}
