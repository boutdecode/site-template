const SecurityRepository = require("../../../src/Admin/Security/Infrastructure/Persistence/Repository/Security");
const SignIn = require("../../../src/Admin/Security/Application/Gateway/SignIn/Gateway");
const ShowDashboardGateway = require("../../../src/Admin/Dashboard/Application/Gateway/Show/Gateway");
const Login = require("../../../src/UI/Admin/Login/Action");
const Dashboard = require("../../../src/UI/Admin/Dashboard/Action");
const Logout = require("../../../src/UI/Admin/Logout/Action");
const CreateAdminUserCommand = require("../../../src/UI/Command/Admin/User/Create/Command");

module.exports = (container) => {
    container.set('security_repository', (container, { application }) => {
        return new SecurityRepository(container.get('db'), application.securitySalt);
    });

    container.set('admin_gateway_sign_in', (container) => {
        return new SignIn(container.get('security_repository'));
    });

    container.set('admin_gateway_dashboard_show', (container) => {
        return new ShowDashboardGateway(
            container.get('user_repository'),
            container.get('page_repository')
        );
    });

    container.set('admin_action_login', (container) => {
        return new Login(
            container.get('session'),
            container.get('admin_gateway_sign_in')
        );
    });

    container.set('admin_action_dashboard', (container) => {
        return new Dashboard(
            container.get('session'),
            container.get('admin_gateway_dashboard_show')
        );
    });

    container.set('admin_action_logout', (container) => {
        return new Logout(container.get('session'));
    });

    container.set('admin_command_user_create', (container) => {
        return new CreateAdminUserCommand(
            container.get('admin_gateway_user_create')
        );
    });
};
