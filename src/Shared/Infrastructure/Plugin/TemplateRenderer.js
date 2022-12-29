const pug = require('pug');
const Intl = require('intl');
const boxstore = require('boxstore');

const config = require('../../../../config/config.json');

module.exports = {
    type: 'renderer',
    handle: (req, res, app, next) => {
        res.render = async (templateName, data = {}, status = 200, headers = { 'Content-Type': 'text/html' }) => {
            for (let name in headers) {
                res.set(name, headers[name]);
            }

            const router = boxstore.get('router');
            const i18n = boxstore.get('i18n');

            const settingsRepository = boxstore.get('settings_repository');
            const settingsResult = {};
            for (const { code, value } of await settingsRepository.find({}, 1000)) {
                settingsResult[code] = value;
            }

            const templateFunctions = {
                get canonical() {
                    return res.routeMatched.replace(':locale', req.attributes.localeFallback);
                },

                get locale() {
                    return req.attributes.locale;
                },

                get url() {
                    return req.url;
                },

                is(name, params = {}, method = 'get') {
                    return req.uri === router.generatePath(name, { locale: req.attributes.locale, ...params }, method);
                },

                path(name, params = {}, method = 'get') {
                    return router.generatePath(name, { locale: req.attributes.locale, ...params }, method);
                },

                get(name, params = {}) {
                    return router.generatePath(name, { locale: req.attributes.locale, ...params }, 'get');
                },

                post(name, params = {}) {
                    return router.generatePath(name, { locale: req.attributes.locale, ...params }, 'post');
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
