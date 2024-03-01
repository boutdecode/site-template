module.exports = ({ api }) => {
  /* apiConfigGenerator.addSecurity('jwt', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  }) */

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
