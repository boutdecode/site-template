const boxtore = require('boxstore');

module.exports = {
    type: 'i18n',
    handle: (req, res, app, next) => {
        req.path = (name, params = {}, method = 'get') => {
            return boxtore
                .get('router')
                .generatePath(name, { locale: req.attributes.locale, ...params }, method);
        };

        next();
    }
};
