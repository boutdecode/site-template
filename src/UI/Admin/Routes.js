const LoginAction = require("./Login/Action");
const LogoutAction = require("./Logout/Action");
const UploadImageAction = require("./Image/Upload/Action");
const DashboardAction = require("./Dashboard/Action");

module.exports = (app) => {
    const router = app.container.get('router');

    router.get('admin_redirect', '/admin', (req, res) => res.redirect(req.path('admin_login')));

    router.get('admin_dashboard', '/admin/:locale/dashboard', DashboardAction);

    router.get('admin_login', '/admin/:locale/sign-in', LoginAction);
    router.post('admin_sign_in', '/admin/:locale/sign-in', LoginAction);
    router.get('admin_logout', '/admin/logout', LogoutAction);

    router.post('admin_image', '/admin/image', UploadImageAction);

    require('./Page/Routes')(router);
    require('./User/Routes')(router);
    require('./Settings/Routes')(router);
    require('./About/Routes')(router);
};
