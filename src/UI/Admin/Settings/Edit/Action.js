const AdminAction = require("../../../../Shared/UI/AdminAction");
const EditSchema = require("./../Schema/Edit");

module.exports = class EditSettingsAction extends AdminAction {
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        const form = new EditSchema();
        form.handleRequest(req);

        let error = null;
        if (form.isSubmit() && form.isValid()) {
            try {
                await this.gateway.run({ ...form.data });

                this.session.flash('messages.success.settings_updated', 'success');

                return res.redirect(req.path('admin_settings_read'), 303);
            } catch ({ message }) {
                error = message;
            }
        }

        res.render('admin/settings/index', { form: form.createView(), error });
    }
}
