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
  cors: {
    origin: process.env.CORS || '*',
    headers: 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
    methods: 'GET, POST, PUT, DELETE, OPTIONS'
  },
  api: {
    info: {
      version: '1.0.0',
      title: 'Site example API',
      description: 'Site example API description',
    },
    tags: [
      { name: 'CMS', description: 'Managing CMS' },
      { name: 'Admin', description: 'Managing admins' },
      { name: 'Settings', description: 'Managing settings' },
      { name: 'Security', description: 'Managing security' },
    ]
  },
  modules: {
    modules: ['security', 'admin', 'settings', 'website', 'cms'],
    folder: 'modules'
  },
  store: {
    provider: require('../providers/nedb'),
    folder: 'data',
    stores: ['admins', 'pages', 'settings']
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
