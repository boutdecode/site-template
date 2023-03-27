const CRUDCommand = require("../../../src/Shared/UI/Maker/Command/CRUD");
const Requester = require("../../../src/Shared/Infrastructure/Persistence/Requester");
const Session = require("../../../src/Shared/Infrastructure/HTTP/Session");
const Router = require("../../../src/Shared/Infrastructure/HTTP/Router");
const I18N = require("../../../src/Shared/Infrastructure/Translation/I18N");
const Umami = require("../../../src/Admin/Dashboard/Infrastructure/Analytics/Umami");

module.exports = (container) => {
    container.set('db', (ct, { db }) => new Requester(ct.resolvePaths(db)));
    container.set('session', () => new Session());
    container.set('router', ct => new Router(ct));
    container.set('i18n', (ct, { translation }) => new I18N(
        translation.defaultLocale,
        container.resolveDirectoryFiles(`${__dirname}/../../translation`)
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
    container.set('analytics', (ct, { umami }) => new Umami(umami.url, umami.websiteId));
    container.set(CRUDCommand, () => new CRUDCommand());
};
