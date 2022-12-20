const config = require('./config.json');

const Container = require('../src/Shared/Infrastructure/DI/Container');
const Requester = require('../src/Shared/Infrastructure/Persistence/Requester');
const Session = require('../src/Shared/Infrastructure/HTTP/Session');
const Router = require('../src/Shared/Infrastructure/HTTP/Router');
const I18N = require('../src/Shared/Infrastructure/Translation/I18N');
const SecurityRepository = require('../src/Admin/Security/Infrastructure/Persistence/Repository/Security');
const UserRepository = require('../src/Admin/User/Infrastructure/Repository/User');

const SignIn = require('../src/Admin/Security/Application/Gateway/SignIn/Gateway');

const IndexAction = require('../src/UI/Front/Index/Action');
const Login = require("../src/UI/Admin/Login/Action");
const Dashboard = require("../src/UI/Admin/Dashboard/Action");
const Logout = require("../src/UI/Admin/Logout/Action");

module.exports = () => {
    const container = new Container(config);

    container.set('db', (container, { db }) => new Requester(container.resolvePaths(db)));
    container.set('session', () => new Session());
    container.set('router', (container) => new Router(container));
    container.set('i18n', (container, { translation }) => new I18N(container.resolvePath(translation.resources)));

    container.set('security_repository', (container) => new SecurityRepository(container.get('db')));
    container.set('user_repository', () => new UserRepository(container.get('db')));

    container.set('admin_gateway_sign_in', (container) => new SignIn(container.get('security_repository')));

    container.set('front_action_index', () => new IndexAction());

    container.set('admin_action_login', (container) => new Login(container.get('session'), container.get('admin_gateway_sign_in')));
    container.set('admin_action_dashboard', (container) => new Dashboard(container.get('session')));
    container.set('admin_action_logout', (container) => new Logout(container.get('session')));
    /*container.set('admin_action_logout');
    container.set('admin_action_dashboard');
    container.set('admin_action_user_browse');
    container.set('admin_action_user_create');*/

    return container;
};
