const BrowsePageAction = require("../../../src/UI/Admin/Page/Browse/Action");
const CreatePageAction = require("../../../src/UI/Admin/Page/Create/Action");
const DeletePageAction = require("../../../src/UI/Admin/Page/Delete/Action");
const EditPageAction = require("../../../src/UI/Admin/Page/Edit/Action");
const ReadPageAction = require("../../../src/UI/Admin/Page/Read/Action");
const ShowPageAction = require("../../../src/UI/Admin/Page/Show/Action");
const BrowsePageGateway = require("../../../src/Admin/Page/Application/Gateway/Browse/Gateway");
const CreatePageGateway = require("../../../src/Admin/Page/Application/Gateway/Create/Gateway");
const DeletePageGateway = require("../../../src/Admin/Page/Application/Gateway/Delete/Gateway");
const EditPageGateway = require("../../../src/Admin/Page/Application/Gateway/Edit/Gateway");
const ReadPageGateway = require("../../../src/Admin/Page/Application/Gateway/Read/Gateway");
const PageRepository = require("../../../src/Core/Page/Infrastructure/Repository/Page");

module.exports = (container) => {
    container.set('page_repository', () => {
        return new PageRepository(container.get('db'));
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
};
