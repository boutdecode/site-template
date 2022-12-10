const pug = require('pug');
const I18N = require('../Service/I18N');
const Router = require('../HTTP/Router');

const manifest = require('../../../../dist/manifest.json');
const config = require('../../../../config/config.json');

module.exports = {
    type: 'renderer',
    handle: (req, res, app, next) => {
        res.render = (templateName, data = {}, status = 200, headers = { 'Content-Type': 'text/html' }) => {
            for (let name in headers) {
                res.set(name, headers[name]);
            }

            const templateFunctions = {
                get canonical() {
                    return res.routeMatched.replace(':locale', req.attributes.localeFallback);
                },

                get locale() {
                    return req.attributes.locale;
                },

                path(name, params = {}, method = 'get') {
                    return Router.generatePath(name, { locale: req.attributes.locale, ...params }, method);
                },

                get(name, params = {}) {
                    return Router.generatePath(name, { locale: req.attributes.locale, ...params }, 'get');
                },

                post(name, params = {}) {
                    return Router.generatePath(name, { locale: req.attributes.locale, ...params }, 'post');
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

                    return I18N.trans(key, { ...options, lng: locale });
                },
            }

            res
                .status(status)
                .send(pug.renderFile(`${__dirname}/../../../../templates/${templateName}.pug`,  { ...templateFunctions, ...data, ...config.pug.globals }));
        };

        next();
    }
};
