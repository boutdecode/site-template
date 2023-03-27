const UserRepository = require("../../src/Admin/User/Infrastructure/Repository/User");
const BrowseUserGateway = require("../../src/Admin/User/Application/Browse/Gateway");
const CreateUserGateway = require("../../src/Admin/User/Application/Create/Gateway");
const DeleteUserGateway = require("../../src/Admin/User/Application/Delete/Gateway");
const EditUserGateway = require("../../src/Admin/User/Application/Edit/Gateway");
const ReadUserGateway = require("../../src/Admin/User/Application/Read/Gateway");
const BrowseUserAction = require("../../src/Admin/User/UI/Browse/Action");
const CreateUserAction = require("../../src/Admin/User/UI/Create/Action");
const DeleteUserAction = require("../../src/Admin/User/UI/Delete/Action");
const EditUserAction = require("../../src/Admin/User/UI/Edit/Action");
const ReadUserAction = require("../../src/Admin/User/UI/Read/Action");
const CreateUserCommand = require("../../src/Admin/User/UI/Command/Create/Command");

module.exports = (container) => {
    container.set(UserRepository, (ct, { application }) => new UserRepository(ct.get('db'), application.securitySalt));

    container.set(BrowseUserGateway, ct => new BrowseUserGateway(ct.get(UserRepository)));
    container.set(CreateUserGateway, ct => new CreateUserGateway(ct.get(UserRepository)));
    container.set(DeleteUserGateway, ct => new DeleteUserGateway(ct.get(UserRepository)));
    container.set(EditUserGateway, ct => new EditUserGateway(ct.get(UserRepository)));
    container.set(ReadUserGateway, ct => new ReadUserGateway(ct.get(UserRepository)));

    container.set(BrowseUserAction, ct => new BrowseUserAction(ct.get('session'), ct.get(BrowseUserGateway)));
    container.set(CreateUserAction, ct => new CreateUserAction(ct.get('session'), ct.get(CreateUserGateway)));
    container.set(DeleteUserAction, ct => new DeleteUserAction(ct.get('session'), ct.get(DeleteUserGateway)));
    container.set(EditUserAction, ct => new EditUserAction(ct.get('session'), ct.get(EditUserGateway)));
    container.set(ReadUserAction, ct => new ReadUserAction(ct.get('session'), ct.get(ReadUserGateway)));
    container.set(CreateUserCommand, ct => new CreateUserCommand(ct.get('session'), ct.get(CreateUserGateway)));
};
