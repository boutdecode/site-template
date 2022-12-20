const AdminAction = require("../../../Shared/UI/AdminAction");

module.exports = class Logout extends AdminAction {
    process(req, res) {
        this.session.destroySession(req, res);

        res.redirect(req.path('admin_login'), 302);
    }
}
