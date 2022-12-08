const Router = require('../../Shared/Infrastructure/HTTP/Router');
const IndexAction = require('./Index/Action');

module.exports = () => {
    Router.get('home_redirect', '/', (req, res) => {
        res.set('Location', `/${req.attributes.locale}/`);
        res.status(301);
        res.send();
    });

    Router.get('home', '/:locale/', IndexAction);
};
