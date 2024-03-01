const {
  createApp,
  createServer,
  session,
  bodyParser,
  encoding,
  i18n,
  logger
} = require('@boutdecode/yion')
const { createApi } = require('@boutdecode/open-api')
const apiDoc = require('@boutdecode/open-api/plugins/open-api-doc')

const container = require('./plugins/container')
const moduleLoader = require('./plugins/module-loader')
const store = require('./plugins/store')
const pug = require('./plugins/pug')
const assets = require('./plugins/assets')

const config = require('./config/config')

const app = createApp()
const api = createApi({ openapi: config.api })
const server = createServer(app, api)

app.use(container(config))
app.use(logger())
app.use(bodyParser())
app.use(encoding())
app.use(session())
app.use(i18n(config.translation))
app.use(store(config.store))
app.use(assets(config.assets))
app.use(pug(config.view))
app.use(apiDoc(api))
app.use(moduleLoader({ modules: config.modules.modules, config, app, api }))

api.use(({req, res}, next) => {
    res.set('Access-Control-Allow-Origin', process.env.CORS || '*' )
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    if (req.method === 'OPTIONS') {
      return res.send()
    }

    next()
  })

server.listen(process.env.NODE_PORT)
    .on('listening', () => console.log(`🤖 Server starting on port ${process.env.NODE_PORT}.`))
