const config = require('../../../../src/shared/configuration/configurator')
const apiConfigurator= require('../.././../../src/shared/api/config-generator')

const locales = config.get('translation.locales', [])
const translatableContent = {
  type: 'object',
  properties: locales.reduce((acc, locale) => {
    acc[locale] = { type: 'string' }

    return acc
  }, {})
}

apiConfigurator.addSchema('CreatePage', {
  type: 'object',
  required: ['slug', 'title', 'description', 'content'],
  properties: {
    slug: { type: 'string' },
    title: translatableContent,
    description: translatableContent,
    content: translatableContent,
    activated: { type: 'boolean', default: false },
    isFactory: { type: 'boolean', default: false }
  }
})

apiConfigurator.addSchema('EditPage', {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    title: translatableContent,
    description: translatableContent,
    content: translatableContent,
    activated: { type: 'boolean', default: false }
  }
})

apiConfigurator.addSchema('Page', {
  type: 'object',
  required: ['_id', 'slug', 'title', 'description', 'content'],
  properties: {
    _id: { type: 'string' },
    slug: { type: 'string' },
    title: translatableContent,
    description: translatableContent,
    content: translatableContent,
    activated: { type: 'boolean', default: false },
    isFactory: { type: 'boolean', default: false }
  }
})
