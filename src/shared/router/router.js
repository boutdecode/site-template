module.exports = {
  _app: null,

  /**
   * Generate path for route by name
   * @param {string} name
   * @param {object} [params={}]
   * @param {object} [queries={}]
   * @returns {null|string}
   */
  generatePath(name, params = {}, queries = {}) {
    if (!this._app) {
      return null
    }

    const { route } = this._app.findRoute(name);
    if (route) {
      let path = route

      for (const key in params) {
        path = path.replace(`:${key}`, params[key])
      }

      let first = true;
      for (const key in queries) {
        if (first) {
          path += `?${key}=${queries[key]}`
        } else {
          path += `&${key}=${queries[key]}`
        }

        first = false
      }

      return path
    }

    return null
  },

  /**
   * @param {Application} app
   */
  handleApp(app) {
    this._app = app
  }
}
