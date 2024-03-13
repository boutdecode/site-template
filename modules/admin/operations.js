const { hashPassword } = require('../security/services/crypto')

class HttpError extends Error {
  constructor (message, code) {
    super(message)
    this.code = code
  }
}

const collection = 'admins'
module.exports = {
  create: (store) => async ({ username, password, email, enabled }) => {
    const item = await store.findOne(collection, { username })
    if (item) {
      throw new HttpError(`Admin with username ${username} already exists.`, 422)
    }

    return store.insert(collection, { username, password: hashPassword(password), email, enabled })
  },

  edit: (store) => async (id, { password, email, enabled }) => {
    if (password) {
      password = hashPassword(password)
    }

    return store.update(collection, { _id: id }, { $set: { password, email, enabled } })
  },

  remove: (store) => async (id) => {
    const item = await store.findOne(collection, { _id: id })
    if (!item) {
      throw new Error('Admin not found.', 404)
    }

    return store.remove('admins', { _id: item._id })
  },

  get: (store) => async (id) => {
    const item = await store.findOne(collection, { _id: id })
    if (!item) {
      throw new Error('Admin not found.', 404)
    }

    return item
  },

  browse: (store) => async ({ search }, page = 1, limit = 100) => {
    let query = {}
    if (search) {
      query = {
        $or: [
          { username: { $regex: new RegExp(search, 'i') } },
          { email: { $regex: new RegExp(search, 'i') } }
        ]
      }
    }

    return store.paginated(collection, query, page, limit)
  }
}
