const config = require('./config.json');

const Container = require('../src/Shared/Infrastructure/DI/Container');
const Requester = require('../src/Shared/Infrastructure/Persistence/Requester');
const Session = require('../src/Shared/Infrastructure/HTTP/Session');
const Router = require('../src/Shared/Infrastructure/HTTP/Router');
const I18N = require('../src/Shared/Infrastructure/Translation/I18N');
const SecurityRepository = require('../src/Admin/Security/Infrastructure/Persistence/Repository/Security');
const UserRepository = require('../src/Core/User/Infrastructure/Repository/User');
const PageRepository = require('../src/Core/Page/Infrastructure/Repository/Page');
const SettingsRepository = require("../src/Admin/Settings/Infrastructure/Repository/Settings");

const FrontReadPageGateway = require('../src/Front/Page/Application/Read/Gateway');

const SignIn = require('../src/Admin/Security/Application/Gateway/SignIn/Gateway');
const ShowDashboardGateway = require('../src/Admin/Dashboard/Application/Gateway/Show/Gateway');
const BrowseUserGateway = require('../src/Admin/User/Application/Gateway/Browse/Gateway');
const CreateUserGateway = require('../src/Admin/User/Application/Gateway/Create/Gateway');
const DeleteUserGateway = require('../src/Admin/User/Application/Gateway/Delete/Gateway');
const EditUserGateway = require('../src/Admin/User/Application/Gateway/Edit/Gateway');
const ReadUserGateway = require('../src/Admin/User/Application/Gateway/Read/Gateway');

const BrowsePageGateway = require('../src/Admin/Page/Application/Gateway/Browse/Gateway');
const CreatePageGateway = require('../src/Admin/Page/Application/Gateway/Create/Gateway');
const DeletePageGateway = require('../src/Admin/Page/Application/Gateway/Delete/Gateway');
const EditPageGateway = require('../src/Admin/Page/Application/Gateway/Edit/Gateway');
const ReadPageGateway = require('../src/Admin/Page/Application/Gateway/Read/Gateway');

const EditSettingsGateway = require('../src/Admin/Settings/Application/Gateway/Edit/Gateway');
const ReadSettingsGateway = require('../src/Admin/Settings/Application/Gateway/Read/Gateway');

const FrontReadPageAction = require('../src/UI/Front/Page/Read/Action');
const FrontError404Action = require('../src/UI/Front/Error/NotFound/Action');
const HomePageAction = require('../src/UI/Front/Page/Home/Action');
const AboutPageAction = require('../src/UI/Front/Page/About/Action');
const ContactPageAction = require('../src/UI/Front/Page/Contact/Action');

const Login = require("../src/UI/Admin/Login/Action");
const Dashboard = require("../src/UI/Admin/Dashboard/Action");
const Logout = require("../src/UI/Admin/Logout/Action");

const BrowseUserAction = require('../src/UI/Admin/User/Browse/Action');
const CreateUserAction = require('../src/UI/Admin/User/Create/Action');
const DeleteUserAction = require('../src/UI/Admin/User/Delete/Action');
const EditUserAction = require('../src/UI/Admin/User/Edit/Action');
const ReadUserAction = require('../src/UI/Admin/User/Read/Action');

const BrowsePageAction = require('../src/UI/Admin/Page/Browse/Action');
const CreatePageAction = require('../src/UI/Admin/Page/Create/Action');
const DeletePageAction = require('../src/UI/Admin/Page/Delete/Action');
const EditPageAction = require('../src/UI/Admin/Page/Edit/Action');
const ReadPageAction = require('../src/UI/Admin/Page/Read/Action');
const ShowPageAction = require('../src/UI/Admin/Page/Show/Action');

const EditSettingsAction = require('../src/UI/Admin/Settings/Edit/Action');
const ReadSettingsAction = require('../src/UI/Admin/Settings/Read/Action');

