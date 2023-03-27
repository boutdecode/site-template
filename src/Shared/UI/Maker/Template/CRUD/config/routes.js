const BrowseACMEAction = require("../../src/Admin/ACME/UI/Browse/Action");
const CreateACMEAction = require("../../src/Admin/ACME/UI/Create/Action");
const ReadACMEAction = require("../../src/Admin/ACME/UI/Read/Action");
const ShowACMEAction = require("../../src/Admin/ACME/UI/Show/Action");
const DeleteACMEAction = require("../../src/Admin/ACME/UI/Delete/Action");
const EditACMEAction = require("../../src/Admin/ACME/UI/Edit/Action");

module.exports = (router) => {
    router.get('admin_acme_browse', '/admin/:locale/acme', BrowseACMEAction);
    router.get('admin_acme_create', '/admin/:locale/acme/create', CreateACMEAction);
    router.get('admin_acme_read', '/admin/:locale/acme/:id/read', ReadACMEAction);
    router.get('admin_acme_show', '/admin/:locale/acme/:id/show', ShowACMEAction);
    router.post('admin_acme_create', '/admin/acme/create', CreateACMEAction);
    router.post('admin_acme_delete', '/admin/acme/:id/delete', DeleteACMEAction);
    router.post('admin_acme_edit', '/admin/acme/:id/edit', EditACMEAction);
};
