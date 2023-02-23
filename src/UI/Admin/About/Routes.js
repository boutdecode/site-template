const ReadAboutAction = require("./Read/Action");

module.exports = (router) => {
    router.get('admin_about_read', '/admin/about', ReadAboutAction);
};
