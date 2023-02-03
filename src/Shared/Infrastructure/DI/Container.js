const boxstore = require('boxstore');
const { resolve } = require('path');

module.exports = class Container {
    constructor(config) {
        boxstore.set({ config }, { immutable: true });
    }

    /**
     * Set service into container
     * @param {string|function} name
     * @param {function} callback
     */
    set(name, callback) {
        if (typeof name === 'function') {
            name = name.name;
        }

        boxstore.add(name, callback(this, boxstore.search('config')));
    }

    /**
     * Get service by name
     * @param {string|function} name
     * @returns {*|null}
     */
    get(name, def = null) {
        if (typeof name === 'function') {
            name = name.name;
        }

        return boxstore.get(name, def);
    }

    /**
     * Search service or config by name
     * @param {string} name
     * @param {*} def - Default value
     * @returns {*}
     */
    search(name, def = null) {
        return boxstore.search(name, def);
    }

    /**
     * Resolve path
     * @param {string} path
     * @returns {string}
     */
    resolvePath(path) {
        return resolve(`${__dirname}/../../../..`, path);
    }

    /**
     * Resolve list of path
     * @param {array|object} paths
     * @returns {{}|*}
     */
    resolvePaths(paths) {
        if (Array.isArray(paths)) {
            return paths.map((path) => this.resolvePath(path));
        }

        const result = {};
        for (const key in paths) {
            result[key] = this.resolvePath(paths[key]);
        }

        return result;
    }
}
