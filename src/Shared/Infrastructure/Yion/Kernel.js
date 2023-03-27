const { resolve } = require('path');
const fs = require("fs");

const config = require("../../../../config/config");
const Container = require("../DI/Container");

module.exports = class Kernel {
    constructor(app = {}) {
        this.app = app;
    }

    get rootDirectory() {
        return resolve(`${__dirname}/../../../..`);
    }

    get routesDirectory() {
        return resolve(this.rootDirectory, 'config/routes');
    }

    get servicesDirectory() {
        return resolve(this.rootDirectory, 'config/services');
    }

    get links() {
        return {
            '/modules': `${this.rootDirectory}/node_modules`,
            '/images': `${this.rootDirectory}/public/images`,
            '/assets': `${this.rootDirectory}/dist`,
        }
    }

    requireFiles(directory, ...args) {
        fs.readdirSync(directory).forEach(file => {
            if (!fs.statSync(`${directory}/${file}`).isDirectory()) {
                require(`${directory}/${file}`)(...args);
            }
        });
    }

    initLinks(options = {}) {
        for (const pattern in this.links) {
            this.app.link(pattern, this.links[pattern], options);
        }
    }

    initCache(cache) {
        this.app.use((req, res, next) => {
            if (req.headers['if-none-match'] && req.headers['if-none-match'] == cache['ETag']) {
                return res.status(304).send();
            }

            next();
        });
    }

    initServices() {
        const container = new Container(config);
        this.app.container = container;

        this.requireFiles(this.servicesDirectory + '/_before', container);
        this.requireFiles(this.servicesDirectory, container);
        this.requireFiles(this.servicesDirectory + '/_after', container);

        return container;
    }

    initRoutes() {
        const router = this.app.container.get('router');

        this.requireFiles(this.routesDirectory, router);

        router.handleApp(this.app);

        return router;
    }

    init(options = {}) {
        this.initServices();

        const cache = this.app.container.search('cache');
        if (cache) {
            this.initCache(cache);
        }

        this.initLinks(cache);
        this.initRoutes();
    }
}
