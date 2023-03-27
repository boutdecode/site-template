const DashboardAction = require("../../src/Admin/Dashboard/UI/Action");

module.exports = (router) => {
    router.get('admin_redirect', '/admin', (req, res) => res.redirect(req.path('admin_login')));
    router.get('admin_dashboard', '/admin/:locale/dashboard', DashboardAction);
};
