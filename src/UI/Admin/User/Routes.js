const BrowseUserAction = require("./Browse/Action");
const CreateUserAction = require("./Create/Action");
const ReadUserAction = require("./Read/Action");
const DeleteUserAction = require("./Delete/Action");
const EditUserAction = require("./Edit/Action");

module.exports = (router) => {
    router.get('admin_users', '/admin/:locale/users', BrowseUserAction);
    router.get('admin_create_user', '/admin/:locale/user/create', CreateUserAction);
    router.get('admin_read_user', '/admin/:locale/user/:id/read', ReadUserAction);
    router.post('admin_create_user', '/admin/user/create', CreateUserAction);
    router.post('admin_delete_user', '/admin/user/:id/delete', DeleteUserAction);
    router.post('admin_edit_user', '/admin/user/:id/edit', EditUserAction);
};
