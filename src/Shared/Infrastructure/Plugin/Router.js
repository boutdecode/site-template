const Router = require("../HTTP/Router");

module.exports = {
    type: 'i18n',
    handle: (req, res, app, next) => {
        req.path = (name, params = {}, method = 'get') => {
            return Router.generatePath(name, { locale: req.attributes.locale, ...params }, method);
        };

        next();
    }
};
