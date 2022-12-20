const boxstore = require("boxstore");
const form = require('./Schema/Search');
const Gateway = require('../../../../Admin/User/Application/Gateway/List/Gateway');

module.exports = async (req, res) => {
    const session = boxstore.get('session');
    const userSession = session.getSession(req);

    if (!userSession.user) {
        return res.redirect(req.path('admin_login'), 302);
    }

    form.handleRequest(req);

    let parameters = {};
    if (form.isSubmit() && form.isValid()) {
        parameters = form.data;
    }

    console.log(form.data);

    const { data } = await Gateway.run(parameters);

    return res.render('admin/users/list', { users: data });
};
