const config = require('./config.json');

const Container = require('../src/Shared/Infrastructure/DI/Container');
const Requester = require('../src/Shared/Infrastructure/Persistence/Requester');
const Session = require('../src/Shared/Infrastructure/HTTP/Session');
const Router = require('../src/Shared/Infrastructure/HTTP/Router');
const I18N = require('../src/Shared/Infrastructure/Translation/I18N');
const SecurityRepository = require('../src/Admin/Security/Infrastructure/Persistence/Repository/Security');
const UserRepository = require('../src/Admin/User/Infrastructure/Repository/User');

const SignIn = require('../src/Admin/Security/Application/Gateway/SignIn/Gateway');
const BrowseUserGateway = require('../src/Admin/User/Application/Gateway/Browse/Gateway');
const CreateUserGateway = require('../src/Admin/User/Application/Gateway/Create/Gateway');
const DeleteUserGateway = require('../src/Admin/User/Application/Gateway/Delete/Gateway');
const EditUserGateway = require('../src/Admin/User/Application/Gateway/Edit/Gateway');
const ReadUserGateway = require('../src/Admin/User/Application/Gateway/Read/Gateway');

const IndexAction = require('../src/UI/Front/Index/Action');
const Login = require("../src/UI/Admin/Login/Action");
const Dashboard = require("../src/UI/Admin/Dashboard/Action");
const Logout = require("../src/UI/Admin/Logout/Action");

const BrowseUserAction = require('../src/UI/Admin/User/Browse/Action');
const CreateUserAction = require('../src/UI/Admin/User/Create/Action');
const DeleteUserAction = require('../src/UI/Admin/User/Delete/Action');
const EditUserAction = require('../src/UI/Admin/User/Edit/Action');
const ReadUserAction = require('../src/UI/Admin/User/Read/Action');

module.exports = () => {
    const container = new Container(config);

    container.set('db', (container, { db }) => new Requester(container.resolvePaths(db)));
    container.set('session', () => new Session());
    container.set('router', (container) => new Router(container));
    container.set('i18n', (container, { translation }) => new I18N(container.resolvePath(translation.resources)));

    container.set('security_repository', (container) => {
        return new SecurityRepository(container.get('db'));
    });

    container.set('user_repository', () => {
        return new UserRepository(container.get('db'));
    });

    container.set('admin_gateway_sign_in', (container) => {
        return new SignIn(container.get('security_repository'));
    });

    container.set('admin_gateway_user_browse', (container) => {
        return new BrowseUserGateway(container.get('user_repository'));
    });

    container.set('admin_gateway_user_create', (container) => {
        return new CreateUserGateway(container.get('user_repository'));
    });

    container.set('admin_gateway_user_delete', (container) => {
        return new DeleteUserGateway(container.get('user_repository'));
    });

    container.set('admin_gateway_user_edit', (container) => {
        return new EditUserGateway(container.get('user_repository'));
    });

    container.set('admin_gateway_user_read', (container) => {
        return new ReadUserGateway(container.get('user_repository'));
    });

    container.set('front_action_index', () => {
        return new IndexAction();
    });

    container.set('admin_action_login', (container) => {
        return new Login(
            container.get('session'),
            container.get('admin_gateway_sign_in')
        );
    });

    container.set('admin_action_dashboard', (container) => {
        return new Dashboard(container.get('session'));
    });

    container.set('admin_action_logout', (container) => {
        return new Logout(container.get('session'));
    });

    container.set('admin_action_user_browse', (container) => {
        return new BrowseUserAction(
            container.get('session'),
            container.get('admin_gateway_user_browse')
        );
    });

    container.set('admin_action_user_create', (container) => {
        return new CreateUserAction(
            container.get('session'),
            container.get('admin_gateway_user_create')
        );
    });

    container.set('admin_action_user_delete', (container) => {
        return new DeleteUserAction(
            container.get('session'),
            container.get('admin_gateway_user_delete')
        );
    });

    container.set('admin_action_user_edit', (container) => {
        return new EditUserAction(
            container.get('session'),
            container.get('admin_gateway_user_edit')
        );
    });

    container.set('admin_action_user_read', (container) => {
        return new ReadUserAction(
            container.get('session'),
            container.get('admin_gateway_user_read')
        );
    });

    return container;
};
