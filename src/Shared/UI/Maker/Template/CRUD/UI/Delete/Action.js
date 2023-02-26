const AdminAction = require("../../../../Shared/UI/AdminAction");

module.exports = class DeleteACMEAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        try {
            await this.gateway.run({ id: req.params.id });
            this.session.flash('messages.success.acme_deleted', 'success');
        } catch (e) {
            this.session.flash('messages.danger.acme_not_found', 'danger');
        }

        res.redirect(req.path('admin_acme_browse'), 303);
    }
}
