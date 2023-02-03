const NotFoundAction = require("./Error/NotFound/Action");

module.exports = (app) => {
    const router = app.container.get('router');

    router.get('home_redirect', '/', (req, res) => res.redirect(req.path('home')));
    router.get('404', '/:locale/404', NotFoundAction);

    require('./Page/Routes')(router);
    require('./Image/Routes')(router);
};
