const BrowseUserAction = require("../../../src/UI/Admin/User/Browse/Action");
const CreateUserAction = require("../../../src/UI/Admin/User/Create/Action");
const DeleteUserAction = require("../../../src/UI/Admin/User/Delete/Action");
const EditUserAction = require("../../../src/UI/Admin/User/Edit/Action");
const ReadUserAction = require("../../../src/UI/Admin/User/Read/Action");
const BrowseUserGateway = require("../../../src/Admin/User/Application/Gateway/Browse/Gateway");
const CreateUserGateway = require("../../../src/Admin/User/Application/Gateway/Create/Gateway");
const DeleteUserGateway = require("../../../src/Admin/User/Application/Gateway/Delete/Gateway");
const EditUserGateway = require("../../../src/Admin/User/Application/Gateway/Edit/Gateway");
const ReadUserGateway = require("../../../src/Admin/User/Application/Gateway/Read/Gateway");
const UserRepository = require("../../../src/Core/User/Infrastructure/Repository/User");

module.exports = (container) => {
    container.set('user_repository', (container, { application }) => {
        return new UserRepository(container.get('db'), application.securitySalt);
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
};
