const config = require('./config.json');

const Container = require('../src/Shared/Infrastructure/DI/Container');
const Requester = require('../src/Shared/Infrastructure/Persistence/Requester');
const Session = require('../src/Shared/Infrastructure/HTTP/Session');
const Router = require('../src/Shared/Infrastructure/HTTP/Router');
const I18N = require('../src/Shared/Infrastructure/Translation/I18N');

module.exports = () => {
    const container = new Container(config);

    container.set('db', (container, { db }) => new Requester(container.resolvePaths(db)));
    container.set('session', () => new Session());
    container.set('router', (container) => new Router(container));
    container.set('i18n', (container, { translation }) => new I18N(container.resolvePath(translation.resources)));
    container.set('manifest', (container, { assets }) => {
        const result = {};
        const assetFiles = container.resolvePaths(assets);
        for (const asset in assetFiles) {
            const { entrypoints } = require(assetFiles[asset]);
            result[asset] = entrypoints;
        }

        return result;
    });

    require('./services/admin/user')(container);
    require('./services/admin/page')(container);
    require('./services/admin/settings')(container);
    require('./services/admin/admin')(container);

    require('./services/front/front')(container);

    return container;
};
