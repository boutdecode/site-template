const config = require('./config');

const Container = require('../src/Shared/Infrastructure/DI/Container');
const Requester = require('../src/Shared/Infrastructure/Persistence/Requester');
const Session = require('../src/Shared/Infrastructure/HTTP/Session');
const Router = require('../src/Shared/Infrastructure/HTTP/Router');
const I18N = require('../src/Shared/Infrastructure/Translation/I18N');
const Umami = require("../src/Admin/Dashboard/Infrastructure/Analytics/Umami");

module.exports = () => {
    const container = new Container(config);

    container.set('db', (container, { db }) => new Requester(container.resolvePaths(db)));
    container.set('session', () => new Session());
    container.set('router', (container) => new Router(container));
    container.set('i18n', (container, { translation }) => new I18N(
        translation.defaultLocale,
        container.resolvePath(translation.resources)
    ));
    container.set('manifest', (container, { assets }) => {
        const result = {};
        const assetFiles = container.resolvePaths(assets);
        for (const asset in assetFiles) {
            const { entrypoints } = require(assetFiles[asset]);
            result[asset] = entrypoints;
        }

        return result;
    });
    container.set('analytics', (container, { umami }) => {
        return new Umami(umami.url, umami.websiteId);
    });

    require('./services/core/image')(container);
    require('./services/admin/user')(container);
    require('./services/admin/page')(container);
    require('./services/admin/settings')(container);
    require('./services/admin/admin')(container);

    require('./services/front/page')(container);
    require('./services/front/front')(container);

    return container;
};
