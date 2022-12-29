const AdminAction = require("../../../../Shared/UI/AdminAction");
const CreateForm = require('./../Schema/Create');

module.exports = class Create extends AdminAction {
    gateway;
    constructor(session, gateway) {
        super(session);
        this.gateway = gateway;
    }

    async process(req, res) {
        const form = new CreateForm();
        form.handleRequest(req);

        let error = null;
        if (form.isSubmit() && form.isValid()) {
            try {
                await this.gateway.run(form.data);

                this.session.flash('messages.success.user_created', 'success');
                return res.redirect(req.path('admin_users'), 303);
            } catch (e) {
                error = e.message;
            }
        }

        res.render('admin/users/create', { form: form.createView(), error });
    }
}
