const SecurityRepository = require("../../../src/Admin/Security/Infrastructure/Repository/Security");
const SignInGateway = require("../../../src/Admin/Security/Application/SignIn/Gateway");
const ShowDashboardGateway = require("../../../src/Admin/Dashboard/Application/Show/Gateway");
const Login = require("../../../src/UI/Admin/Login/Action");
const Dashboard = require("../../../src/UI/Admin/Dashboard/Action");
const Logout = require("../../../src/UI/Admin/Logout/Action");
const UserRepository = require("../../../src/Core/User/Infrastructure/Repository/User");
const PageRepository = require("../../../src/Core/Page/Infrastructure/Repository/Page");
const SettingsRepository = require("../../../src/Admin/Settings/Infrastructure/Repository/Settings");

module.exports = (container) => {
    container.set(SecurityRepository, (container, { application }) => {
        return new SecurityRepository(container.get('db'), application.securitySalt);
    });

    container.set(SignInGateway, (container) => {
        return new SignInGateway(container.get(SecurityRepository));
    });

    container.set(ShowDashboardGateway, (container) => {
        return new ShowDashboardGateway(
            container.get(UserRepository),
            container.get(PageRepository),
            container.get(SettingsRepository),
            container.get('analytics')
        );
    });

    container.set(Login, (container) => {
        return new Login(
            container.get('session'),
            container.get(SignInGateway)
        );
    });

    container.set(Dashboard, (container) => {
        return new Dashboard(
            container.get('session'),
            container.get(ShowDashboardGateway)
        );
    });

    container.set(Logout, (container) => {
        return new Logout(container.get('session'));
    });
};
