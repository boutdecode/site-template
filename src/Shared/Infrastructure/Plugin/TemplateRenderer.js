const pug = require('pug');
const Intl = require('intl');
const boxstore = require('boxstore');
const SettingsRepository = require("../../../Admin/Settings/Infrastructure/Repository/Settings");

module.exports = {
    type: 'renderer',
    handle: (req, res, app, next) => {
        res.render = async (templateName, data = {}, status = 200, headers = { 'Content-Type': 'text/html' }) => {
            for (let name in headers) {
                res.set(name, headers[name]);
            }

            const config = boxstore.get('config');
            const router = boxstore.get('router');
            const i18n = boxstore.get('i18n');

            const settingsRepository = boxstore.get(SettingsRepository.name);
            const settingsResult = {};
            for (const { code, value } of await settingsRepository.find({}, 1000)) {
                settingsResult[code] = value;
            }

            const templateFunctions = {
                get canonical() {
                    return config.application.hostname + res.routeMatched.replace(':locale', req.attributes.localeFallback);
                },

                get locale() {
                    return req.attributes.locale;
                },

                get locales() {
                    return config.translation.locales;
                },

                get analytics() {
                    return {
                        url: `${config.umami.url}/umami.js`,
                        websiteId: config.umami.websiteId,
                    }
                },

                get url() {
                    return config.application.hostname + req.uri;
                },

                is(name, params = {}, method = 'get') {
                    return req.uri === router.generatePath(name, { locale: req.attributes.locale, ...params }, method);
                },

                path(name, params = {}, queries = {}, method = 'get') {
                    return router.generatePath(name, { locale: req.attributes.locale, ...params }, queries, method);
                },

                get(name, params = {}, queries = {}) {
                    return router.generatePath(name, { locale: req.attributes.locale, ...params }, queries, 'get');
                },

                post(name, params = {}, queries = {}) {
                    return router.generatePath(name, { locale: req.attributes.locale, ...params }, queries, 'post');
                },

                asset: (entrypoint, manifest, type) => {
                    const manifests = boxstore.get('manifest');
                    if (!manifests[entrypoint] || !manifests[entrypoint][manifest]) {
                        return {};
                    }

                    return manifests[entrypoint][manifest][type];
                },

                trans: (key, options) => {
                    const locale = req.attributes.locale;

                    return i18n.trans(key, { ...options, lng: locale });
                },

                date(date, options = {}) {
                    const df = new Intl.DateTimeFormat(req.attributes.locale, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        ...options
                    });

                    return df.format(date);
                },

                time(date, options = {}) {
                    const df = new Intl.DateTimeFormat(req.attributes.locale, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        ...options
                    });

                    return df.format(date);
                },

                flash() {
                    const session = boxstore.get('session');

                    const messages = {};
                    for (const level in session.flashMessages) {
                        messages[level] = session.flashMessages[level];
                    }
                    session.clearFlash();

                    return messages;
                },

                settings(key, translatable = false) {
                    if (translatable && settingsResult[key]) {
                        return settingsResult[key][req.attributes.locale];
                    }

                    return settingsResult[key] || config.application[key] || null;
                },
            }

            res
                .status(status)
                .send(
                    pug.renderFile(
                        `${__dirname}/../../../../templates/${templateName}.pug`,
                        {
                            ...templateFunctions,
                            ...data,
                            ...config.pug.globals
                        }
                    )
                );
        };

        next();
    }
};
