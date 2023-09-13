const config = require('../../configuration/configurator')
const router = require('../../router/router')

let init = false
module.exports = {
  type: 'router',
  handle: (req, res, app, next) => {
    if (!init) {
      router.handleApp(app)
      init = true
    }

    req.path = (name, params = {}, queries = {}) => {
      return router.generatePath(name, { locale: req.attributes.locale, ...params }, queries);
    };

    req.absolutePath = (name, params = {}, queries = {}) => {
      const hostname = config.get('application.hostname' || '');
      const path = router.generatePath(name, { locale: req.attributes.locale, ...params }, queries);

      return `${hostname}${path}`;
    };

    next();
  }
};
