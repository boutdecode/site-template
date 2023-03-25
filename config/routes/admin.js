const SignInGateway = require("../../src/Admin/Security/Application/SignIn/Gateway");

module.exports = {
    'routes': [
        {
            'name': 'admin_redirect',
            'path': '/admin',
            'method': 'GET',
            'operator': (req, res) => {
                res.redirect(req.path('admin_login'));
            },
            //'input': [],
            'output': {
                200: {
                    description: 'Ok'
                }
            },
        },
        {
            'name': 'admin_login',
            'path': '/admin/{locale}/sign-in',
            'method': 'GET',
            'operator': (req, res) => {
                res.render('admin/login', { form: {} });
            },
            //'input': [],
            'output': {
                200: {
                    description: 'Ok'
                }
            },
        },
        {
            'name': 'admin_sign_in',
            'path': '/admin/{locale}/sign-in',
            'method': 'POST',
            'operator': SignInGateway,
            //'input': [],
            'output': {
                200: {
                    description: 'Ok'
                }
            },
        }
    ]
};
