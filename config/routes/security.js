const LoginAction = require("../../src/Admin/Security/UI/Login/Action");
const LogoutAction = require("../../src/Admin/Security/UI/Logout/Action");

module.exports = (router) => {
    router.get('admin_login', '/admin/:locale/sign-in', LoginAction);
    router.post('admin_sign_in', '/admin/:locale/sign-in', LoginAction);
    router.get('admin_logout', '/admin/logout', LogoutAction);

};
