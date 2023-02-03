const Action = require("../../UI/Action");

module.exports = class Router {
    constructor(container) {
        this.container = container;

        this._get = {};
        this._post = {};
    }

    /**
     * Add get route
     * @param {string} name
     * @param {string} path
     * @param {function|string} handler
     */
    get(name, path, handler) {
        this._get[name] = { path, handler: this.container.get(handler, handler) };
    }

    /**
     * Add post route
     * @param {string} name
     * @param {string} path
     * @param {function|string} handler
     */
    post(name, path, handler) {
        this._post[name] = { path, handler: this.container.get(handler, handler) };
    }

    /**
     * Generate path for route by name
     * @param {string} name
     * @param {object} [params={}]
     * @param {object} [queries={}]
     * @param {string} [method='get']
     * @returns {null|string}
     */
    generatePath(name, params = {}, queries = {}, method = 'get') {
        if (!this[method]) {
            return null;
        }

        const route = this[`_${method}`][name];
        if (route) {
            let { path } = route;

            for (const key in params) {
                path = path.replace(`:${key}`, params[key]);
            }

            let first = true;
            for (const key in queries) {
                if (first) {
                    path += `?${key}=${queries[key]}`;
                } else {
                    path += `&${key}=${queries[key]}`;
                }

                first = false;
            }

            return path;
        }

        return null;
    }

    /**
     * Handle route for application
     * @param {object} app
     */
    handleApp(app) {
        for (const name in this._get) {
            const { path, handler } = this._get[name];
            app.get(path, function(req, res, next) {
                if (handler instanceof Action) {
                    handler.run(req, res, next);
                } else {
                    handler(req, res, next);
                }
            });
        }

        for (const name in this._post) {
            const { path, handler } = this._post[name];
            app.post(path, function(req, res, next) {
                if (handler instanceof Action) {
                    handler.run(req, res, next);
                } else {
                    handler(req, res, next);
                }
            });
        }
    }
}
