module.exports = ({ api, config }) => {
  const locales = config.translation.locales || []
  const translatableContent = {
    type: 'object',
    properties: locales.reduce((acc, locale) => {
      acc[locale] = { type: 'string' }

      return acc
    }, {})
  }

  api.addSchemas('CreatePage', {
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

  api.addSchemas('EditPage', {
    type: 'object',
    properties: {
      slug: { type: 'string' },
      title: translatableContent,
      description: translatableContent,
      content: translatableContent,
      activated: { type: 'boolean', default: false }
    }
  })

  api.addSchemas('Page', {
    type: 'object',
    required: ['_id', 'slug', 'title', 'description', 'content'],
    properties: {
      _id: { type: 'string' },
      slug: { type: 'string' },
      title: translatableContent,
      description: translatableContent,
      content: translatableContent,
      activated: { type: 'boolean', default: false },
      isFactory: { type: 'boolean', default: false },
      createdAt: { type: 'string', format: 'datetime' },
      editedAt: { type: 'string', format: 'datetime' }
    }
  })
}
