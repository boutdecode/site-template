const { signIn, signUp } = require('./operations')

module.exports = ({ api }) => {
  api.post(
    '/api/security/sign-in',
    {
      tags: ['Security'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SignIn'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Authenticated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Token'
              }
            }
          }
        },

        401: {
          description: 'Unauthorized'
        }
      }
    },
    async ({ req, res, store }) => {
      try {
        res.send(await signIn(store)(req.body))
      } catch (error) {
        res.send({ message: error.message }, error.code)
      }
    })

  api.post(
    '/api/security/sign-up',
    {
      tags: ['Security'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SignUp'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Registered'
        },

        400: {
          description: 'Bad request'
        }
      }
    },
    async ({ req, res, store }) => {
      try {
        await signUp(store)(req.body)

        return res.send(null, 201)
      } catch (error) {
        res.send({ message: error.message }, error.code)
      }
    })
}
