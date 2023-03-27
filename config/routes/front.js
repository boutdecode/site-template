const NotFoundAction = require("../../src/Front/Error/UI/NotFound/Action");

module.exports = (router) => {
    router.get('home_redirect', '/', (req, res) => res.redirect(req.path('home')));
    router.get('404', '/:locale/404', NotFoundAction);
};
