const boxtore = require('boxstore');

module.exports = {
    type: 'i18n',
    handle: (req, res, app, next) => {
        req.path = (name, params = {}, queries = {}, method = 'get') => {
            return boxtore
                .get('router')
                .generatePath(name, { locale: req.attributes.locale, ...params }, queries, method);
        };

        req.absolutePath = (name, params = {}, queries = {}, method = 'get') => {
            const hostname = boxtore.search('hostname') || '';
            const path = boxtore
                .get('router')
                .generatePath(name, { locale: req.attributes.locale, ...params }, queries, method);

            return `${hostname+path}`;
        };

        next();
    }
};
