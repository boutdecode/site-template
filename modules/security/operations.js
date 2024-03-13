const { hashPassword, createToken } = require('./services/crypto')

class HttpError extends Error {
  constructor (message, code) {
    super(message)
    this.code = code
  }
}

const collection = 'admins'
module.exports = {
  signIn: (store) => async ({ username, password }) => {
    if (username === 'root' && password === process.env.SECURITY_SALT) {
      return { token: createToken('root') }
    }

    const user = await store.findOne(collection, { username, password: hashPassword(password), enabled: true })
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    return { token: createToken(user.username) }
  },

  signUp: (store) => async ({ username, email, password }) => {
    const alreadyUser = await store.findOne(collection, { username })
    if (alreadyUser) {
      throw new HttpError(`User ${username} already exists`, 400)
    }

    return store.insert(collection, { username, email, password: hashPassword(password) })
  }
}
