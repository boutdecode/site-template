const { slugify } = require('../services/utils')

class HttpError extends Error {
  constructor (message, code) {
    super(message)
    this.code = code
  }
}

module.exports = {
  async create (store, { slug, title, description, content, factory, published }) {
    const slugResult = slugify(slug)
    const alreadyPage = await store.findOne('pages', { slug: slugResult })
    if (alreadyPage) {
      throw new HttpError(`Page with slug ${slugResult} already exists.`, 422)
    }

    return store.insert('pages', { slug: slugResult, title, description, content, factory, published })
  },

  async edit (store, id, { slug, title, description, content, published }) {
    const slugResult = slugify(slug)
    const alreadyPage = await store.findOne('pages', { slug: slugResult })
    if (alreadyPage && alreadyPage._id !== id) {
      throw new HttpError(`Page with slug ${slugResult} already exists.`, 422)
    }

    return store.update('pages', { _id: id }, { $set: { slug: slugResult, title, description, content, published } })
  },

  async remove (store, id) {
    return store.remove('pages', { _id: id })
  },

  async get (store, id) {
    const page = await store.findOne('pages', { _id: id })
    if (!page) {
      throw new Error('Page not found.')
    }

    return page
  },

  async findBySlug (store, slug) {
    return store.findOne('pages', { slug })
  },

  async browse (store, { search, locale = 'en' }, page = 1, limit = 100) {
    let query = {}
    if (search) {
      query = {
        $or: [
          {[`title.${locale}`]: {$regex: new RegExp(search, 'i')}},
          {[`description.${locale}`]: {$regex: new RegExp(search, 'i')}},
          {slug: {$regex: new RegExp(search, 'i')}}
        ]
      }
    }

    return store.paginated('pages', query, page, limit)
  }
}
