const { hashPassword, createToken } = require('../services/crypto')

class HttpError extends Error {
  constructor (message, code) {
    super(message)
    this.code = code
  }
}

module.exports = {
  async signIn (store, { username, password }) {
    const user = await store.findOne('users', { username, password: hashPassword(password) })
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    return { token: createToken(user.username) }
  },

  async signUp (store, { username, email, password }) {
    const alreadyUser = await store.findOne('users', { username })
    if (alreadyUser) {
      throw new HttpError(`User ${username} already exists`, 400)
    }

    return store.insert('users', { username, email, password: hashPassword(password) })
  }
}
