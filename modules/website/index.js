const path = require('node:path')

module.exports = ({ app, config }) => {
  const cache = config.cache || {}

  app.use(({ req, res }, next) => {
    if (req.headers['if-none-match'] && req.headers['if-none-match'] === String(cache.ETag)) {
      return res.status(304).send()
    }

    next()
  })

  app.link('/modules', path.resolve(process.cwd(), 'node_modules'), cache)
  app.link('/assets', path.resolve(process.cwd(), 'public'), cache)
  app.link('/build', path.resolve(process.cwd(), 'public/build'), cache)

  app.get('/', ({ req, res }) => {
    res.redirect(`/${req.get('locale')}/`, 301)
  })

  app.get('/:locale/', ({ view }) => {
    view.render('homepage')
  })

  app.get('/:locale/404', ({ req, res, view }) => {
    view.render('error/404')
  })
}
