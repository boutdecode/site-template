class HttpError extends Error {
  constructor (message, code) {
    super(message)
    this.code = code
  }
}

const collection = 'settings'
module.exports = {
  edit: (store) => async ({ key, value }) => {
    const item = await store.findOne(collection, { key })
    if (!item) {
      return store.insert(collection, { key, value })
    }

    return store.update(collection, { key }, { $set: { value } })
  },

  get: (store) => async (id) => {
    const item = await store.findOne(collection, { _id: id })
    if (!item) {
      throw new HttpError('Setting not found.', 404)
    }

    return item
  },

  browse: (store) => async ({ search }, page = 1, limit = 100) => {
    let query = {}
    if (search) {
      query = {
        $or: [
          { key: { $regex: new RegExp(search, 'i') } },
          { value: { $regex: new RegExp(search, 'i') } }
        ]
      }
    }

    return store.paginated(collection, query, page, limit)
  }
}
