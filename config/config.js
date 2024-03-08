require('dotenv').config()

const path = require('node:path')

module.exports = {
  application: {
    hostname: process.env.HOST || 'http://localhost',
    metaTitle: 'Site exemple',
    metaDescription: 'Site exemple description',
    metaAuthor: 'Kevin Balicot'
  },
  cache: {
    'Cache-Control': 'public, max-age=' + (86400 * 30),
    'Content-Encoding': 'gzip',
    ETag: Date.now(),
    Vary: 'Accept-Encoding'
  },
  api: {
    info: {
      version: '1.0.0',
      title: 'Site example API',
      description: 'Site example API description',
    },
    tags: [
      { name: 'Security', description: 'Managing security' }
    ]
  },
  modules: {
    modules: ['security', 'admin', 'website', 'cms'],
    folder: 'modules'
  },
  store: {
    provider: require('../providers/nedb'),
    folder: 'data',
    stores: ['users', 'pages']
  },
  view: {
    folder: path.resolve(process.cwd(), 'templates'),
    globals: {}
  },
  translation: {
    locale: process.env.LOCALE,
    folder: 'translations',
    locales: ['fr', 'en']
  },
  assets: {
    folder: 'public'
  }
}
