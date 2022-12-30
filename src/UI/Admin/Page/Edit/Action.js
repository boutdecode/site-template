const AdminAction = require("../../../../Shared/UI/AdminAction");
const EditSchema = require("./../Schema/Edit");

module.exports = class EditAction extends AdminAction {
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
                await this.gateway.run({ ...form.data, id: req.params.id });

                this.session.flash('messages.success.page_updated', 'success');

                return res.redirect(req.path('admin_page_browse'), 303);
            } catch ({ message }) {
                error = message;
            }
        }

        res.render('admin/pages/edit', { form: form.createView(), error });
    }
}
