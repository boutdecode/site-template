const BrowseACMEAction = require("./Browse/Action");
const CreateACMEAction = require("./Create/Action");
const ReadACMEAction = require("./Read/Action");
const ShowACMEAction = require("./Show/Action");
const DeleteACMEAction = require("./Delete/Action");
const EditACMEAction = require("./Edit/Action");

module.exports = (router) => {
    router.get('admin_acme_browse', '/admin/:locale/acme', BrowseACMEAction);
    router.get('admin_acme_create', '/admin/:locale/acme/create', CreateACMEAction);
    router.get('admin_acme_read', '/admin/:locale/acme/:id/read', ReadACMEAction);
    router.get('admin_acme_show', '/admin/:locale/acme/:id/show', ShowACMEAction);
    router.post('admin_acme_create', '/admin/acme/create', CreateACMEAction);
    router.post('admin_acme_delete', '/admin/acme/:id/delete', DeleteACMEAction);
    router.post('admin_acme_edit', '/admin/acme/:id/edit', EditACMEAction);
};
