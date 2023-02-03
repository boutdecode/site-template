const AdminAction = require("../../../../Shared/UI/AdminAction");

module.exports = class ShowPageAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        try {
            const { data } = await this.gateway.run({ id: req.params.id });

            res.render('front/pages/show', { data });
        } catch (e) {
            this.session.flash('messages.danger.page_not_found', 'danger');

            res.redirect(req.path('admin_page_browse'), 303);
        }
    }
}
