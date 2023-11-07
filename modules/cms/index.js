const { browse, get, create, edit, remove, findBySlug } = require('./operation/page')

module.exports = app => {
  const { api } = app

  api.on('api:pages:browse', async (req, res) => {
    try {
      res.send(await browse())
    } catch (error) {
      res.send({ message: error.message }, error.code || 500)
    }
  })

  api.on('api:pages:read', async (req, res) => {
    try {
      res.send(await get(req.params.id))
    } catch (error) {
      res.send({ message: error.message }, error.code || 500)
    }
  })

  api.on('api:pages:create', async (req, res) => {
    try {
      res.send(await create(req.body))
    } catch (error) {
      res.send({ message: error.message }, error.code || 500)
    }
  })

  api.on('api:pages:edit', async (req, res) => {
    try {
      res.send(await edit(req.params.id, req.body))
    } catch (error) {
      res.send({ message: error.message }, error.code || 500)
    }
  })

  api.on('api:pages:delete', async (req, res) => {
    try {
      res.send(await remove(req.params.id))
    } catch (error) {
      res.send({ message: error.message }, error.code || 500)
    }
  })

  app.get('/:locale/page/:slug', async (req, res) => {
    const page = await findBySlug(req.params.slug)
    if (!page) {
      return res.redirect(req.path('error:not_found'))
    }

    res.render('cms/page', { page })
  }, 'cms:page:read')
}
