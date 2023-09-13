require('dotenv').config()

const path = require('node:path')
const configurator = require('./../src/shared/configuration/configurator')

configurator.set({
  application: {
    hostname: process.env.HOST || 'http://localhost',
    metaTitle: 'Site example',
    metaDescription: 'Site example description',
    metaAuthor: 'Kevin Balicot'
  },
  cache: {
    'Cache-Control': 'public, max-age=' + (86400 * 30),
    'Content-Encoding': 'gzip',
    ETag: Date.now(),
    Vary: 'Accept-Encoding'
  },
  api: {
    version: '1.0.0',
    title: 'Site example API',
    description: 'Site example API description',
    tags: [
      { name: 'Security', description: 'Managing security' }
    ]
  },
  data: {
    dataFolder: path.resolve(process.cwd(), 'data'),
    stores: ['users']
  },
  pug: {
    templateDirectory: path.resolve(process.cwd(), 'templates'),
    globals: {}
  },
  translation: {
    fallback: process.env.LOCALE,
    locales: ['en']
  }
})

module.exports = configurator
