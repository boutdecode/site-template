const SignIn = require('./Schema/SignIn');
const Action = require("../../../Shared/UI/Action");

module.exports = class LoginAction extends Action {

    constructor(session, gateway) {
        super();
        this.gateway = gateway;
        this.session = session;
    }

    async process(req, res) {
        const form = new SignIn();
        form.handleRequest(req);

        let error = null;
        if (form.isSubmit() && form.isValid()) {
            try {
                const { data } = await this.gateway.run(form.data);
                if (!data) {
                    error = 'messages.error.bad_credential';
                } else {
                    this.session.startSession(req, res, { user: data }, form.data['remember-me']);

                    return res.redirect(req.path('admin_dashboard'), 303);
                }
            } catch ({ message }) {
                error = message;
            }
        }

        res.render('admin/login', { form: form.createView(), error });
    }
}
