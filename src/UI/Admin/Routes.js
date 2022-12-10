const Router = require('../../Shared/Infrastructure/HTTP/Router');
const LoginAction = require('./Login/Action');
const DashboardAction = require('./Dashboard/Action');

module.exports = (app) => {
    Router.get('admin_redirect', '/admin', (req, res) => res.redirect(req.path('admin_login')));

    Router.get('admin_login', '/admin/:locale/sign-in', LoginAction);
    Router.post('admin_sign_in', '/admin/:locale/sign-in', LoginAction);

    Router.get('admin_dashboard', '/admin/:locale/dashboard', DashboardAction);
};
