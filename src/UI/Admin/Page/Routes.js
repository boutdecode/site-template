const BrowsePageAction = require("./Browse/Action");
const CreatePageAction = require("./Create/Action");
const ReadPageAction = require("./Read/Action");
const ShowPageAction = require("./Show/Action");
const DeletePageAction = require("./Delete/Action");
const EditPageAction = require("./Edit/Action");

module.exports = (router) => {
    router.get('admin_page_browse', '/admin/:locale/pages', BrowsePageAction);
    router.get('admin_page_create', '/admin/:locale/page/create', CreatePageAction);
    router.get('admin_page_read', '/admin/:locale/page/:id/read', ReadPageAction);
    router.get('admin_page_show', '/admin/:locale/page/:id/show', ShowPageAction);
    router.post('admin_page_create', '/admin/page/create', CreatePageAction);
    router.post('admin_page_delete', '/admin/page/:id/delete', DeletePageAction);
    router.post('admin_page_edit', '/admin/page/:id/edit', EditPageAction);
};
