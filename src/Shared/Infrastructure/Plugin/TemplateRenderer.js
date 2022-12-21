const pug = require('pug');
const Intl = require('intl');
const boxstore = require('boxstore');

const manifest = require('../../../../dist/manifest.json');
const config = require('../../../../config/config.json');

module.exports = {
    type: 'renderer',
    handle: (req, res, app, next) => {
        res.render = (templateName, data = {}, status = 200, headers = { 'Content-Type': 'text/html' }) => {
            for (let name in headers) {
                res.set(name, headers[name]);
            }

            const router = boxstore.get('router');
            const i18n = boxstore.get('i18n');

            const templateFunctions = {
                get canonical() {
                    return res.routeMatched.replace(':locale', req.attributes.localeFallback);
                },

                get locale() {
                    return req.attributes.locale;
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

                manifest: (key) => {
                    const asset = manifest[key];
                    if (asset) {
                        return `/${asset.file}`;
                    }

                    return '';
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
                }
            }

            res
                .status(status)
                .send(pug.renderFile(`${__dirname}/../../../../templates/${templateName}.pug`,  { ...templateFunctions, ...data, ...config.pug.globals }));
        };

        next();
    }
};
