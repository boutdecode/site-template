const path = require('node:path')
const fs = require('node:fs')

module.exports = ({ modules = [], folder = 'modules', config = {}, app = {}, api = {} } = {}) => {
  const modulesFolder = path.resolve(process.cwd(), folder)
  modules.forEach((module) => {
    const modulePath = path.resolve(modulesFolder, module)

    if (fs.existsSync(`${modulePath}/config/index.js`)) {
      // eslint-disable-next-line no-console
      console.log(`⚙️ Configuring "${module}" module...`)
      try {
        require(`${modulePath}/config/index.js`)({ app, api, config })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('⛔️ Module loader throw error : ', error)
      }
    }

    if (fs.existsSync(`${modulePath}/index.js`)) {
      // eslint-disable-next-line no-console
      console.log(`📦 Loading "${module}" module...`)
      try {
        require(`${modulePath}/index.js`)({ app, api, config })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('⛔️ Module loader throw error : ', error)
      }
    }
  })

  return (container, next) => {
    next()
  }
}
