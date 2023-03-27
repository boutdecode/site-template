const AdminAction = require("../../../../Shared/UI/AdminAction");
const ReadSchema = require('../Schema/Edit');

module.exports = class ReadPageAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        try {
            const { data } = await this.gateway.run({ id: req.params.id });
            const form = new ReadSchema(data);

            res.render('admin/pages/edit', { form: form.createView() });
        } catch (e) {
            this.session.flash('messages.danger.page_not_found', 'danger');

            res.redirect(req.path('admin_page_browse'), 303);
        }
    }
}
