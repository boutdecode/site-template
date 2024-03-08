const pug = require('pug')
const path = require('node:path')

module.exports = ({ folder = 'templates', globals = {} } = {}) => {
  const templateFolder = path.resolve(process.cwd(), folder)

  return (context, next) => {
    const { req, res, container, i18n, assets } = context
    const templateFunctions = {
      get canonical () {
        return res.routeMatched.generatePath({ locale: this.locale, ...req.params }, req.query)
      },

      get locale () {
        return req.attributes.locale || container.get('translation.locale', 'en')
      },

      get locales () {
        return container.get('translation.locales', [])
      },

      get route () {
        return res.routeMatched
      },

      get url () {
        return `${container.get('application.hostname')}${req.uri}`
      },

      get queries () {
        return req.query
      },

      t(name, options = {}) {
        return i18n.t(name, { lng: templateFunctions.locale, ...options })
      },

      setting(name, defaultValue) {
        return i18n.t(container.get(`application.${name}`, defaultValue), { lng: templateFunctions.locale })
      },

      asset (name) {
        return assets.get(name)
      }
    }

    context.set('view', {
      render (name, data) {
        res
          .set('content-type', 'text/html')
          .set('content-encoding', 'gzip')
          .send(pug.renderFile(`${templateFolder}/${name}.pug`, {
            ...templateFunctions,
            ...globals,
            ...data
          }))
      }
    })
    next()
  }
}
