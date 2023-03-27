const SecurityRepository = require("../../src/Admin/Security/Infrastructure/Repository/Security");
const SignInGateway = require("../../src/Admin/Security/Application/SignIn/Gateway");
const LoginAction = require("../../src/Admin/Security/UI/Login/Action");
const LogoutAction = require("../../src/Admin/Security/UI/Logout/Action");

module.exports = (container) => {
    container.set(SecurityRepository, (container, { application }) => {
        return new SecurityRepository(container.get('db'), application.securitySalt);
    });

    container.set(SignInGateway, ct => new SignInGateway(ct.get(SecurityRepository)));

    container.set(LoginAction, ct => new LoginAction(ct.get('session'), ct.get(SignInGateway)));
    container.set(LogoutAction, ct => new LogoutAction(ct.get('session')));
};