module.exports = () => {
    const container = new Container(config);

    container.set('db', (container, { db }) => new Requester(container.resolvePaths(db)));
    container.set('session', () => new Session());
    container.set('router', (container) => new Router(container));
    container.set('i18n', (container, { translation }) => new I18N(container.resolvePath(translation.resources)));
    container.set('manifest', (container, { assets }) => {
        const result = {};
        const assetFiles = container.resolvePaths(assets);
        for (const asset in assetFiles) {
            const { entrypoints } = require(assetFiles[asset]);
            result[asset] = entrypoints;
        }

        return result;
    });

    container.set('security_repository', (container) => {
        return new SecurityRepository(container.get('db'));
    });

    container.set('user_repository', () => {
        return new UserRepository(container.get('db'));
    });

    container.set('page_repository', () => {
        return new PageRepository(container.get('db'));
    });

    container.set('settings_repository', () => {
        return new SettingsRepository(container.get('db'));
    });

    container.set('front_gateway_page_read', (container) => {
        return new FrontReadPageGateway(container.get('page_repository'));
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

    container.set('admin_gateway_page_browse', (container) => {
        return new BrowsePageGateway(container.get('page_repository'));
    });

    container.set('admin_gateway_page_create', (container) => {
        return new CreatePageGateway(container.get('page_repository'));
    });

    container.set('admin_gateway_page_delete', (container) => {
        return new DeletePageGateway(container.get('page_repository'));
    });

    container.set('admin_gateway_page_edit', (container) => {
        return new EditPageGateway(container.get('page_repository'));
    });

    container.set('admin_gateway_page_read', (container) => {
        return new ReadPageGateway(container.get('page_repository'));
    });

    container.set('admin_gateway_settings_edit', (container) => {
        return new EditSettingsGateway(container.get('settings_repository'));
    });

    container.set('admin_gateway_settings_read', (container) => {
        return new ReadSettingsGateway(container.get('settings_repository'));
    });

    container.set('front_action_page_read', (container) => {
        return new FrontReadPageAction(
            container.get('front_gateway_page_read')
        );
    });

    container.set('front_action_error_404', () => {
        return new FrontError404Action();
    });

    container.set('front_action_page_home', () => {
        return new HomePageAction(
            container.get('front_gateway_page_read')
        );
    });

    container.set('front_action_page_about', () => {
        return new AboutPageAction(
            container.get('front_gateway_page_read')
        );
    });

    container.set('front_action_page_contact', () => {
        return new ContactPageAction(
            container.get('front_gateway_page_read')
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

    container.set('admin_action_page_browse', (container) => {
        return new BrowsePageAction(
            container.get('session'),
            container.get('admin_gateway_page_browse')
        );
    });

    container.set('admin_action_page_create', (container) => {
        return new CreatePageAction(
            container.get('session'),
            container.get('admin_gateway_page_create')
        );
    });

    container.set('admin_action_page_delete', (container) => {
        return new DeletePageAction(
            container.get('session'),
            container.get('admin_gateway_page_delete')
        );
    });

    container.set('admin_action_page_edit', (container) => {
        return new EditPageAction(
            container.get('session'),
            container.get('admin_gateway_page_edit')
        );
    });

    container.set('admin_action_page_read', (container) => {
        return new ReadPageAction(
            container.get('session'),
            container.get('admin_gateway_page_read')
        );
    });

    container.set('admin_action_page_show', (container) => {
        return new ShowPageAction(
            container.get('session'),
            container.get('admin_gateway_page_read')
        );
    });

    container.set('admin_action_settings_edit', (container) => {
        return new EditSettingsAction(
            container.get('session'),
            container.get('admin_gateway_settings_edit')
        );
    });

    container.set('admin_action_settings_read', (container) => {
        return new ReadSettingsAction(
            container.get('session'),
            container.get('admin_gateway_settings_read')
        );
    });

    return container;
};
