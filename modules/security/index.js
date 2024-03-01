const { verifyToken } = require('./services/crypto')
const { signIn, signUp } = require('./operation/security')

module.exports = ({ api }) => {
  api.use(({ req }, next) => {
    const token = req.headers.authorization.split(' ')[1]
    req.attributes.user = verifyToken(token)
    next()
  })

  api.post(
    '/security/sign-in',
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
        res.send(await signIn(store, req.body))
      } catch (error) {
        res.send({ message: error.message }, error.code)
      }
    })

  api.post(
    '/security/sign-up',
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
        await signUp(store, req.body)

        return res.send(null, 201)
      } catch (error) {
        res.send({ message: error.message }, error.code)
      }
    })
}
