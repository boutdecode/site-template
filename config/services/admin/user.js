const BrowseUserAction = require("../../../src/UI/Admin/User/Browse/Action");
const CreateUserAction = require("../../../src/UI/Admin/User/Create/Action");
const DeleteUserAction = require("../../../src/UI/Admin/User/Delete/Action");
const EditUserAction = require("../../../src/UI/Admin/User/Edit/Action");
const ReadUserAction = require("../../../src/UI/Admin/User/Read/Action");
const BrowseUserGateway = require("../../../src/Admin/User/Application/Browse/Gateway");
const CreateUserGateway = require("../../../src/Admin/User/Application/Create/Gateway");
const DeleteUserGateway = require("../../../src/Admin/User/Application/Delete/Gateway");
const EditUserGateway = require("../../../src/Admin/User/Application/Edit/Gateway");
const ReadUserGateway = require("../../../src/Admin/User/Application/Read/Gateway");
const UserRepository = require("../../../src/Core/User/Infrastructure/Repository/User");
const CreateAdminUserCommand = require("../../../src/UI/Command/Admin/User/Create/Command");

module.exports = (container) => {
    container.set(UserRepository, (container, { application }) => {
        return new UserRepository(container.get('db'), application.securitySalt);
    });

    container.set(BrowseUserGateway, (container) => {
        return new BrowseUserGateway(container.get(UserRepository));
    });

    container.set(CreateUserGateway, (container) => {
        return new CreateUserGateway(container.get(UserRepository));
    });

    container.set(DeleteUserGateway, (container) => {
        return new DeleteUserGateway(container.get(UserRepository));
    });

    container.set(EditUserGateway, (container) => {
        return new EditUserGateway(container.get(UserRepository));
    });

    container.set(ReadUserGateway, (container) => {
        return new ReadUserGateway(container.get(UserRepository));
    });

    container.set(BrowseUserAction, (container) => {
        return new BrowseUserAction(
            container.get('session'),
            container.get(BrowseUserGateway)
        );
    });

    container.set(CreateUserAction, (container) => {
        return new CreateUserAction(
            container.get('session'),
            container.get(CreateUserGateway)
        );
    });

    container.set(DeleteUserAction, (container) => {
        return new DeleteUserAction(
            container.get('session'),
            container.get(DeleteUserGateway)
        );
    });

    container.set(EditUserAction, (container) => {
        return new EditUserAction(
            container.get('session'),
            container.get(EditUserGateway)
        );
    });

    container.set(ReadUserAction, (container) => {
        return new ReadUserAction(
            container.get('session'),
            container.get(ReadUserGateway)
        );
    });

    container.set(CreateAdminUserCommand, (container) => {
        return new CreateAdminUserCommand(
            container.get(CreateUserGateway)
        );
    });
};
