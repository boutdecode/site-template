const BrowseACMEAction = require("../../../src/UI/Admin/ACME/Browse/Action");
const CreateACMEAction = require("../../../src/UI/Admin/ACME/Create/Action");
const DeleteACMEAction = require("../../../src/UI/Admin/ACME/Delete/Action");
const EditACMEAction = require("../../../src/UI/Admin/ACME/Edit/Action");
const ReadACMEAction = require("../../../src/UI/Admin/ACME/Read/Action");
const ShowACMEAction = require("../../../src/UI/Admin/ACME/Show/Action");
const BrowseACMEGateway = require("../../../src/Admin/ACME/Application/Browse/Gateway");
const CreateACMEGateway = require("../../../src/Admin/ACME/Application/Create/Gateway");
const DeleteACMEGateway = require("../../../src/Admin/ACME/Application/Delete/Gateway");
const EditACMEGateway = require("../../../src/Admin/ACME/Application/Edit/Gateway");
const ReadACMEGateway = require("../../../src/Admin/ACME/Application/Read/Gateway");
const ACMERepository = require("../../../src/Core/ACME/Infrastructure/Persistence/Repository");

module.exports = (container) => {
    container.set(ACMERepository, () => {
        return new ACMERepository(container.get('db'));
    });

    container.set(BrowseACMEGateway, (container) => {
        return new BrowseACMEGateway(container.get(ACMERepository));
    });

    container.set(CreateACMEGateway, (container) => {
        return new CreateACMEGateway(container.get(ACMERepository));
    });

    container.set(DeleteACMEGateway, (container) => {
        return new DeleteACMEGateway(container.get(ACMERepository));
    });

    container.set(EditACMEGateway, (container) => {
        return new EditACMEGateway(container.get(ACMERepository));
    });

    container.set(ReadACMEGateway, (container) => {
        return new ReadACMEGateway(container.get(ACMERepository));
    });

    container.set(BrowseACMEAction, (container) => {
        return new BrowseACMEAction(
            container.get('session'),
            container.get(BrowseACMEGateway)
        );
    });

    container.set(CreateACMEAction, (container) => {
        return new CreateACMEAction(
            container.get('session'),
            container.get(CreateACMEGateway)
        );
    });

    container.set(DeleteACMEAction, (container) => {
        return new DeleteACMEAction(
            container.get('session'),
            container.get(DeleteACMEGateway)
        );
    });

    container.set(EditACMEAction, (container) => {
        return new EditACMEAction(
            container.get('session'),
            container.get(EditACMEGateway)
        );
    });

    container.set(ReadACMEAction, (container) => {
        return new ReadACMEAction(
            container.get('session'),
            container.get(ReadACMEGateway)
        );
    });

    container.set(ShowACMEAction, (container) => {
        return new ShowACMEAction(
            container.get('session'),
            container.get(ReadACMEGateway)
        );
    });
};
