const AdminAction = require("../../../../Shared/UI/AdminAction");
const CreateSchema = require('./../Schema/Create');

module.exports = class CreateAction extends AdminAction {

    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        const form = new CreateSchema();
        form.handleRequest(req);

        let error = null;
        if (form.isSubmit() && form.isValid()) {
            try {
                await this.gateway.run(form.data);
                this.session.flash('messages.success.page_created', 'success');

                return res.redirect(req.path('admin_page_browse'), 303);
            } catch ({ message }) {
                error = message;
            }
        }

        res.render('admin/pages/create', { form: form.createView(), error });
    }
}
