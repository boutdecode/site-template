const ReadAboutAction = require("../../src/Admin/About/UI/Read/Action");

module.exports = (router) => {
    router.get('admin_about_read', '/admin/about', ReadAboutAction);
};
