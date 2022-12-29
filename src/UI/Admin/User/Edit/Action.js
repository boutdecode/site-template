const AdminAction = require("../../../../Shared/UI/AdminAction");
const EditForm = require("./../Schema/Edit");

module.exports = class Edit extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        const form = new EditForm();
        form.handleRequest(req);

        let error = null;
        if (form.isSubmit() && form.isValid()) {
            try {
                await this.gateway.run({ ...form.data, id: req.params.id });

                this.session.flash('messages.success.user_updated', 'success');
                return res.redirect(req.path('admin_users'), 303);
            } catch (e) {
                error = message;
            }
        }

        res.render('admin/users/edit', { form: form.createView(), error });
    }
}
