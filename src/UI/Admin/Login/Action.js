const form = require('./Schema/SignIn');
const Gateway = require('../../../Admin/Security/Application/Gateway/SignIn/Gateway');
const Router = require('../../../Shared/Infrastructure/HTTP/Router');

const repository = require('../../../Admin/Security/Infrastructure/Persistence/Repository/User');

module.exports = async (req, res) => {
    form.handleRequest(req);

    let error = null;
    if (form.isSubmit() && form.isValid()) {
        try {
            req.session.user = await Gateway(form.data);

            return res.redirect(req.path('admin_dashboard'));
        } catch ({ message }) {
            error = message;
        }
    }

    res.render('admin/login', { form: form.createView(), error });
};
