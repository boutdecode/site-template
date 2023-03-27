const AdminAction = require("../../../../Shared/UI/AdminAction");

module.exports = class LogoutAction extends AdminAction {
    process(req, res) {
        this.session.destroySession(req, res);

        res.redirect(req.path('admin_login'), 302);
    }
}
