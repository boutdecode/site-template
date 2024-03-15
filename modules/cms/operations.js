const { slugify } = require('./services/utils')

class HttpError extends Error {
  constructor (message, code) {
    super(message)
    this.code = code
  }
}

const collection = 'pages'
module.exports = {
  create: (store) => async ({ slug, title, description, content, factory, enabled }) => {
    const slugResult = slugify(slug)
    const alreadyPage = await store.findOne(collection, { slug: slugResult })
    if (alreadyPage) {
      throw new HttpError(`Page with slug ${slugResult} already exists.`, 422)
    }

    return store.insert(collection, { slug: slugResult, title, description, content, factory, enabled })
  },

  edit: (store) => async (id, { slug, title, description, content, enabled }) => {
    const slugResult = slugify(slug)
    const alreadyPage = await store.findOne(collection, { slug: slugResult })
    if (alreadyPage && alreadyPage._id !== id) {
      throw new HttpError(`Page with slug ${slugResult} already exists.`, 422)
    }

    return store.update(collection, { _id: id }, { $set: { slug: slugResult, title, description, content, enabled } })
  },

  remove: (store) => async (id) => {
    const page = await store.findOne(collection, { _id: id })
    if (!page) {
      throw new HttpError('Page not found.', 404)
    }

    if (page.factory) {
      throw new HttpError('Cannot delete factory page.', 422)
    }

    return store.remove(collection, { _id: page._id })
  },

  get: (store) => async (id) => {
    const page = await store.findOne(collection, { _id: id })
    if (!page) {
      throw new HttpError('Page not found.', 404)
    }

    return page
  },

  findBySlug: (store) => async (slug, data = { enabled: true }) => {
    return store.findOne(collection, { slug, ...data })
  },

  browse: (store) => async ({ search, locale = 'en' }, page = 1, limit = 100) => {
    let query = {}
    if (search) {
      query = {
        $or: [
          { [`title.${locale}`]: { $regex: new RegExp(search, 'i') } },
          { [`description.${locale}`]: { $regex: new RegExp(search, 'i') } },
          { slug: { $regex: new RegExp(search, 'i') } }
        ]
      }
    }

    return store.paginated(collection, query, page, limit)
  }
}
