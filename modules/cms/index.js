const { browse, get, create, edit, remove, findBySlug } = require('./operation/page')
const {Regex} = require("lucide-vue-next");

module.exports = ({ app, api }) => {
  api.get(
    '/api/pages',
    {
      tags: ['CMS'],
      parameters: [
        {
          name: 'page',
          in: 'query',
          schema: {type: 'number', default: 1}
        },
        {
          name: 'limit',
          in: 'query',
          schema: {type: 'number', default: 10}
        },
        {
          name: 'search',
          in: 'query',
          schema: {type: 'string'}
        },
        {
          name: 'locale',
          in: 'query',
          schema: {type: 'string', default: 'fr'}
        }
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PageList' }
            }
          }
        }
      }
    },
    async ({ req, res, store }) => {
      const { search, locale, page, limit } = req.query

      try {
        res.send(await browse(store, { search, locale }, page, limit))
      } catch (error) {
        res.send({ message: error.message }, error.code || 500)
      }
    })

  api.get(
    '/api/pages/{id}',
    {
      tags: ['CMS'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          schema: {type: 'string'},
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
        res.send(await get(store, req.params.id))
      } catch (error) {
        res.send({ message: error.message }, error.code || 500)
      }
    })

  api.post(
    '/api/pages',
    {
      tags: ['CMS'],
      requestBody: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreatePage' }
          }
        }
      }
    },
    async ({ req, res, store }) => {
      try {
        res.send(await create(store, req.body))
      } catch (error) {
        res.send({ message: error.message }, error.code || 500)
      }
    })

  api.patch(
    '/api/pages/{id}',
    {
      tags: ['CMS'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          schema: {type: 'string'},
          required: true
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/EditPage' }
          }
        }
      }
    },
    async ({ req, res, store }) => {
      try {
        res.send(await edit(store, req.params.id, req.body))
      } catch (error) {
        res.send({ message: error.message }, error.code || 500)
      }
    })

  api.delete(
    '/api/pages/{id}',
    {
      tags: ['CMS'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          schema: {type: 'string'},
          required: true
        }
      ]
    },
    async ({ req, res, store }) => {
      try {
        res.send(await remove(store, req.params.id))
      } catch (error) {
        res.send({ message: error.message }, error.code || 500)
      }
    })

  app.get('/:locale/page/:slug', async ({ req, res, store, view }) => {
    const page = await findBySlug(store, req.params.slug)
    if (!page) {
      return res.redirect('/fr/404')
    }

    view.render('cms/page', { page })
  })
}
