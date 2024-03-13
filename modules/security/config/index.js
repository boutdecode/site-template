const { verifyToken } = require('../services/crypto')

module.exports = ({ api }) => {
  api.addSecurity(
    'jwt',
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    },
    (context) => {
      const { session, security } = context
      try {
        session.user = verifyToken(security.token)

        return true
      } catch (error) {
        throw new Error('Invalid token')
      }
    })

  api.addSchemas('SignIn', {
    required: ['name', 'password'],
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' }
    }
  })

  api.addSchemas('SignUp', {
    required: ['name', 'password', 'mail'],
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string' }
    }
  })

  api.addSchemas('Token', {
    type: 'object',
    properties: {
      token: { type: 'string' }
    }
  })
}
