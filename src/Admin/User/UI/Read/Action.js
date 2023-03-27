const AdminAction = require("../../../../Shared/UI/AdminAction");
const ReadForm = require('../Schema/Edit');

module.exports = class ReadUserAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        try {
            const { data } = await this.gateway.run({ id: req.params.id });
            const form = new ReadForm(data);

            res.render('admin/users/edit', { form: form.createView() });
        } catch (e) {
            this.session.flash('messages.danger.user_not_found', 'danger');

            res.redirect(req.path('admin_users'), 303);
        }
    }
}
