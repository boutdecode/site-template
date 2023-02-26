const AdminAction = require("../../../../Shared/UI/AdminAction");

module.exports = class ShowACMEAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        try {
            const { data } = await this.gateway.run({ id: req.params.id });

            res.render('front/acme/show', { data });
        } catch (e) {
            this.session.flash('messages.danger.acme_not_found', 'danger');

            res.redirect(req.path('admin_acme_browse'), 303);
        }
    }
}
