const AdminAction = require("../../../../Shared/UI/AdminAction");

module.exports = class DeleteUserAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    process(req, res) {
        try {
            this.gateway.run({ id: req.params.id });
            this.session.flash('messages.success.user_deleted', 'success');
        } catch (e) {
            this.session.flash('messages.success.user_not_found', 'danger');
        }

        res.redirect(req.path('admin_users'), 303);
    }
}
