const { pbkdf2Sync } = require('node:crypto')
const jwt = require('jsonwebtoken')

module.exports = {
  hashPassword (password) {
    return pbkdf2Sync(password, process.env.SECURITY_SALT, 100000, 64, 'sha512').toString('hex')
  },

  createToken (sub, data = {}) {
    return jwt.sign({ sub, ...data }, process.env.SECURITY_SALT)
  },

  verifyToken (token) {
    const payload = jwt.verify(token, process.env.SECURITY_SALT)
    if (!payload) {
      throw new Error('Invalid token')
    }

    return payload
  }
}
