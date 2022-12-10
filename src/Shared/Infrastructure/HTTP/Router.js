module.exports = {
    _get: {},
    _post: {},

    /**
     * Add get route
     * @param {string} name
     * @param {string} path
     * @param {function} handler
     */
    get(name, path, handler) {
        this._get[name] = { path, handler };
    },

    /**
     * Add post route
     * @param {string} name
     * @param {string} path
     * @param {function} handler
     */
    post(name, path, handler) {
        this._post[name] = { path, handler };
    },

    /**
     * Generate path for route by name
     * @param {string} name
     * @param {object} [params={}]
     * @param {string} [method='get']
     * @returns {null|string}
     */
    generatePath(name, params = {}, method = 'get') {
        if (!this[method]) {
            return null;
        }

        const route = this[`_${method}`][name];
        if (route) {
            let { path } = route;

            for (const key in params) {
                path = path.replace(`:${key}`, params[key]);
            }

            return path;
        }

        return null;
    },

    /**
     * Handle route for application
     * @param {object} app
     */
    handleApp(app) {
        for (const name in this._get) {
            const { path, handler } = this._get[name];
            app.get(path, handler);
        }

        for (const name in this._post) {
            const { path, handler } = this._post[name];
            app.post(path, handler);
        }
    },
};
