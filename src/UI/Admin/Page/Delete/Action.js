const AdminAction = require("../../../../Shared/UI/AdminAction");

module.exports = class DeletePageAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        try {
            await this.gateway.run({ id: req.params.id });
            this.session.flash('messages.success.page_deleted', 'success');
        } catch (e) {
            this.session.flash('messages.danger.page_not_found', 'danger');
        }

        res.redirect(req.path('admin_page_browse'), 303);
    }
}
