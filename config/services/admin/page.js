const BrowsePageAction = require("../../../src/UI/Admin/Page/Browse/Action");
const CreatePageAction = require("../../../src/UI/Admin/Page/Create/Action");
const DeletePageAction = require("../../../src/UI/Admin/Page/Delete/Action");
const EditPageAction = require("../../../src/UI/Admin/Page/Edit/Action");
const ReadPageAction = require("../../../src/UI/Admin/Page/Read/Action");
const ShowPageAction = require("../../../src/UI/Admin/Page/Show/Action");
const BrowsePageGateway = require("../../../src/Admin/Page/Application/Browse/Gateway");
const CreatePageGateway = require("../../../src/Admin/Page/Application/Create/Gateway");
const DeletePageGateway = require("../../../src/Admin/Page/Application/Delete/Gateway");
const EditPageGateway = require("../../../src/Admin/Page/Application/Edit/Gateway");
const ReadPageGateway = require("../../../src/Admin/Page/Application/Read/Gateway");
const PageRepository = require("../../../src/Core/Page/Infrastructure/Repository/Page");

module.exports = (container) => {
    container.set(PageRepository, () => {
        return new PageRepository(container.get('db'));
    });

    container.set(BrowsePageGateway, (container) => {
        return new BrowsePageGateway(container.get(PageRepository));
    });

    container.set(CreatePageGateway, (container) => {
        return new CreatePageGateway(container.get(PageRepository));
    });

    container.set(DeletePageGateway, (container) => {
        return new DeletePageGateway(container.get(PageRepository));
    });

    container.set(EditPageGateway, (container) => {
        return new EditPageGateway(container.get(PageRepository));
    });

    container.set(ReadPageGateway, (container) => {
        return new ReadPageGateway(container.get(PageRepository));
    });

    container.set(BrowsePageAction, (container) => {
        return new BrowsePageAction(
            container.get('session'),
            container.get(BrowsePageGateway)
        );
    });

    container.set(CreatePageAction, (container) => {
        return new CreatePageAction(
            container.get('session'),
            container.get(CreatePageGateway)
        );
    });

    container.set(DeletePageAction, (container) => {
        return new DeletePageAction(
            container.get('session'),
            container.get(DeletePageGateway)
        );
    });

    container.set(EditPageAction, (container) => {
        return new EditPageAction(
            container.get('session'),
            container.get(EditPageGateway)
        );
    });

    container.set(ReadPageAction, (container) => {
        return new ReadPageAction(
            container.get('session'),
            container.get(ReadPageGateway)
        );
    });

    container.set(ShowPageAction, (container) => {
        return new ShowPageAction(
            container.get('session'),
            container.get(ReadPageGateway)
        );
    });
};
