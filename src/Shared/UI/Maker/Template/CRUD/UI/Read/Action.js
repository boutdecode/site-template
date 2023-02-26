const AdminAction = require("../../../../Shared/UI/AdminAction");
const ReadSchema = require('./../Schema/Edit');

module.exports = class ReadACMEAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        try {
            const { data } = await this.gateway.run({ id: req.params.id });
            const form = new ReadSchema(data);

            res.render('admin/acme/edit', { form: form.createView() });
        } catch (e) {
            this.session.flash('messages.danger.acme_not_found', 'danger');

            res.redirect(req.path('admin_acme_browse'), 303);
        }
    }
}
